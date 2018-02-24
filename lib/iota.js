import IOTA from 'iota.lib.js';

export default class Iota {
  constructor(node) {
    this.iota = new IOTA({
      'provider': node
    });
  }

  getNewAddress(seed) {
    return new Promise((resolve, reject) => {
      return this.iota.api.getNewAddress(seed, (err, address) => {
        if (err) {
          return reject(err);
        }
        return resolve(address);
      })
    })
  }

  sendTransfer(seed, transferData) {
    return new Promise((resolve, reject) => {
      return this.iota.api.sendTransfer(seed, 4, 9, transferData, (err, transferObject) => {
        if (err) {
          return reject(err);
        }
        return resolve(transferObject);
      })
    })
  }
}
