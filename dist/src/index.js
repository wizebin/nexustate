(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("nexusdk", [], factory);
	else if(typeof exports === 'object')
		exports["nexusdk"] = factory();
	else
		root["nexusdk"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/objer/dist/src/index.js":
/*!**********************************************!*\
  !*** ./node_modules/objer/dist/src/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("(function webpackUniversalModuleDefinition(root, factory) {\n\tif(true)\n\t\tmodule.exports = factory();\n\telse {}\n})(global, function() {\nreturn /******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// object to store loaded and loading wasm modules\n/******/ \tvar installedWasmModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, {\n/******/ \t\t\t\tconfigurable: false,\n/******/ \t\t\t\tenumerable: true,\n/******/ \t\t\t\tget: getter\n/******/ \t\t\t});\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// define __esModule on exports\n/******/ \t__webpack_require__.r = function(exports) {\n/******/ \t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/ \t// object with all compiled WebAssembly.Modules\n/******/ \t__webpack_require__.w = {};\n/******/\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = \"./src/index.js\");\n/******/ })\n/************************************************************************/\n/******/ ({\n\n/***/ \"./src/index.js\":\n/*!**********************!*\\\n  !*** ./src/index.js ***!\n  \\**********************/\n/*! exports provided: set, has, get, setKey, setWithSubkey, setKeyWithSubkey, getObjectPath, getStringPathForArray, assurePathExists */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\neval(\"__webpack_require__.r(__webpack_exports__);\\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \\\"set\\\", function() { return set; });\\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \\\"has\\\", function() { return has; });\\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \\\"get\\\", function() { return get; });\\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \\\"setKey\\\", function() { return setKey; });\\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \\\"setWithSubkey\\\", function() { return setWithSubkey; });\\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \\\"setKeyWithSubkey\\\", function() { return setKeyWithSubkey; });\\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \\\"getObjectPath\\\", function() { return getObjectPath; });\\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \\\"getStringPathForArray\\\", function() { return getStringPathForArray; });\\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \\\"assurePathExists\\\", function() { return assurePathExists; });\\n/* eslint no-prototype-builtins: \\\"off\\\" */\\nfunction set(object, path, value) {\\n  let subObject = object;\\n  const keys = getObjectPath(path || '');\\n  for (let keydex = 0; keydex < keys.length; keydex += 1) {\\n    let key = keys[keydex];\\n    if (key !== '') {\\n      if (key[key.length - 1] === ']') {\\n        key = key.substr(0, key.length - 1);\\n        key = parseInt(key, 10);\\n      }\\n      if (keydex !== keys.length - 1) {\\n        if (typeof subObject[key] !== 'object') {\\n          subObject[key] = {};\\n        }\\n        subObject = subObject[key];\\n      } else {\\n        subObject[key] = value;\\n      }\\n    }\\n  }\\n\\n  return object;\\n}\\n\\nfunction has(object, key) {\\n  if (typeof object === 'object') {\\n    return (object.hasOwnProperty(key));\\n  }\\n  return false;\\n}\\n\\nfunction get(object, path, defaultValue = undefined) {\\n  let subObject = object;\\n  const keys = getObjectPath(path || '');\\n  for (let keydex = 0; keydex < keys.length; keydex += 1) {\\n    let key = keys[keydex];\\n    if (key !== '') {\\n      if (key[key.length - 1] === ']') {\\n        key = key.substr(0, key.length - 1);\\n        key = parseInt(key, 10);\\n      }\\n\\n      if (!has(subObject, key)) return defaultValue;\\n\\n      subObject = subObject[key];\\n    }\\n  }\\n\\n  return subObject;\\n}\\n\\nfunction setKey(object, path, key, value) {\\n  if (path === null || path === undefined || path === '') {\\n    path = key;\\n  } else {\\n    path += `.${key}`;\\n  }\\n  return set(object, path, value);\\n}\\n\\nfunction setWithSubkey(object, path, subkey, value) {\\n  let subObject = object;\\n  const keys = getObjectPath(path);\\n  keys.forEach((key, dex, ray) => {\\n    if (key !== '' && dex !== ray.length - 1) {\\n      if (subObject[subkey] === undefined) {\\n        subObject[subkey] = { [key]: {  } };\\n      }\\n      subObject = subObject[subkey][key];\\n    } else {\\n      if (subObject[subkey] === undefined) {\\n        subObject[subkey] = { [key]: {  } };\\n      }\\n      subObject[subkey][key] = value;\\n    }\\n  });\\n\\n  return object;\\n}\\n\\nfunction setKeyWithSubkey(object, path, subkey, key, value) {\\n  if (path === null || path === undefined || path === '') {\\n    path = key;\\n  } else {\\n    path += `.${key}`;\\n  }\\n  return setWithSubkey(object, path, subkey, value);\\n}\\n\\nfunction getObjectPath(path) {\\n  if (path instanceof Array) return path;\\n  let inBrackets = false;\\n  let partBegin = 0;\\n  let split = false;\\n  let exitBrackets = false;\\n  const pathlen = path.length;\\n  const parts = [];\\n\\n  for(let dex = 0; dex < pathlen + 1; dex += 1) {\\n    const char = path[dex];\\n    if (inBrackets && !exitBrackets) {\\n      if (char === ']') {\\n        exitBrackets = true;\\n      }\\n    } else if (char === '.') {\\n      split = true;\\n    } else if (char === '[') {\\n      split = true;\\n      inBrackets = true;\\n    }\\n\\n    if (split || dex === pathlen) {\\n      let nextPart = path.substr(partBegin, dex - partBegin - (exitBrackets ? 1 : 0))\\n      if (inBrackets) {\\n        const parsed = parseInt(nextPart, 10);\\n        if (!isNaN(parsed)) {\\n          nextPart = parsed;\\n        }\\n      }\\n      parts.push(nextPart);\\n      partBegin = dex + 1;\\n      split = false;\\n      if (exitBrackets) inBrackets = false;\\n      exitBrackets = false;\\n    }\\n  }\\n  return parts;\\n}\\n\\nfunction getStringPathForArray(arrayPath) {\\n  return arrayPath.reduce((result, item, dex) => {\\n    if (toString.call(item) === '[object Number]') {\\n      return `${result}[${item}]`;\\n    }\\n    return result + (dex > 0 ? '.': '') + item;\\n  }, '');\\n}\\n\\nfunction assurePathExists(object, path, defaultValue = {}) {\\n  const arrayPath = getObjectPath(path);\\n  let currentObject = object;\\n  for (let arraydex = 0; arraydex < arrayPath.length; arraydex += 1) {\\n    const key = arrayPath[arraydex];\\n    if (!has(currentObject, key)) { // TODO: Address problems where key exists already and is not an array or object\\n      const nextKey = ((arraydex === arrayPath.length - 1) ? null : arrayPath[arraydex + 1]);\\n      if (nextKey === null) {\\n        currentObject[key] = defaultValue;\\n      } else if (toString.call(nextKey) === '[object Number]') {\\n        currentObject[key] = [];\\n      } else {\\n        currentObject[key] = {};\\n      }\\n    }\\n    currentObject = currentObject[key];\\n  }\\n  return currentObject;\\n}\\n\\n\\n//# sourceURL=webpack://nexusdk/./src/index.js?\");\n\n/***/ })\n\n/******/ });\n});\n\n//# sourceURL=webpack://nexusdk/./node_modules/objer/dist/src/index.js?");

/***/ }),

