import { create } from "../use-cases/inscripciones/index.js";
import {
    buscarAgencia,
    inscripcionesFindAll,
    inscripcionFindOne,
    deleteInscripcionesById,
    updateInscripciones
} from "../use-cases/index.js";
import { VotacionesController } from "./index.js";
import { Inscripciones } from "../models/inscripcion.model.js";

/**
 * Validar que no haya mas de una Inscripciones por dia en una agencia
 * Validar que no se pueda modificar la Inscripciones una vez este iniciada
 * Trigger cambiar de estado la Inscripciones que ha terminado
 * Quitar la opción de eliminar a las Inscripciones del pasado
 * Validar que la creacion de una Inscripciones se de en el estado no iniciado
 */

function ingresarInscripcionesController(req, res) {
    function searchAgencia(idAgencia) {
        return new Promise((resolve, reject) => {
            const buscar = buscarAgencia(idAgencia);
            resolve(buscar);
        });
    }

    function ingresarInscripciones(datos) {
        return new Promise((resolve, reject) => {
            const ingresar = create(datos);
            resolve(ingresar);
        });
    }

    searchAgencia(req.body.idAgencia)
        .then(agencia => agencia.message.id)
        .then(idAgencia => {
            req.body.idAgencia = idAgencia;
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

function updateInscripcionesController (req, res) {
    const buscarInscripciones = (id) => new Promise((resolve, reject)=>{
        const search = inscripcionFindOne(id);
        resolve(search);
    });

    const actualizar = (id, datos) => new Promise((resolve, reject)=>{
        const up = updateInscripciones(id, datos);
        resolve(up);
    });

    buscarInscripciones(req.params.idInscripciones)
    .then(Inscripciones => {
        if(req.body.estado === 'EN-CURSO')
            VotacionesController.registrarInscripciones(
            Inscripciones.message.id, 
            req.body.dia,
            // req.body.address,
            );
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
        const elim = deleteInscripcionesById(id);
        resolve(elim);
    });

    const buscarInscripciones = (id) => new Promise((resolve, reject)=>{
        const search = InscripcionesfindOne(id);
        resolve(search);
    });

    buscarInscripciones(req.params.idInscripciones)
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
    updateInscripciones: updateInscripcionesController,
    deleteInscripciones: deleteInscripcionesController,
});
