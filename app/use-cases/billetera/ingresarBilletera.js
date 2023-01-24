import { Billetera } from "../../models/index.js";
import * as dotenv from 'dotenv';
import { sequelize } from "../../database.js";

dotenv.config();

export default async function ingresarBilletera(
   {address,
   privateKey,}
) {
   try {
      const wallet = await Billetera.create({ 
         address: sequelize.fn('PGP_SYM_ENCRYPT',address,process.env.SECRET_KEY_DATABASE),
         privateKey 
      });
      console.log(wallet);
      return {
         status: 200,
         datos: wallet
      }
   }
   catch (err) {
      throw ({
         status: 400,
         message: err,
      });
   }
}