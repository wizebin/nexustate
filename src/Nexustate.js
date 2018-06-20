import { getObjectPath, keys, assurePathExists, has, get, set, getTypeString } from 'objer'
import { findIndex, throttle, getKeyFilledObject } from './NexustateHelpers';
import StorageManager from './StorageManager';

const SAVE_THROTTLE_TIME = 100;

function missingCallback() {
  console.error('Nexustate missing saveCallback', new Error().stack);
}

export function getLocalStorageSaveFunc() {
  if (typeof global !== 'undefined' && typeof global.localStorage !== 'undefined') {
    return (key, data) => global.localStorage.setItem(key, JSON.stringify(data));
  } else if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    return (key, data) => window.localStorage.setItem(key, JSON.stringify(data));
  }
}

export function getLocalStorageLoadFunc() {
  if (typeof global !== 'undefined' && typeof global.localStorage !== 'undefined') {
    return (key) => JSON.parse(global.localStorage.getItem(key));
  } else if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    return (key) => JSON.parse(window.localStorage.getItem(key));
  }
}

export default class Nexustate {
  static defaultSaveCallback = missingCallback;
  static defaultLoadCallback = missingCallback;

  constructor({ saveCallback = null, loadCallback = null, storageKey = 'default', persist = false } = {}) {
    this.storageManager = new StorageManager();
    this.listenerObject = { subkeys: {} };
    this.storageKey = storageKey;
    this.saveCallback = saveCallback || Nexustate.defaultSaveCallback;
    this.loadCallback = loadCallback || Nexustate.defaultLoadCallback;
    this.persist = persist;
  }

  setOptions({ saveCallback = null, loadCallback = null, storageKey = 'default', persist = false } = {}) {
    if (storageKey !== undefined) this.storageKey = storageKey;
    if (saveCallback !== undefined) this.saveCallback = saveCallback;
    if (loadCallback !== undefined) this.loadCallback = loadCallback;
    if (persist !== undefined) this.persist = persist;
  }

  setPersistenceFunctions = (save, load) => {
    this.saveCallback = save;
    this.loadCallback = load;
  }

  setPersist = (shouldPersist) => {
    this.persist = shouldPersist;
  }

  finalizeChange(key, value, options) {
    if (this.persist) this.persistData(options.immediatePersist);
    if (!options.noNotify) this.notify({ key, value });
  }

  set = (key, value, options = { immediatePersist: false, noNotify: false }) => {
    const result = this.storageManager.set(key, value);
    this.finalizeChange(key, value, options);
    return result;
  }

  setKey = this.set;

  assign = (key, value, options = { immediatePersist: false, noNotify: false }) => {
    const result = this.storageManager.assign(key, value);
    this.finalizeChange(key, value, options);
    return result;
  }

  get = (key = null) => {
    return this.storageManager.get(key);
  }

  delete = (key, options = { immediatePersist: false, noNotify: false }) => {
    this.storageManager.delete(key);
    this.finalizeChange(key, null, options);
  }

  push = (key, value, options = { immediatePersist: false, noNotify: false }) => {
    const result = this.storageManager.push(key, value);
    this.finalizeChange(key, value, options);
  }

  getForListener = (listener, keyChange) => {
    const { key, alias, callback, transform } = listener;
    const value = this.storageManager.get(key);

    return { keyChange, alias, callback, key, value: transform ? transform(value) : value };
  }

  notifyListenerOfChange = (listener, keyChange) => {
    const { callback } = listener;
    callback(this.getForListener(listener, keyChange));
  }

  batchAndNotifyOfChanges(changeWithListener) {
    const result = [];
    const callbackBatches = []; // Use this to detect multiple listeners, okay for now, need to use an object somehow in the future
    // [{ callback: () => {}, changes: [{ getForListener() Result }]}]
    for (let keydex = 0; keydex < changeWithListener.length; keydex += 1) {
      const keyChange = changeWithListener[keydex];
      const listenerIndex = findIndex(callbackBatches, callbackBatch => callbackBatch.callback === keyChange.listener.callback);

      if (listenerIndex !== -1) {
        callbackBatches[listenerIndex].changes.push(this.getForListener(keyChange.listener, keyChange.key));
      } else {
        callbackBatches.push({ callback: keyChange.listener.callback, changes: [this.getForListener(keyChange.listener, keyChange.key)] });
      }
    }

    for (let callbatch = 0; callbatch < callbackBatches.length; callbatch += 1) {
      const listenerBatch = callbackBatches[callbatch];
      const { callback, changes } = listenerBatch;

      callback(changes);
    }
  }

