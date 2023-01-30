import { Justificacion } from '../../models/index.js';

export const justificacionCreate = async ({
  nombre,
  fecha,
  documento,
  idSocio,
  estado,
  idEleccion,
}) => {
    // Validate request
    try{
      const justificaciones = await Justificacion.create({
        nombre,
        fecha,
        documento,
        estado,
        idSocio,
        idEleccion,
      });
      return({
        status: 200,
        message: justificaciones.dataValues,
      })

    } catch(e){
      throw ({
        status: 400,
        message: e,
      })
    }
  };