import { Representantes } from '../../models/index.js';

export const updateRepresentante = async (idRepresentante, {
   principal,
   psuplente,
   ssuplente,
   idInscripcion,
   idElecciones,
   ethCantVot
}) => {
   try {
      const representante = await Representantes.update({
         principal,
         psuplente,
         ssuplente,
         idInscripcion,
         idElecciones,
         ethCantVot
      },{
         where: { id: idRepresentante}
      })

      if(representante[0] === 1)
         return {
            status: 200,
            message: 'Datos actualizados correctamente',
         };
      else 
         throw("Ha ocurrido un error al actualizar los datos");
   } catch (ex) {
      throw ({
         status: 400,
         message: ex
      });
   }
};