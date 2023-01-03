import { Representantes } from '../../models/index.js';

export const deleteRepresentanteById = async (idRepresentante) => {
   try{
      const eliminar = await Representantes.destroy({
         where: { id: idRepresentante }
      })

      if(eliminar !== 1){
         throw (`Ha ocurrido un error al eliminar al representante`);
      }

      return {
         status: 200,
         message: 'Representante eliminado con exito'
      }
   }catch(ex){
      throw ({
         status: 400,
         message: ex
      });
   }
};
