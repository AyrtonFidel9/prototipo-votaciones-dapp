import { Socios, Cuenta } from "../../models/index.js";

export default async function buscarSocioCuenta() {
   try {

      const search = await Socios.findAll({ 
         attributes: ['id', 'nombres', 'apellidos', 'cedula', 'codigo', 'idAgencia'],
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