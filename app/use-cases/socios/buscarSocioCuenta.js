import { Socios, Cuenta } from "../../models/index.js";
import { sequelize } from "../../database.js";
import { config } from 'dotenv';
config();

export default async function buscarSocioCuenta() {
   try {
      const search = await Socios.findAll({ 
         attributes: [  
            'id', 
            'nombres', 
            'apellidos', 
            'cedula', 
            'codigo', 
            'idAgencia', 
            [sequelize.fn(
               'PGP_SYM_DECRYPT',
               sequelize.cast(sequelize.col('billeteraAddress'), 'bytea'),
               process.env.SECRET_KEY_DATABASE
               ),
               "billeteraAddress"
            ]
         ],
         include: [
            {
               model: Cuenta,
               attributes: ['rol']
            }
         ]
      });
      
      return ({
         status: 200,
         message: search,
      });
   } catch (err) {
      throw ({
         status: 400,
         message: err
      });
   }
}