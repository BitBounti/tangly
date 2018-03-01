(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("CryptoJS"), require("IOTA"));
	else if(typeof define === 'function' && define.amd)
		define("tangly", ["CryptoJS", "IOTA"], factory);
	else if(typeof exports === 'object')
		exports["tangly"] = factory(require("CryptoJS"), require("IOTA"));
	else
		root["tangly"] = factory(root["CryptoJS"], root["IOTA"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = encrypt;
/* harmony export (immutable) */ __webpack_exports__["a"] = decrypt;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_crypto_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_crypto_js__);


function encrypt(seed, data) {
  return __WEBPACK_IMPORTED_MODULE_0_crypto_js___default.a.AES.encrypt(JSON.stringify(data), seed).toString();
}

function decrypt(seed, encryptedData) {
  var bytes = __WEBPACK_IMPORTED_MODULE_0_crypto_js___default.a.AES.decrypt(encryptedData.toString(), seed);
  return JSON.parse(bytes.toString(__WEBPACK_IMPORTED_MODULE_0_crypto_js___default.a.enc.Utf8));
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__crypto__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iota__ = __webpack_require__(3);



class Tangly {
  constructor(config) {
    this.seed = config.seed;
    this.node = config.node;
    this.iota = new __WEBPACK_IMPORTED_MODULE_1__iota__["a" /* default */](this.node, this.seed);
  }

  async insert(data, config) {
    console.log("INSERTING...");
    const encryptedData = Object(__WEBPACK_IMPORTED_MODULE_0__crypto__["b" /* encrypt */])(this.seed, data);
    console.log(`encrypted data: ${encryptedData}`);
    const dataObject = {
      encryptedData
    };
    debugger;
    const attachedData = await this.iota.attachToTangle(dataObject, config);
    console.log("attachedData:", attachedData);

    const decryptedData = Object(__WEBPACK_IMPORTED_MODULE_0__crypto__["a" /* decrypt */])(this.seed, encryptedData);
    console.log(`decrypted data: ${JSON.stringify(decryptedData)}`);
  }

  async find(field) {
    console.log("finding fields...");
    const accountData = await this.iota.getAccountData();
    const messages = this.iota.extractTransferMessages(accountData);
    console.log("account data:", accountData);
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Tangly;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_iota_lib_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_iota_lib_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_iota_lib_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__crypto_js__ = __webpack_require__(0);



class Iota {
  constructor(node, seed) {
    this.iota = new __WEBPACK_IMPORTED_MODULE_0_iota_lib_js___default.a({
      'provider': node
    });
    this.seed = seed;
  }

  getAccountData() {
    return new Promise((resolve, reject) => {
      return this.iota.api.getAccountData(this.seed, {}, function (err, accountData) {
        if (err) {
          console.log(err);
          return reject(err);
        }
        return resolve(accountData);
      });
    });
  }

  getNewAddress() {
    return new Promise((resolve, reject) => {
      return this.iota.api.getNewAddress(this.seed, (err, address) => {
        if (err) {
          return reject(err);
        }
        return resolve(address);
      });
    });
  }

  sendTransfer(transferData) {
    return new Promise((resolve, reject) => {
      return this.iota.api.sendTransfer(this.seed, 4, 9, transferData, (err, transferObject) => {
        if (err) {
          return reject(err);
        }
        return resolve(transferObject);
      });
    });
  }

  extractTransferMessages(accountData) {
    accountData.transfers.forEach(transfer => {
      debugger;
      let message = this.iota.utils.extractJson(transfer);
      if (message === null) return;

      message = JSON.parse(message);
      if (message.encryptedData) {
        console.log("decrypted message: ", Object(__WEBPACK_IMPORTED_MODULE_1__crypto_js__["a" /* decrypt */])(this.seed, message.encryptedData));
      }
    });
  }

  fromTrytes(trytes) {
    return this.iota.utils.fromTrytes(trytes);
  }

  async attachToTangle(data, config) {
    debugger;
    const newAddress = await this.getNewAddress();
    debugger;
    const transferData = [{
      'address': newAddress,
      'value': 0,
      'message': this.iota.utils.toTrytes(JSON.stringify(data)),
      'tag': config.tag
    }];
    this.sendTransfer(transferData).then(transferObject => {
      console.log("transfer object:", transferObject);
      return transferData;
    }).catch(err => {
      console.log("err", err);
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Iota;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=tangly.js.map