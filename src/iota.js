import IOTA from 'iota.lib.js';
import { decrypt, generateHash } from './crypto.js';

export default class Iota {
  constructor(node, seed, tagSecret) {
    this.iota = new IOTA({
      'provider': node
    });
    this.seed = seed;
    this.tagSecret = tagSecret;
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
      return this.iota.api.sendTransfer(this.seed, 3, 14, transferData, (err, transferObject) => {
        if (err) {
          return reject(err);
        }
        return resolve(transferObject);
      })
    })
  }

  extractTransferMessages(accountData) {
    return accountData.transfers.reduce((acc, transfer) => {
      let message = this.iota.utils.extractJson(transfer);
      if (message === null) return;

      message = JSON.parse(message);
      if (message.encryptedData) {
        const decryptedMessage = decrypt(this.seed, message.encryptedData);
        decryptedMessage.timestamp = transfer[0].timestamp;
        acc.push(decryptedMessage);

        return acc;
      }
    }, [])
  }

  fromTrytes(trytes) {
    return this.iota.utils.fromTrytes(trytes)
  }

  toTrytes(text) {
    return this.iota.utils.toTrytes(text)
  }

  findTransaction(tag) {
    return new Promise((resolve, reject) => {
      return this.iota.api.findTransactionObjects({ tags: [ tag ]}, (err, transactions) => {
        if (err) {
          console.log(err)
          return reject(err);
        }
        return resolve(transactions);
      })
    })
  }

  generateTag() {
    // use a seed and a secret token to generate a 24 character tryte. 3 extra characters can be added for querying purposes.
    const hash = generateHash(this.seed, this.tagSecret);
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
    }]
    return await this.sendTransfer(transferData)
  }
}
