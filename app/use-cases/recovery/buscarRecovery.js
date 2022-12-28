import { Recuperacion } from "../../models/index.js";

export default async function buscarRecovery(id){
    const rec = await Recuperacion.findByPk(id);
    if(rec === null)
        return {
            status: 404,
            message: `No existe un proceso de recuperación habilitafo`,
        }
    else
    {
        if(rec.isRecuperado)
            return {
                status: 400,
                message: "Código de recuperación no válido",
            }
        
        return {
            status: 200,
            message: rec,
        }
    }
}