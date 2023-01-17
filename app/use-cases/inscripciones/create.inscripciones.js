import { Inscripciones } from '../../models/index.js';

export const inscripcionesCreate = async ({
  formulario,
  declaracion,
  estado,
  idAgencia,
  idSocio,
  nombre,
  idElecciones,
}) => {
    // Validate request
    try{
      const inscripcion = await Inscripciones.create({
        formulario,
        declaracion,
        estado,
        idAgencia,
        idSocio,
        nombre,
        idElecciones,
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