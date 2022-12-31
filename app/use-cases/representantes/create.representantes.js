import { Representantes } from "../../models/index.js";


const createRepresentante = async ({
   principal,
   psuplente,
   ssuplente,
   idInscripcion,
   idElecciones,
   ethCantVot
}) => {
   try {
      const representante = await Representantes.create({
         principal,
         psuplente,
         ssuplente,
         idInscripcion,
         idElecciones,
         ethCantVot
      })

      return {
         message: 'Representantes ingresados correctamente',
         status: 200,
         datos: representante,
      }
   }
   catch (err) {
      throw ({
         message: err,
         status: 400
      });
   }
}

export { createRepresentante };