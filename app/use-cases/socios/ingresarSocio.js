import { Socios } from "../../models/index.js";
import { registrarCuenta } from "../cuenta/index.js";

// verificar que los campos de cedula, codigo, email y celular no estae duplicados
export default async function ingresarSocio(
   { nombres,
      apellidos,
      cedula,
      codigo,
      imagen,
      estado,
      email,
      celular,
      idAgencia,
      billeteraAddress,
   }, ip
) {
   try {
      const socio = await Socios.create({
         nombres: nombres,
         apellidos: apellidos,
         cedula: cedula,
         codigo: codigo,
         imagen: imagen && ('/app/public/images/' + imagen),
         estado: estado,
         email: email,
         celular: celular,
         idAgencia: idAgencia,
         billeteraAddress: billeteraAddress,
      });
      try {
         const account = await registrarCuenta(
            nombres,
            apellidos,
            codigo,
            ip,
            socio.id,
         );

         return {
            status: 200, //OK,
            message: {
               socio: socio.dataValues,
               cuenta: account.message.dataValues
            }
         }
      } catch (err) {
         throw ({
            status: 400,
            message: err,
         });
      }
   }
   catch (err) {
      throw ({
         status: 400,
         message: err,
      });
   }
}