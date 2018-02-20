import CryptoJS from 'crypto-js';
import Iota from '../src/iota';

const iota = new IOTA();

export function encrypt(seed, data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), seed).toString();
}

export function decrypt(seed, encryptedData) {
  var bytes = CryptoJS.AES.decrypt(encryptedData.toString(), seed);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export function generateSecretKey() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

export function generateHash(seed, secret) {
  return CryptoJS.SHA256(secret + seed).toString()
}

export function seedGen(length) {
  var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
  var i;
  var result = "";
  if (window.crypto && window.crypto.getRandomValues) {
    var values = new Uint32Array(length);
    window.crypto.getRandomValues(values);
    for (i = 0; i < length; i++) {
      result += charset[values[i] % charset.length];
    }
    return result;
  } else
    throw new Error(
      "Your browser sucks and can't generate secure random numbers"
    );
};

export function generateTag(seed, secret, tagSuffix="999") {
  // use a seed and a secret token to generate a 24 character tryte. 3 extra characters can be added for querying purposes.
  const hash = CryptoJS.SHA256(secret + seed).toString();
  const trytes = iota.utils.toTrytes(hash);
  const trimmedTrytes = trytes.slice(0, 24);
  const finalTag = trimmedTrytes + tagSuffix;

  return finalTag;
}