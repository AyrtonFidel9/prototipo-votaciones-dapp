import { Inscripciones } from '../../models/index.js';

export const inscripcionesUpdate = async (idInscripciones, {
  formulario,
  declaracion,
  estado,
  idAgencia,
  idSocio
}) => {
  try{
    const inscripcion = await Inscripciones.update({

    },{
      where: {id: idInscripciones}
    })

    if(inscripcion[0] === 1)
      return{
        status: 200,
        message: `Datos actualizados correctamente`
      }
    else 
      throw(`Ha ocurrido un error al actualizar los datos`)

  } catch (e){
    throw ({
      status: 400,
      message: ex
    });
  }
  };