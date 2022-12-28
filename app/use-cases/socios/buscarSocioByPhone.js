import { Socios } from "../../models/index.js";

export default async function buscarSocioByPhone (phoneNumber) {
    const search = await Socios.findOne({
        where: { celular: phoneNumber },
    });
    if(search === null)
        return {
            status: 404,
            message: `El número no se encuentra registrado en el sistema`,
        }
    else{
        if(search.estado){
            return {
                status: 200,
                message: search,
            }
        }else{
            return {
                status: 400,
                message: 'No se encuentra habilitado para realizar esta acción',
            }
        }
    }
}