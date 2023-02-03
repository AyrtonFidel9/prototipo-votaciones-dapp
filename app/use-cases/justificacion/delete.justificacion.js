import { Justificacion } from '../../models/index.js';

// Delete a Justificacion with the specified id in the request
export const justificacionDeleteById = async (idJustificacion) => {
  try{
    const eliminar = await Justificacion.destroy({
      where: { id: idJustificacion }
    })

    if(eliminar !== 1){
      throw (`Ha ocurrido un error al eliminar la justificacion`);
   }

   return {
      status: 200,
      message: 'Justificacion eliminada con éxito'
   }

  } catch(e){
    throw ({
      status: 400,
      message: ex
    });
  };
};