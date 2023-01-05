import { Inscripciones } from '../../models/index.js';


export const inscripcionesFindAll = async () => {
  try{
    const inscripciones = await Inscripciones.findAll();

    return ({
      status: 200,
      message: inscripciones,
    })
  } catch (e) {
    throw ({
      status: 400,
      message: e
    })
  } 
};
  
  // Find a single Incripciones with an id
  export const findOne = async (id) => {
    try{
      const inscripcion = await Incripciones.findByPk(id)
      if (inscripcion === null)
        throw(
          `No existe una elección con el id: ${id}`
        )
      else 
        return ({
          status: 200,
          message: inscripcion
        })
    } catch (e) {
      throw ({
        status: 400,
        message: e
     });
    }
  };