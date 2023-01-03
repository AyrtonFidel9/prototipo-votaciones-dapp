import { Agencias } from "../../models/index.js";

export default async function actualizarAgencia (id, newDatos){
    const {
        nombre,
        ubicacion,
        numRepresentantes,
        numGanadores
    } = newDatos;

    try{
        const data = await Agencias.update({
            nombre: nombre,
            ubicacion: ubicacion,
            numRepresentantes: numRepresentantes,
            numGanadores: numGanadores,
        }, {
            where: {id: id}
        });
        
        return {
            status: 200,
            message: data,
        };
    }catch(err){
        throw ({
            status: 400,
            message: err,
        });
    }    
}