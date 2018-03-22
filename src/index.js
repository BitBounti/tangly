import { encrypt, decrypt, generateTag, generateSecretKey, seedGen } from './crypto';
import Iota from './iota';
import { untangle } from './util/format';

export default class Tangly {
  constructor(config) {
    this.seed = config.seed;
    this.node = config.node;
    this.tagSecret = config.tagSecret;
    this.iota = new Iota(this.node, this.seed, this.tagSecret);
  }

  createTag() {
    return this.iota.generateTag();
  }

  async searchTag(tag) {
    return await this.iota.findTransaction(tag);
  }

  generateSeed() {
    return seedGen(81);
  }

  async insert(data, options) {
    console.log("INSERTING...");
    const encryptedData = encrypt(this.seed, data);
    console.log(`encrypted data: ${encryptedData}`);
    const dataObject = { encryptedData };
    const attachedData = await this.iota.attachToTangle(dataObject, options);

    return attachedData;
  }

  async find(field, options={ history: true, timestamp: true }) {
    console.log("finding fields...")
    const accountData = await this.iota.getAccountData();
    const rawMessages = this.iota.extractTransferMessages(accountData);
    const formattedData = untangle(rawMessages, options);

    return formattedData;
    console.log(`raw messages: ${JSON.stringify(rawMessages)}`);
  }
}
