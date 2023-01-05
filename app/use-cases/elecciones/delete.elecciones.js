import { Elecciones } from '../../models/index.js';

// Delete a Elecciones with the specified id in the request
export const deleteEleccionById = async (idEleccion) => {
   try{
      const eliminar = await Elecciones.destroy({
         where: { id: idEleccion }
      })

      if(eliminar !== 1){
         throw (`Ha ocurrido un error al eliminar la elección`);
      }

      return {
         status: 200,
         message: 'Elección eliminada con éxito'
      }

   }catch(ex){
      throw ({
         status: 400,
         message: ex
      });
   }
};
