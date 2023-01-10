import Web3 from "web3";
import * as dotenv from 'dotenv';
dotenv.config();


export default function generarBilletera(){
   const secret_key = process.env.SECRET_KEY_WALLET;
   const web3 = new Web3();
   const wallet = web3.eth.accounts.create();
   const encPrivateKey = web3.eth.accounts.encrypt(wallet.privateKey, secret_key);
   return ({
      address: wallet.address,
      privateKey: encPrivateKey,
   });
}