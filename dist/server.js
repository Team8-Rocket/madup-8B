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

/***/ "./src/server.tsx":
/*!************************!*\
  !*** ./src/server.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_router_dom_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom/server */ \"react-router-dom/server\");\n/* harmony import */ var react_router_dom_server__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom_server__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _loadable_server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @loadable/server */ \"@loadable/server\");\n/* harmony import */ var _loadable_server__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_loadable_server__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-helmet */ \"react-helmet\");\n/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _states__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./states */ \"./src/states/index.ts\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_8__);\nvar __assign = undefined && undefined.__assign || function () {\n  __assign = Object.assign || function (t) {\n    for (var s, i = 1, n = arguments.length; i < n; i++) {\n      s = arguments[i];\n\n      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];\n    }\n\n    return t;\n  };\n\n  return __assign.apply(this, arguments);\n};\n\n\n\n\n\n\n\n\n\n // import reducers from './store/reducers'\n\nvar app = express__WEBPACK_IMPORTED_MODULE_1___default()();\n\nif (true) {\n  /* eslint-disable global-require, import/no-extraneous-dependencies */\n\n  /* eslint-disable no-param-reassign */\n  var webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\n  var webpackConfig = (__webpack_require__(/*! ../webpack.client */ \"./webpack.client.js\").map)(function (config) {\n    config.output.path = config.output.path.replace('dist/dist/', 'dist/');\n    return config;\n  });\n\n  var webpackDevMiddleware = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\n\n  var webpackHotMiddleware = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\");\n  /* eslint-enable global-require, import/no-extraneous-dependencies */\n\n  /* eslint-enable no-param-reassign */\n\n\n  var compiler = webpack(webpackConfig);\n  app.use(webpackDevMiddleware(compiler, {\n    logLevel: 'silent',\n    publicPath: webpackConfig[0].output.publicPath,\n    writeToDisk: true\n  }));\n  app.use(webpackHotMiddleware(compiler));\n}\n\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default()[\"static\"](path__WEBPACK_IMPORTED_MODULE_2___default().resolve(__dirname)));\napp.get('*', function (req, res) {\n  var nodeStats = path__WEBPACK_IMPORTED_MODULE_2___default().resolve(__dirname, './node/loadable-stats.json');\n  var webStats = path__WEBPACK_IMPORTED_MODULE_2___default().resolve(__dirname, './web/loadable-stats.json');\n  var nodeExtractor = new _loadable_server__WEBPACK_IMPORTED_MODULE_4__.ChunkExtractor({\n    statsFile: nodeStats\n  });\n  var App = nodeExtractor.requireEntrypoint().default;\n  var webExtractor = new _loadable_server__WEBPACK_IMPORTED_MODULE_4__.ChunkExtractor({\n    statsFile: webStats\n  }); // const store = createStore(reducers)\n  // const context = {}\n\n  var jsx = webExtractor.collectChunks((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_redux__WEBPACK_IMPORTED_MODULE_6__.Provider, __assign({\n    store: _states__WEBPACK_IMPORTED_MODULE_7__.store\n  }, {\n    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom_server__WEBPACK_IMPORTED_MODULE_3__.StaticRouter, __assign({\n      location: req.url\n    }, {\n      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(App, {})\n    }))\n  })));\n  var html = (0,react_dom_server__WEBPACK_IMPORTED_MODULE_8__.renderToString)(jsx);\n  var helmet = react_helmet__WEBPACK_IMPORTED_MODULE_5__.Helmet.renderStatic();\n  res.set('content-type', 'text/html');\n  res.send(\"\\n    <!DOCTYPE html>\\n      <html lang=\\\"en\\\">\\n        <head>\\n          <meta name=\\\"viewport\\\" content=\\\"width=device-width, user-scalable=no\\\">\\n          <meta name=\\\"google\\\" content=\\\"notranslate\\\">\\n          \".concat(helmet.title.toString(), \"\\n          \").concat(webExtractor.getLinkTags(), \"\\n          \").concat(webExtractor.getStyleTags(), \"\\n        </head>\\n        <body>\\n          <div id=\\\"root\\\">\").concat(html, \"</div>\\n          \").concat(webExtractor.getScriptTags(), \"\\n        </body>\\n      </html>\\n  \"));\n});\napp.listen(3000, function () {\n  return console.log('Server started http://localhost:3000');\n});\n\n//# sourceURL=webpack://madup-8b/./src/server.tsx?");

/***/ }),

/***/ "./src/states/ads.ts":
/*!***************************!*\
  !*** ./src/states/ads.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"getCategory1\": () => (/* binding */ getCategory1),\n/* harmony export */   \"getCategory2\": () => (/* binding */ getCategory2),\n/* harmony export */   \"getDateRange\": () => (/* binding */ getDateRange),\n/* harmony export */   \"getDayOrWeek\": () => (/* binding */ getDayOrWeek),\n/* harmony export */   \"setCategory1\": () => (/* binding */ setCategory1),\n/* harmony export */   \"setCategory2\": () => (/* binding */ setCategory2),\n/* harmony export */   \"setDateRange\": () => (/* binding */ setDateRange),\n/* harmony export */   \"setDayOrWeek\": () => (/* binding */ setDayOrWeek)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\nvar _a;\n\n\nvar INITIAL_STATE = {\n  category1: 'roas',\n  category2: 'none',\n  dateRange: [new Date('02-08-2022'), new Date('02-10-2022')],\n  dayOrWeek: 'day'\n};\nvar adsSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({\n  name: 'ads',\n  initialState: INITIAL_STATE,\n  reducers: {\n    setCategory1: function (state, action) {\n      state.category1 = action.payload;\n    },\n    setCategory2: function (state, action) {\n      state.category2 = action.payload;\n    },\n    setDateRange: function (state, action) {\n      state.dateRange = action.payload;\n    },\n    setDayOrWeek: function (state, action) {\n      state.dayOrWeek = action.payload;\n    }\n  }\n});\nvar setCategory1 = (_a = adsSlice.actions, _a.setCategory1),\n    setCategory2 = _a.setCategory2,\n    setDateRange = _a.setDateRange,\n    setDayOrWeek = _a.setDayOrWeek;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (adsSlice.reducer); // Selector =====================\n\nvar getCategory1 = function (state) {\n  return state.ads.category1;\n};\nvar getCategory2 = function (state) {\n  return state.ads.category2;\n};\nvar getDateRange = function (state) {\n  return state.ads.dateRange;\n};\nvar getDayOrWeek = function (state) {\n  return state.ads.dayOrWeek;\n};\n\n//# sourceURL=webpack://madup-8b/./src/states/ads.ts?");

