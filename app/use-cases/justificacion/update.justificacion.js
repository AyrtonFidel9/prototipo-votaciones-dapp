import { Justificacion } from '../../models/index.js';
import fs from 'fs';
import path from 'path';


export const justificacionUpdate = async (idJustificacion, oldDoc, {
  fecha,
  documento,
  idSocio,
  idElecciones,
  estado,
}) => {

  
  try{
    console.log(oldDoc);
    if(oldDoc !== ('/app/public/docs/justificacion/'+documento)){
      oldDoc == null || oldDoc == '' || fs.unlinkSync('./app/public/docs/justificacion/'+oldDoc);        
    }else{
      documento = oldDoc;
    }

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