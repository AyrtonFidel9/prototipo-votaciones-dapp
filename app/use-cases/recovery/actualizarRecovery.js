import { Recuperacion } from "../../models/index.js";

export default async function actualizarRecuperacion(isRecuperado, codigo){
    try{
        if(!codigo)
            throw("CODIGO NO PROPORCIONADO");

        const busqueda = await Recuperacion.findOne({
            where: {
                codigo: codigo,
            }
        });

        if(busqueda === null)
            throw("El código no es válido");
        
        if(busqueda.dataValues.isRecuperado)
            throw("El código no es válido");
            
        const rec = await Recuperacion.update({
            isRecuperado: isRecuperado,
        },{
            where: {
                id: busqueda.dataValues.id
            }
        });

        return {
            status: 200,
            message: true
        }
    }catch(err){
        throw({
            status: 400,
            message: err,
        });
    }
}