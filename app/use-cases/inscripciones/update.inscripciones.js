import { Inscripciones } from '../../models/index.js';

export const inscripcionesUpdate = async (idInscripcion, {
  formulario,
  declaracion,
  estado,
  idAgencia,
  idSocio,
  nombre,
  idElecciones,
}) => {
  try{
    const inscripcion = await Inscripciones.update({
      formulario,
      declaracion,
      estado,
      idAgencia,
      idSocio,
      nombre,
      idElecciones,
    },{
      where: {id: idInscripcion}
    })

    if(inscripcion[0] === 1)
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