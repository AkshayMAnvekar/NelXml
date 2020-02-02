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

eval("const fs = __webpack_require__(/*! fs */ \"fs\");\n\nconst xml2js = __webpack_require__(/*! xml2js */ \"xml2js\");\n\nconst excel = __webpack_require__(/*! excel4node */ \"excel4node\");\n\nconst AdmZip = __webpack_require__(/*! adm-zip */ \"adm-zip\");\n\nconst ExcelJS = __webpack_require__(/*! exceljs */ \"exceljs\");\n\nconst XLSX = __webpack_require__(/*! xlsx */ \"xlsx\");\n\nconst stringSimilarity = __webpack_require__(/*! string-similarity */ \"string-similarity\"); // const XLSX = require('xlsx');\n\n\nconst path = __webpack_require__(/*! path */ \"path\");\n\nasync function sleep(millis) {\n  return new Promise(resolve => setTimeout(resolve, millis));\n}\n\nasync function folderClear() {\n  const directory = './Temp';\n  const directory1 = './Output';\n  fs.readdir(directory, (err, files) => {\n    if (err) throw err;\n\n    for (const file of files) {\n      fs.unlink(path.join(directory, file), err => {\n        if (err) throw err;\n      });\n    }\n  });\n  fs.readdir(directory1, (err, files) => {\n    if (err) throw err;\n\n    for (const file of files) {\n      fs.unlink(path.join(directory1, file), err => {\n        if (err) throw err;\n      });\n    }\n  });\n}\n\nasync function MyJsonFunction(theXlsxJson) {\n  // console.log('Recieved', theXlsxJson)\n  mcqq = {\n    \"type\": \"MCQ\",\n    \"correct_answer\": 0\n  };\n  baseJson = {};\n  section = {};\n  question = {};\n  marks = {};\n  qGroup = 0;\n  secCounter = 0;\n  qNo = 0;\n  headerJson = {\n    \"type\": \"header\",\n    \"content\": []\n  };\n\n  for (row of theXlsxJson) {\n    // console.log(row)\n    if (row.Key.toUpperCase() === 'ID') {\n      baseJson['id'] = row.Value;\n    }\n\n    if (row.Key.toUpperCase() === 'TAGS') {\n      tags = [];\n\n      if (row.Value.includes(',')) {\n        tags = row.Value.split(',');\n      } else {\n        tags.push(row.Value);\n      }\n\n      baseJson['tags'] = tags; // console.log('Base:', baseJson)\n    }\n\n    if (row.Key.toUpperCase() === 'METADATA') {\n      metadata = []; // metaJson = {}\n\n      if (row.Value.includes(',')) {\n        a = row.Value.split(',');\n\n        for (b of a) {\n          c = b.split(':'); // console.log('meta',c)\n\n          metaJson = `{\"${c[0]}\":\"${c[1]}\"}`;\n          metadata.push(JSON.parse(metaJson));\n        }\n      } else {\n        a = row.Value.split(':');\n        metaJson = `{\"${a[0]}\":\"${a[1]}\"}`;\n        metadata.push(JSON.parse(metaJson));\n      }\n\n      baseJson['metadata'] = metadata;\n    }\n\n    if (row.Key.toUpperCase() === 'TITLE') {\n      baseJson['title'] = typeof row.Value === 'undefined' || row.Value.toUpperCase() === 'FALSE' ? false : row.Value;\n      baseJson['content'] = []; // console.log('Base:', baseJson)\n    }\n\n    if (row.Key.toUpperCase() === 'HEADER') {\n      if (row.Value.includes('.jpg') || row.Value.includes('.png')) {\n        if (row.Value.includes(',')) {\n          header = {\n            \"type\": \"images-group\"\n          };\n          a = row.Value.split(',');\n          header.images = a; // for(b of a) {\n          //   c = b.split(':')\n          //   console.log('meta',c)\n          //   metaJson = `{\"${c[0]}\":\"${c[1]}\"}`\n          //   metadata.push(JSON.parse(metaJson))\n          // }\n\n          headerJson.content.push(header);\n        } else {\n          header = {\n            \"type\": \"image\"\n          };\n          header.image = row.Value;\n          headerJson.content.push(header);\n        }\n      } else {\n        header = {\n          \"type\": \"text\"\n        };\n        header.text = row.Value;\n        headerJson.content.push(header);\n      }\n    }\n\n    if (row.Key.toUpperCase() === 'QUESTIONTYPE') {\n      if (row.Group) {\n        qGroup = row.Group;\n      } else {\n        qGroup = 0;\n      }\n\n      ++qNo;\n\n      if (!question.hasOwnProperty(qGroup)) {\n        question[`${qGroup}`] = {};\n      }\n\n      if (row.Value.toUpperCase().includes('MCQ')) {\n        question[`${qGroup}`][`${qNo}`] = {\n          \"type\": `${row.Value}` // \"options\": []\n\n        };\n      } else {\n        question[`${qGroup}`][`${qNo}`] = {\n          \"type\": `${row.Value}`,\n          \"lines\": 1\n        };\n      }\n    }\n\n    if (row.Key.toUpperCase() === 'QUESTION') {\n      question[`${qGroup}`][`${qNo}`]['prompt'] = row.Value;\n    }\n\n    if (/C\\d/.test(row.Key.toUpperCase())) {\n      if (!question[`${qGroup}`][`${qNo}`].hasOwnProperty('options')) {\n        question[`${qGroup}`][`${qNo}`]['options'] = [];\n      }\n\n      question[`${qGroup}`][`${qNo}`]['options'].push(row.Value);\n    }\n\n    if (row.Key.toUpperCase() === 'ANSWER') {\n      question[`${qGroup}`][`${qNo}`]['correct_answer'] = row.Value - 1;\n    }\n\n    if (row.Key.toUpperCase() === 'MARKS') {\n      if (!marks.hasOwnProperty(qGroup)) {\n        marks[`${qGroup}`] = {};\n      }\n\n      marks[`${qGroup}`][`${qNo}`] = row.Value;\n    } // console.log(\"Section\", section)\n\n\n    if (row.Key.toUpperCase() === 'SECTION' && typeof row.Group != 'undefined') {\n      // console.log(row.Key.toUpperCase())\n      ++secCounter;\n\n      if (row.Group > 1) {\n        if (!marks.hasOwnProperty('1')) {\n          marks['1'] = {};\n        }\n\n        marks['1'][`${qNo + 1}`] = false;\n      }\n\n      section[`${row.Group}`] = {\n        \"type\": \"assembly\",\n        \"prompt\": false,\n        \"marks\": [],\n        \"questions\": []\n      };\n\n      if (row.Value) {\n        section[`${row.Group}`]['prompt'] = row.Value;\n      }\n    }\n  }\n\n  console.log(secCounter);\n\n  if (section['1']) {\n    for (i = secCounter; i > 1; i--) {\n      for (var q in question[secCounter]) {\n        section[i].marks.push(marks[i][q]);\n        section[i]['questions'].push(question[secCounter][q]);\n      }\n    }\n\n    for (j in marks['1']) {\n      secC = 2;\n\n      if (typeof marks[1][j] === 'number') {\n        section[1].marks.push(marks[1][j]);\n        section[1]['questions'].push(question[1][j]);\n      } else if (typeof marks[1][j] === 'boolean') {\n        console.log('Test3', section[secC]);\n        section[1].marks.push(marks[1][j]);\n        section[1]['questions'].push(section[secC]);\n        ++secC;\n      } else if (typeof marks[1][j] === 'string') {\n        console.log('Test3', j);\n      }\n    }\n  }\n\n  var completeData = baseJson['content'].push(headerJson);\n\n  if (question['0']) {\n    for (q in question['0']) {\n      baseJson['content'].push(question['0'][q]);\n    }\n  } // console.log('Section: ',section)\n  // var completeData = Object.assign({}, baseJson, headerJson);\n\n\n  if (section[1]) {\n    completeData = baseJson['content'].push(section['1']);\n  } // let pmData = JSON.stringify(XLSX.utils.sheet_to_json(pmWorksheet), null, 2);\n\n\n  fs.writeFileSync('./Output/JSON.json', JSON.stringify(baseJson));\n  return baseJson; // return './Output/JSON.json'\n}\n\nmodule.exports = MyJsonFunction;\n\n//# sourceURL=webpack:///./server/JsonGenerator.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst path = __webpack_require__(/*! path */ \"path\");\n\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nconst formidable = __webpack_require__(/*! formidable */ \"formidable\");\n\nconst XLSX = __webpack_require__(/*! xlsx */ \"xlsx\");\n\nconst fs = __webpack_require__(/*! fs */ \"fs\"); // const AdmZip = require('adm-zip');\n\n\nvar archiver = __webpack_require__(/*! archiver */ \"archiver\"); // import pd = require('pretty-data';);\n\n\nconst pd = __webpack_require__(/*! pretty-data */ \"pretty-data\").pd;\n\nconst MyJsonFunction = __webpack_require__(/*! ./JsonGenerator.js */ \"./server/JsonGenerator.js\");\n\nconst app = express();\napp.use(bodyParser.urlencoded({\n  extended: false\n}));\napp.use(bodyParser.json());\nconst CURRENT_WORKING_DIR = process.cwd();\napp.use(express.static(path.join(CURRENT_WORKING_DIR, 'public')));\napp.get('/test', (req, res) => {\n  res.send('My page');\n});\napp.get('/test1', (req, res) => {\n  res.send('My page 2');\n});\napp.get('/getfile', (req, res) => {\n  console.log(req.query);\n  res.send('My page 2');\n});\napp.post('/getfile', (req, res) => {\n  // console.log(req,res)\n  // fs.writeFileSync('./Output/req.json', req)\n  // fs.writeFileSync('./Output/res.json', res)\n  new formidable.IncomingForm().parse(req).on('file', async function (name, file) {\n    let workbook = XLSX.readFile(`${file.path}`);\n    let xlsxJSON = '';\n    let tuteXml = {}; // console.log(workbook)\n\n    let sheet_name_list = workbook.SheetNames;\n    var a = 0;\n\n    for (let x of sheet_name_list) {\n      xlsxJSON = XLSX.utils.sheet_to_json(workbook.Sheets[x], {\n        defVal: \"\"\n      });\n      console.log(xlsxJSON);\n      await MyJsonFunction(xlsxJSON).then(value => {\n        ++a;\n        tuteXml[a] = value;\n        console.log('1', tuteXml);\n        fs.writeFileSync(`./Output/JSONS/${x}.json`, JSON.stringify(baseJson));\n      });\n    }\n\n    var output = fs.createWriteStream('./public/Output.zip');\n    var archive = archiver('zip', {\n      zlib: {\n        level: 9\n      } // Sets the compression level.\n\n    });\n    archive.pipe(output);\n    archive.directory('./Output/JSONS', false);\n    archive.finalize(); // tuteXml = JSON.parse(fs.readFileSync('./Output/JSON.json'))\n\n    return res.send( // './Output/JSON.json',\n    JSON.stringify(tuteXml) // pd.json(JSON.stringify(tuteXml))\n    );\n  });\n});\napp.get('*', (req, res) => {\n  res.send('My web page');\n});\nconst PORT = process.env.PORT || 5000;\napp.listen(PORT);\n\n//# sourceURL=webpack:///./server/server.js?");

/***/ }),

/***/ 0:
/*!***********************************************!*\
  !*** multi babel-polyfill ./server/server.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! babel-polyfill */\"babel-polyfill\");\nmodule.exports = __webpack_require__(/*! /Volumes/Akshay/MyScripts/JS/node/NelXml/server/server.js */\"./server/server.js\");\n\n\n//# sourceURL=webpack:///multi_babel-polyfill_./server/server.js?");

/***/ }),

/***/ "adm-zip":
/*!**************************!*\
  !*** external "adm-zip" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"adm-zip\");\n\n//# sourceURL=webpack:///external_%22adm-zip%22?");

/***/ }),

/***/ "archiver":
/*!***************************!*\
  !*** external "archiver" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"archiver\");\n\n//# sourceURL=webpack:///external_%22archiver%22?");

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