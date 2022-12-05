import {
    ingresarNotificaciones,
    buscarNotificacion,
    actualizarNotificacion } from '../use-cases/notificaciones/index.js'

const ingresarNotificacionController = (req, res) =>{
    const { idSocio } = req.params;
    console.log(idSocio);
    console.log(req.body);
    const ingresar = ingresarNotificaciones({...req.body}, idSocio);

    ingresar.then(not => {
        res.status(not.status).send({
            message: not.datos
        })
    }).catch(err => {
        console.log(err);
        res.status(err.status).send({
            message: err.message
        })
    });
}

const buscarNotificacionController = (req, res) => {
    const { id } = req.params;
    const buscar = buscarNotificacion(id);
    buscar.then(resp=>{
        res.status(resp.status).send({
            message: resp.message
        })
    });
}

const actualizarNotificacionController = (req, res) => {
    const { id } = req.params;

    function search(id){
        return new Promise((res, rej)=>{
            const s = buscarNotificacion(id); 
            res(s);
        });
    }

    function actualizar(id, data){
        return new Promise((res, rej)=>{
            const updated = actualizarNotificacion({...data}, id);
            res(updated);
        })
    }

    search(id).then(not => {
        if(not.status !== 200)
            throw(not);
        
        return not.message.id;
    })
    .then(id => actualizar(id, req.body))
    .then(resp => {
        res.status(resp.status).send({
            message: resp.message,
        });
    })
    .catch(err=>{
        res.status(err.status).send({
            message: err.message
        })
    });
}

export default Object.freeze({
    ingresarNotificacion: ingresarNotificacionController,
    buscarNotificacion: buscarNotificacionController,
    actualizarNotificacion: actualizarNotificacionController,
});