import { Cuenta, Notificaciones } from "../../models/index.js";

export default async function actualizarNotificacion({
    fecha,
    hora,
    msg,
    estado,
    grado,
}, id){
    try{
        if(!id)
            throw("ID NO PROPORCIONADO");
            
        const noti = await Notificaciones.update({
            fecha: fecha,
            hora: hora,
            msg: msg,
            estado: estado,
            grado: grado,
        },{
            where: {
                id: id,
            }
        });

        return {
            status: 200,
            message: 'Notificacion actualizada'
        }
    }catch(err){
        throw({
            status: 400,
            message: err,
        });
    }
}