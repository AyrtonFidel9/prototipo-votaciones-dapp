import express from 'express';
import { JustificacionController } from '../controllers/index.js';
import { authJwt } from '../middleware/index.js';

const routerJustificacion = express.Router();

routerJustificacion.use((res, req, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

routerJustificacion.route('/registrar')
    .post([
        authJwt.verifyToken, 
        authJwt.isSocio
    ],function (req, res) {
        JustificacionController.ingresarJustificacion(req, res);
    });

routerJustificacion.route('/:idJustificacion')
    .get([
        authJwt.verifyToken,
        authJwt.isSocio
    ],(req, res)=>{
        JustificacionController.getJustificacion(req, res);
    });

routerJustificacion.route('/')
    .get([
        authJwt.verifyToken,
    ],(req, res)=>{
        JustificacionController.getAllJustificacion(req, res);
    });

routerJustificacion.route('/delete/:idJustificacion')
    .delete([
        authJwt.verifyToken,
        authJwt.isSocio
    ], (req, res)=>{
        JustificacionController.deleteJustificacion(req, res);
    });

routerJustificacion.route('/update/:idJustificacion')
    .put([
        authJwt.verifyToken,
        authJwt.isSocio
    ], (req, res)=>{
        JustificacionController.updateJustificacion(req, res);
    });

export default routerJustificacion;