/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./helpers/helpers.ts":
/*!****************************!*\
  !*** ./helpers/helpers.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportedFileName = exports.dateNow = void 0;
const payloads_1 = __webpack_require__(/*! ../src/payloads */ "./src/payloads/index.ts");
/**
 * Return current date and time.
 * @returns {string} - current date and time
 */
const dateNow = () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    return `${date} ${time}`;
};
exports.dateNow = dateNow;
/**
 * Return file name with path according type and brand.
 *
 * @param {string}type - type of token group
 * @param {string}brand - Name of brand. E.g.: 01 - VIGo
 * @returns
 */
const exportedFileName = (type, brand) => {
    let folder = "";
    let file = "";
    switch (type) {
        case "colors":
            file = "_colors.scss";
            break;
        case "measures":
            file = "_measures.scss";
            break;
        default:
            console.log("File header comment ERROR: file type \"" + type + "\" doesn't exist.");
            file = "ERROR";
            break;
    }
    switch (brand) {
        case payloads_1.brandNames.vigo:
            folder = "vigo";
            break;
        case payloads_1.brandNames.cpp:
            folder = "cpp";
            break;
        case payloads_1.brandNames.koop:
            folder = "koop";
            break;
        default:
            console.log("File header comment ERROR: Brand name \"" + brand + "\" doesn't exist.");
            file = "ERROR";
            break;
    }
    return `${folder}/${file}`;
};
exports.exportedFileName = exportedFileName;


/***/ }),

/***/ "./helpers/index.ts":
/*!**************************!*\
  !*** ./helpers/index.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./stringifyOutput */ "./helpers/stringifyOutput.ts"), exports);
__exportStar(__webpack_require__(/*! ./helpers */ "./helpers/helpers.ts"), exports);


/***/ }),

/***/ "./helpers/stringifyOutput.ts":
/*!************************************!*\
  !*** ./helpers/stringifyOutput.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stringifyOutput = void 0;
const stringifyOutput = (obj) => {
    let cache = [];
    const str = JSON.stringify(obj, (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (cache && cache.indexOf(value) !== -1) {
                return null;
            }
            cache === null || cache === void 0 ? void 0 : cache.push(value);
        }
        return value;
    });
    cache = null;
    return str;
};
exports.stringifyOutput = stringifyOutput;


/***/ }),

/***/ "./src/brands/getBrandId.ts":
/*!**********************************!*\
  !*** ./src/brands/getBrandId.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const getBrandId = (name, brands) => {
    const brandObject = brands.filter((brand) => brand.name === name);
    if (brandObject.length === 0) {
        console.log("ERROR: brand with name \"" + name + "\" doesn't exist id design system!");
        return "";
    }
    return brandObject[0].id;
};
exports["default"] = getBrandId;


/***/ }),

/***/ "./src/brands/index.ts":
/*!*****************************!*\
  !*** ./src/brands/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getBrandId = void 0;
var getBrandId_1 = __webpack_require__(/*! ./getBrandId */ "./src/brands/getBrandId.ts");
Object.defineProperty(exports, "getBrandId", ({ enumerable: true, get: function () { return getBrandId_1.default; } }));


/***/ }),

/***/ "./src/commentary/fileHeaderComment.ts":
/*!*********************************************!*\
  !*** ./src/commentary/fileHeaderComment.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Generates a header comment for a generated file.
 *
 * @param {string} brandName - The current brand name.
 * @param {string} fileName - The name of the generated file.
 * @returns {string} The formatted header comment.
 */
const fileHeaderComment = (brandName, fileName) => `
  /*
  * ${fileName} - generated from Supernova by neuron exporter.
  * ----------------------------------------------------------
  * 
  * current brand: ${brandName}
  */
  `;
exports["default"] = fileHeaderComment;


/***/ }),

/***/ "./src/commentary/groupNameComment.ts":
/*!********************************************!*\
  !*** ./src/commentary/groupNameComment.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
let printComment = false;
let groupName = '';
/**
 * Generates a group name comment if the token group's parent name changes.
 *
 * @param {TokenGroup} tokenGroup - The token group to generate a comment for.
 * @returns {string} The generated group name comment.
 */
const groupNameComment = (tokenGroup) => {
    if (!tokenGroup.parent) {
        return '';
    }
    const { parent: { name } } = tokenGroup;
    if (name !== groupName) {
        groupName = name;
        printComment = true;
    }
    else {
        printComment = false;
    }
    return printComment
        ? `

  /* --- ${groupName} --- */
` : '';
};
exports["default"] = groupNameComment;


/***/ }),

/***/ "./src/commentary/index.ts":
/*!*********************************!*\
  !*** ./src/commentary/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.groupNameComment = exports.fileHeaderComment = void 0;
var fileHeaderComment_1 = __webpack_require__(/*! ./fileHeaderComment */ "./src/commentary/fileHeaderComment.ts");
Object.defineProperty(exports, "fileHeaderComment", ({ enumerable: true, get: function () { return fileHeaderComment_1.default; } }));
var groupNameComment_1 = __webpack_require__(/*! ./groupNameComment */ "./src/commentary/groupNameComment.ts");
Object.defineProperty(exports, "groupNameComment", ({ enumerable: true, get: function () { return groupNameComment_1.default; } }));


/***/ }),

/***/ "./src/names/index.ts":
/*!****************************!*\
  !*** ./src/names/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.variableName = void 0;
var variableName_1 = __webpack_require__(/*! ./variableName */ "./src/names/variableName.ts");
Object.defineProperty(exports, "variableName", ({ enumerable: true, get: function () { return variableName_1.default; } }));


/***/ }),

/***/ "./src/names/variableName.ts":
/*!***********************************!*\
  !*** ./src/names/variableName.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const payloads_1 = __webpack_require__(/*! ../payloads */ "./src/payloads/index.ts");
