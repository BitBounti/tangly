(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('crypto-js'), require('iota.lib.js')) :
	typeof define === 'function' && define.amd ? define(['crypto-js', 'iota.lib.js'], factory) :
	(global.tangly = factory(global.CryptoJS,global.IOTA));
}(this, (function (CryptoJS,IOTA) { 'use strict';

CryptoJS = CryptoJS && CryptoJS.hasOwnProperty('default') ? CryptoJS['default'] : CryptoJS;
IOTA = IOTA && IOTA.hasOwnProperty('default') ? IOTA['default'] : IOTA;

function encrypt(seed, data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), seed).toString();
}

function decrypt(seed, encryptedData) {
  var bytes = CryptoJS.AES.decrypt(encryptedData.toString(), seed);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

class Iota {
  constructor(node, seed) {
    this.iota = new IOTA({
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
      })
    })
  }

  getNewAddress() {
    return new Promise((resolve, reject) => {
      return this.iota.api.getNewAddress(this.seed, (err, address) => {
        if (err) {
          return reject(err);
        }
        return resolve(address);
      })
    })
  }

  sendTransfer(transferData) {
    return new Promise((resolve, reject) => {
      return this.iota.api.sendTransfer(this.seed, 4, 9, transferData, (err, transferObject) => {
        if (err) {
          return reject(err);
        }
        return resolve(transferObject);
      })
    })
  }

  extractTransferMessages(accountData) {
    accountData.transfers.forEach((transfer) => {
      debugger;
      let message = this.iota.utils.extractJson(transfer);
      if (message === null) return;
      message = JSON.parse(message);
      if (message.encryptedData) {
        console.log("decrypted message: ", decrypt(this.seed, message.encryptedData));
      }
    });
  }

  fromTrytes(trytes) {
    return this.iota.utils.fromTrytes(trytes)
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
    this.sendTransfer(transferData)
      .then((transferObject) => {
        console.log("transfer object:", transferObject);
        return transferData;
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
}

class Tangly {
  constructor(config) {
    this.seed = config.seed;
    this.node = config.node;
    this.iota = new Iota(this.node, this.seed);
  }

  async insert(data, config) {
    console.log("INSERTING...");
    const encryptedData = encrypt(this.seed, data);
    console.log(`encrypted data: ${encryptedData}`);
    const dataObject = {
      encryptedData
    };
    debugger;
    const attachedData = await this.iota.attachToTangle(dataObject, config);
    console.log("attachedData:", attachedData);

    const decryptedData = decrypt(this.seed, encryptedData);
    console.log(`decrypted data: ${JSON.stringify(decryptedData)}`);
  }

  async find(field) {
    console.log("finding fields...");
    const accountData = await this.iota.getAccountData();
    const messages = this.iota.extractTransferMessages(accountData);
    console.log("account data:", accountData);
  }
}

return Tangly;

})));
//# sourceMappingURL=tangly.js.map
