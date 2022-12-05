import { Cuenta, Notificaciones } from "../../models/index.js";

export default async function ingresarNotificaciones({
    fecha,
    hora,
    msg,
    estado,
    grado,
}, idSocio){
    try{
        const cuenta = await Cuenta.findOne({
            where: {
                idSocio: idSocio
            }
        });

        if(cuenta === null)
            throw(`El socio con el id ${idSocio} no existe`);

        const noti = await Notificaciones.create({
            fecha: fecha,
            hora: hora,
            msg: msg,
            estado: estado,
            grado: grado,
            idCuenta: cuenta.id,
        });

        return {
            status: 200,
            datos: noti.dataValues,
        }
    }catch(err){
        throw({
            status: 400,
            message: err,
        });
    }
}