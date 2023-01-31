import { Justificacion } from '../../models/index.js';

export const justificacionFindAll = async () => {
  try{
    const justificacion = await Justificacion.findAll();

    return ({
      status: 200,
      message: justificacion,
    })
  } catch (e) {
    throw ({
      status: 400,
      message: e
    })
  } 
};
  
// Find a single Incripciones with an id
export const justificacionFindOne = async (id) => {
  try{
    const justificacion = await Justificacion.findByPk(id)
    if (justificacion === null)
      throw(
        `No existe una justificacion con el id: ${id}`
      )
    else 
      return ({
        status: 200,
        message: justificacion
      })
  } catch (e) {
    throw ({
      status: 400,
      message: e
    });
  }
};

// Find a single Incripciones with an id
export const justificacionFindEleccionaAndSocio = async (idSocio, idEleccion) => {
  try{
    const justificacion = await Justificacion.findOne({
      where: {
        idSocio: idSocio,
        idEleccion: idEleccion,
      }
    });
    if (justificacion === null)
      return true;
    else 
      return false;
  } catch (e) {
    throw ({
      status: 400,
      message: e
    });
  }
};