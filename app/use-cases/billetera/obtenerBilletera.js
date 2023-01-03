import { Billetera } from "../../models/index.js";

export default async function obtenerBilletera(address) {
   try {
      const billetera = await Billetera.findByPk(address);

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