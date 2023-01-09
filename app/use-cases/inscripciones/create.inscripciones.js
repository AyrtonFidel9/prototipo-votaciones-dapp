import { Inscripciones } from '../../models/index.js';

export const create = async ({
  formulario,
  declaracion,
  estado,
  idAgencia,
  idSocio
}) => {
    // Validate request
    try{
      const inscripcion = await Inscripciones.create({
        formulario,
        declaracion,
        estado,
        idAgencia,
        idSocio
      });
      return({
        status: 200,
        message: inscripcion.dataValues,
      })

    } catch(e){
      throw ({
        status: 400,
        message: e,
      })
    }
  };