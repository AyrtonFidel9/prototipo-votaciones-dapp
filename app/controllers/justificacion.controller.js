import {
    justificacionCreate,
    justificacionFindAll,
    justificacionFindOne,
    justificacionDeleteById,
    justificacionUpdate,
    buscarSocio,
    eleccionfindOne
} from "../use-cases/index.js";


function ingresarJustificacionController(req, res) {

    console.log(req.body);

    function searchSocio(id) {
        return new Promise((resolve, reject) => {
            const buscar = buscarSocio(id);
            resolve(buscar);
        });
    }

    function searchEleccion(id) {
        return new Promise((resolve, reject) => {
            const buscar = eleccionfindOne(id);
            resolve(buscar);
        });
    }

    function ingresarJustificacion(datos) {
        return new Promise((resolve, reject) => {
            const ingresar = justificacionCreate(datos);
            resolve(ingresar);
        });
    }

    searchSocio(req.body.idSocio)
        .then(socio =>{
            const us = socio.message.dataValues;
            req.body.idSocio = us.id;
            searchEleccion(req.body.idEleccion)
            .then(() =>{})
            .catch(err =>{
                return err.message;
            })
            req.body.nombre = `${new Date().toLocaleDateString()}-${us.nombres} ${us.apellidos}`;
            return ingresarJustificacion(req.body);
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

function getAllJustificacionController(req, res) {
    const buscar = justificacionFindAll();

    buscar.then(justificacion => {
        if (justificacion.status === 200)
            return res.status(justificacion.status).send({
                message: justificacion.message
            });
    }).catch(err => {
        return res.status(err.status).send({
            message: err.message
        });
    });
}

function getJustificacionController(req, res) {
    const { idJustificacion } = req.params;

    const search = justificacionFindOne(idJustificacion);

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

function justificacionUpdateController (req, res) {
    const buscarJustificacion = (id) => new Promise((resolve, reject)=>{
        const search = justificacionFindOne(id);
        resolve(search);
    });

    const actualizar = (id, datos) => new Promise((resolve, reject)=>{
        const up = justificacionUpdate(id, datos);
        resolve(up);
    });

    
    buscarJustificacion(req.params.idJustificacion)
    .then(justificacion => {
        return actualizar(justificacion.message.id, req.body)
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


function deleteJustificacionController (req, res) {
    const eliminar = (id) => new Promise((resolve, reject)=>{
        const elim = justificacionDeleteById(id);
        resolve(elim);
    });

    const buscarJustificacion = (id) => new Promise((resolve, reject)=>{
        const search = justificacionFindOne(id);
        resolve(search);
    });

    buscarJustificacion(req.params.idJustificacion)
    .then(justificacion => eliminar(justificacion.message.id))
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
    ingresarJustificacion: ingresarJustificacionController,
    getAllJustificacion: getAllJustificacionController,
    getJustificacion: getJustificacionController,
    justificacionUpdate: justificacionUpdateController,
    deleteJustificacion: deleteJustificacionController,
});