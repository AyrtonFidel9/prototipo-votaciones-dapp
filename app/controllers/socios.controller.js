import { buscarAgencia } from "../use-cases/agencias/index.js";

import { 
    ingresarSocio,
    buscarSocio,
    actualizarSocio,
    eliminarSocio,
    buscarSocioByPhone,
    buscarAllSocios,
    buscarSocioCuenta,
} from "../use-cases/socios/index.js";
import fs from 'fs';


const ingresarSocioController = (req, res) => {
    function searchAgencia(id) {
        return new Promise((resolve, rej) => {
            const buscar = buscarAgencia(id);
            resolve(buscar);
        });
    }

    function ingresar(socio) {
        return new Promise((resolve, rej) => {
            const added = ingresarSocio({ ...socio }, 
                req.headers['x-real-ip'] || req.connection.remoteAddress);
            resolve(added);
        });
    }

    searchAgencia(req.body.idAgencia)
    .then(agencia => {
        return agencia.message.id;
    })
    .then(id => {
        req.body.idAgencia = id;
        return ingresar(req.body);
    })
    .then(result=>{
        return res.status(result.status).send({
            message: result.message,
        })
    })
    .catch(err=>{
        if(err.message.errors){
            const __dirname = process.cwd();
            fs.unlinkSync( __dirname+err.message.errors[0].instance.imagen);
        }
        return res.status(err.status).send({
            message: err.message
        })
    });
}

const actualizarSocioController = (req, res) => {

    const { idSocio } = req.params;

    function searchSocio (id){
        return new Promise((res, rej)=>{
            const buscar = buscarSocio(id);
            res(buscar);
        });
    }

    function updateSocio(id, oldImage, newSocio){
        return new Promise((res, rej)=>{
            const updated = actualizarSocio(
                id, 
                oldImage, 
                {...newSocio}
            );
            res(updated);
        });
    }
    searchSocio(idSocio).then(socio => {
        return socio.message;
    })
    .then(datos => updateSocio(datos.id, datos.imagen, req.body))
    .then(result=>{
        return res.status(result.status).send({
            message: result.message,
        })
    })
    .catch(err=>{
        return res.status(err.status).send({
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

const eliminarSocioController = (req, res) => {
    const { idSocio } = req.params;

    if(!idSocio)
        res.status(400).send({
            message: "Ha ocurrido un error"
        });

    function search (id){
        return new Promise((res, rej)=>{
            const buscar = buscarSocio(id);
            res(buscar);
        });
    }

    function eliminar (id){
        return new Promise((res, rej)=>{
            const deleted = eliminarSocio(id);
            res(deleted);
        });
    }

    search(idSocio).then(socio=>{
        if(socio.status !== 200){
            res.status(socio.status).send({
                message: socio.message
            });
        }
        return socio.message.id;
    })
    .then(id => eliminar(id))
    .then(resp => {
        res.status(resp.status).send({
            message: resp.message,
        });
    })
    .catch(err=>{
        res.status(err.status).send({
            message: err.message
        });
    });    
}

function existSocioByPhoneController (req, res) {
    const { number } = req.params;

    const search = buscarSocioByPhone(number);

    search.then(resp => {
        if(resp.status == 200){
            res.status(200).send({
                message: {
                    existe: true,
                    idSocio: resp.message.id,
                }
            });
        }else{
            res.status(resp.status).send({
                message: resp.message
            });
        }
    }).catch(err=>{
        console.log(err);
    })
}

function buscarAllSociosController (req, res) {

    const buscar = buscarAllSocios();

    buscar.then(socios=>{
        if(socios.status === 200)
            res.status(socios.status).send({
                message: socios.message
            });
    }).catch(err=>{
        res.status(err.status).send({
            message: err.message
        });
    });    
}

function buscarSocioCuentaController (req, res) {

    const buscar = buscarSocioCuenta();

    buscar.then(socios=>{
        if(socios.status === 200)
            res.status(socios.status).send({
                message: socios.message
            });
    }).catch(err=>{
        console.log(err);
        // res.status(err.status).send({
        //     message: err.message
        // });
    });    
}

export default Object.freeze({
    ingresarSocio: ingresarSocioController,
    buscarSocio: buscarSocioController,
    actualizarSocio: actualizarSocioController,
    eliminarSocio: eliminarSocioController,
    existSocioByPhone: existSocioByPhoneController,
    buscarAllSocios: buscarAllSociosController,
    buscarSocioCuenta: buscarSocioCuentaController,
});