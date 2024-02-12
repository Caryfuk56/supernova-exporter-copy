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
    knz: "04 - KNZ",
    sus: "05 - SUS",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QscUJBQXFCLG1CQUFPLENBQUMsK0NBQWM7QUFDM0MsbUJBQW1CLG1CQUFPLENBQUMsMkNBQVk7QUFDdkMsZ0JBQWdCLG1CQUFPLENBQUMscUNBQVM7QUFDakMsaUJBQWlCLG1CQUFPLENBQUMsdUNBQVU7QUFDbkMsa0JBQWtCLG1CQUFPLENBQUMsc0NBQVk7QUFDdEMsaUJBQWlCLG1CQUFPLENBQUMsdUNBQVU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25ldXJvbi1leHBvcnRlci10eXBlc2NyaXB0Ly4vaGVscGVycy9oZWxwZXJzLnRzIiwid2VicGFjazovL25ldXJvbi1leHBvcnRlci10eXBlc2NyaXB0Ly4vaGVscGVycy9pbmRleC50cyIsIndlYnBhY2s6Ly9uZXVyb24tZXhwb3J0ZXItdHlwZXNjcmlwdC8uL2hlbHBlcnMvc3RyaW5naWZ5T3V0cHV0LnRzIiwid2VicGFjazovL25ldXJvbi1leHBvcnRlci10eXBlc2NyaXB0Ly4vc3JjL2JyYW5kcy9nZXRCcmFuZElkLnRzIiwid2VicGFjazovL25ldXJvbi1leHBvcnRlci10eXBlc2NyaXB0Ly4vc3JjL2JyYW5kcy9pbmRleC50cyIsIndlYnBhY2s6Ly9uZXVyb24tZXhwb3J0ZXItdHlwZXNjcmlwdC8uL3NyYy9jb21tZW50YXJ5L2ZpbGVIZWFkZXJDb21tZW50LnRzIiwid2VicGFjazovL25ldXJvbi1leHBvcnRlci10eXBlc2NyaXB0Ly4vc3JjL2NvbW1lbnRhcnkvZ3JvdXBOYW1lQ29tbWVudC50cyIsIndlYnBhY2s6Ly9uZXVyb24tZXhwb3J0ZXItdHlwZXNjcmlwdC8uL3NyYy9jb21tZW50YXJ5L2luZGV4LnRzIiwid2VicGFjazovL25ldXJvbi1leHBvcnRlci10eXBlc2NyaXB0Ly4vc3JjL25hbWVzL2luZGV4LnRzIiwid2VicGFjazovL25ldXJvbi1leHBvcnRlci10eXBlc2NyaXB0Ly4vc3JjL25hbWVzL3ZhcmlhYmxlTmFtZS50cyIsIndlYnBhY2s6Ly9uZXVyb24tZXhwb3J0ZXItdHlwZXNjcmlwdC8uL3NyYy9wYXlsb2Fkcy9jb21tb25QYXlsb2Fkcy50cyIsIndlYnBhY2s6Ly9uZXVyb24tZXhwb3J0ZXItdHlwZXNjcmlwdC8uL3NyYy9wYXlsb2Fkcy9pbmRleC50cyIsIndlYnBhY2s6Ly9uZXVyb24tZXhwb3J0ZXItdHlwZXNjcmlwdC8uL3NyYy92YWx1ZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbmV1cm9uLWV4cG9ydGVyLXR5cGVzY3JpcHQvLi9zcmMvdmFsdWVzL3JnYlRvSHNsLnRzIiwid2VicGFjazovL25ldXJvbi1leHBvcnRlci10eXBlc2NyaXB0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldXJvbi1leHBvcnRlci10eXBlc2NyaXB0Ly4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5leHBvcnRlZEZpbGVOYW1lID0gZXhwb3J0cy5kYXRlTm93ID0gdm9pZCAwO1xuY29uc3QgcGF5bG9hZHNfMSA9IHJlcXVpcmUoXCIuLi9zcmMvcGF5bG9hZHNcIik7XG4vKipcbiAqIFJldHVybiBjdXJyZW50IGRhdGUgYW5kIHRpbWUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtIGN1cnJlbnQgZGF0ZSBhbmQgdGltZVxuICovXG5jb25zdCBkYXRlTm93ID0gKCkgPT4ge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xuICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpO1xuICAgIHJldHVybiBgJHtkYXRlfSAke3RpbWV9YDtcbn07XG5leHBvcnRzLmRhdGVOb3cgPSBkYXRlTm93O1xuLyoqXG4gKiBSZXR1cm4gZmlsZSBuYW1lIHdpdGggcGF0aCBhY2NvcmRpbmcgdHlwZSBhbmQgYnJhbmQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9dHlwZSAtIHR5cGUgb2YgdG9rZW4gZ3JvdXBcbiAqIEBwYXJhbSB7c3RyaW5nfWJyYW5kIC0gTmFtZSBvZiBicmFuZC4gRS5nLjogMDEgLSBWSUdvXG4gKiBAcmV0dXJuc1xuICovXG5jb25zdCBleHBvcnRlZEZpbGVOYW1lID0gKHR5cGUsIGJyYW5kKSA9PiB7XG4gICAgbGV0IGZvbGRlciA9IFwiXCI7XG4gICAgbGV0IGZpbGUgPSBcIlwiO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiY29sb3JzXCI6XG4gICAgICAgICAgICBmaWxlID0gXCJfY29sb3JzLnNjc3NcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibWVhc3VyZXNcIjpcbiAgICAgICAgICAgIGZpbGUgPSBcIl9tZWFzdXJlcy5zY3NzXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSBoZWFkZXIgY29tbWVudCBFUlJPUjogZmlsZSB0eXBlIFxcXCJcIiArIHR5cGUgKyBcIlxcXCIgZG9lc24ndCBleGlzdC5cIik7XG4gICAgICAgICAgICBmaWxlID0gXCJFUlJPUlwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHN3aXRjaCAoYnJhbmQpIHtcbiAgICAgICAgY2FzZSBwYXlsb2Fkc18xLmJyYW5kTmFtZXMudmlnbzpcbiAgICAgICAgICAgIGZvbGRlciA9IFwidmlnb1wiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgcGF5bG9hZHNfMS5icmFuZE5hbWVzLmNwcDpcbiAgICAgICAgICAgIGZvbGRlciA9IFwiY3BwXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBwYXlsb2Fkc18xLmJyYW5kTmFtZXMua29vcDpcbiAgICAgICAgICAgIGZvbGRlciA9IFwia29vcFwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbGUgaGVhZGVyIGNvbW1lbnQgRVJST1I6IEJyYW5kIG5hbWUgXFxcIlwiICsgYnJhbmQgKyBcIlxcXCIgZG9lc24ndCBleGlzdC5cIik7XG4gICAgICAgICAgICBmaWxlID0gXCJFUlJPUlwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBgJHtmb2xkZXJ9LyR7ZmlsZX1gO1xufTtcbmV4cG9ydHMuZXhwb3J0ZWRGaWxlTmFtZSA9IGV4cG9ydGVkRmlsZU5hbWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3N0cmluZ2lmeU91dHB1dFwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vaGVscGVyc1wiKSwgZXhwb3J0cyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc3RyaW5naWZ5T3V0cHV0ID0gdm9pZCAwO1xuY29uc3Qgc3RyaW5naWZ5T3V0cHV0ID0gKG9iaikgPT4ge1xuICAgIGxldCBjYWNoZSA9IFtdO1xuICAgIGNvbnN0IHN0ciA9IEpTT04uc3RyaW5naWZ5KG9iaiwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGNhY2hlICYmIGNhY2hlLmluZGV4T2YodmFsdWUpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FjaGUgPT09IG51bGwgfHwgY2FjaGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNhY2hlLnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KTtcbiAgICBjYWNoZSA9IG51bGw7XG4gICAgcmV0dXJuIHN0cjtcbn07XG5leHBvcnRzLnN0cmluZ2lmeU91dHB1dCA9IHN0cmluZ2lmeU91dHB1dDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZ2V0QnJhbmRJZCA9IChuYW1lLCBicmFuZHMpID0+IHtcbiAgICBjb25zdCBicmFuZE9iamVjdCA9IGJyYW5kcy5maWx0ZXIoKGJyYW5kKSA9PiBicmFuZC5uYW1lID09PSBuYW1lKTtcbiAgICBpZiAoYnJhbmRPYmplY3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1I6IGJyYW5kIHdpdGggbmFtZSBcXFwiXCIgKyBuYW1lICsgXCJcXFwiIGRvZXNuJ3QgZXhpc3QgaWQgZGVzaWduIHN5c3RlbSFcIik7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgICByZXR1cm4gYnJhbmRPYmplY3RbMF0uaWQ7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0QnJhbmRJZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRCcmFuZElkID0gdm9pZCAwO1xudmFyIGdldEJyYW5kSWRfMSA9IHJlcXVpcmUoXCIuL2dldEJyYW5kSWRcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJnZXRCcmFuZElkXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBnZXRCcmFuZElkXzEuZGVmYXVsdDsgfSB9KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBHZW5lcmF0ZXMgYSBoZWFkZXIgY29tbWVudCBmb3IgYSBnZW5lcmF0ZWQgZmlsZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYnJhbmROYW1lIC0gVGhlIGN1cnJlbnQgYnJhbmQgbmFtZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBnZW5lcmF0ZWQgZmlsZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgaGVhZGVyIGNvbW1lbnQuXG4gKi9cbmNvbnN0IGZpbGVIZWFkZXJDb21tZW50ID0gKGJyYW5kTmFtZSwgZmlsZU5hbWUpID0+IGBcclxuICAvKlxyXG4gICogJHtmaWxlTmFtZX0gLSBnZW5lcmF0ZWQgZnJvbSBTdXBlcm5vdmEgYnkgbmV1cm9uIGV4cG9ydGVyLlxyXG4gICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICogXHJcbiAgKiBjdXJyZW50IGJyYW5kOiAke2JyYW5kTmFtZX1cclxuICAqL1xyXG4gIGA7XG5leHBvcnRzLmRlZmF1bHQgPSBmaWxlSGVhZGVyQ29tbWVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xubGV0IHByaW50Q29tbWVudCA9IGZhbHNlO1xubGV0IGdyb3VwTmFtZSA9ICcnO1xuLyoqXG4gKiBHZW5lcmF0ZXMgYSBncm91cCBuYW1lIGNvbW1lbnQgaWYgdGhlIHRva2VuIGdyb3VwJ3MgcGFyZW50IG5hbWUgY2hhbmdlcy5cbiAqXG4gKiBAcGFyYW0ge1Rva2VuR3JvdXB9IHRva2VuR3JvdXAgLSBUaGUgdG9rZW4gZ3JvdXAgdG8gZ2VuZXJhdGUgYSBjb21tZW50IGZvci5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBnZW5lcmF0ZWQgZ3JvdXAgbmFtZSBjb21tZW50LlxuICovXG5jb25zdCBncm91cE5hbWVDb21tZW50ID0gKHRva2VuR3JvdXApID0+IHtcbiAgICBpZiAoIXRva2VuR3JvdXAucGFyZW50KSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgY29uc3QgeyBwYXJlbnQ6IHsgbmFtZSB9IH0gPSB0b2tlbkdyb3VwO1xuICAgIGlmIChuYW1lICE9PSBncm91cE5hbWUpIHtcbiAgICAgICAgZ3JvdXBOYW1lID0gbmFtZTtcbiAgICAgICAgcHJpbnRDb21tZW50ID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHByaW50Q29tbWVudCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gcHJpbnRDb21tZW50XG4gICAgICAgID8gYFxyXG5cclxuICAvKiAtLS0gJHtncm91cE5hbWV9IC0tLSAqL1xyXG5gIDogJyc7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZ3JvdXBOYW1lQ29tbWVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5ncm91cE5hbWVDb21tZW50ID0gZXhwb3J0cy5maWxlSGVhZGVyQ29tbWVudCA9IHZvaWQgMDtcbnZhciBmaWxlSGVhZGVyQ29tbWVudF8xID0gcmVxdWlyZShcIi4vZmlsZUhlYWRlckNvbW1lbnRcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJmaWxlSGVhZGVyQ29tbWVudFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmlsZUhlYWRlckNvbW1lbnRfMS5kZWZhdWx0OyB9IH0pO1xudmFyIGdyb3VwTmFtZUNvbW1lbnRfMSA9IHJlcXVpcmUoXCIuL2dyb3VwTmFtZUNvbW1lbnRcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJncm91cE5hbWVDb21tZW50XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBncm91cE5hbWVDb21tZW50XzEuZGVmYXVsdDsgfSB9KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy52YXJpYWJsZU5hbWUgPSB2b2lkIDA7XG52YXIgdmFyaWFibGVOYW1lXzEgPSByZXF1aXJlKFwiLi92YXJpYWJsZU5hbWVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ2YXJpYWJsZU5hbWVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZhcmlhYmxlTmFtZV8xLmRlZmF1bHQ7IH0gfSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHBheWxvYWRzXzEgPSByZXF1aXJlKFwiLi4vcGF5bG9hZHNcIik7XG5jb25zdCByZXBsYWNlSWZDb250YWlucyA9IChzb3VyY2UsIHJlcGxhY2VGcm9tLCByZXBsYWNlVG8pID0+IHtcbiAgICBpZiAoc291cmNlLmluY2x1ZGVzKHJlcGxhY2VGcm9tKSkge1xuICAgICAgICByZXR1cm4gc291cmNlLnJlcGxhY2UocmVwbGFjZUZyb20sIHJlcGxhY2VUbyk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG59O1xuY29uc3QgcmVwbGFjZUxhc3RPbmUgPSAoZGVmaW5pdGlvbiwgc291cmNlKSA9PiB7XG4gICAgaWYgKGRlZmluaXRpb24uc29tZSgoaXRlbSkgPT4gc291cmNlLmluY2x1ZGVzKGl0ZW0pKSkge1xuICAgICAgICByZXR1cm4gYC0ke3NvdXJjZX1gO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xufTtcbi8qKlxuICogR2VuZXJhdGVzIGEgdmFyaWFibGUgbmFtZSBieSBjb21iaW5pbmcgcHJlZml4ZXMsIHRva2VuIGluZm9ybWF0aW9uLCBhbmQgdG9rZW4gZ3JvdXAgcGF0aC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IC0gVGhlIHByZWZpeCB0byBwcmVwZW5kIHRvIHRoZSBnZW5lcmF0ZWQgbmFtZS5cbiAqIEBwYXJhbSB7VG9rZW59IHRva2VuIC0gVGhlIHRva2VuIHRvIGV4dHJhY3QgaW5mb3JtYXRpb24gZnJvbS5cbiAqIEBwYXJhbSB7VG9rZW5Hcm91cH0gdG9rZW5Hcm91cCAtIFRoZSB0b2tlbiBncm91cCB0byBleHRyYWN0IHBhdGggYW5kIG5hbWUgaW5mb3JtYXRpb24gZnJvbS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBnZW5lcmF0ZWQgdmFyaWFibGUgbmFtZS5cbiAqL1xuY29uc3QgdmFyaWFibGVOYW1lID0gKHByZWZpeCwgdG9rZW4sIHRva2VuR3JvdXApID0+IHtcbiAgICAvLyBDcmVhdGUgYXJyYXkgd2l0aCBhbGwgcGF0aCBzZWdtZW50cyBhbmQgdG9rZW4gbmFtZSBhdCB0aGUgZW5kXG4gICAgY29uc3Qgc2VnbWVudHMgPSBbLi4udG9rZW5Hcm91cC5wYXRoXTtcbiAgICBpZiAoIXRva2VuR3JvdXAuaXNSb290KSB7XG4gICAgICAgIHNlZ21lbnRzLnB1c2godG9rZW5Hcm91cC5uYW1lKTtcbiAgICB9XG4gICAgc2VnbWVudHMucHVzaCh0b2tlbi5uYW1lKTtcbiAgICBzZWdtZW50c1tzZWdtZW50cy5sZW5ndGggLSAxXSA9IHJlcGxhY2VMYXN0T25lKHBheWxvYWRzXzEuYWN0aW9uc05hbWVEZWZpbml0aW9uLCBzZWdtZW50c1tzZWdtZW50cy5sZW5ndGggLSAxXSk7XG4gICAgLy8gQ3JlYXRlIHN0cmluZyBmcm9tIHNlbnRlbmNlIGFycmF5IGFuZCBzZXBhcmF0ZSBpdCBiYSBcIi1cIiBzeW1ib2wuXG4gICAgbGV0IHNlcGFyYXRlZE5hbWUgPSBzZWdtZW50cy5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpO1xuICAgIC8vIElmIHRoZSBncm91cCBjb250YWlucyBzcGFjZSByZW1vdmUgaXQuXG4gICAgY29uc3QgZmluYWxSZXN1bHQgPSBzZXBhcmF0ZWROYW1lLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICByZXR1cm4gYCR7cHJlZml4fS0ke2ZpbmFsUmVzdWx0fWA7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gdmFyaWFibGVOYW1lO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmN1cnJlbnRFeHBvcnRlclZlcnNpb24gPSBleHBvcnRzLmJyYW5kTmFtZXMgPSBleHBvcnRzLmJyYW5kSWRzID0gZXhwb3J0cy5hY3Rpb25zTmFtZURlZmluaXRpb24gPSBleHBvcnRzLmNhdGVnb3J5UHJlZml4ZXMgPSB2b2lkIDA7XG5jb25zdCBleHBvcnRlcl9qc29uXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vZXhwb3J0ZXIuanNvblwiKTtcbi8qKlxuICogUHJlZml4ZXMgZm9yIHRoZSB0b2tlbiBjYXRlZ29yeS5cbiAqIE9ubHkgY29sb3IgYW5kIG1lYXN1cmUgaXMgaW1wbGVtZW50ZWQgbm93LiBXZSBuZWVkIG9ubHkgY29sb3IgYW5kIG1lYXN1cmUgbm93LlxuICovXG5leHBvcnRzLmNhdGVnb3J5UHJlZml4ZXMgPSB7XG4gICAgY29sb3JUb2tlblByZWZpeDogXCJjb2xvclwiLFxuICAgIG1lYXN1cmVUb2tlblByZWZpeDogXCJtZWFzdXJlXCIsXG59O1xuZXhwb3J0cy5hY3Rpb25zTmFtZURlZmluaXRpb24gPSBbXG4gICAgXCJob3ZlclwiLFxuICAgIFwiZGVmYXVsdFwiLFxuICAgIFwiYWN0aXZlXCIsXG4gICAgXCJkaXNhYmxlZFwiLFxuICAgIFwiZW1waGFzaXplZFwiLFxuICAgIFwibXV0ZWRcIixcbiAgICBcImNvbnRyYXN0XCIsXG4gICAgXCJzdWNjZXNzXCIsXG4gICAgXCJkYW5nZXJcIixcbiAgICBcIndhcm5pbmdcIixcbiAgICBcImluZm9cIixcbiAgICBcIm5lZ2F0aXZlXCIsXG4gICAgXCJiYXNlXCIsXG4gICAgXCJ0aW55XCIsXG4gICAgXCJzbWFsbFwiLFxuICAgIFwibWVkaXVtXCIsXG4gICAgXCJsYXJnZVwiLFxuICAgIFwiZXh0cmEtbGFyZ2VcIixcbiAgICBcImh1Z2VcIixcbiAgICBcImZ1bGxcIixcbiAgICBcIm5vbmVcIixcbl07XG4vKipcbiAqIERlZmluaXRpb24gb2YgdGhlIGJyYW5kcyAodGhlbWUpIHBlcnNpc3RlbnRJZHMuXG4gKi9cbmV4cG9ydHMuYnJhbmRJZHMgPSB7XG4gICAgdmlnbzogXCIzZTljYzRkNy1hMjE3LTQ1NjItOTU0My1lMjkxMTMwZTMyNGRcIixcbiAgICBjcHA6IFwiMjg4NjZiMzAtMGFjZi0xMWVlLTg2MGUtOGQzOGM2MjViOTE0XCIsXG4gICAga29vcDogXCIxZTI0MmY2MC0wYWNmLTExZWUtOTI4MC01NWE5ZDY5YzQxY2FcIixcbn07XG5leHBvcnRzLmJyYW5kTmFtZXMgPSB7XG4gICAgdmlnbzogXCIwMSAtIFZJR29cIixcbiAgICBjcHA6IFwiMDIgLSBDUFBcIixcbiAgICBrb29wOiBcIjAzIC0gS29vcFwiLFxuICAgIGtuejogXCIwNCAtIEtOWlwiLFxuICAgIHN1czogXCIwNSAtIFNVU1wiLFxufTtcbi8qKlxuICogQ3VycmVudCBleHBvcnRlciB2ZXJzaW9uLlxuICovXG5leHBvcnRzLmN1cnJlbnRFeHBvcnRlclZlcnNpb24gPSBleHBvcnRlcl9qc29uXzEudmVyc2lvbjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vY29tbW9uUGF5bG9hZHNcIiksIGV4cG9ydHMpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJnYlRvSHNsID0gdm9pZCAwO1xudmFyIHJnYlRvSHNsXzEgPSByZXF1aXJlKFwiLi9yZ2JUb0hzbFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInJnYlRvSHNsXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZ2JUb0hzbF8xLmRlZmF1bHQ7IH0gfSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgaHVlIHZhbHVlIGZvciB0aGUgSFNMIGNvbG9yIHNwYWNlIGJhc2VkIG9uIHRoZSBSR0IgdmFsdWVzLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWx0YSAtIFRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIG1heGltdW0gYW5kIG1pbmltdW0gUkdCIHZhbHVlcy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBjbWF4IC0gVGhlIG1heGltdW0gUkdCIHZhbHVlIGFtb25nIHIsIGcsIGFuZCBiLlxuICogQHBhcmFtIHtudW1iZXJ9IHIgLSBUaGUgcmVkIGNvbXBvbmVudCBvZiB0aGUgUkdCIGNvbG9yLlxuICogQHBhcmFtIHtudW1iZXJ9IGcgLSBUaGUgZ3JlZW4gY29tcG9uZW50IG9mIHRoZSBSR0IgY29sb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gYiAtIFRoZSBibHVlIGNvbXBvbmVudCBvZiB0aGUgUkdCIGNvbG9yLlxuICogQHJldHVybnMge251bWJlcn0gVGhlIGNhbGN1bGF0ZWQgaHVlIHZhbHVlIGluIGRlZ3JlZXMgWzAsIDM2MCkuXG4gKi9cbmNvbnN0IGNhbGN1bGF0ZUh1ZSA9IChkZWx0YSwgY21heCwgciwgZywgYikgPT4ge1xuICAgIGxldCByZXN1bHQgPSAwO1xuICAgIC8vIG5vIGRlZmVyZW5jZVxuICAgIGlmIChkZWx0YSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKGNtYXggPT09IHIpIHtcbiAgICAgICAgcmVzdWx0ID0gKChnIC0gYikgLyBkZWx0YSkgJSA2O1xuICAgIH1cbiAgICBlbHNlIGlmIChjbWF4ID09PSBnKSB7XG4gICAgICAgIHJlc3VsdCA9IChiIC0gcikgLyBkZWx0YSArIDI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNtYXggPT09IGIpIHtcbiAgICAgICAgcmVzdWx0ID0gKHIgLSBnKSAvIGRlbHRhICsgNDtcbiAgICB9XG4gICAgY29uc3Qgcm91bmRlZCA9IE1hdGgucm91bmQocmVzdWx0ICogNjApO1xuICAgIGlmIChyb3VuZGVkIDwgMCkge1xuICAgICAgICByZXR1cm4gcm91bmRlZCArIDM2MDtcbiAgICB9XG4gICAgcmV0dXJuIHJvdW5kZWQ7XG59O1xuY29uc3Qgc3RyaW5nSFNMID0gKGh1ZSwgc2F0dXJhdGlvbiwgbGlnaHRuZXNzKSA9PiBgaHNsKCR7aHVlfSwgJHtNYXRoLnJvdW5kKHNhdHVyYXRpb24pfSUsICR7TWF0aC5yb3VuZChsaWdodG5lc3MpfSUpYDtcbmNvbnN0IHN0cmluZ0hTTEEgPSAoaHVlLCBzYXR1cmF0aW9uLCBsaWdodG5lc3MsIGFscGhhKSA9PiBgaHNsYSgke2h1ZX0sICR7TWF0aC5yb3VuZChzYXR1cmF0aW9uKX0lLCAke01hdGgucm91bmQobGlnaHRuZXNzKX0lLCAke01hdGgucm91bmQoYWxwaGEgKiAxMCkgLyAxMH0pYDtcbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGlnaHRuZXNzIHZhbHVlIGZvciB0aGUgSFNMIGNvbG9yIHNwYWNlLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBjbWF4IC0gVGhlIG1heGltdW0gUkdCIHZhbHVlIGFtb25nIHIsIGcsIGFuZCBiLlxuICogQHBhcmFtIHtudW1iZXJ9IGNtaW4gLSBUaGUgbWluaW11bSBSR0IgdmFsdWUgYW1vbmcgciwgZywgYW5kIGIuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgY2FsY3VsYXRlZCBsaWdodG5lc3MgdmFsdWUgaW4gdGhlIHJhbmdlIFswLCAxXS5cbiAqL1xuY29uc3QgY2FsY3VsYXRlTGlnaHRuZXNzID0gKGNtYXgsIGNtaW4pID0+IChjbWF4ICsgY21pbikgLyAyO1xuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzYXR1cmF0aW9uIHZhbHVlIGZvciB0aGUgSFNMIGNvbG9yIHNwYWNlLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWx0YSAtIFRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIG1heGltdW0gYW5kIG1pbmltdW0gUkdCIHZhbHVlcy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBsaWdodG5lc3MgLSBUaGUgY2FsY3VsYXRlZCBsaWdodG5lc3MgdmFsdWUuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgY2FsY3VsYXRlZCBzYXR1cmF0aW9uIHZhbHVlIGluIHRoZSByYW5nZSBbMCwgMV0uXG4gKi9cbmNvbnN0IGNhbGN1bGF0ZVNhdHVyYXRpb24gPSAoZGVsdGEsIGxpZ2h0bmVzcykgPT4gZGVsdGEgPT09IDAgPyAwIDogZGVsdGEgLyAoMSAtIE1hdGguYWJzKDIgKiBsaWdodG5lc3MgLSAxKSk7XG4vKipcbiAqIENvbnZlcnRzIGFuIFJHQiBjb2xvciB0byBIU0wgZm9ybWF0LlxuICpcbiAqIEBwYXJhbSB7Q29sb3JUb2tlblZhbHVlfSBjb2xvciAtIFRoZSBSR0IgY29sb3IgdG8gYmUgY29udmVydGVkLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIEhTTCByZXByZXNlbnRhdGlvbiBvZiB0aGUgaW5wdXQgUkdCIGNvbG9yLlxuICovXG5jb25zdCByZ2JUb0hzbCA9IChjb2xvcikgPT4ge1xuICAgIGNvbnN0IHsgcjogX3IsIGc6IF9nLCBiOiBfYiwgYTogX2EgfSA9IGNvbG9yO1xuICAgIGNvbnN0IHIgPSBfciAvIDI1NTtcbiAgICBjb25zdCBnID0gX2cgLyAyNTU7XG4gICAgY29uc3QgYiA9IF9iIC8gMjU1O1xuICAgIGNvbnN0IGEgPSBfYSAvIDI1NTtcbiAgICBjb25zdCBjbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gICAgY29uc3QgY21heCA9IE1hdGgubWF4KHIsIGcsIGIpO1xuICAgIGNvbnN0IGRlbHRhID0gY21heCAtIGNtaW47XG4gICAgY29uc3QgaHVlID0gY2FsY3VsYXRlSHVlKGRlbHRhLCBjbWF4LCByLCBnLCBiKTtcbiAgICBjb25zdCBfbGlnaHRuZXNzID0gY2FsY3VsYXRlTGlnaHRuZXNzKGNtYXgsIGNtaW4pO1xuICAgIGNvbnN0IF9zYXR1cmF0aW9uID0gY2FsY3VsYXRlU2F0dXJhdGlvbihkZWx0YSwgX2xpZ2h0bmVzcyk7XG4gICAgLy8gTXVsdGlwbHkgbGlnaHRuZXNzIGFuZCBzYXR1cmF0aW9uIGJ5IDEwMFxuICAgIGNvbnN0IGxpZ2h0bmVzcyA9ICsoX2xpZ2h0bmVzcyAqIDEwMCkudG9GaXhlZCgxKTtcbiAgICBjb25zdCBzYXR1cmF0aW9uID0gKyhfc2F0dXJhdGlvbiAqIDEwMCkudG9GaXhlZCgxKTtcbiAgICAvLyBJZiBjb2xvciBoYXMgYWxwaGEgMSByZXR1biBIU0wgYW5kIHdoZW4gc29tZSBhbHBoYSBpcyBpbmNsdWRlZCByZXR1cm4gSFNMQVxuICAgIHJldHVybiBhID09PSAxID8gc3RyaW5nSFNMKGh1ZSwgc2F0dXJhdGlvbiwgbGlnaHRuZXNzKSA6IHN0cmluZ0hTTEEoaHVlLCBzYXR1cmF0aW9uLCBsaWdodG5lc3MsIGEpO1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IHJnYlRvSHNsO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29tbWVudGFyeV8xID0gcmVxdWlyZShcIi4vY29tbWVudGFyeVwiKTtcbmNvbnN0IHBheWxvYWRzXzEgPSByZXF1aXJlKFwiLi9wYXlsb2Fkc1wiKTtcbmNvbnN0IG5hbWVzXzEgPSByZXF1aXJlKFwiLi9uYW1lc1wiKTtcbmNvbnN0IHZhbHVlc18xID0gcmVxdWlyZShcIi4vdmFsdWVzXCIpO1xuY29uc3QgaGVscGVyc18xID0gcmVxdWlyZShcIi4uL2hlbHBlcnNcIik7XG5jb25zdCBicmFuZHNfMSA9IHJlcXVpcmUoXCIuL2JyYW5kc1wiKTtcbi8vIEZ1bmN0aW9ucyByZWdpc3RyYXRpb24uXG5QdWxzYXIucmVnaXN0ZXJGdW5jdGlvbigndmFyaWFibGVOYW1lJywgbmFtZXNfMS52YXJpYWJsZU5hbWUpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oJ2ZpbGVIZWFkZXJDb21tZW50JywgY29tbWVudGFyeV8xLmZpbGVIZWFkZXJDb21tZW50KTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKCdncm91cE5hbWVDb21tZW50JywgY29tbWVudGFyeV8xLmdyb3VwTmFtZUNvbW1lbnQpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oJ3JnYlRvSHNsJywgdmFsdWVzXzEucmdiVG9Ic2wpO1xuUHVsc2FyLnJlZ2lzdGVyRnVuY3Rpb24oXCJkYXRlTm93XCIsIGhlbHBlcnNfMS5kYXRlTm93KTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiZ2V0QnJhbmRJZFwiLCBicmFuZHNfMS5nZXRCcmFuZElkKTtcblB1bHNhci5yZWdpc3RlckZ1bmN0aW9uKFwiZXhwb3J0ZWRGaWxlTmFtZVwiLCBoZWxwZXJzXzEuZXhwb3J0ZWRGaWxlTmFtZSk7XG4vLyBQYXlsb2FkcyByZWdpc3RyYXRpb25cblB1bHNhci5yZWdpc3RlclBheWxvYWQoJ2NhdGVnb3J5UHJlZml4ZXMnLCBwYXlsb2Fkc18xLmNhdGVnb3J5UHJlZml4ZXMpO1xuUHVsc2FyLnJlZ2lzdGVyUGF5bG9hZCgnYWN0aW9uc05hbWVEZWZpbml0aW9uJywgcGF5bG9hZHNfMS5hY3Rpb25zTmFtZURlZmluaXRpb24pO1xuUHVsc2FyLnJlZ2lzdGVyUGF5bG9hZCgnYnJhbmRJZHMnLCBwYXlsb2Fkc18xLmJyYW5kSWRzKTtcblB1bHNhci5yZWdpc3RlclBheWxvYWQoXCJjdXJyZW50RXhwb3J0ZXJWZXJzaW9uXCIsIHBheWxvYWRzXzEuY3VycmVudEV4cG9ydGVyVmVyc2lvbik7XG5QdWxzYXIucmVnaXN0ZXJQYXlsb2FkKFwiYnJhbmROYW1lc1wiLCBwYXlsb2Fkc18xLmJyYW5kTmFtZXMpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9