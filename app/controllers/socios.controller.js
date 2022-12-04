import { buscarAgencia } from "../use-cases/agencias/index.js";
import { 
    ingresarSocio,
    buscarSocio
} from "../use-cases/socios/index.js";
import fs from 'fs';

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
        return ingresar(req.body);
    })
    .then(result=>{
        res.status(result.status).send({
            message: result.message,
        })
    })
    .catch(err=>{
        
        const __dirname = process.cwd();

        fs.unlinkSync( __dirname+err.message.errors[0].instance.imagen);

        res.status(err.status).send({
            message: err.message
        })
    });
}


const buscarSocioController =  (req, res) => {
    const { idSocio } = req.params;

    const search = buscarSocio(idSocio);

    search.then(resp => {
        res.status(resp.status).send({
            message: resp.message
        });
    })
}

export default Object.freeze({
    ingresarSocio: ingresarSocioController,
    buscarSocio: buscarSocioController,
});