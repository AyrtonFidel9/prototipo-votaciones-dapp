import { Elecciones } from '../../models/index.js';

export const updateEleccion = async (idEleccion, {
   nombre,
   dia,
   hora,
   duracion,
   estado,
   idAgencia,
}) => {
   try {
      const eleccion = await Elecciones.update({
         nombre,
         dia,
         hora,
         duracion,
         estado,
         idAgencia
      },{
         where: { id: idEleccion}
      })

      if(eleccion[0] === 1)
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