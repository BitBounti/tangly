import IOTA from 'iota.lib.js';

export default class Iota {
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
          console.log(err)
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
      let message = this.iota.utils.extractJson(transfer);
      console.log("Extracted JSON from Transaction: ", message);

      message = JSON.parse(message);
      console.log("JSON: ", message);
    })
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
    }]
    this.sendTransfer(transferData)
      .then((transferObject) => {
        console.log("transfer object:", transferObject);
      })
      .catch((err) => {
        console.log("err", err);
      })
  }
}
