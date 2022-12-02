import { Agencias } from "../../models/index.js";

export default async function ingresarAgencia(
    nombre,
    ubicacion,
    representantes,
    ganadores
) {
    try
    {
        const agencia = await Agencias.create({
            nombre: nombre,
            ubicacion: ubicacion,
            numRepresentantes: representantes,
            numGanadores: ganadores,
        })
        return {
            message: 'Agencia ingresada correctamente',
            status: 200,
            datos: agencia
        }
    }
    catch(err){
        throw ({
            message: err,
            status: 400
        });
    }
}