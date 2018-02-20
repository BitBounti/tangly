(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("CryptoJS"), require("IOTA"));
	else if(typeof define === 'function' && define.amd)
		define("tangly", ["CryptoJS", "IOTA"], factory);
	else if(typeof exports === 'object')
		exports["tangly"] = factory(require("CryptoJS"), require("IOTA"));
	else
		root["tangly"] = factory(root["CryptoJS"], root["IOTA"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = encrypt;
/* harmony export (immutable) */ __webpack_exports__["a"] = decrypt;
/* unused harmony export generateSecretKey */
/* harmony export (immutable) */ __webpack_exports__["c"] = generateHash;
/* harmony export (immutable) */ __webpack_exports__["d"] = seedGen;
/* unused harmony export generateTag */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_crypto_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_iota__ = __webpack_require__(1);



const iota = new IOTA();

function encrypt(seed, data) {
  return __WEBPACK_IMPORTED_MODULE_0_crypto_js___default.a.AES.encrypt(JSON.stringify(data), seed).toString();
}

function decrypt(seed, encryptedData) {
  var bytes = __WEBPACK_IMPORTED_MODULE_0_crypto_js___default.a.AES.decrypt(encryptedData.toString(), seed);
  return JSON.parse(bytes.toString(__WEBPACK_IMPORTED_MODULE_0_crypto_js___default.a.enc.Utf8));
}

function generateSecretKey() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}

function generateHash(seed, secret) {
  return __WEBPACK_IMPORTED_MODULE_0_crypto_js___default.a.SHA256(secret + seed).toString();
}

function seedGen(length) {
  var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
  var i;
  var result = "";
  if (window.crypto && window.crypto.getRandomValues) {
    var values = new Uint32Array(length);
    window.crypto.getRandomValues(values);
    for (i = 0; i < length; i++) {
      result += charset[values[i] % charset.length];
    }
    return result;
  } else throw new Error("Your browser sucks and can't generate secure random numbers");
};

function generateTag(seed, secret, tagSuffix = "999") {
  // use a seed and a secret token to generate a 24 character tryte. 3 extra characters can be added for querying purposes.
  const hash = __WEBPACK_IMPORTED_MODULE_0_crypto_js___default.a.SHA256(secret + seed).toString();
  const trytes = iota.utils.toTrytes(hash);
  const trimmedTrytes = trytes.slice(0, 24);
  const finalTag = trimmedTrytes + tagSuffix;

  return finalTag;
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_iota_lib_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_iota_lib_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_iota_lib_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__crypto_js__ = __webpack_require__(0);



class Iota {
  constructor(node, seed, tagSecret) {
    this.iota = new __WEBPACK_IMPORTED_MODULE_0_iota_lib_js___default.a({
      'provider': node
    });
    this.seed = seed;
    this.tagSecret = tagSecret;
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
      return this.iota.api.sendTransfer(this.seed, 3, 14, transferData, (err, transferObject) => {
        if (err) {
          return reject(err);
        }
        return resolve(transferObject);
      });
    });
  }

  extractTransferMessages(accountData) {
    return accountData.transfers.reduce((acc, transfer) => {
      let message = this.iota.utils.extractJson(transfer);
      if (message === null) return;

      message = JSON.parse(message);
      if (message.encryptedData) {
        const decryptedMessage = Object(__WEBPACK_IMPORTED_MODULE_1__crypto_js__["a" /* decrypt */])(this.seed, message.encryptedData);
        decryptedMessage.timestamp = transfer[0].timestamp;
        acc.push(decryptedMessage);

        return acc;
      }
    }, []);
  }

  fromTrytes(trytes) {
    return this.iota.utils.fromTrytes(trytes);
  }

  toTrytes(text) {
    return this.iota.utils.toTrytes(text);
  }

  findTransaction(tag) {
    return new Promise((resolve, reject) => {
      return this.iota.api.findTransactionObjects({ tags: [tag] }, (err, transactions) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        return resolve(transactions);
      });
    });
  }

  generateTag() {
    // use a seed and a secret token to generate a 24 character tryte. 3 extra characters can be added for querying purposes.
    const hash = Object(__WEBPACK_IMPORTED_MODULE_1__crypto_js__["c" /* generateHash */])(this.seed, this.tagSecret);
    const trytes = this.iota.utils.toTrytes(hash);
    const trimmedTrytes = trytes.slice(0, 27);
    const finalTag = trimmedTrytes;
    console.log("tag:", finalTag);
    return finalTag;
  }

  async attachToTangle(data, options = {}) {
    const newAddress = await this.getNewAddress();
    const transferData = [{
      'address': newAddress,
      'value': 0,
      'message': this.iota.utils.toTrytes(JSON.stringify(data)),
      'tag': options.tag || this.generateTag()
    }];
    return await this.sendTransfer(transferData);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Iota;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__crypto__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iota__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_format__ = __webpack_require__(5);




class Tangly {
  constructor(config) {
    this.seed = config.seed;
    this.node = config.node;
    this.tagSecret = config.tagSecret;
    this.iota = new __WEBPACK_IMPORTED_MODULE_1__iota__["a" /* default */](this.node, this.seed, this.tagSecret);
  }

  createTag() {
    return this.iota.generateTag();
  }

  async searchTag(tag) {
    return await this.iota.findTransaction(tag);
  }

  generateSeed() {
    return Object(__WEBPACK_IMPORTED_MODULE_0__crypto__["d" /* seedGen */])(81);
  }

  async insert(data, options) {
    console.log("INSERTING...");
    const encryptedData = Object(__WEBPACK_IMPORTED_MODULE_0__crypto__["b" /* encrypt */])(this.seed, data);
    console.log(`encrypted data: ${encryptedData}`);
    const dataObject = { encryptedData };
    const attachedData = await this.iota.attachToTangle(dataObject, options);

    return attachedData;
  }

  async find(field, options = { history: true, timestamp: true }) {
    console.log("finding fields...");
    const accountData = await this.iota.getAccountData();
    const rawMessages = this.iota.extractTransferMessages(accountData);
    const formattedData = Object(__WEBPACK_IMPORTED_MODULE_2__util_format__["a" /* untangle */])(rawMessages, options);

    return formattedData;
    console.log(`raw messages: ${JSON.stringify(rawMessages)}`);
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Tangly;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = untangle;

function mergeMessagesWithHistory(messages) {
  return messages.reduce((acc, message) => {
    for (let key in message) {
      // if the property already exists in the acc, add it to the history of the new object and
      // replace the old object with the new in the acc
      if (acc[key]) {
        message.history.push({
          value: acc[key]
        });
      }
      acc[key] = message[key];
    }
    return acc;
  }, {});
}

function mergeMessagesWithoutHistory(messages) {
  return messages.reduce((acc, message) => {
    for (let key in message) {
      acc[key] = message[key];
    }
    return acc;
  }, {});
}

function mergeMessagesWithHistory(messages) {
  return messages.reduce((acc, message) => {
    for (let key in message) {
      if (acc.hasOwnProperty(key)) {
        if (acc[key].history) {
          message[key].history = acc[key].history;
          message[key].history.unshift({ value: acc[key].value, timestamp: acc[key].timestamp });
        } else {
          message[key].history = [];
          message[key].history.push(acc[key]);
        }
        acc[key] = message[key];
      } else {
        acc[key] = message[key];
      }
    }
    return acc;
  }, {});
}

function separateObjects(messages) {
  return messages.reduce((acc, message) => {
    for (let item in message) {
      if (item !== 'timestamp') {
        acc.push({ [item]: { value: message[item], timestamp: message.timestamp } });
      }
    }

    return acc;
  }, []);
};

function untangle(messages, options) {
  const separatedMessages = separateObjects(messages);
  console.log("separated messages:", separatedMessages);
  if (options.history) {
    return mergeMessagesWithHistory(separatedMessages);
  } else {
    return mergeMessagesWithoutHistory(separatedMessages);
  }
  console.log(`Final Object: ${JSON.stringify(finalObject)}`);
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=tangly.js.map