import { getObjectPath, keys, assurePathExists, has, get, set } from 'objer'
import { findIndex, throttle, getKeyFilledObject } from './NexustateHelpers';
import StorageManager from './StorageManager';

const DEFAULT_STORAGE_KEY = '__NEXUSTATE_SAVED_DATA';
const SAVE_THROTTLE_TIME = 100;

export { DEFAULT_STORAGE_KEY };

export default class Nexustate {
  constructor({ saveCallback = null, loadCallback = null, storageKey = DEFAULT_STORAGE_KEY, noPersist = false } = {}) {
    this.storageManager = new StorageManager();
    this.listenerObject = { subkeys: {} };
    this.storageKey = storageKey;
    this.saveCallback = saveCallback;
    this.loadCallback = loadCallback;
    if (!saveCallback) {
      if (typeof global !== 'undefined' && typeof global.localStorage !== 'undefined') {
        this.saveCallback = (key, data) => global.localStorage.setItem(key, JSON.stringify(data));
        this.loadCallback = (key) => this.storageManager.set(null, JSON.parse(global.localStorage.getItem(key)));
      } else if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
        this.saveCallback = (key, data) => window.localStorage.setItem(key, JSON.stringify(data));
        this.loadCallback = (key) => this.storageManager.set(null, JSON.parse(window.localStorage.getItem(key)));
      }
    }
    this.noPersist = noPersist;
  }

  setPersistenceFunctions = (save, load) => {
    this.saveCallback = save;
    this.loadCallback = load;
  }

  setPersist = (shouldPersist) => {
    this.noPersist = !shouldPersist;
  }

  /**
   * Overwrites the top level values of object into the storageManager, just like react setState
   */
  set = (object, options = { immediatePersist: false, noNotify: false }) => {
    const objectKeys = keys(object);
    const result = [];
    for (let keydex = 0; keydex < objectKeys.length; keydex += 1) {
      result.push(this.setKey(objectKeys[keydex], object[objectKeys[keydex]], options));
    }
    return result;
  }

  setKey = (key, value, options = { immediatePersist: false, noNotify: false }) => {
    const result = this.storageManager.set(key, value, options);
    if (!this.noPersist) this.persist(options.immediatePersist);
    if (!options.noNotify) this.notify({ key, value });
    return result;
  }

  get = (key = null) => {
    return this.storageManager.get(key);
  }

  delete = (key, options = { immediatePersist: false, noNotify: false }) => {
    this.storageManager.delete(key);
    if (!this.noPersist) this.persist(options.immediatePersist);
    if (!options.noNotify) this.notify({ key, value: null });
  }

  push = (key, value, options = { immediatePersist: false, noNotify: false }) => {
    const result = this.storageManager.push(key, value, options);
    if (!this.noPersist) this.persist(options.immediatePersist);
    if (!options.noNotify) this.notify({ key, value });
    return result;
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

  persist = (immediate = false) => {
    if (immediate) {
      this.save();
    } else {
      this.throttledSave();
    }
  }

  save = () => (this.saveCallback(this.storageKey, this.storageManager.get()));
  load = () => (this.loadCallback(this.storageKey));

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
