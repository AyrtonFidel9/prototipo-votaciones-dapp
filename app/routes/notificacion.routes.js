import express from 'express';
import { NotificacionController } from '../controllers/index.js';
import { authJwt } from '../middleware/index.js';

const routerNotificacion = express.Router();

routerNotificacion.use((res, req, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

routerNotificacion.route('/:id')
    .get([
        authJwt.verifyToken,
    ], (req, res)=>{
        NotificacionController.buscarNotificacion(req, res);
    });

routerNotificacion.route('/ingresar/:idSocio')
    .post([
        authJwt.verifyToken,
    ], (req, res)=>{
        NotificacionController.ingresarNotificacion(req, res);
    });

routerNotificacion.route('/:id')
    .put([
        authJwt.verifyToken,
    ], (req, res)=>{
        NotificacionController.actualizarNotificacion(req, res);
    })


export default routerNotificacion;