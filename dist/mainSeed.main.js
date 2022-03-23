/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./seedRing/main.js":
/*!**************************!*\
  !*** ./seedRing/main.js ***!
  \**************************/
/***/ (() => {

eval("const userInfoInit = {\r\n    union: 0,\r\n    skill: [],\r\n    linkSkill: [],\r\n    setEffect: {\r\n        bossSet: 0,\r\n        absolSet: 0,\r\n        karutaSet: 0,\r\n    },\r\n    itemWeapon: {\r\n        weapon: {\r\n            power: 0,\r\n            percent: 0,\r\n        },\r\n        subWeapon: {\r\n            power: 0,\r\n            percent: 0,\r\n        },\r\n        emblem: {\r\n            power: 0,\r\n            percent: 0,\r\n        },\r\n    },\r\n    item: {\r\n        ring1: 0,\r\n        ring2: 0,\r\n        ring3: 0,\r\n        ring4: 0,\r\n        pocket: 0,\r\n        pendent1: 0,\r\n        pendent2: 0,\r\n        belt: 0,\r\n        faceAcc: 0,\r\n        eyeAcc: 0,\r\n        earAcc: 0,\r\n        hat: 0,\r\n        clothes: 0,\r\n        pants: 0,\r\n        gloves: 0,\r\n        shoes: 0,\r\n        shoulder: 0,\r\n        cape: 0,\r\n        badge: 0,\r\n        medal: 0,\r\n        heart: 0,\r\n        ching: 0,\r\n        pet: 0,\r\n        petAcc: 0,\r\n    },\r\n    stats: {\r\n        mainStats: 0,\r\n        subStats: 0,\r\n        damage: 0,\r\n        damageLast: 0,\r\n        damageBoss: 0,\r\n    },\r\n    weaponNum: 0,\r\n    characterNum: 0,\r\n    sookryoundo: 0,\r\n};\r\nfunction getSumOfPowerPercent(characterInfo) {\r\n    const muboem = characterInfo.itemWeapon;\r\n    return muboem.weapon.percent + muboem.emblem.percent + muboem.subWeapon.percent;\r\n}\r\nfunction getSumOfPower(characterInfo) {\r\n    const muboem = characterInfo.itemWeapon;\r\n    return (\r\n        muboem.emblem.power +\r\n        muboem.weapon.power +\r\n        muboem.subWeapon.power +\r\n        Object.values(characterInfo.item).reduce((a, b) => a + b)\r\n    );\r\n}\r\nfunction getStatPower(characterInfo) {\r\n    const stats = characterInfo.stats;\r\n    const power = getSumOfPower(characterInfo);\r\n    const powerPercent = getSumOfPowerPercent(characterInfo);\r\n    return (\r\n        (stats.mainStats * 4 + stats.subStats) *\r\n        0.01 *\r\n        (power * (1 + powerPercent / 100)) *\r\n        characterInfo.weaponNum *\r\n        characterInfo.characterNum *\r\n        (1 + stats.damage / 100) *\r\n        (1 + stats.damageLast / 100)\r\n    );\r\n}\r\nfunction myclick() {\r\n    console.log(document);\r\n    // alert(document.userForm.action);\r\n}\r\n// window.myclick = () => {\r\n//     console.log(document);\r\n//     alert(document.userForm.action);\r\n// };\r\nfunction main() {}\r\n\n\n//# sourceURL=webpack:///./seedRing/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./seedRing/main.js"]();
/******/ 	
/******/ })()
;