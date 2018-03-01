import CryptoJS from 'crypto-js';

export function encrypt(seed, data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), seed).toString();
}

export function decrypt(seed, encryptedData) {
  var bytes = CryptoJS.AES.decrypt(encryptedData.toString(), seed);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}