import { Elecciones } from '../../models/index.js';

// Delete a Elecciones with the specified id in the request
export const deleteEleccionById = async (idEleccion) => {
   try{
      const eliminar = await Elecciones.destroy({
         where: { id: idEleccion }
      })

      if(eliminar !== 1){
         throw (`Ha ocurrido un error al eliminar la eleccion`);
      }

      return {
         status: 200,
         message: 'Eleccion eliminada con exito'
      }

   }catch(ex){
      throw ({
         status: 400,
         message: ex
      });
   }
};
