import { encrypt, decrypt } from './crypto';
import Iota from './iota';

export default class Tangly {
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
    console.log("finding fields...")
    const accountData = await this.iota.getAccountData();
    const messages = this.iota.extractTransferMessages(accountData);
    console.log("account data:", accountData);
  }
}
