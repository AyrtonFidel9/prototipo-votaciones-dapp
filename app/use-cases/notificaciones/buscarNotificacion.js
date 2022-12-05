import { Notificaciones } from "../../models/index.js";

export default async function buscarNotificacion(id){
    const noti = await Notificaciones.findByPk(id);
    if(noti === null)
        return {
            status: 404,
            message: `No existe la notificacion con el id: ${id}`,
        }
    else
        return {
            status: 200,
            message: noti,
        }
}