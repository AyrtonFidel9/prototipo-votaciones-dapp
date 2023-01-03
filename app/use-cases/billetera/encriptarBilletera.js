import CryptoJS from "crypto-js";
import * as dotenv from 'dotenv';
dotenv.config();

const secret_key = process.env.SECRET_KEY_WALLET;

function decryptWallet(value){
   const decrypt = CryptoJS.AES.decrypt(value, secret_key);
   return decrypt.toString(CryptoJS.enc.Utf8);
}

function encryptWallet(value){
   return CryptoJS.AES.encrypt(
      value,
      secret_key).toString();
}

export { decryptWallet, encryptWallet };