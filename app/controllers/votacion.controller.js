import Web3 from "web3";
import fs from 'fs';
import * as dotenv from 'dotenv';
import { obtenerAllBilleteras } from "../use-cases/index.js";
dotenv.config();

const web3 = new Web3(`${process.env.URL_MAINNET}`);
const VoteToken = JSON.parse(fs.readFileSync(
   new URL('../../build/contracts/VoteToken.json',
      import.meta.url)
));
const voteToken = new web3.eth.Contract(VoteToken.abi, process.env.ADDRESS_SMARTCONTRACT);

const getGasAmount = async (fromAddress, toAddress, amount, data) => {
   const toWei = web3.utils.toWei(`${amount}`);
   const nonce = await web3.eth.getTransactionCount(fromAddress, 'latest');
   const gasAmount = await voteToken.methods.transfer(toAddress, toWei).estimateGas({
      from: fromAddress,
      nonce: nonce, 
      data: data,
   });
   return gasAmount;
}

const validarExistenciaEleccionController = async (id, address) => {
   const valor = await voteToken.methods.elecciones(id).call({
      from: address,
   });
   return (valor.idEleccion == 0);
}

const registrarEleccionController = async (id, dia, address, res) => {
   const wallet = await obtenerAllBilleteras();

   const billeteraJGE = wallet.message.filter(r =>
      r.dataValues.address === address)[0].dataValues;

   const privateKeyJGE = web3.eth.accounts.decrypt(
      billeteraJGE.privateKey,
      process.env.SECRET_KEY_WALLET
   ).privateKey;

   try {
      const gasPrice = await web3.eth.getGasPrice();
      const gas = await voteToken.methods.agregarEleccion(id, dia).estimateGas({
         from: address,
      });
      web3.eth.accounts.wallet.add(`${privateKeyJGE}`);
      const value = await voteToken.methods.agregarEleccion(id, dia).send({
         from: address,
         gasPrice: gasPrice,
         gas: gas,
      });
      console.log(value);
   } catch (e) {
      console.log(e);
      // return res.status(400).send({
      //    message: "Error al registrar la elección verifique los datos o que existan los recursos de votaciones (ethers)"
      // });
      throw({status: 400, 
         message:"Error al registrar la elección verifique los datos o que existan los recursos de votaciones (ethers)"});
   }
}

const sufragarController = async (req, res) => {

   web3.eth.handleRevert = true;

   const { idEleccion, walletRep, walletSocio } = req.body;

   const gasPrice = await web3.eth.getGasPrice();
   const wallet = await obtenerAllBilleteras();

   const balanceSocio = await voteToken.methods.balanceOf(walletSocio).call();
   const balanceSocWei = web3.utils.fromWei(balanceSocio);

   if (balanceSocWei > 0) {

      const billeteraRep = wallet.message.filter(r =>
         r.dataValues.address === walletRep)[0].dataValues;
      const privateKeyRep = web3.eth.accounts.decrypt(
         billeteraRep.privateKey,
         process.env.SECRET_KEY_WALLET
      ).privateKey;

      web3.eth.accounts.wallet.add(`${privateKeyRep}`);

      const nonce = await web3.eth.getTransactionCount(walletSocio, 'latest');
      const data = await voteToken.methods.sufragar(idEleccion, walletRep).encodeABI();
      const gas = await getGasAmount(walletSocio, walletRep, 1, data);
      console.log({gas, gasPrice});
      const transaction = {
         'to': process.env.ADDRESS_SMARTCONTRACT,
         'gasLimit': gas*100,
         'gasPrice': gasPrice,
         'nonce': nonce,
         'data': data,
      }

      const billeteraSocio = wallet.message.filter(r =>
         r.dataValues.address === walletSocio)[0].dataValues;
      const privateKeySocio = web3.eth.accounts.decrypt(
         billeteraSocio.privateKey,
         process.env.SECRET_KEY_WALLET
      ).privateKey;

      const signTrx = await web3.eth.accounts.signTransaction(
         transaction,
         privateKeySocio
      );
      try {
         const voting = await web3.eth.sendSignedTransaction(
            signTrx.rawTransaction
         );
         console.log(voting);
         return res.status(200).send({
            message: voting,
         })
      } catch (err) {
         console.log(err);
         return res.status(400).send({
            message: err,
         })
      }
   } else {
      return res.status(400).send({
         message: 'No tiene un voto asignado para poder sufragar',
      })
   }
}