const replaceIfContains = (source, replaceFrom, replaceTo) => {
    if (source.includes(replaceFrom)) {
        return source.replace(replaceFrom, replaceTo);
    }
    return source;
};
const replaceLastOne = (definition, source) => {
    if (definition.some((item) => source.includes(item))) {
        return `-${source}`;
    }
    return source;
};
/**
 * Generates a variable name by combining prefixes, token information, and token group path.
 *
 * @param {string} prefix - The prefix to prepend to the generated name.
 * @param {Token} token - The token to extract information from.
 * @param {TokenGroup} tokenGroup - The token group to extract path and name information from.
 * @returns {string} The generated variable name.
 */
const variableName = (prefix, token, tokenGroup) => {
    // Create array with all path segments and token name at the end
    const segments = [...tokenGroup.path];
    if (!tokenGroup.isRoot) {
        segments.push(tokenGroup.name);
    }
    segments.push(token.name);
    segments[segments.length - 1] = replaceLastOne(payloads_1.actionsNameDefinition, segments[segments.length - 1]);
    // Create string from sentence array and separate it ba "-" symbol.
    let separatedName = segments.join("-").toLowerCase();
    // If the group contains space remove it.
    const finalResult = separatedName.replace(/\s/g, "");
    return `${prefix}-${finalResult}`;
};
exports["default"] = variableName;


/***/ }),

/***/ "./src/payloads/commonPayloads.ts":
/*!****************************************!*\
  !*** ./src/payloads/commonPayloads.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.currentExporterVersion = exports.brandNames = exports.brandIds = exports.actionsNameDefinition = exports.categoryPrefixes = void 0;
const exporter_json_1 = __webpack_require__(/*! ../../../exporter.json */ "../exporter.json");
/**
 * Prefixes for the token category.
 * Only color and measure is implemented now. We need only color and measure now.
 */
exports.categoryPrefixes = {
    colorTokenPrefix: "color",
    measureTokenPrefix: "measure",
};
exports.actionsNameDefinition = [
    "hover",
    "default",
    "active",
    "disabled",
    "emphasized",
    "muted",
    "contrast",
    "success",
    "danger",
    "warning",
    "info",
    "negative",
    "base",
    "tiny",
    "small",
    "medium",
    "large",
    "extra-large",
    "huge",
    "full",
    "none",
];
/**
 * Definition of the brands (theme) persistentIds.
 */
exports.brandIds = {
    vigo: "3e9cc4d7-a217-4562-9543-e291130e324d",
    cpp: "28866b30-0acf-11ee-860e-8d38c625b914",
    koop: "1e242f60-0acf-11ee-9280-55a9d69c41ca",
};
exports.brandNames = {
    vigo: "01 - VIGo",
    cpp: "02 - CPP",
    koop: "03 - Koop",
};
/**
 * Current exporter version.
 */
exports.currentExporterVersion = exporter_json_1.version;


/***/ }),

/***/ "./src/payloads/index.ts":
/*!*******************************!*\
  !*** ./src/payloads/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./commonPayloads */ "./src/payloads/commonPayloads.ts"), exports);


/***/ }),

/***/ "./src/values/index.ts":
/*!*****************************!*\
  !*** ./src/values/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rgbToHsl = void 0;
var rgbToHsl_1 = __webpack_require__(/*! ./rgbToHsl */ "./src/values/rgbToHsl.ts");
Object.defineProperty(exports, "rgbToHsl", ({ enumerable: true, get: function () { return rgbToHsl_1.default; } }));


/***/ }),

/***/ "./src/values/rgbToHsl.ts":
/*!********************************!*\
  !*** ./src/values/rgbToHsl.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Calculates the hue value for the HSL color space based on the RGB values.
 *
 * @param {number} delta - The difference between the maximum and minimum RGB values.
 * @param {number} cmax - The maximum RGB value among r, g, and b.
 * @param {number} r - The red component of the RGB color.
 * @param {number} g - The green component of the RGB color.
 * @param {number} b - The blue component of the RGB color.
 * @returns {number} The calculated hue value in degrees [0, 360).
 */
const calculateHue = (delta, cmax, r, g, b) => {
    let result = 0;
    // no deference
    if (delta === 0) {
        return 0;
    }
    if (cmax === r) {
        result = ((g - b) / delta) % 6;
    }
    else if (cmax === g) {
        result = (b - r) / delta + 2;
    }
    else if (cmax === b) {
        result = (r - g) / delta + 4;
    }
    const rounded = Math.round(result * 60);
    if (rounded < 0) {
        return rounded + 360;
    }
    return rounded;
};
const stringHSL = (hue, saturation, lightness) => `hsl(${hue}, ${Math.round(saturation)}%, ${Math.round(lightness)}%)`;
const stringHSLA = (hue, saturation, lightness, alpha) => `hsla(${hue}, ${Math.round(saturation)}%, ${Math.round(lightness)}%, ${Math.round(alpha * 10) / 10})`;
/**
 * Calculates the lightness value for the HSL color space.
 *
 * @param {number} cmax - The maximum RGB value among r, g, and b.
 * @param {number} cmin - The minimum RGB value among r, g, and b.
 * @returns {number} The calculated lightness value in the range [0, 1].
 */
const calculateLightness = (cmax, cmin) => (cmax + cmin) / 2;
/**
 * Calculates the saturation value for the HSL color space.
 *
 * @param {number} delta - The difference between the maximum and minimum RGB values.
 * @param {number} lightness - The calculated lightness value.
 * @returns {number} The calculated saturation value in the range [0, 1].
 */
const calculateSaturation = (delta, lightness) => delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
/**
 * Converts an RGB color to HSL format.
 *
 * @param {ColorTokenValue} color - The RGB color to be converted.
 * @returns {string} The HSL representation of the input RGB color.
 */
