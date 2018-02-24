import { encrypt, decrypt } from './crypto';
import Iota from './iota';

export default class Tangly {
  constructor(config) {
    this.seed = config.seed;
    this.node = config.node;
    this.iota = new Iota(this.node);
  }

  async insert(data) {
    console.log("INSERTING...");
    const encryptedData = encrypt(this.seed, data);
    console.log(`encrypted data: ${encryptedData}`);

    const newAddress = await this.iota.getNewAddress(this.seed);
    console.log("new address:", newAddress);

    const decryptedData = decrypt(this.seed, encryptedData);
    console.log(`decrypted data: ${JSON.stringify(decryptedData)}`);
  }
}
