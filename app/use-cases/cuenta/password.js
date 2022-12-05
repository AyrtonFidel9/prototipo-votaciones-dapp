import generator from "generate-password";
import CryptoJS from "crypto-js";

const secret_key = "key-caycne-189321";

function generatePassEncrypt(){
    const passGenerated = generator.generate({
        length: 10,
        numbers: true,
        uppercase: true,
        lowercase: true,
    });
    return CryptoJS.AES.encrypt(
        passGenerated,
        secret_key).toString();
}

function decryptPass(pass){
    const decrypt = CryptoJS.AES.decrypt(pass, secret_key);
    return decrypt.toString(CryptoJS.enc.Utf8);
}
function encryptPass(pass){
    return CryptoJS.AES.encrypt(
        pass,
        secret_key).toString();
}

export { generatePassEncrypt, decryptPass, encryptPass };