const rgbToHsl = (color) => {
    const { r: _r, g: _g, b: _b, a: _a } = color;
    const r = _r / 255;
    const g = _g / 255;
    const b = _b / 255;
    const a = _a / 255;
    const cmin = Math.min(r, g, b);
    const cmax = Math.max(r, g, b);
    const delta = cmax - cmin;
    const hue = calculateHue(delta, cmax, r, g, b);
    const _lightness = calculateLightness(cmax, cmin);
    const _saturation = calculateSaturation(delta, _lightness);
    // Multiply lightness and saturation by 100
    const lightness = +(_lightness * 100).toFixed(1);
    const saturation = +(_saturation * 100).toFixed(1);
    // If color has alpha 1 retun HSL and when some alpha is included return HSLA
    return a === 1 ? stringHSL(hue, saturation, lightness) : stringHSLA(hue, saturation, lightness, a);
};
exports["default"] = rgbToHsl;


/***/ }),

/***/ "../exporter.json":
/*!************************!*\
  !*** ../exporter.json ***!
  \************************/
/***/ ((module) => {

module.exports = JSON.parse('{"id":"io.supernova.neuron-exporter-copy","name":"Neuron exporter copy","description":"Sass supernova exporter for neuron project.","author":"Ais servis","organization":"Ais servis","source_dir":"src","version":"1.0.5","usesBrands":true,"usesThemes":true,"config":{"sources":"sources.json","output":"output.json","js":"src/js/helpers.js"},"engines":{"pulsar":"1.0.0","supernova":"1.0.0"},"tags":["sass","neuron"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const commentary_1 = __webpack_require__(/*! ./commentary */ "./src/commentary/index.ts");
const payloads_1 = __webpack_require__(/*! ./payloads */ "./src/payloads/index.ts");
const names_1 = __webpack_require__(/*! ./names */ "./src/names/index.ts");
const values_1 = __webpack_require__(/*! ./values */ "./src/values/index.ts");
const helpers_1 = __webpack_require__(/*! ../helpers */ "./helpers/index.ts");
const brands_1 = __webpack_require__(/*! ./brands */ "./src/brands/index.ts");
// Functions registration.
Pulsar.registerFunction('variableName', names_1.variableName);
Pulsar.registerFunction('fileHeaderComment', commentary_1.fileHeaderComment);
Pulsar.registerFunction('groupNameComment', commentary_1.groupNameComment);
Pulsar.registerFunction('rgbToHsl', values_1.rgbToHsl);
Pulsar.registerFunction("dateNow", helpers_1.dateNow);
Pulsar.registerFunction("getBrandId", brands_1.getBrandId);
Pulsar.registerFunction("exportedFileName", helpers_1.exportedFileName);
// Payloads registration
Pulsar.registerPayload('categoryPrefixes', payloads_1.categoryPrefixes);
Pulsar.registerPayload('actionsNameDefinition', payloads_1.actionsNameDefinition);
Pulsar.registerPayload('brandIds', payloads_1.brandIds);
Pulsar.registerPayload("currentExporterVersion", payloads_1.currentExporterVersion);
Pulsar.registerPayload("brandNames", payloads_1.brandNames);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxxQkFBcUIsbUJBQU8sQ0FBQywrQ0FBYztBQUMzQyxtQkFBbUIsbUJBQU8sQ0FBQywyQ0FBWTtBQUN2QyxnQkFBZ0IsbUJBQU8sQ0FBQyxxQ0FBUztBQUNqQyxpQkFBaUIsbUJBQU8sQ0FBQyx1Q0FBVTtBQUNuQyxrQkFBa0IsbUJBQU8sQ0FBQyxzQ0FBWTtBQUN0QyxpQkFBaUIsbUJBQU8sQ0FBQyx1Q0FBVTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV1cm9uLWV4cG9ydGVyLXR5cGVzY3JpcHQvLi9oZWxwZXJzL2hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vbmV1cm9uLWV4cG9ydGVyLXR5cGVzY3JpcHQvLi9oZWxwZXJzL2luZGV4LnRzIiwid2VicGFjazovL25ldXJvbi1leHBvcnRlci10eXBlc2NyaXB0Ly4vaGVscGVycy9zdHJpbmdpZnlPdXRwdXQudHMiLCJ3ZWJwYWNrOi8vbmV1cm9uLWV4cG9ydGVyLXR5cGVzY3JpcHQvLi9zcmMvYnJhbmRzL2dldEJyYW5kSWQudHMiLCJ3ZWJwYWNrOi8vbmV1cm9uLWV4cG9ydGVyLXR5cGVzY3JpcHQvLi9zcmMvYnJhbmRzL2luZGV4LnRzIiwid2VicGFjazovL25ldXJvbi1leHBvcnRlci10eXBlc2NyaXB0Ly4vc3JjL2NvbW1lbnRhcnkvZmlsZUhlYWRlckNvbW1lbnQudHMiLCJ3ZWJwYWNrOi8vbmV1cm9uLWV4cG9ydGVyLXR5cGVzY3JpcHQvLi9zcmMvY29tbWVudGFyeS9ncm91cE5hbWVDb21tZW50LnRzIiwid2VicGFjazovL25ldXJvbi1leHBvcnRlci10eXBlc2NyaXB0Ly4vc3JjL2NvbW1lbnRhcnkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbmV1cm9uLWV4cG9ydGVyLXR5cGVzY3JpcHQvLi9zcmMvbmFtZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbmV1cm9uLWV4cG9ydGVyLXR5cGVzY3JpcHQvLi9zcmMvbmFtZXMvdmFyaWFibGVOYW1lLnRzIiwid2VicGFjazovL25ldXJvbi1leHBvcnRlci10eXBlc2NyaXB0Ly4vc3JjL3BheWxvYWRzL2NvbW1vblBheWxvYWRzLnRzIiwid2VicGFjazovL25ldXJvbi1leHBvcnRlci10eXBlc2NyaXB0Ly4vc3JjL3BheWxvYWRzL2luZGV4LnRzIiwid2VicGFjazovL25ldXJvbi1leHBvcnRlci10eXBlc2NyaXB0Ly4vc3JjL3ZhbHVlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9uZXVyb24tZXhwb3J0ZXItdHlwZXNjcmlwdC8uL3NyYy92YWx1ZXMvcmdiVG9Ic2wudHMiLCJ3ZWJwYWNrOi8vbmV1cm9uLWV4cG9ydGVyLXR5cGVzY3JpcHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV1cm9uLWV4cG9ydGVyLXR5cGVzY3JpcHQvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmV4cG9ydGVkRmlsZU5hbWUgPSBleHBvcnRzLmRhdGVOb3cgPSB2b2lkIDA7XG5jb25zdCBwYXlsb2Fkc18xID0gcmVxdWlyZShcIi4uL3NyYy9wYXlsb2Fkc1wiKTtcbi8qKlxuICogUmV0dXJuIGN1cnJlbnQgZGF0ZSBhbmQgdGltZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gY3VycmVudCBkYXRlIGFuZCB0aW1lXG4gKi9cbmNvbnN0IGRhdGVOb3cgPSAoKSA9PiB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgY29uc3QgdGltZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCk7XG4gICAgcmV0dXJuIGAke2RhdGV9ICR7dGltZX1gO1xufTtcbmV4cG9ydHMuZGF0ZU5vdyA9IGRhdGVOb3c7XG4vKipcbiAqIFJldHVybiBmaWxlIG5hbWUgd2l0aCBwYXRoIGFjY29yZGluZyB0eXBlIGFuZCBicmFuZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ310eXBlIC0gdHlwZSBvZiB0b2tlbiBncm91cFxuICogQHBhcmFtIHtzdHJpbmd9YnJhbmQgLSBOYW1lIG9mIGJyYW5kLiBFLmcuOiAwMSAtIFZJR29cbiAqIEByZXR1cm5zXG4gKi9cbmNvbnN0IGV4cG9ydGVkRmlsZU5hbWUgPSAodHlwZSwgYnJhbmQpID0+IHtcbiAgICBsZXQgZm9sZGVyID0gXCJcIjtcbiAgICBsZXQgZmlsZSA9IFwiXCI7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJjb2xvcnNcIjpcbiAgICAgICAgICAgIGZpbGUgPSBcIl9jb2xvcnMuc2Nzc1wiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtZWFzdXJlc1wiOlxuICAgICAgICAgICAgZmlsZSA9IFwiX21lYXN1cmVzLnNjc3NcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlIGhlYWRlciBjb21tZW50IEVSUk9SOiBmaWxlIHR5cGUgXFxcIlwiICsgdHlwZSArIFwiXFxcIiBkb2Vzbid0IGV4aXN0LlwiKTtcbiAgICAgICAgICAgIGZpbGUgPSBcIkVSUk9SXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgc3dpdGNoIChicmFuZCkge1xuICAgICAgICBjYXNlIHBheWxvYWRzXzEuYnJhbmROYW1lcy52aWdvOlxuICAgICAgICAgICAgZm9sZGVyID0gXCJ2aWdvXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBwYXlsb2Fkc18xLmJyYW5kTmFtZXMuY3BwOlxuICAgICAgICAgICAgZm9sZGVyID0gXCJjcHBcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHBheWxvYWRzXzEuYnJhbmROYW1lcy5rb29wOlxuICAgICAgICAgICAgZm9sZGVyID0gXCJrb29wXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSBoZWFkZXIgY29tbWVudCBFUlJPUjogQnJhbmQgbmFtZSBcXFwiXCIgKyBicmFuZCArIFwiXFxcIiBkb2Vzbid0IGV4aXN0LlwiKTtcbiAgICAgICAgICAgIGZpbGUgPSBcIkVSUk9SXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIGAke2ZvbGRlcn0vJHtmaWxlfWA7XG59O1xuZXhwb3J0cy5leHBvcnRlZEZpbGVOYW1lID0gZXhwb3J0ZWRGaWxlTmFtZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vc3RyaW5naWZ5T3V0cHV0XCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9oZWxwZXJzXCIpLCBleHBvcnRzKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zdHJpbmdpZnlPdXRwdXQgPSB2b2lkIDA7XG5jb25zdCBzdHJpbmdpZnlPdXRwdXQgPSAob2JqKSA9PiB7XG4gICAgbGV0IGNhY2hlID0gW107XG4gICAgY29uc3Qgc3RyID0gSlNPTi5zdHJpbmdpZnkob2JqLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoY2FjaGUgJiYgY2FjaGUuaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWNoZSA9PT0gbnVsbCB8fCBjYWNoZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2FjaGUucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0pO1xuICAgIGNhY2hlID0gbnVsbDtcbiAgICByZXR1cm4gc3RyO1xufTtcbmV4cG9ydHMuc3RyaW5naWZ5T3V0cHV0ID0gc3RyaW5naWZ5T3V0cHV0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBnZXRCcmFuZElkID0gKG5hbWUsIGJyYW5kcykgPT4ge1xuICAgIGNvbnN0IGJyYW5kT2JqZWN0ID0gYnJhbmRzLmZpbHRlcigoYnJhbmQpID0+IGJyYW5kLm5hbWUgPT09IG5hbWUpO1xuICAgIGlmIChicmFuZE9iamVjdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUjogYnJhbmQgd2l0aCBuYW1lIFxcXCJcIiArIG5hbWUgKyBcIlxcXCIgZG9lc24ndCBleGlzdCBpZCBkZXNpZ24gc3lzdGVtIVwiKTtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIHJldHVybiBicmFuZE9iamVjdFswXS5pZDtcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBnZXRCcmFuZElkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldEJyYW5kSWQgPSB2b2lkIDA7XG52YXIgZ2V0QnJhbmRJZF8xID0gcmVxdWlyZShcIi4vZ2V0QnJhbmRJZFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImdldEJyYW5kSWRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGdldEJyYW5kSWRfMS5kZWZhdWx0OyB9IH0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEdlbmVyYXRlcyBhIGhlYWRlciBjb21tZW50IGZvciBhIGdlbmVyYXRlZCBmaWxlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBicmFuZE5hbWUgLSBUaGUgY3VycmVudCBicmFuZCBuYW1lLlxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGdlbmVyYXRlZCBmaWxlLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBoZWFkZXIgY29tbWVudC5cbiAqL1xuY29uc3QgZmlsZUhlYWRlckNvbW1lbnQgPSAoYnJhbmROYW1lLCBmaWxlTmFtZSkgPT4gYFxyXG4gIC8qXHJcbiAgKiAke2ZpbGVOYW1lfSAtIGdlbmVyYXRlZCBmcm9tIFN1cGVybm92YSBieSBuZXVyb24gZXhwb3J0ZXIuXHJcbiAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgKiBcclxuICAqIGN1cnJlbnQgYnJhbmQ6ICR7YnJhbmROYW1lfVxyXG4gICovXHJcbiAgYDtcbmV4cG9ydHMuZGVmYXVsdCA9IGZpbGVIZWFkZXJDb21tZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5sZXQgcHJpbnRDb21tZW50ID0gZmFsc2U7XG5sZXQgZ3JvdXBOYW1lID0gJyc7XG4vKipcbiAqIEdlbmVyYXRlcyBhIGdyb3VwIG5hbWUgY29tbWVudCBpZiB0aGUgdG9rZW4gZ3JvdXAncyBwYXJlbnQgbmFtZSBjaGFuZ2VzLlxuICpcbiAqIEBwYXJhbSB7VG9rZW5Hcm91cH0gdG9rZW5Hcm91cCAtIFRoZSB0b2tlbiBncm91cCB0byBnZW5lcmF0ZSBhIGNvbW1lbnQgZm9yLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGdlbmVyYXRlZCBncm91cCBuYW1lIGNvbW1lbnQuXG4gKi9cbmNvbnN0IGdyb3VwTmFtZUNvbW1lbnQgPSAodG9rZW5Hcm91cCkgPT4ge1xuICAgIGlmICghdG9rZW5Hcm91cC5wYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBjb25zdCB7IHBhcmVudDogeyBuYW1lIH0gfSA9IHRva2VuR3JvdXA7XG4gICAgaWYgKG5hbWUgIT09IGdyb3VwTmFtZSkge1xuICAgICAgICBncm91cE5hbWUgPSBuYW1lO1xuICAgICAgICBwcmludENvbW1lbnQgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcHJpbnRDb21tZW50ID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBwcmludENvbW1lbnRcbiAgICAgICAgPyBgXHJcblxyXG4gIC8qIC0tLSAke2dyb3VwTmFtZX0gLS0tICovXHJcbmAgOiAnJztcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBncm91cE5hbWVDb21tZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdyb3VwTmFtZUNvbW1lbnQgPSBleHBvcnRzLmZpbGVIZWFkZXJDb21tZW50ID0gdm9pZCAwO1xudmFyIGZpbGVIZWFkZXJDb21tZW50XzEgPSByZXF1aXJlKFwiLi9maWxlSGVhZGVyQ29tbWVudFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImZpbGVIZWFkZXJDb21tZW50XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmaWxlSGVhZGVyQ29tbWVudF8xLmRlZmF1bHQ7IH0gfSk7XG52YXIgZ3JvdXBOYW1lQ29tbWVudF8xID0gcmVxdWlyZShcIi4vZ3JvdXBOYW1lQ29tbWVudFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImdyb3VwTmFtZUNvbW1lbnRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGdyb3VwTmFtZUNvbW1lbnRfMS5kZWZhdWx0OyB9IH0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnZhcmlhYmxlTmFtZSA9IHZvaWQgMDtcbnZhciB2YXJpYWJsZU5hbWVfMSA9IHJlcXVpcmUoXCIuL3ZhcmlhYmxlTmFtZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInZhcmlhYmxlTmFtZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdmFyaWFibGVOYW1lXzEuZGVmYXVsdDsgfSB9KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcGF5bG9hZHNfMSA9IHJlcXVpcmUoXCIuLi9wYXlsb2Fkc1wiKTtcbmNvbnN0IHJlcGxhY2VJZkNvbnRhaW5zID0gKHNvdXJjZSwgcmVwbGFjZUZyb20sIHJlcGxhY2VUbykgPT4ge1xuICAgIGlmIChzb3VyY2UuaW5jbHVkZXMocmVwbGFjZUZyb20pKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UucmVwbGFjZShyZXBsYWNlRnJvbSwgcmVwbGFjZVRvKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbn07XG5jb25zdCByZXBsYWNlTGFzdE9uZSA9IChkZWZpbml0aW9uLCBzb3VyY2UpID0+IHtcbiAgICBpZiAoZGVmaW5pdGlvbi5zb21lKChpdGVtKSA9PiBzb3VyY2UuaW5jbHVkZXMoaXRlbSkpKSB7XG4gICAgICAgIHJldHVybiBgLSR7c291cmNlfWA7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG59O1xuLyoqXG4gKiBHZW5lcmF0ZXMgYSB2YXJpYWJsZSBuYW1lIGJ5IGNvbWJpbmluZyBwcmVmaXhlcywgdG9rZW4gaW5mb3JtYXRpb24sIGFuZCB0b2tlbiBncm91cCBwYXRoLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXggLSBUaGUgcHJlZml4IHRvIHByZXBlbmQgdG8gdGhlIGdlbmVyYXRlZCBuYW1lLlxuICogQHBhcmFtIHtUb2tlbn0gdG9rZW4gLSBUaGUgdG9rZW4gdG8gZXh0cmFjdCBpbmZvcm1hdGlvbiBmcm9tLlxuICogQHBhcmFtIHtUb2tlbkdyb3VwfSB0b2tlbkdyb3VwIC0gVGhlIHRva2VuIGdyb3VwIHRvIGV4dHJhY3QgcGF0aCBhbmQgbmFtZSBpbmZvcm1hdGlvbiBmcm9tLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGdlbmVyYXRlZCB2YXJpYWJsZSBuYW1lLlxuICovXG5jb25zdCB2YXJpYWJsZU5hbWUgPSAocHJlZml4LCB0b2tlbiwgdG9rZW5Hcm91cCkgPT4ge1xuICAgIC8vIENyZWF0ZSBhcnJheSB3aXRoIGFsbCBwYXRoIHNlZ21lbnRzIGFuZCB0b2tlbiBuYW1lIGF0IHRoZSBlbmRcbiAgICBjb25zdCBzZWdtZW50cyA9IFsuLi50b2tlbkdyb3VwLnBhdGhdO1xuICAgIGlmICghdG9rZW5Hcm91cC5pc1Jvb3QpIHtcbiAgICAgICAgc2VnbWVudHMucHVzaCh0b2tlbkdyb3VwLm5hbWUpO1xuICAgIH1cbiAgICBzZWdtZW50cy5wdXNoKHRva2VuLm5hbWUpO1xuICAgIHNlZ21lbnRzW3NlZ21lbnRzLmxlbmd0aCAtIDFdID0gcmVwbGFjZUxhc3RPbmUocGF5bG9hZHNfMS5hY3Rpb25zTmFtZURlZmluaXRpb24sIHNlZ21lbnRzW3NlZ21lbnRzLmxlbmd0aCAtIDFdKTtcbiAgICAvLyBDcmVhdGUgc3RyaW5nIGZyb20gc2VudGVuY2UgYXJyYXkgYW5kIHNlcGFyYXRlIGl0IGJhIFwiLVwiIHN5bWJvbC5cbiAgICBsZXQgc2VwYXJhdGVkTmFtZSA9IHNlZ21lbnRzLmpvaW4oXCItXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgLy8gSWYgdGhlIGdyb3VwIGNvbnRhaW5zIHNwYWNlIHJlbW92ZSBpdC5cbiAgICBjb25zdCBmaW5hbFJlc3VsdCA9IHNlcGFyYXRlZE5hbWUucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICAgIHJldHVybiBgJHtwcmVmaXh9LSR7ZmluYWxSZXN1bHR9YDtcbn07XG5leHBvcnRzLmRlZmF1bHQgPSB2YXJpYWJsZU5hbWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3VycmVudEV4cG9ydGVyVmVyc2lvbiA9IGV4cG9ydHMuYnJhbmROYW1lcyA9IGV4cG9ydHMuYnJhbmRJZHMgPSBleHBvcnRzLmFjdGlvbnNOYW1lRGVmaW5pdGlvbiA9IGV4cG9ydHMuY2F0ZWdvcnlQcmVmaXhlcyA9IHZvaWQgMDtcbmNvbnN0IGV4cG9ydGVyX2pzb25fMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9leHBvcnRlci5qc29uXCIpO1xuLyoqXG4gKiBQcmVmaXhlcyBmb3IgdGhlIHRva2VuIGNhdGVnb3J5LlxuICogT25seSBjb2xvciBhbmQgbWVhc3VyZSBpcyBpbXBsZW1lbnRlZCBub3cuIFdlIG5lZWQgb25seSBjb2xvciBhbmQgbWVhc3VyZSBub3cuXG4gKi9cbmV4cG9ydHMuY2F0ZWdvcnlQcmVmaXhlcyA9IHtcbiAgICBjb2xvclRva2VuUHJlZml4OiBcImNvbG9yXCIsXG4gICAgbWVhc3VyZVRva2VuUHJlZml4OiBcIm1lYXN1cmVcIixcbn07XG5leHBvcnRzLmFjdGlvbnNOYW1lRGVmaW5pdGlvbiA9IFtcbiAgICBcImhvdmVyXCIsXG4gICAgXCJkZWZhdWx0XCIsXG4gICAgXCJhY3RpdmVcIixcbiAgICBcImRpc2FibGVkXCIsXG4gICAgXCJlbXBoYXNpemVkXCIsXG4gICAgXCJtdXRlZFwiLFxuICAgIFwiY29udHJhc3RcIixcbiAgICBcInN1Y2Nlc3NcIixcbiAgICBcImRhbmdlclwiLFxuICAgIFwid2FybmluZ1wiLFxuICAgIFwiaW5mb1wiLFxuICAgIFwibmVnYXRpdmVcIixcbiAgICBcImJhc2VcIixcbiAgICBcInRpbnlcIixcbiAgICBcInNtYWxsXCIsXG4gICAgXCJtZWRpdW1cIixcbiAgICBcImxhcmdlXCIsXG4gICAgXCJleHRyYS1sYXJnZVwiLFxuICAgIFwiaHVnZVwiLFxuICAgIFwiZnVsbFwiLFxuICAgIFwibm9uZVwiLFxuXTtcbi8qKlxuICogRGVmaW5pdGlvbiBvZiB0aGUgYnJhbmRzICh0aGVtZSkgcGVyc2lzdGVudElkcy5cbiAqL1xuZXhwb3J0cy5icmFuZElkcyA9IHtcbiAgICB2aWdvOiBcIjNlOWNjNGQ3LWEyMTctNDU2Mi05NTQzLWUyOTExMzBlMzI0ZFwiLFxuICAgIGNwcDogXCIyODg2NmIzMC0wYWNmLTExZWUtODYwZS04ZDM4YzYyNWI5MTRcIixcbiAgICBrb29wOiBcIjFlMjQyZjYwLTBhY2YtMTFlZS05MjgwLTU1YTlkNjljNDFjYVwiLFxufTtcbmV4cG9ydHMuYnJhbmROYW1lcyA9IHtcbiAgICB2aWdvOiBcIjAxIC0gVklHb1wiLFxuICAgIGNwcDogXCIwMiAtIENQUFwiLFxuICAgIGtvb3A6IFwiMDMgLSBLb29wXCIsXG59O1xuLyoqXG4gKiBDdXJyZW50IGV4cG9ydGVyIHZlcnNpb24uXG4gKi9cbmV4cG9ydHMuY3VycmVudEV4cG9ydGVyVmVyc2lvbiA9IGV4cG9ydGVyX2pzb25fMS52ZXJzaW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9jb21tb25QYXlsb2Fkc1wiKSwgZXhwb3J0cyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmdiVG9Ic2wgPSB2b2lkIDA7XG52YXIgcmdiVG9Ic2xfMSA9IHJlcXVpcmUoXCIuL3JnYlRvSHNsXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicmdiVG9Ic2xcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJnYlRvSHNsXzEuZGVmYXVsdDsgfSB9KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBodWUgdmFsdWUgZm9yIHRoZSBIU0wgY29sb3Igc3BhY2UgYmFzZWQgb24gdGhlIFJHQiB2YWx1ZXMuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGRlbHRhIC0gVGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgbWF4aW11bSBhbmQgbWluaW11bSBSR0IgdmFsdWVzLlxuICogQHBhcmFtIHtudW1iZXJ9IGNtYXggLSBUaGUgbWF4aW11bSBSR0IgdmFsdWUgYW1vbmcgciwgZywgYW5kIGIuXG4gKiBAcGFyYW0ge251bWJlcn0gciAtIFRoZSByZWQgY29tcG9uZW50IG9mIHRoZSBSR0IgY29sb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gZyAtIFRoZSBncmVlbiBjb21wb25lbnQgb2YgdGhlIFJHQiBjb2xvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiIC0gVGhlIGJsdWUgY29tcG9uZW50IG9mIHRoZSBSR0IgY29sb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgY2FsY3VsYXRlZCBodWUgdmFsdWUgaW4gZGVncmVlcyBbMCwgMzYwKS5cbiAqL1xuY29uc3QgY2FsY3VsYXRlSHVlID0gKGRlbHRhLCBjbWF4LCByLCBnLCBiKSA9PiB7XG4gICAgbGV0IHJlc3VsdCA9IDA7XG4gICAgLy8gbm8gZGVmZXJlbmNlXG4gICAgaWYgKGRlbHRhID09PSAwKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBpZiAoY21heCA9PT0gcikge1xuICAgICAgICByZXN1bHQgPSAoKGcgLSBiKSAvIGRlbHRhKSAlIDY7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNtYXggPT09IGcpIHtcbiAgICAgICAgcmVzdWx0ID0gKGIgLSByKSAvIGRlbHRhICsgMjtcbiAgICB9XG4gICAgZWxzZSBpZiAoY21heCA9PT0gYikge1xuICAgICAgICByZXN1bHQgPSAociAtIGcpIC8gZGVsdGEgKyA0O1xuICAgIH1cbiAgICBjb25zdCByb3VuZGVkID0gTWF0aC5yb3VuZChyZXN1bHQgKiA2MCk7XG4gICAgaWYgKHJvdW5kZWQgPCAwKSB7XG4gICAgICAgIHJldHVybiByb3VuZGVkICsgMzYwO1xuICAgIH1cbiAgICByZXR1cm4gcm91bmRlZDtcbn07XG5jb25zdCBzdHJpbmdIU0wgPSAoaHVlLCBzYXR1cmF0aW9uLCBsaWdodG5lc3MpID0+IGBoc2woJHtodWV9LCAke01hdGgucm91bmQoc2F0dXJhdGlvbil9JSwgJHtNYXRoLnJvdW5kKGxpZ2h0bmVzcyl9JSlgO1xuY29uc3Qgc3RyaW5nSFNMQSA9IChodWUsIHNhdHVyYXRpb24sIGxpZ2h0bmVzcywgYWxwaGEpID0+IGBoc2xhKCR7aHVlfSwgJHtNYXRoLnJvdW5kKHNhdHVyYXRpb24pfSUsICR7TWF0aC5yb3VuZChsaWdodG5lc3MpfSUsICR7TWF0aC5yb3VuZChhbHBoYSAqIDEwKSAvIDEwfSlgO1xuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsaWdodG5lc3MgdmFsdWUgZm9yIHRoZSBIU0wgY29sb3Igc3BhY2UuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGNtYXggLSBUaGUgbWF4aW11bSBSR0IgdmFsdWUgYW1vbmcgciwgZywgYW5kIGIuXG4gKiBAcGFyYW0ge251bWJlcn0gY21pbiAtIFRoZSBtaW5pbXVtIFJHQiB2YWx1ZSBhbW9uZyByLCBnLCBhbmQgYi5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBjYWxjdWxhdGVkIGxpZ2h0bmVzcyB2YWx1ZSBpbiB0aGUgcmFuZ2UgWzAsIDFdLlxuICovXG5jb25zdCBjYWxjdWxhdGVMaWdodG5lc3MgPSAoY21heCwgY21pbikgPT4gKGNtYXggKyBjbWluKSAvIDI7XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNhdHVyYXRpb24gdmFsdWUgZm9yIHRoZSBIU0wgY29sb3Igc3BhY2UuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGRlbHRhIC0gVGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgbWF4aW11bSBhbmQgbWluaW11bSBSR0IgdmFsdWVzLlxuICogQHBhcmFtIHtudW1iZXJ9IGxpZ2h0bmVzcyAtIFRoZSBjYWxjdWxhdGVkIGxpZ2h0bmVzcyB2YWx1ZS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBjYWxjdWxhdGVkIHNhdHVyYXRpb24gdmFsdWUgaW4gdGhlIHJhbmdlIFswLCAxXS5cbiAqL1xuY29uc3QgY2FsY3VsYXRlU2F0dXJhdGlvbiA9IChkZWx0YSwgbGlnaHRuZXNzKSA9PiBkZWx0YSA9PT0gMCA/IDAgOiBkZWx0YSAvICgxIC0gTWF0aC5hYnMoMiAqIGxpZ2h0bmVzcyAtIDEpKTtcbi8qKlxuICogQ29udmVydHMgYW4gUkdCIGNvbG9yIHRvIEhTTCBmb3JtYXQuXG4gKlxuICogQHBhcmFtIHtDb2xvclRva2VuVmFsdWV9IGNvbG9yIC0gVGhlIFJHQiBjb2xvciB0byBiZSBjb252ZXJ0ZWQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgSFNMIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBpbnB1dCBSR0IgY29sb3IuXG4gKi9cbmNvbnN0IHJnYlRvSHNsID0gKGNvbG9yKSA9PiB7XG4gICAgY29uc3QgeyByOiBfciwgZzogX2csIGI6IF9iLCBhOiBfYSB9ID0gY29sb3I7XG4gICAgY29uc3QgciA9IF9yIC8gMjU1O1xuICAgIGNvbnN0IGcgPSBfZyAvIDI1NTtcbiAgICBjb25zdCBiID0gX2IgLyAyNTU7XG4gICAgY29uc3QgYSA9IF9hIC8gMjU1O1xuICAgIGNvbnN0IGNtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICBjb25zdCBjbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG4gICAgY29uc3QgZGVsdGEgPSBjbWF4IC0gY21pbjtcbiAgICBjb25zdCBodWUgPSBjYWxjdWxhdGVIdWUoZGVsdGEsIGNtYXgsIHIsIGcsIGIpO1xuICAgIGNvbnN0IF9saWdodG5lc3MgPSBjYWxjdWxhdGVMaWdodG5lc3MoY21heCwgY21pbik7XG4gICAgY29uc3QgX3NhdHVyYXRpb24gPSBjYWxjdWxhdGVTYXR1cmF0aW9uKGRlbHRhLCBfbGlnaHRuZXNzKTtcbiAgICAvLyBNdWx0aXBseSBsaWdodG5lc3MgYW5kIHNhdHVyYXRpb24gYnkgMTAwXG4gICAgY29uc3QgbGlnaHRuZXNzID0gKyhfbGlnaHRuZXNzICogMTAwKS50b0ZpeGVkKDEpO1xuICAgIGNvbnN0IHNhdHVyYXRpb24gPSArKF9zYXR1cmF0aW9uICogMTAwKS50b0ZpeGVkKDEpO1xuICAgIC8vIElmIGNvbG9yIGhhcyBhbHBoYSAxIHJldHVuIEhTTCBhbmQgd2hlbiBzb21lIGFscGhhIGlzIGluY2x1ZGVkIHJldHVybiBIU0xBXG4gICAgcmV0dXJuIGEgPT09IDEgPyBzdHJpbmdIU0woaHVlLCBzYXR1cmF0aW9uLCBsaWdodG5lc3MpIDogc3RyaW5nSFNMQShodWUsIHNhdHVyYXRpb24sIGxpZ2h0bmVzcywgYSk7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gcmdiVG9Ic2w7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb21tZW50YXJ5XzEgPSByZXF1aXJlKFwiLi9jb21tZW50YXJ5XCIpO1xuY29uc3QgcGF5bG9hZHNfMSA9IHJlcXVpcmUoXCIuL3BheWxvYWRzXCIpO1xuY29uc3QgbmFtZXNfMSA9IHJlcXVpcmUoXCIuL25hbWVzXCIpO1xuY29uc3QgdmFsdWVzXzEgPSByZXF1aXJlKFwiLi92YWx1ZXNcIik7XG5jb25zdCBoZWxwZXJzXzEgPSByZXF1aXJlKFwiLi4vaGVscGVyc1wiKTtcbmNvbnN0IGJyYW5kc18xID0gcmVxdWlyZShcIi4vYnJhbmRzXCIpO1xuLy8gRnVuY3Rpb25zIHJlZ2lzdHJhdGlvbi5cblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKCd2YXJpYWJsZU5hbWUnLCBuYW1lc18xLnZhcmlhYmxlTmFtZSk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbignZmlsZUhlYWRlckNvbW1lbnQnLCBjb21tZW50YXJ5XzEuZmlsZUhlYWRlckNvbW1lbnQpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oJ2dyb3VwTmFtZUNvbW1lbnQnLCBjb21tZW50YXJ5XzEuZ3JvdXBOYW1lQ29tbWVudCk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbigncmdiVG9Ic2wnLCB2YWx1ZXNfMS5yZ2JUb0hzbCk7XG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbihcImRhdGVOb3dcIiwgaGVscGVyc18xLmRhdGVOb3cpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJnZXRCcmFuZElkXCIsIGJyYW5kc18xLmdldEJyYW5kSWQpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJleHBvcnRlZEZpbGVOYW1lXCIsIGhlbHBlcnNfMS5leHBvcnRlZEZpbGVOYW1lKTtcbi8vIFBheWxvYWRzIHJlZ2lzdHJhdGlvblxuUHVsc2FyLnJlZ2lzdGVyUGF5bG9hZCgnY2F0ZWdvcnlQcmVmaXhlcycsIHBheWxvYWRzXzEuY2F0ZWdvcnlQcmVmaXhlcyk7XG5QdWxzYXIucmVnaXN0ZXJQYXlsb2FkKCdhY3Rpb25zTmFtZURlZmluaXRpb24nLCBwYXlsb2Fkc18xLmFjdGlvbnNOYW1lRGVmaW5pdGlvbik7XG5QdWxzYXIucmVnaXN0ZXJQYXlsb2FkKCdicmFuZElkcycsIHBheWxvYWRzXzEuYnJhbmRJZHMpO1xuUHVsc2FyLnJlZ2lzdGVyUGF5bG9hZChcImN1cnJlbnRFeHBvcnRlclZlcnNpb25cIiwgcGF5bG9hZHNfMS5jdXJyZW50RXhwb3J0ZXJWZXJzaW9uKTtcblB1bHNhci5yZWdpc3RlclBheWxvYWQoXCJicmFuZE5hbWVzXCIsIHBheWxvYWRzXzEuYnJhbmROYW1lcyk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=