/***/ "./src/Nexustate.js":
/*!**************************!*\
  !*** ./src/Nexustate.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Nexustate; });\n/* harmony import */ var objer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! objer */ \"./node_modules/objer/dist/src/index.js\");\n/* harmony import */ var objer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(objer__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _NexustateHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NexustateHelpers */ \"./src/NexustateHelpers.js\");\n/* harmony import */ var _StorageManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StorageManager */ \"./src/StorageManager.js\");\n\n\n\n\nconst DEFAULT_STORAGE_KEY = '__NEXUSTATE_SAVED_DATA';\nconst SAVE_THROTTLE_TIME = 100;\n\nclass Nexustate {\n  constructor({ saveCallback = null, loadCallback = null, storageKey = DEFAULT_STORAGE_KEY, noPersist = false } = {}) {\n    this.set = (object, options = { immediatePersist: false, noNotify: false }) => {\n      const keys = Object(_NexustateHelpers__WEBPACK_IMPORTED_MODULE_1__[\"getKeys\"])(object);\n      const result = [];\n      for (let keydex = 0; keydex < keys.length; keydex += 1) {\n        result.push(this.setKey(keys[keydex], object[keys[keydex]], options));\n      }\n      return result;\n    };\n\n    this.setKey = (key, value, options = { immediatePersist: false, noNotify: false }) => {\n      const result = this.storageManager.set(key, value, options);\n      if (!this.noPersist) this.persist(options.immediatePersist);\n      if (!options.noNotify) this.notify({ key, value });\n      return result;\n    };\n\n    this.get = (key = null) => {\n      return this.storageManager.get(key);\n    };\n\n    this.delete = (key, options = { immediatePersist: false, noNotify: false }) => {\n      this.storageManager.delete(key);\n      if (!this.noPersist) this.persist(options.immediatePersist);\n      if (!options.noNotify) this.notify({ key, value: null });\n    };\n\n    this.push = (key, value, options = { immediatePersist: false, noNotify: false }) => {\n      const result = this.storageManager.push(key, value, options);\n      if (!this.noPersist) this.persist(options.immediatePersist);\n      if (!options.noNotify) this.notify({ key, value });\n      return result;\n    };\n\n    this.getForListener = (listener, keyChange) => {\n      const { key, alias, callback, transform } = listener;\n      const value = this.storageManager.get(key);\n\n      return { keyChange, alias, callback, key, value: transform ? transform(value) : value };\n    };\n\n    this.notifyListenerOfChange = (listener, keyChange) => {\n      const { callback } = listener;\n      callback(this.getForListener(listener, keyChange));\n    };\n\n    this.persist = (immediate = false) => {\n      if (immediate) {\n        this.save();\n      } else {\n        this.throttledSave();\n      }\n    };\n\n    this.save = () => this.saveCallback(this.storageKey, this.storageManager.get());\n\n    this.load = () => this.loadCallback(this.storageKey);\n\n    this.throttledSave = Object(_NexustateHelpers__WEBPACK_IMPORTED_MODULE_1__[\"throttle\"])(this.save, SAVE_THROTTLE_TIME);\n\n    this.notify = ({ key, value }) => {\n      // TODO: Notify about values that are being removed\n      const keyArray = key !== null ? Object(objer__WEBPACK_IMPORTED_MODULE_0__[\"getObjectPath\"])(key) : [];\n\n      const listenersWithKeys = this.recurseMatchingPathsForListeners(Object(_NexustateHelpers__WEBPACK_IMPORTED_MODULE_1__[\"getKeyFilledObject\"])(key, value), this.listenerObject, keyArray); // this kills the specificity arrangement\n      this.batchAndNotifyOfChanges(listenersWithKeys);\n    };\n\n    this.listen = (listener = { key: null, callback: () => {}, alias: null, component: null, transform: null }) => {\n      const listeners = this.getListenersAtPath(listener.key);\n      const matchedListeners = listeners.reduce((results, existingListener, dex) => {\n        if (existingListener.callback === listener.callback) results.push(dex);\n        return results;\n      }, []);\n\n      for (let dex = matchedListeners.length - 1; dex >= 0; dex -= 1) {\n        listeners.splice(matchedListeners[dex], 1);\n      }\n\n      listeners.push(listener);\n    };\n\n    this.getListenersAtPath = key => {\n      if (key === null) return Object(objer__WEBPACK_IMPORTED_MODULE_0__[\"assurePathExists\"])(this.listenerObject, 'listeners', []);\n      const keyArray = Object(objer__WEBPACK_IMPORTED_MODULE_0__[\"getObjectPath\"])(key);\n\n      let currentListenObject = this.listenerObject;\n      for (let keydex = 0; keydex < keyArray.length - 1; keydex += 1) {\n        // Go through all keys except the last, which is where out final request will go\n        const subKey = keyArray[keydex];\n        currentListenObject = Object(objer__WEBPACK_IMPORTED_MODULE_0__[\"assurePathExists\"])(currentListenObject, ['subkeys', subKey], {});\n      }\n      const finalKey = keyArray[keyArray.length - 1];\n      return Object(objer__WEBPACK_IMPORTED_MODULE_0__[\"assurePathExists\"])(currentListenObject, ['subkeys', finalKey, 'listeners'], []);\n    };\n\n    this.unlisten = (key, callback) => {\n      const listeners = this.getListenersAtPath(key);\n\n      const matchedListeners = listeners.reduce((results, existingListener, dex) => {\n        if (existingListener.callback === callback) results.push(dex);\n        return results;\n      }, []);\n\n      for (let dex = matchedListeners.length - 1; dex >= 0; dex -= 1) {\n        listeners.splice(matchedListeners[dex], 1);\n      }\n    };\n\n    this.unlistenComponent = (component, basePath) => {\n      const patharray = basePath || [];\n      const subkeypath = (basePath || []).concat('subkeys');\n      const keys = Object(_NexustateHelpers__WEBPACK_IMPORTED_MODULE_1__[\"getKeys\"])(Object(objer__WEBPACK_IMPORTED_MODULE_0__[\"get\"])(this.listenerObject, subkeypath));\n      for (let keydex = 0; keydex < keys.length; keydex += 1) {\n        this.unlistenComponent(component, subkeypath.concat([keys[keydex]]));\n      }\n\n      const listeners = Object(objer__WEBPACK_IMPORTED_MODULE_0__[\"get\"])(this.listenerObject, patharray.concat('listeners'));\n\n      const matchedListeners = (listeners || []).reduce((results, existingListener, dex) => {\n        if (existingListener.component === component) results.push(dex);\n        return results;\n      }, []);\n\n      for (let dex = matchedListeners.length - 1; dex >= 0; dex -= 1) {\n        listeners.splice(matchedListeners[dex], 1);\n      }\n    };\n\n    this.storageManager = new _StorageManager__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({ persist: this.persist, notify: this.notifySavedChange, loadPersisted: this.loadPersisted });\n    this.listenerObject = { subkeys: {} };\n    this.storageKey = storageKey;\n    this.saveCallback = saveCallback;\n    this.loadCallback = loadCallback;\n    if (!saveCallback) {\n      if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {\n        this.saveCallback = (key, data) => window.localStorage.setItem(key, JSON.stringify(data));\n        this.loadCallback = key => this.storageManager.set(null, JSON.parse(window.localStorage.getItem(key)));\n      } else if (typeof global !== 'undefined' && typeof global.localStorage !== 'undefined') {\n        this.saveCallback = (key, data) => global.localStorage.setItem(key, JSON.stringify(data));\n        this.loadCallback = key => this.storageManager.set(null, JSON.parse(global.localStorage.getItem(key)));\n      }\n    }\n    this.noPersist = noPersist;\n  }\n\n  /**\n   * Overwrites the top level values of object into the storageManager, just like react setState\n   */\n\n\n  batchAndNotifyOfChanges(changeWithListener) {\n    const result = [];\n    const callbackBatches = []; // Use this to detect multiple listeners, okay for now, need to use an object somehow in the future\n    // [{ callback: () => {}, changes: [{ getForListener() Result }]}]\n    for (let keydex = 0; keydex < changeWithListener.length; keydex += 1) {\n      const keyChange = changeWithListener[keydex];\n      const listenerIndex = Object(_NexustateHelpers__WEBPACK_IMPORTED_MODULE_1__[\"findIndex\"])(callbackBatches, callbackBatch => callbackBatch.callback === keyChange.listener.callback);\n\n      if (listenerIndex !== -1) {\n        callbackBatches[listenerIndex].changes.push(this.getForListener(keyChange.listener, keyChange.key));\n      } else {\n        callbackBatches.push({ callback: keyChange.listener.callback, changes: [this.getForListener(keyChange.listener, keyChange.key)] });\n      }\n    }\n\n    for (let callbatch = 0; callbatch < callbackBatches.length; callbatch += 1) {\n      const listenerBatch = callbackBatches[callbatch];\n      const { callback, changes } = listenerBatch;\n\n      callback(changes);\n    }\n  }\n\n  recurseMatchingPathsForListeners(change, listenerObject, key = []) {\n    let result = [];\n    if (Object(objer__WEBPACK_IMPORTED_MODULE_0__[\"has\"])(listenerObject, 'listeners')) {\n      for (let listenerdex = 0; listenerdex < listenerObject.listeners.length; listenerdex += 1) {\n        result.push({ listener: listenerObject.listeners[listenerdex], key });\n      }\n    }\n\n    if (Object(objer__WEBPACK_IMPORTED_MODULE_0__[\"has\"])(listenerObject, 'subkeys') && (change instanceof Array || typeof change === 'object')) {\n      const changeKeys = Object(_NexustateHelpers__WEBPACK_IMPORTED_MODULE_1__[\"getKeys\"])(change);\n      for (let keydex = 0; keydex < changeKeys.length; keydex += 1) {\n        const changeKey = changeKeys[keydex];\n        if (Object(objer__WEBPACK_IMPORTED_MODULE_0__[\"has\"])(listenerObject.subkeys, changeKey)) {\n          result = result.concat(this.recurseMatchingPathsForListeners(change[changeKey], listenerObject.subkeys[changeKey], key.concat(changeKey)));\n        }\n      }\n    }\n\n    return result;\n  }\n\n}\n\n//# sourceURL=webpack://nexusdk/./src/Nexustate.js?");

