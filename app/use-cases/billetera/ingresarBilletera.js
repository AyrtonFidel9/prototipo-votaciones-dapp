import { Billetera } from "../../models/index.js";

export default async function ingresarBilletera(
   {address,
   privateKey,}
) {
   try {
      const wallet = Billetera.create({ address, privateKey });
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