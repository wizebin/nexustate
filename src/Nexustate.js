import { getObjectPath, keys, assurePathExists, has, get, set, getTypeString, values } from 'objer'
import { findIndex, throttle, getKeyFilledObject } from './NexustateHelpers';
import StorageManager from './StorageManager';
import { isBlankKey } from './utility/blankKey';
import getPromiseFunction from './utility/promise';

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
    return (key) => global.localStorage.getItem(key) ? JSON.parse(global.localStorage.getItem(key)) : {};
  } else if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    return (key) => window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key)) : {};
  }
}

const DEFAULT_OPTIONS = { immediatePersist: false, noNotify: false };

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
    this.promise = getPromiseFunction();
  }

  setOptions({ saveCallback, loadCallback, storageKey, persist } = {}) {
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

  getChangeNotificationBatch(key, value, options) {
    if (!options.noNotify) return this.getNotifyBatch({ key, value });
    return [];
  }

  finalizeChange(batch, options) {
    if (this.persist) this.persistData(options.immediatePersist);
    if (!options.noNotify) this.executeNotifyBatch(batch);
  }

  get = (key = null, defaultValue) => {
    return this.storageManager.get(key, defaultValue);
  }

  createPassthroughKeyValueFunction = (functionName) => {
    return (key, value, options = DEFAULT_OPTIONS) => {
      const batch = this.getChangeNotificationBatch(key, value, options);
      const result = this.storageManager[functionName](key, value, options);
      this.finalizeChange(batch, options);
      return result;
    }
  }

  createPassthroughKeyOnlyFunction = (functionName, notificationValue) => {
    return (key, options = DEFAULT_OPTIONS) => {
      const batch = this.getChangeNotificationBatch(key, notificationValue, options);
      const result = this.storageManager[functionName](key, options);
      this.finalizeChange(batch, options);
      return result;
    }
  }

  assign = this.createPassthroughKeyValueFunction('assign', ['key', 'value']);
  set = this.createPassthroughKeyValueFunction('set', ['key', 'value']);
  setKey = this.createPassthroughKeyValueFunction('set', ['key', 'value']);
  push = this.createPassthroughKeyValueFunction('push', ['key', 'value']);
  pop = this.createPassthroughKeyValueFunction('pop', ['key']);
  // splice = this.createPassthroughKeyValueFunction('splice', ['key', 'index', 'length']);
  // unshift = this.createPassthroughKeyValueFunction('unshift', ['key']);
  // shift = this.createPassthroughKeyValueFunction('shift', ['key']);
  delete = this.createPassthroughKeyOnlyFunction('delete', null, ['key']);

  assureExists = (key, defaultValue, options = DEFAULT_OPTIONS) => {
    if (!this.has(key)) {
      return this.set(key, defaultValue, options);
    }
  }

  has = (key = null) => {
    return this.storageManager.has(key);
  }

  getForListener = (listener, keyChange) => {
    const { key, alias, callback, transform, defaultValue } = listener;
    const value = this.storageManager.has(key) ? this.storageManager.get(key) : defaultValue;

    return { keyChange, alias, callback, key, value: transform ? transform(value) : value };
  }

  executeNotifyBatch(notifyBatch) {
    const result = [];
    const callbackBatches = []; // Use this to detect multiple listeners, okay for now, need to use an object somehow in the future
    // [{ callback: () => {}, changes: [{ getForListener() Result }]}]
    for (let keydex = 0; keydex < notifyBatch.length; keydex += 1) {
      const keyChange = notifyBatch[keydex];
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

    if (loadResults instanceof this.promise) {
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

  getAllChildListeners = (listenerObject, currentKey = []) => {
    let result = [];
    const currentListeners = get(listenerObject, 'listeners') || [];
    const subkeyObject = get(listenerObject, 'subkeys') || {};
    const subkeys = keys(subkeyObject);
    for (let listenerdex = 0; listenerdex < currentListeners.length; listenerdex += 1) {
      result.push({ listener: currentListeners[listenerdex], key: currentKey })
    }
    for (let keydex = 0; keydex < subkeys.length; keydex += 1) {
      const subkey = subkeys[keydex];
      result = result.concat(this.getAllChildListeners(subkeyObject[subkey], currentKey.concat(subkey)));
    }
    return result;
  }

  getMissingChildListeners = (original, incoming, listenerObject, currentKey = []) => {
    // recurse original against incoming for changed keys, if original type is an object or array and incoming type is not the same
    // pass all child listeners. If incoming and original are both either objects or arrays, recurse the children using this function.
    let result = [];
    const originalType = getTypeString(original);
    if (originalType === 'object' || originalType === 'array') {
      const incomingType = getTypeString(incoming);
      if (incomingType !== originalType) {
        result = result.concat(this.getAllChildListeners(listenerObject, currentKey));
        // Send delete notification to every child of the original key
      } else {
        const originalKeys = keys(original);
        if (has(listenerObject, 'subkeys')) {
          for (let keydex = 0; keydex < originalKeys.length; keydex += 1) {
            const originalKey = originalKeys[keydex];
            if (has(listenerObject.subkeys, originalKey)) {
              if (!has(incoming, originalKey)) {
                result = result.concat(this.getAllChildListeners(listenerObject.subkeys[originalKey], currentKey.concat(originalKey)));
              } else {
                result = result.concat(this.getMissingChildListeners(get(original, originalKey), get(incoming, originalKey), listenerObject.subkeys[originalKey], currentKey.concat(originalKey)));
              }
            }
          }
        }
        // Recursively check children against incoming, for any missing keys send deletion, additions and changes are handled by other recurse function
      }
    }
    return result;
  }

  getListenerObjectAtKey(key) {
    let result = this.listenerObject;
    for (let keydex = 0; keydex < key.length; keydex += 1) {
      if (has(result, ['subkeys', key[keydex]])) {
        result = result.subkeys[key[keydex]];
      } else {
        return null;
      }
    }
    return result;
  }

  recurseDeletedPathsForListeners({ key, value }) {
    const original = this.storageManager.get(key);
    const listeners = this.getMissingChildListeners(original, value, this.getListenerObjectAtKey(key), key);
    return listeners;
  }

  getNotifyBatch = ({ key, value }) => {
    const keyArray = key !== null ? getObjectPath(key) : [];
    const listenersWithKeys = this.recurseMatchingPathsForListeners(getKeyFilledObject(key, value), this.listenerObject, [], keyArray.length); // this kills the specificity arrangement
    const deletersWithKeys = this.recurseDeletedPathsForListeners({ key: keyArray, value }); // this kills the

    return listenersWithKeys.concat(deletersWithKeys);
  }

  notify = ({ key, value }) => {
    this.executeNotifyBatch(this.getNotifyBatch({ key, value }));
  }

  listen = (listener = { key: null, callback: () => {}, alias: null, component: null, transform: null, noChildUpdates: false, defaultValue: undefined }) => {
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
    if (isBlankKey(key)) return assurePathExists(this.listenerObject, 'listeners', []);
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
