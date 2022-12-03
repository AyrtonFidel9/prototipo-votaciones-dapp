import { Agencias } from "../../models/index.js";

export default async function actualizarAgencia (id, newDatos){
    const {
        nombre,
        ubicacion,
        representantes,
        ganadores
    } = newDatos;

    try{
        const data = await Agencias.update({
            nombre: nombre,
            ubicacion: ubicacion,
            numRepresentantes: representantes,
            numGanadores: ganadores,
        }, {
            where: {id: id}
        });
        
        return {
            status: 200,
            message: 'Datos actualizados correctamente',
        };
    }catch(err){
        throw ({
            status: 400,
            message: err,
        });
    }    
}