/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/backend/server.ts":
/*!*******************************!*\
  !*** ./src/backend/server.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\nconst http_1 = __importDefault(__webpack_require__(/*! http */ \"http\"));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst serverutils_1 = __webpack_require__(/*! ./serverutils */ \"./src/backend/serverutils.ts\");\n//import mysql from 'mysql'\nconst app = express_1.default();\nconst port = process.env.PORT || 3000;\nconst server = http_1.default.createServer(app);\nconst io = __webpack_require__(/*! socket.io */ \"socket.io\")(server);\n// let db =  mysql.createPool({\n//     host: '',\n//     user: ',\n//     password: '',\n//     database: ''\n//   });\napp.use(express_1.default.static('/../build-client'));\napp.get(\"/\", (req, res) => {\n    res.sendFile(path_1.default.join(__dirname, \"/../build-client/index.html\"));\n});\napp.get(\"/bundle-front.js\", (req, res) => {\n    res.sendFile(path_1.default.join(__dirname, \"/../build-client/bundle-front.js\"));\n});\napp.get(\"/assets/*\", (req, res) => {\n    res.sendFile(path_1.default.join(__dirname, \"/../build-client/\" + req.path));\n});\nio.on('connection', function (socket) {\n    serverutils_1.socketCommunication(socket);\n});\nserver.listen(port, () => {\n    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);\n});\n\n\n//# sourceURL=webpack://socketgarbage/./src/backend/server.ts?");

/***/ }),

/***/ "./src/backend/serverutils.ts":
/*!************************************!*\
  !*** ./src/backend/serverutils.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.socketCommunication = void 0;\nfunction socketCommunication(socket) {\n    let d = new Date();\n    let time = d.toLocaleString('en-US', {\n        hour12: true,\n        timeZone: 'America/Los_Angeles'\n    });\n    socket.on('disconnect', function () {\n        console.log('disconnect');\n        socket.removeAllListeners();\n    });\n    socket.emit(\"first hi\", \"You have connected to the socket port\");\n}\nexports.socketCommunication = socketCommunication;\n\n\n//# sourceURL=webpack://socketgarbage/./src/backend/serverutils.ts?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");;

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("socket.io");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/backend/server.ts");
/******/ })()
;