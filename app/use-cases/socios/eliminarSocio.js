import { Socios } from "../../models/index.js";

export default async function eliminarSocio (id){
    try{
        await Socios.destroy({
            where: {id: id}
        });

        return {
            status: 200,
            message: 'El socio ha sido eliminado satisfactoriamente'
        };
    }catch(err){
        throw ({
            status: 400,
            message: err
        });
    }
}