/***/ }),

/***/ "./src/states/index.ts":
/*!*****************************!*\
  !*** ./src/states/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"store\": () => (/* binding */ store)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _ads__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ads */ \"./src/states/ads.ts\");\n\n\nvar store = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.configureStore)({\n  reducer: {\n    ads: _ads__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n  },\n  devTools: \"development\" !== 'production',\n  middleware: function (getDefaultMiddleware) {\n    return getDefaultMiddleware({\n      serializableCheck: false\n    });\n  }\n});\n\n//# sourceURL=webpack://madup-8b/./src/states/index.ts?");

/***/ }),

/***/ "./webpack.client.js":
/*!***************************!*\
  !*** ./webpack.client.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const path = __webpack_require__(/*! path */ \"path\")\nconst webpack = __webpack_require__(/*! webpack */ \"webpack\")\nconst nodeExternals = __webpack_require__(/*! webpack-node-externals */ \"webpack-node-externals\")\nconst LoadablePlugin = __webpack_require__(/*! @loadable/webpack-plugin */ \"@loadable/webpack-plugin\")\nconst MiniCssExtractPlugin = __webpack_require__(/*! mini-css-extract-plugin */ \"mini-css-extract-plugin\")\n// const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default\n\nconst devMode = \"development\" !== 'production'\nconst hotMiddlewareScript = `webpack-hot-middleware/client?name=web&path=/__webpack_hmr&timeout=20000&reload=true`\n// const styledComponentsTransformer = createStyledComponentsTransformer()\n\nconst getEntryPoint = (target) => {\n  if (target === 'node') {\n    return ['./src/routes/index.tsx']\n  }\n  return devMode ? [hotMiddlewareScript, './src/index.tsx'] : ['./src/index.tsx']\n}\n\nconst getConfig = (target) => ({\n  mode: devMode ? 'development' : 'production',\n\n  name: target,\n\n  target,\n\n  entry: getEntryPoint(target),\n\n  output: {\n    path: path.resolve(__dirname, `dist/${target}`),\n    filename: '[name].js',\n    publicPath: '/web/',\n    libraryTarget: target === 'node' ? 'commonjs2' : undefined,\n  },\n\n  module: {\n    rules: [\n      {\n        test: /\\.(ts|tsx)?$/,\n        use: [\n          'babel-loader',\n          {\n            loader: 'ts-loader',\n          },\n        ],\n      },\n      {\n        test: /\\.(scss|css)$/,\n        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],\n      },\n\n      {\n        test: /\\.svg$/,\n        use: ['@svgr/webpack'],\n      },\n      {\n        test: /\\.svg$/,\n        loader: 'file-loader',\n      },\n    ],\n  },\n\n  resolve: {\n    extensions: ['.js', '.jsx', '.ts', '.tsx'],\n    alias: {\n      assets: path.resolve('src/assets/'),\n      components: path.resolve('src/components/'),\n      hooks: path.resolve('src/hooks/'),\n      routes: path.resolve('src/routes/'),\n      states: path.resolve('src/states'),\n      styles: path.resolve('src/styles/'),\n      types: path.resolve('src/types/'),\n      utils: path.resolve('src/utils/'),\n    },\n  },\n\n  plugins:\n    target === 'web'\n      ? [new LoadablePlugin(), new webpack.HotModuleReplacementPlugin(), new MiniCssExtractPlugin()]\n      : [new LoadablePlugin(), new MiniCssExtractPlugin()],\n\n  externals: target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,\n})\n\nmodule.exports = [getConfig('web'), getConfig('node')]\n\n\n//# sourceURL=webpack://madup-8b/./webpack.client.js?");

/***/ }),

/***/ "@loadable/server":
/*!***********************************!*\
  !*** external "@loadable/server" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@loadable/server");

/***/ }),

/***/ "@loadable/webpack-plugin":
/*!*******************************************!*\
  !*** external "@loadable/webpack-plugin" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@loadable/webpack-plugin");

/***/ }),

/***/ "@reduxjs/toolkit":
/*!***********************************!*\
  !*** external "@reduxjs/toolkit" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "mini-css-extract-plugin":
/*!******************************************!*\
  !*** external "mini-css-extract-plugin" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("mini-css-extract-plugin");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom/server");

/***/ }),

/***/ "react-helmet":
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-helmet");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ "react-router-dom/server":
/*!******************************************!*\
  !*** external "react-router-dom/server" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-router-dom/server");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("webpack");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("webpack-dev-middleware");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("webpack-hot-middleware");

/***/ }),

/***/ "webpack-node-externals":
/*!*****************************************!*\
  !*** external "webpack-node-externals" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("webpack-node-externals");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server.tsx");
/******/ 	
/******/ })()
;