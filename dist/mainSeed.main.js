/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./seedRing/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./seedRing/main.js":
/*!**************************!*\
  !*** ./seedRing/main.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const userInfoInit = {\r\n    union: 0,\r\n    skill: [],\r\n    linkSkill: [],\r\n    setEffect: {\r\n        bossSet: 0,\r\n        absolSet: 0,\r\n        karutaSet: 0,\r\n    },\r\n    itemWeapon: {\r\n        weapon: {\r\n            power: 0,\r\n            percent: 0,\r\n        },\r\n        subWeapon: {\r\n            power: 0,\r\n            percent: 0,\r\n        },\r\n        emblem: {\r\n            power: 0,\r\n            percent: 0,\r\n        },\r\n    },\r\n    item: {\r\n        ring1: 0,\r\n        ring2: 0,\r\n        ring3: 0,\r\n        ring4: 0,\r\n        pocket: 0,\r\n        pendent1: 0,\r\n        pendent2: 0,\r\n        belt: 0,\r\n        faceAcc: 0,\r\n        eyeAcc: 0,\r\n        earAcc: 0,\r\n        hat: 0,\r\n        clothes: 0,\r\n        pants: 0,\r\n        gloves: 0,\r\n        shoes: 0,\r\n        shoulder: 0,\r\n        cape: 0,\r\n        badge: 0,\r\n        medal: 0,\r\n        heart: 0,\r\n        ching: 0,\r\n        pet: 0,\r\n        petAcc: 0,\r\n    },\r\n    stats: {\r\n        mainStats: 0,\r\n        subStats: 0,\r\n        damage: 0,\r\n        damageLast: 0,\r\n        damageBoss: 0,\r\n    },\r\n    weaponNum: 0,\r\n    characterNum: 0,\r\n    sookryoundo: 0,\r\n};\r\nfunction getSumOfPowerPercent(characterInfo) {\r\n    const muboem = characterInfo.itemWeapon;\r\n    return muboem.weapon.percent + muboem.emblem.percent + muboem.subWeapon.percent;\r\n}\r\nfunction getSumOfPower(characterInfo) {\r\n    const muboem = characterInfo.itemWeapon;\r\n    return (\r\n        muboem.emblem.power +\r\n        muboem.weapon.power +\r\n        muboem.subWeapon.power +\r\n        Object.values(characterInfo.item).reduce((a, b) => a + b)\r\n    );\r\n}\r\nfunction getStatPower(characterInfo) {\r\n    const stats = characterInfo.stats;\r\n    const power = getSumOfPower(characterInfo);\r\n    const powerPercent = getSumOfPowerPercent(characterInfo);\r\n    return (\r\n        (stats.mainStats * 4 + stats.subStats) *\r\n        0.01 *\r\n        (power * (1 + powerPercent / 100)) *\r\n        characterInfo.weaponNum *\r\n        characterInfo.characterNum *\r\n        (1 + stats.damage / 100) *\r\n        (1 + stats.damageLast / 100)\r\n    );\r\n}\r\nfunction myclick() {\r\n    console.log(document);\r\n    // alert(document.userForm.action);\r\n}\r\n// window.myclick = () => {\r\n//     console.log(document);\r\n//     alert(document.userForm.action);\r\n// };\r\nfunction main() {}\r\n\n\n//# sourceURL=webpack:///./seedRing/main.js?");

/***/ })

/******/ });