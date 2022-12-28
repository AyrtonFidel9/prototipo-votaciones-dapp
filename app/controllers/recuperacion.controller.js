import { generarCodigo, ingresarRecovery, actualizarRecuperacion } from "../use-cases/recovery/index.js";
import { buscarSocioByPhone } from "../use-cases/socios/index.js";
import messagesController from "./messages.controller.js";

const ingresarRecuperacionController = (req, res) => {
    const { number } = req.params;

    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;

    function searchSocioByPhone(number) {
        return new Promise((resolve, rej) => {
            const buscar = buscarSocioByPhone(number);
            resolve(buscar);
        });
    }

    function setCodeRecovery(dirIp, code, id) {
        return new Promise((resolve, rej) => {
            const  recover = ingresarRecovery(dirIp, code, id);
            resolve(recover);
        });
    }

    const codigo = generarCodigo();

    searchSocioByPhone(number).then((resp) => {
        if(resp.status == 200){
            return resp.message.id;
        }else{
            res.status(resp.status).send({
                message: resp.message
            });
        }
    })
    .then(idSocio => setCodeRecovery(ip,codigo,idSocio))
    .then(code => {
        //enviar mensaje por SMS
        /*messagesController.sendMessage(
            `Su código de recuperación, para reestablecer su contraseña es: ${codigo}`,
            number,
            "RECOVERY" // no valen los espacios, solo alfanumericos
        );*/
        res.status(code.status).send({
            message: code.datos,
        });
    })
    .catch(err => {
        res.status(err.status).send({
            message: err.message
        });
    });
}

const actualizarEstadoCodigoController = (req, res) => {
    const { codigo } = req.params;

    const update = actualizarRecuperacion(true, codigo);
    update.then(resp=>{
        console.log(resp);
        res.status(resp.status).send({
            message: resp.message
        });
    })
    .catch(err=>{
        res.status(err.status).send({
            message: err.message
        });
    });

}

export default Object.freeze({
    ingresarRecuperacion: ingresarRecuperacionController,
    actualizarEstadoCodigo: actualizarEstadoCodigoController, 
});