/***/ }),

/***/ "./src/NexustateHelpers.js":
/*!*********************************!*\
  !*** ./src/NexustateHelpers.js ***!
  \*********************************/
/*! exports provided: findIndex, getKeys, throttle, getKeyFilledObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"findIndex\", function() { return findIndex; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getKeys\", function() { return getKeys; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"throttle\", function() { return throttle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getKeyFilledObject\", function() { return getKeyFilledObject; });\n/* harmony import */ var objer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! objer */ \"./node_modules/objer/dist/src/index.js\");\n/* harmony import */ var objer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(objer__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction findIndex(array, callback, context) {\n  for (let keydex = 0; keydex < array.length; keydex += 1) {\n    if (callback(array[keydex])) return keydex;\n  }\n  return -1;\n}\n\nfunction getKeys(object) {\n  if (!object) return [];\n  if (typeof Object.keys === 'undefined') return Object.keys(object);\n  const keys = [];\n\n  for (let key in object) {\n    if (object.hasOwnProperty(key)) {\n      keys.push(key);\n    }\n  }\n\n  return keys;\n}\n\n// ** COPIED FROM UNDERSCORE JS **\n// Returns a function, that, when invoked, will only be triggered at most once\n// during a given window of time. Normally, the throttled function will run\n// as much as it can, without ever going more than once per `wait` duration;\n// but if you'd like to disable the execution on the leading edge, pass\n// `{leading: false}`. To disable execution on the trailing edge, ditto.\nfunction throttle(func, wait, options) {\n  var timeout, context, args, result;\n  var previous = 0;\n  if (!options) options = {};\n\n  var later = function () {\n    previous = options.leading === false ? 0 : new Date().getTime();\n    timeout = null;\n    result = func.apply(context, args);\n    if (!timeout) context = args = null;\n  };\n\n  var throttled = function () {\n    var now = new Date().getTime();\n    if (!previous && options.leading === false) previous = now;\n    var remaining = wait - (now - previous);\n    context = this;\n    args = arguments;\n    if (remaining <= 0 || remaining > wait) {\n      if (timeout) {\n        clearTimeout(timeout);\n        timeout = null;\n      }\n      previous = now;\n      result = func.apply(context, args);\n      if (!timeout) context = args = null;\n    } else if (!timeout && options.trailing !== false) {\n      timeout = setTimeout(later, remaining);\n    }\n    return result;\n  };\n\n  throttled.cancel = function () {\n    clearTimeout(timeout);\n    previous = 0;\n    timeout = context = args = null;\n  };\n\n  return throttled;\n}\n\nfunction getKeyFilledObject(key, value) {\n  if (key === null) return value;\n  const result = {};\n  Object(objer__WEBPACK_IMPORTED_MODULE_0__[\"assurePathExists\"])(result, key);\n  Object(objer__WEBPACK_IMPORTED_MODULE_0__[\"set\"])(result, key, value);\n  return result;\n}\n\n//# sourceURL=webpack://nexusdk/./src/NexustateHelpers.js?");

