import { justificacionFindEleccionaAndSocio } from "../../use-cases/index.js";

async function validarJustificacion(req, res, next){

    let { idEleccion, idSocio } = req.body;
    
    try{
        const resp = await justificacionFindEleccionaAndSocio(idSocio, idEleccion);
        if(resp){
            next();
        }else{
            return res.status(400).send({
                message: 'Solo se puede tener una justificación por elección'
            });
        }
    }catch(err){
        return res.status(err.status).send({
            message: err.message
        });
    }
}

export { validarJustificacion };