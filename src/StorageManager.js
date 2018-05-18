import { set, get, getObjectPath, assurePathExists } from 'objer'

export default class StorageManager {
  constructor() {
    this.data = {};
  }

  set(key, value) {
    if (key === null) this.data = value;
    if (this.data === null) this.data = {};
    set(this.data, key, value);
  }

  get(key = null) {
    if (key === null) return this.data;
    return get(this.data, key);
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
      delete value[finalKey];
    }
  }

  push(key, value) {
    if (key === null) this.data.push(value);
    if (this.data === null) this.data = {};
    assurePathExists(this.data, key, []);
    this.get(key).push(value);
  }

  pop(key, value) {
    if (key === null) this.data.pop(value);
    if (this.data === null) this.data = {};
    get(this.data, key).pop(value);
  }

  unshift(key, value) {
    if (key === null) this.data.unshift(value);
    if (this.data === null) this.data = {};
    get(this.data, key).unshift(value);
  }

  shift(key, value) {
    if (key === null) this.data.shift(value);
    if (this.data === null) this.data = {};
    get(this.data, key).shift(value);
  }

  splice(key, index, length) {
    if (key === null) this.data.splice(index, length);
    if (this.data === null) this.data = {};
    get(this.data, key).splice(index, length);
  }
}
