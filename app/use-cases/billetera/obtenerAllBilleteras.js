import { Billetera } from "../../models/index.js";
import { sequelize } from "../../database.js";
import { config } from 'dotenv';
config();

export async function obtenerAllBilleteras() {
   try {
      const billetera = await Billetera.findAll({
         attributes: [
            [
               sequelize.fn(
                  'PGP_SYM_DECRYPT',
                  sequelize.cast(sequelize.col('address'), 'bytea'),
                  process.env.SECRET_KEY_DATABASE
               ),
               "address"
            ],
            'privateKey'
         ],
      });

      if (billetera === null) {
         throw (`No existe la billetera solicitada`);
      } else {
         return {
            status: 200,
            message: billetera
         }
      }
   } catch (err) {
      throw ({
         status: 400,
         message: err,
      });
   }
}