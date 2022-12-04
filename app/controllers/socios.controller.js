import { buscarAgencia } from "../use-cases/agencias/index.js";
import { ingresarSocio } from "../use-cases/socios/index.js";

const ingresarSocioController = (req, res) => {

    function searchAgencia(id) {
        return new Promise((res, rej) => {
            const buscar = buscarAgencia(id);
            res(buscar);
        });
    }

    function ingresar(socio) {

        return new Promise((res, rej) => {
            const added = ingresarSocio({ ...socio });
            res(added);
        });
    }
    
    searchAgencia(req.body.idAgencia)
    .then(agencia => {
        agencia.status !== 200 && 
        res.status(agencia.status).send({
            message: agencia.message
        });

        return agencia.message.id;
    })
    .then(id => {
        req.body.idAgencia = id;
        console.log(req.body);
        return ingresar(req.body);
    })
    .then(result=>{
        res.status(result.status).send({
            message: result.message,
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(err.status).send({
            message: err.message
        })
    });
}


export default Object.freeze({
    ingresarSocio: ingresarSocioController
});