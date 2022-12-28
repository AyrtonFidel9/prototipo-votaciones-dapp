import { Socios } from "../../models/index.js";

export default async function buscarSocio (id) {
    try{
        const search = await Socios.findByPk(id);
        if(search === null)
            throw (`No existe el socio con el id: ${id}`);
        else
            return ({
                status: 200,
                message: search,
            });
    }catch(err){
        throw ({
            status: 400,
            message: err
        });
    }
}