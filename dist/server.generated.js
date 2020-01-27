module.exports =
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/JsonGenerator.js":
/*!*********************************!*\
  !*** ./server/JsonGenerator.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const fs = __webpack_require__(/*! fs */ \"fs\");\n\nconst xml2js = __webpack_require__(/*! xml2js */ \"xml2js\");\n\nconst excel = __webpack_require__(/*! excel4node */ \"excel4node\");\n\nconst AdmZip = __webpack_require__(/*! adm-zip */ \"adm-zip\");\n\nconst ExcelJS = __webpack_require__(/*! exceljs */ \"exceljs\");\n\nconst XLSX = __webpack_require__(/*! xlsx */ \"xlsx\");\n\nconst stringSimilarity = __webpack_require__(/*! string-similarity */ \"string-similarity\"); // const XLSX = require('xlsx');\n\n\nconst path = __webpack_require__(/*! path */ \"path\");\n\nasync function sleep(millis) {\n  return new Promise(resolve => setTimeout(resolve, millis));\n}\n\nasync function folderClear() {\n  const directory = './Temp';\n  const directory1 = './Output';\n  fs.readdir(directory, (err, files) => {\n    if (err) throw err;\n\n    for (const file of files) {\n      fs.unlink(path.join(directory, file), err => {\n        if (err) throw err;\n      });\n    }\n  });\n  fs.readdir(directory1, (err, files) => {\n    if (err) throw err;\n\n    for (const file of files) {\n      fs.unlink(path.join(directory1, file), err => {\n        if (err) throw err;\n      });\n    }\n  });\n}\n\nasync function MyJsonFunction(theXlsxJson) {\n  console.log('Recieved');\n  baseJson = {};\n\n  for (row of theXlsxJson) {\n    console.log(row);\n\n    if (row.Key.toUpperCase() === 'ID') {\n      baseJson['id'] = row.Value;\n    }\n\n    if (row.Key.toUpperCase() === 'TAGS') {\n      tags = [];\n\n      if (row.Value.includes(',')) {\n        tags = row.Value.split(',');\n      } else {\n        tags.push(row.Value);\n      }\n\n      baseJson['tags'] = tags;\n      console.log('Base:', baseJson);\n    }\n\n    if (row.Key.toUpperCase() === 'METADATA') {\n      metadata = []; // metaJson = {}\n\n      if (row.Value.includes(',')) {\n        a = row.Value.split(',');\n\n        for (b of a) {\n          c = b.split(':');\n          console.log('meta', c);\n          metaJson = `{\"${c[0]}\":\"${c[1]}\"}`;\n          metadata.push(JSON.parse(metaJson));\n        }\n      } else {\n        a = row.Value.split(':');\n        metaJson = `{\"${a[0]}\":\"${a[1]}\"}`;\n        metadata.push(JSON.parse(metaJson));\n      }\n\n      baseJson['metadata'] = metadata;\n    }\n\n    if (row.Key.toUpperCase() === 'TITLE') {\n      baseJson['title'] = typeof row.Value === 'undefined' || row.Value.toUpperCase() === 'FALSE' ? false : row.Value;\n      console.log('Base:', baseJson);\n    }\n  }\n\n  return baseJson;\n}\n\nmodule.exports = MyJsonFunction;\n\n//# sourceURL=webpack:///./server/JsonGenerator.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst path = __webpack_require__(/*! path */ \"path\");\n\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nconst formidable = __webpack_require__(/*! formidable */ \"formidable\");\n\nconst XLSX = __webpack_require__(/*! xlsx */ \"xlsx\"); // import pd = require('pretty-data';);\n\n\nconst pd = __webpack_require__(/*! pretty-data */ \"pretty-data\").pd;\n\nconst MyJsonFunction = __webpack_require__(/*! ./JsonGenerator.js */ \"./server/JsonGenerator.js\");\n\nconst app = express();\napp.use(bodyParser.urlencoded({\n  extended: false\n}));\napp.use(bodyParser.json());\nconst CURRENT_WORKING_DIR = process.cwd();\napp.use(express.static(path.join(CURRENT_WORKING_DIR, 'public')));\napp.get('/test', (req, res) => {\n  res.send('My page');\n});\napp.get('/test1', (req, res) => {\n  res.send('My page 2');\n});\napp.get('/getfile', (req, res) => {\n  console.log(req.query);\n  res.send('My page 2');\n});\napp.post('/getfile', (req, res) => {\n  new formidable.IncomingForm().parse(req).on('file', async function (name, file) {\n    let workbook = XLSX.readFile(`${file.path}`);\n    let xlsxJSON = '';\n    let tuteXml = ''; // console.log(workbook)\n\n    let sheet_name_list = workbook.SheetNames;\n\n    for (let x of sheet_name_list) {\n      xlsxJSON = XLSX.utils.sheet_to_json(workbook.Sheets[x], {\n        defVal: \"\"\n      });\n      console.log(xlsxJSON); //  let xml = MyJsonFunction(xlsxJSON);\n      //  console.log(pd.xml(xml));\n\n      await MyJsonFunction(xlsxJSON).then(value => {\n        tuteXml += value;\n        console.log('1', tuteXml);\n      });\n      console.log('2', tuteXml);\n    }\n\n    return res.send( // tuteXml\n    pd.xml(tuteXml));\n  });\n});\napp.get('*', (req, res) => {\n  res.send('My web page');\n});\nconst PORT = process.env.PORT || 3000;\napp.listen(PORT);\n\n//# sourceURL=webpack:///./server/server.js?");

/***/ }),

/***/ 0:
/*!***********************************************!*\
  !*** multi babel-polyfill ./server/server.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! babel-polyfill */\"babel-polyfill\");\nmodule.exports = __webpack_require__(/*! D:\\Work\\GIT\\Javascript\\NelXml\\server\\server.js */\"./server/server.js\");\n\n\n//# sourceURL=webpack:///multi_babel-polyfill_./server/server.js?");

/***/ }),

/***/ "adm-zip":
/*!**************************!*\
  !*** external "adm-zip" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"adm-zip\");\n\n//# sourceURL=webpack:///external_%22adm-zip%22?");

/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-polyfill\");\n\n//# sourceURL=webpack:///external_%22babel-polyfill%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "excel4node":
/*!*****************************!*\
  !*** external "excel4node" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"excel4node\");\n\n//# sourceURL=webpack:///external_%22excel4node%22?");

/***/ }),

/***/ "exceljs":
/*!**************************!*\
  !*** external "exceljs" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"exceljs\");\n\n//# sourceURL=webpack:///external_%22exceljs%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "formidable":
/*!*****************************!*\
  !*** external "formidable" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"formidable\");\n\n//# sourceURL=webpack:///external_%22formidable%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "pretty-data":
/*!******************************!*\
  !*** external "pretty-data" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pretty-data\");\n\n//# sourceURL=webpack:///external_%22pretty-data%22?");

/***/ }),

/***/ "string-similarity":
/*!************************************!*\
  !*** external "string-similarity" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"string-similarity\");\n\n//# sourceURL=webpack:///external_%22string-similarity%22?");

/***/ }),

/***/ "xlsx":
/*!***********************!*\
  !*** external "xlsx" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"xlsx\");\n\n//# sourceURL=webpack:///external_%22xlsx%22?");

/***/ }),

/***/ "xml2js":
/*!*************************!*\
  !*** external "xml2js" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"xml2js\");\n\n//# sourceURL=webpack:///external_%22xml2js%22?");

/***/ })

/******/ });