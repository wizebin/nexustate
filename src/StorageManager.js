import { set, has, get, getObjectPath, assurePathExists, getTypeString } from 'objer'
import { isBlankKey } from './utility/blankKey';

export default class StorageManager {
  constructor() {
    this.data = {};
  }

  set(key, value) {
    if (isBlankKey(key)) {
      this.data = value;
      return this.data;
    }
    if (this.data === null) this.data = {};
    return set(this.data, key, value);
  }

  assign(key, value) {
    const currentData = get(this.data, key);
    const currentType = getTypeString(currentData);
    const incomingType = getTypeString(value);
    if (currentType === 'object' && incomingType === 'object') {
      return this.set(key, Object.assign(currentData, value));
    }

    return this.set(key, value);
  }

  assureExists(key, defaultValue) {
    if (isBlankKey(key)) {
      if (this.data === undefined) {
        this.data = defaultValue;
        return true;
      }
    } else {
      return assurePathExists(this.data, key, defaultValue);
    }
    return false;
  }

  get(key = null, defaultValue) {
    return isBlankKey(key) ? this.data : get(this.data, key, defaultValue);
  }

  has(key = null) {
    return isBlankKey(key) ? this.data !== undefined : has(this.data, key);
  }

  delete(key) {
    const keyArray = getObjectPath(key);
    let value = this.data;
    for (let keydex = 0; keydex < keyArray.length - 1; keydex += 1) {
      value = value[keyArray[keydex]];
    }
    const finalKey = keyArray[keyArray.length - 1]
    if (value instanceof Array && toString.call(finalKey) === '[object Number]') {
      value.splice(finalKey, 1);
    } else {
      if (getTypeString(value) === 'object') {
        delete value[finalKey];
        return true;
      }
    }
    return false;
  }

  push(key, value) {
    if (isBlankKey(key)) this.data.push(value);
    if (this.data === null) this.data = {};
    assurePathExists(this.data, key, []);
    this.get(key).push(value);
  }

  pop(key, value) {
    if (isBlankKey(key)) this.data.pop(value);
    if (this.data === null) this.data = {};
    get(this.data, key).pop(value);
  }

  unshift(key, value) {
    if (isBlankKey(key)) this.data.unshift(value);
    if (this.data === null) this.data = {};
    get(this.data, key).unshift(value);
  }

  shift(key, value) {
    if (isBlankKey(key)) this.data.shift(value);
    if (this.data === null) this.data = {};
    get(this.data, key).shift(value);
  }

  splice(key, index, length) {
    if (isBlankKey(key)) this.data.splice(index, length);
    if (this.data === null) this.data = {};
    get(this.data, key).splice(index, length);
  }
}
