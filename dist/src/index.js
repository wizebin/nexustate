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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: set, has, get, setKey, setWithSubkey, setKeyWithSubkey, getObjectPath, getStringPathForArray, assurePathExists */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"set\", function() { return set; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"has\", function() { return has; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"get\", function() { return get; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setKey\", function() { return setKey; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setWithSubkey\", function() { return setWithSubkey; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setKeyWithSubkey\", function() { return setKeyWithSubkey; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getObjectPath\", function() { return getObjectPath; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getStringPathForArray\", function() { return getStringPathForArray; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"assurePathExists\", function() { return assurePathExists; });\n/* eslint no-prototype-builtins: \"off\" */\nfunction set(object, path, value) {\n  let subObject = object;\n  const keys = getObjectPath(path || '');\n  for (let keydex = 0; keydex < keys.length; keydex += 1) {\n    let key = keys[keydex];\n    if (key !== '') {\n      if (key[key.length - 1] === ']') {\n        key = key.substr(0, key.length - 1);\n        key = parseInt(key, 10);\n      }\n      if (keydex !== keys.length - 1) {\n        if (typeof subObject[key] !== 'object') {\n          subObject[key] = {};\n        }\n        subObject = subObject[key];\n      } else {\n        subObject[key] = value;\n      }\n    }\n  }\n\n  return object;\n}\n\nfunction has(object, key) {\n  if (typeof object === 'object') {\n    return (object.hasOwnProperty(key));\n  }\n  return false;\n}\n\nfunction get(object, path, defaultValue = undefined) {\n  let subObject = object;\n  const keys = getObjectPath(path || '');\n  for (let keydex = 0; keydex < keys.length; keydex += 1) {\n    let key = keys[keydex];\n    if (key !== '') {\n      if (key[key.length - 1] === ']') {\n        key = key.substr(0, key.length - 1);\n        key = parseInt(key, 10);\n      }\n\n      if (!has(subObject, key)) return defaultValue;\n\n      subObject = subObject[key];\n    }\n  }\n\n  return subObject;\n}\n\nfunction setKey(object, path, key, value) {\n  if (path === null || path === undefined || path === '') {\n    path = key;\n  } else {\n    path += `.${key}`;\n  }\n  return set(object, path, value);\n}\n\nfunction setWithSubkey(object, path, subkey, value) {\n  let subObject = object;\n  const keys = getObjectPath(path);\n  keys.forEach((key, dex, ray) => {\n    if (key !== '' && dex !== ray.length - 1) {\n      if (subObject[subkey] === undefined) {\n        subObject[subkey] = { [key]: {  } };\n      }\n      subObject = subObject[subkey][key];\n    } else {\n      if (subObject[subkey] === undefined) {\n        subObject[subkey] = { [key]: {  } };\n      }\n      subObject[subkey][key] = value;\n    }\n  });\n\n  return object;\n}\n\nfunction setKeyWithSubkey(object, path, subkey, key, value) {\n  if (path === null || path === undefined || path === '') {\n    path = key;\n  } else {\n    path += `.${key}`;\n  }\n  return setWithSubkey(object, path, subkey, value);\n}\n\nfunction getObjectPath(path) {\n  if (path instanceof Array) return path;\n  let inBrackets = false;\n  let partBegin = 0;\n  let split = false;\n  let exitBrackets = false;\n  const pathlen = path.length;\n  const parts = [];\n\n  for(let dex = 0; dex < pathlen + 1; dex += 1) {\n    const char = path[dex];\n    if (inBrackets && !exitBrackets) {\n      if (char === ']') {\n        exitBrackets = true;\n      }\n    } else if (char === '.') {\n      split = true;\n    } else if (char === '[') {\n      split = true;\n      inBrackets = true;\n    }\n\n    if (split || dex === pathlen) {\n      let nextPart = path.substr(partBegin, dex - partBegin - (exitBrackets ? 1 : 0))\n      if (inBrackets) {\n        const parsed = parseInt(nextPart, 10);\n        if (!isNaN(parsed)) {\n          nextPart = parsed;\n        }\n      }\n      parts.push(nextPart);\n      partBegin = dex + 1;\n      split = false;\n      if (exitBrackets) inBrackets = false;\n      exitBrackets = false;\n    }\n  }\n  return parts;\n}\n\nfunction getStringPathForArray(arrayPath) {\n  return arrayPath.reduce((result, item, dex) => {\n    if (toString.call(item) === '[object Number]') {\n      return `${result}[${item}]`;\n    }\n    return result + (dex > 0 ? '.': '') + item;\n  }, '');\n}\n\nfunction assurePathExists(object, path, defaultValue = {}) {\n  const arrayPath = getObjectPath(path);\n  let currentObject = object;\n  for (let arraydex = 0; arraydex < arrayPath.length; arraydex += 1) {\n    const key = arrayPath[arraydex];\n    if (!has(currentObject, key)) { // TODO: Address problems where key exists already and is not an array or object\n      const nextKey = ((arraydex === arrayPath.length - 1) ? null : arrayPath[arraydex + 1]);\n      if (nextKey === null) {\n        currentObject[key] = defaultValue;\n      } else if (toString.call(nextKey) === '[object Number]') {\n        currentObject[key] = [];\n      } else {\n        currentObject[key] = {};\n      }\n    }\n    currentObject = currentObject[key];\n  }\n  return currentObject;\n}\n\n\n//# sourceURL=webpack://nexusdk/./src/index.js?");

/***/ })

/******/ });
});