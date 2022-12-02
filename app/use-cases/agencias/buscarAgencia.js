import { Agencias } from "../../models/index.js";

export default async function buscarAgencia( id ){
    const agencia = await Agencias.findByPk(id);
    if(agencia === null){
        return {
            status: 404,
            message: `No existe una agencia con el id: ${id}`,
        }
    }else{
        return {
            status: 200,
            message: agencia
        }
    }
}