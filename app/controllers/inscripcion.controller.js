import {
    inscripcionesCreate,
    inscripcionesFindAll,
    inscripcionFindOne,
    inscripcionesDeleteById,
    inscripcionesUpdate,
    buscarSocio
} from "../use-cases/index.js";
import { VotacionesController } from "./index.js";

/**
 * Asociar isncripciones con la eleccion
 * Notificar el estado de la inscripcion
 */

function ingresarInscripcionesController(req, res) {

    console.log(req.body);

    function searchSocio(id) {
        return new Promise((resolve, reject) => {
            const buscar = buscarSocio(id);
            resolve(buscar);
        });
    }

    function ingresarInscripciones(datos) {
        return new Promise((resolve, reject) => {
            const ingresar = inscripcionesCreate(datos);
            resolve(ingresar);
        });
    }

    searchSocio(req.body.idSocio)
        .then(socio =>{
            const us = socio.message.dataValues;
            req.body.idSocio = us.id;
            req.body.nombre = `${new Date().toLocaleDateString()}-${us.nombres} ${us.apellidos}`;
            return ingresarInscripciones(req.body);
        })
        .then(result => {
            return res.status(result.status).send({
                message: result.message,
            });
        })
        .catch(err => {
            return res.status(err.status).send({
                message: err.message
            })
        });
}

function getAllInscripcionesController(req, res) {
    const buscar = inscripcionesFindAll();

    buscar.then(Inscripciones => {
        if (Inscripciones.status === 200)
            return res.status(Inscripciones.status).send({
                message: Inscripciones.message
            });
    }).catch(err => {
        return res.status(err.status).send({
            message: err.message
        });
    });
}

function getInscripcionesController(req, res) {
    const { idInscripciones } = req.params;

    const search = inscripcionFindOne(idInscripciones);

    search.then(resp => {
        res.status(resp.status).send({
            message: resp.message
        });
    }).catch(err => {
        return res.status(err.status).send({
            message: err.message
        });
    });
}

function inscripcionesUpdateController (req, res) {
    const buscarInscripciones = (id) => new Promise((resolve, reject)=>{
        const search = inscripcionFindOne(id);
        resolve(search);
    });

    const actualizar = (id, datos) => new Promise((resolve, reject)=>{
        const up = inscripcionesUpdate(id, datos);
        resolve(up);
    });

    
    buscarInscripciones(req.params.idInscripcion)
    .then(Inscripciones => {
        return actualizar(Inscripciones.message.id, req.body)
    })
    .then(resp=>{
        res.status(resp.status).send({
            message: resp.message
        });
    }).catch(err => {
        console.log(err);
        return res.status(err.status).send({
            message: err.message
        });
    });
}


function deleteInscripcionesController (req, res) {
    const eliminar = (id) => new Promise((resolve, reject)=>{
        const elim = inscripcionesDeleteById(id);
        resolve(elim);
    });

    const buscarInscripciones = (id) => new Promise((resolve, reject)=>{
        const search = InscripcionesfindOne(id);
        resolve(search);
    });

    buscarInscripciones(req.params.idInscripcion)
    .then(Inscripciones => eliminar(Inscripciones.message.id))
    .then(resp=>{
        res.status(resp.status).send({
            message: resp.message
        });
    }).catch(err => {
        console.log(err);
        return res.status(err.status).send({
            message: err.message
        });
    });
}

export default Object.freeze({
    ingresarInscripciones: ingresarInscripcionesController,
    getAllInscripciones: getAllInscripcionesController,
    getInscripciones: getInscripcionesController,
    inscripcionesUpdate: inscripcionesUpdateController,
    deleteInscripciones: deleteInscripcionesController,
});
