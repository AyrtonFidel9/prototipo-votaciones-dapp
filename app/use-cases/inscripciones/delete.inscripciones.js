import { Inscripciones } from '../../models/index.js';

// Delete a Inscripciones with the specified id in the request
export const deleteById = async (idInscripcion) => {
  try{
    const eliminar = await Inscripciones.destroy({
      where: { id: idInscripcion }
    })

    if(eliminar !== 1){
      throw (`Ha ocurrido un error al eliminar la inscripción`);
   }

   return {
      status: 200,
      message: 'Inscripción eliminada con éxito'
   }

  } catch(e){
    throw ({
      status: 400,
      message: ex
    });
  };
};

  // Delete all Inscripciones from the database.
export const deleteAll = async () => {
    try{
      const eliminar = await Inscripciones.destroy({
        where: {},
        truncate: false
      });

      if (eliminar.nums < 0){
        throw (`Ha ocurrido un error al eliminar todas las inscripciones`);
      }

      return {
        status: 200,
        message: `${eliminar.nums} Inscripciones fueron eliminadas correctamente!` 
      }
      
    } catch (e) {
      throw ({
        status: 400,
        message: e
      })
    }
  }