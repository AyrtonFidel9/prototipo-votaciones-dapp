import fs from 'fs';
import path from 'path';
import { Socios } from "../../models/index.js";

export default async function actualizarSocio (
    id,
    oldImage, 
    {
        nombres,
        apellidos,
        cedula,
        codigo,
        imagen,
        estado,
        email,
        celular,
        idAgencia
    }){

    
    if(oldImage !== ('/app/public/images/'+imagen)){
        imagen = path.join('/app/public/images/',imagen);
        oldImage == null || oldImage == '' || fs.unlinkSync('.'+oldImage);        
    }else{
        imagen = oldImage;
    }
    
    try{
        const socio = await Socios.update({
            nombres: nombres,
            apellidos: apellidos,
            cedula: cedula,
            codigo: codigo,
            imagen: imagen,
            estado: estado,
            email: email,
            celular: celular,
            idAgencia: idAgencia,
        },{
            where: {id: id}
        });

        return {
            status: 200,
            message: "Datos actualizados con exito",
        }
    }catch(err){
        throw ({
            status: 400,
            message: err,
        })
    }
}


export async function actualizarEstadoSocio (
    id,
    estado){

    try{
        const socio = await Socios.update({

            estado: estado,

        },{
            where: {id: id}
        });

        return {
            status: 200,
            message: "Datos actualizados con exito",
        }
    }catch(err){
        throw ({
            status: 400,
            message: err,
        })
    }
}