/***/ }),

/***/ "./src/StorageManager.js":
/*!*******************************!*\
  !*** ./src/StorageManager.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return StorageManager; });\n/* harmony import */ var objer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! objer */ \"./node_modules/objer/dist/src/index.js\");\n/* harmony import */ var objer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(objer__WEBPACK_IMPORTED_MODULE_0__);\n\n\nclass StorageManager {\n  constructor() {\n    this.data = {};\n  }\n\n  set(key, value) {\n    if (key === null) this.data = value;\n    if (this.data === null) this.data = {};\n    Object(objer__WEBPACK_IMPORTED_MODULE_0__[\"set\"])(this.data, key, value);\n  }\n\n  get(key = null) {\n    if (key === null) return this.data;\n    return Object(objer__WEBPACK_IMPORTED_MODULE_0__[\"get\"])(this.data, key);\n  }\n\n  delete(key) {\n    const keyArray = Object(objer__WEBPACK_IMPORTED_MODULE_0__[\"getObjectPath\"])(key);\n    let value = this.data;\n    for (let keydex = 0; keydex < keyArray.length - 1; keydex += 1) {\n      value = value[keyArray[keydex]];\n    }\n    delete value[keyArray[keyArray.length - 1]];\n  }\n\n  push(key, value) {\n    if (key === null) this.data.push(value);\n    if (this.data === null) this.data = {};\n    Object(objer__WEBPACK_IMPORTED_MODULE_0__[\"assurePathExists\"])(this.data, key, []);\n    this.get(key).push(value);\n  }\n\n  pop(key, value) {\n    if (key === null) this.data.pop(value);\n    if (this.data === null) this.data = {};\n    Object(objer__WEBPACK_IMPORTED_MODULE_0__[\"get\"])(this.data, key).pop(value);\n  }\n\n  unshift(key, value) {\n    if (key === null) this.data.unshift(value);\n    if (this.data === null) this.data = {};\n    Object(objer__WEBPACK_IMPORTED_MODULE_0__[\"get\"])(this.data, key).unshift(value);\n  }\n\n  shift(key, value) {\n    if (key === null) this.data.shift(value);\n    if (this.data === null) this.data = {};\n    Object(objer__WEBPACK_IMPORTED_MODULE_0__[\"get\"])(this.data, key).shift(value);\n  }\n\n  splice(key, index, length) {\n    if (key === null) this.data.splice(index, length);\n    if (this.data === null) this.data = {};\n    Object(objer__WEBPACK_IMPORTED_MODULE_0__[\"get\"])(this.data, key).splice(index, length);\n  }\n}\n\n//# sourceURL=webpack://nexusdk/./src/StorageManager.js?");

/***/ }),

/***/ "./src/getNexustate.js":
/*!*****************************!*\
  !*** ./src/getNexustate.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return getNexustate; });\n/* harmony import */ var _Nexustate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Nexustate */ \"./src/Nexustate.js\");\n\n\nfunction getNexustate(name = 'default') {\n  if (getNexustate.managers === undefined) getNexustate.managers = {};\n  if (getNexustate.managers[name] === undefined) {\n    getNexustate.managers[name] = new _Nexustate__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    getNexustate.managers[name].load();\n  };\n  return getNexustate.managers[name];\n}\n\n//# sourceURL=webpack://nexusdk/./src/getNexustate.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: Nexustate, getNexustate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Nexustate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Nexustate */ \"./src/Nexustate.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Nexustate\", function() { return _Nexustate__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _getNexustate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getNexustate */ \"./src/getNexustate.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getNexustate\", function() { return _getNexustate__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n\n\n\n\n\n//# sourceURL=webpack://nexusdk/./src/index.js?");

/***/ })

/******/ });
});