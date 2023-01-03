import Web3 from "web3";
import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();
const web3 = new Web3(`${process.env.URL_TESTNET}/${process.env.INFURA_API_KEY}`);
const VoteToken = JSON.parse(fs.readFileSync(
   new URL('../../build/contracts/VoteToken.json', 
   import.meta.url)
));
const voteToken = new web3.eth.Contract(VoteToken.abi, process.env.ADDRESS_SMARTCONTRACT);

const emitirVotoController = async (req, res) => {
   console.log(req.body);
   const valor = await voteToken.methods.elecciones(1).call({
      from: '0x61634F5036737de8f15d36d7A476D21B52A43538'});
   console.log(valor);
   res.send(voteToken); 
}

const registrarEleccionController = async (id, dia, address) => {
   // recolectar el address de quien registar la eleccion
   web3.eth.accounts.wallet.add('e3cfe4fa8807091781651e8ac5acf488797e26e9b8a55d18ef2c2371154e7b7b');
   const eleccion = await voteToken.methods.agregarEleccion(id, dia).send({
      from: '0x61634F5036737de8f15d36d7A476D21B52A43538',
      gasPrice: 100,
      gas: 5000000,
   });
}

export default Object.freeze({
   emitirVoto: emitirVotoController,
   registrarEleccion: registrarEleccionController,
});