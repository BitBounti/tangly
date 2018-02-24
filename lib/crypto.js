import aes from 'crypto-js/aes';
import encUTF8 from 'crypto-js/enc-utf8';

export function encrypt(seed, data) {
  return aes.encrypt(JSON.stringify(data), seed);
}

export function decrypt(seed, encryptedData) {
  var bytes = aes.decrypt(encryptedData.toString(), seed);
  return JSON.parse(bytes.toString(encUTF8));
}