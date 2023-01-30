import { Justificacion } from '../../models/index.js';

export const justificacionUpdate = async (idJustificacion, {
  fecha,
  documento,
  idSocio,
  idElecciones,
}) => {
  try{
    const justificacion = await Justificacion.update({
      fecha,
      documento,
      estado,
      idSocio,
      idElecciones,
    },{
      where: {id: idJustificacion}
    })

    if(justificacion[0] === 1)
      return{
        status: 200,
        message: `Datos actualizados correctamente`
      }
    else 
      throw(`Ha ocurrido un error al actualizar los datos`)

  } catch (ex){
    throw ({
      status: 400,
      message: ex
    });
  }
  };