const enviarTokenController = async (req, res) => {
   const { addressOwner, addressSocio } = req.body;

   //comprobar que el balance no sea 0 del owner
   const balanceSocio = await voteToken.methods.balanceOf(addressSocio).call();
   const balanceSocWei = web3.utils.fromWei(balanceSocio);

   const gasPrice = await web3.eth.getGasPrice();
   const wallet = await obtenerAllBilleteras();

   if (balanceSocWei == 0) {
      const walletSocio = wallet.message.filter(r =>
         r.dataValues.address === addressSocio)[0].dataValues;
      const privateKeySocio = web3.eth.accounts.decrypt(
         walletSocio.privateKey,
         process.env.SECRET_KEY_WALLET
      ).privateKey;

      web3.eth.accounts.wallet.add(`${privateKeySocio}`);

      const nonce = await web3.eth.getTransactionCount(addressOwner, 'latest');
      const toWei = web3.utils.toWei('1');
      const data = voteToken.methods.transfer(addressSocio, toWei).encodeABI();
      const gas = await getGasAmount(addressOwner, addressSocio, 1, data);

      const transaction = {
         'to': process.env.ADDRESS_SMARTCONTRACT,
         'gasLimit': gas,
         'gasPrice': gasPrice,
         'nonce': nonce,
         'data': data,
      }

      const walletOwner = wallet.message.filter(r =>
         r.dataValues.address === addressOwner)[0].dataValues;
      const privateKeyOwner = web3.eth.accounts.decrypt(
         walletOwner.privateKey,
         process.env.SECRET_KEY_WALLET
      ).privateKey;

      const signTrx = await web3.eth.accounts.signTransaction(
         transaction,
         privateKeyOwner
      );

      web3.eth.sendSignedTransaction(
         signTrx.rawTransaction,
         (err, hash) => {
            if (err) {
               return res.status(400).send({
                  message: err,
               })
            } else {
               return res.status(200).send({
                  message: hash
               })
            }
         }
      );

   } else {
      return res.status(400).send({
         message: 'Ha ocurrido un error al enviar el token'
      })
   }
}

const enviarEtherController = async (req, res) => {
   const { addressOwner, addressSocio } = req.body;

   const gasPrice = await web3.eth.getGasPrice();
   const wallet = await obtenerAllBilleteras();

   const walletSocio = wallet.message.filter(r =>
      r.dataValues.address === addressSocio)[0].dataValues;

   const privateKeySocio = web3.eth.accounts.decrypt(
      walletSocio.privateKey,
      process.env.SECRET_KEY_WALLET
   ).privateKey;

   web3.eth.accounts.wallet.add(`${privateKeySocio}`);

   const nonce = await web3.eth.getTransactionCount(addressOwner, 'latest');
   const toWei = web3.utils.toWei('0.0008', 'ether');

   const transaction = {
      'from': addressOwner,
      'to': addressSocio,
      'gasLimit': 1000000,
      'gasPrice': gasPrice,
      'nonce': nonce,
      'value': toWei,
   }

   const walletOwner = wallet.message.filter(r =>
      r.dataValues.address === addressOwner)[0].dataValues;

   const privateKeyOwner = web3.eth.accounts.decrypt(
      walletOwner.privateKey,
      process.env.SECRET_KEY_WALLET
   ).privateKey;

   const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKeyOwner);

   web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
      (err, hash) => {
         console.log(hash);
         if (err) {
            return res.status(400).send({
               message: err,
            })
         } else {
            return res.status(200).send({
               message: hash
            })
         }
      }
   );   
}


const retornarBalanceController = async (req, res) => {
   try{

      const { wallet } = req.params;
      const balance = await voteToken.methods.balanceOf(wallet).call();
      const balanceWei = web3.utils.fromWei(balance);
   
      const balanceETH = await web3.eth.getBalance(wallet);
      const balanceWeiETH = web3.utils.fromWei(balanceETH);
   
      res.status(200).send({
         ethers: balanceWeiETH,
         BNE: balanceWei,
      });
   }catch(ex){
      console.log(ex);
   }
}


const validarSufragioVotanteController = async (req, res) => {
   
   try{
      const { idEleccion, wallet} = req.body;
   
      const valor = await voteToken.methods.haveVoteReceived(
         idEleccion,
         wallet,
      ).call();
      
      res.status(200).send({
         yaVoto: valor,
      });
   }catch(ex){
      console.log(ex);
   }
}

export default Object.freeze({
   registrarEleccion: registrarEleccionController,
   validarExistenciaEleccion: validarExistenciaEleccionController,
   enviarToken: enviarTokenController,
   sufragar: sufragarController,
   retornarBalance: retornarBalanceController,
   validarSufragioVotante: validarSufragioVotanteController,
   enviarEther: enviarEtherController,
});