  persistData = (immediate = false) => {
    if (immediate) {
      this.save();
    } else {
      this.throttledSave();
    }
  }

  save = () => (this.saveCallback(this.storageKey, this.storageManager.get()));
  load = () => {
    const loadResults = this.loadCallback(this.storageKey);

    if (loadResults instanceof Promise) {
      return loadResults.then(data => {
        this.setKey(null, data);
      });
    }

    return this.setKey(null, loadResults);
  };

  throttledSave = throttle(this.save, SAVE_THROTTLE_TIME);

  recurseMatchingPathsForListeners(change, listenerObject, key = [], originalChangeDepth = 0, currentChangeDepth = 0) {
    const changeRelativity = originalChangeDepth - currentChangeDepth; // Parent change > 0, child change < 0, currentChange == 0
    let result = [];
    if (has(listenerObject, 'listeners')) {
      for (let listenerdex = 0; listenerdex < listenerObject.listeners.length; listenerdex += 1) {
        const listener = listenerObject.listeners[listenerdex];
        if (listener.noChildUpdates === true && changeRelativity > 0) {} // Skip informing parents who don't care
        else if (listener.noParentUpdates === true && changeRelativity < 0) {} // Skip informing children who don't care
        else {
          result.push({ listener, key });
        }
      }
    }

    if (has(listenerObject, 'subkeys') && (change instanceof Array || typeof change === 'object')) {
      const changeKeys = keys(change);
      for (let keydex = 0; keydex < changeKeys.length; keydex += 1) {
        const changeKey = changeKeys[keydex];
        if (has(listenerObject.subkeys, changeKey)) {
          result = result.concat(this.recurseMatchingPathsForListeners(change[changeKey], listenerObject.subkeys[changeKey], key.concat(changeKey), originalChangeDepth, currentChangeDepth + 1));
        }
      }
    }

    return result;
  }

  notify = ({ key, value }) => {
    // TODO: Notify about values that are being removed
    const keyArray = key !== null ? getObjectPath(key) : [];
    const listenersWithKeys = this.recurseMatchingPathsForListeners(getKeyFilledObject(key, value), this.listenerObject, [], keyArray.length); // this kills the specificity arrangement
    this.batchAndNotifyOfChanges(listenersWithKeys);
  }

  listen = (listener = { key: null, callback: () => {}, alias: null, component: null, transform: null, noChildUpdates: false }) => {
    const listeners = this.getListenersAtPath(listener.key);
    const matchedListeners = listeners.reduce((results, existingListener, dex) => {
      if (existingListener.callback === listener.callback) results.push(dex);
      return results;
    }, []);

    for (let dex = matchedListeners.length - 1; dex >= 0; dex -= 1) {
      listeners.splice(matchedListeners[dex], 1);
    }

    listeners.push(listener);
    return true;
  }

  getListenersAtPath = (key) => {
    if (key === null) return assurePathExists(this.listenerObject, 'listeners', []);
    const keyArray = getObjectPath(key);

    let currentListenObject = this.listenerObject;
    for (let keydex = 0; keydex < keyArray.length - 1; keydex += 1) { // Go through all keys except the last, which is where out final request will go
      const subKey = keyArray[keydex];
      currentListenObject = assurePathExists(currentListenObject, ['subkeys', subKey], {});
    }
    const finalKey = keyArray[keyArray.length - 1];
    return assurePathExists(currentListenObject, ['subkeys', finalKey, 'listeners'], []);
  }

  unlisten = (key, callback) => {
    const listeners = this.getListenersAtPath(key);

    const matchedListeners = listeners.reduce((results, existingListener, dex) => {
      if (existingListener.callback === callback) results.push(dex);
      return results;
    }, []);

    for (let dex = matchedListeners.length - 1; dex >= 0; dex -= 1) {
      listeners.splice(matchedListeners[dex], 1);
    }
  }

  unlistenComponent = (component, basePath) => {
    const patharray = (basePath || []);
    const subkeypath = (basePath || []).concat('subkeys');
    const subKeys = keys(get(this.listenerObject, subkeypath));
    for (let keydex = 0; keydex < subKeys.length; keydex += 1) {
      this.unlistenComponent(component, subkeypath.concat([subKeys[keydex]]));
    }

    const listeners = get(this.listenerObject, patharray.concat('listeners'));

    const matchedListeners = (listeners || []).reduce((results, existingListener, dex) => {
      if (existingListener.component === component) results.push(dex);
      return results;
    }, []);

    for (let dex = matchedListeners.length - 1; dex >= 0; dex -= 1) {
      listeners.splice(matchedListeners[dex], 1);
    }
  }
}
