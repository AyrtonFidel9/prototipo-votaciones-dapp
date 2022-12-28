import { Agencias } from "../../models/index.js";

export default async function buscarAgencia( id ){
    try{
        const agencia = await Agencias.findByPk(id);
        
        if(agencia === null){
            throw({
                status: 404,
                message: `No existe una agencia con el id: ${id}`,
            });
        }else{
            return {
                status: 200,
                message: agencia
            }
        }

    }catch(err){
        throw({
            status: 400,
            message: err,
        });
    }
}