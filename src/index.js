import { encrypt, decrypt, generateTag, generateSecretKey } from './crypto';
import Iota from './iota';
import { untangle } from './util/format';

export default class Tangly {
  constructor(config) {
    this.seed = config.seed;
    this.node = config.node;
    this.tagSecret = config.tagSecret;
    this.iota = new Iota(this.node, this.seed, this.tagSecret);
  }

  createTag(tagSuffix) {
    return this.iota.generateTag(tagSuffix);
  }

  async searchTag(tag) {
    return await this.iota.findTransaction(tag);
  }

  async insert(data, options) {
    console.log("INSERTING...");
    const encryptedData = encrypt(this.seed, data);
    console.log(`encrypted data: ${encryptedData}`);
    const dataObject = { encryptedData };
    const attachedData = await this.iota.attachToTangle(dataObject, options);

    return attachedData;
  }

  async find(field, options={ history: false, timestamp: true }) {
    console.log("finding fields...")
    const accountData = await this.iota.getAccountData();
    console.log(`accountData: ${ JSON.stringify(accountData) }`);
    const rawMessages = this.iota.extractTransferMessages(accountData);
    const formattedData = untangle(rawMessages, options);

    return formattedData;
    console.log(`raw messages: ${JSON.stringify(rawMessages)}`);
  }
}
