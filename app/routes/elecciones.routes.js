import express from 'express';
import { EleccionesController } from '../controllers/index.js';
import { 
    authJwt, 
    validarElecciones, 
    validarHorasHabiles, 
    validarModificacion 
} from '../middleware/index.js';

const routerElecciones = express.Router();

routerElecciones.use((res, req, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

routerElecciones.route('/registrar')
    .post([
        authJwt.verifyToken, 
        authJwt.isJGE,
        validarElecciones,
        validarHorasHabiles,
    ],function (req, res) {
        EleccionesController.ingresarElecciones(req, res);
    });

routerElecciones.route('/:idEleccion')
    .get([
        authJwt.verifyToken,
        authJwt.isJGE
    ],(req, res)=>{
        EleccionesController.getEleccion(req, res);
    });

routerElecciones.route('/')
    .get([
        authJwt.verifyToken,
    ],(req, res)=>{
        EleccionesController.getAllElecciones(req, res);
    });

routerElecciones.route('/delete/:idEleccion')
    .delete([
        authJwt.verifyToken,
        authJwt.isJGE
    ], (req, res)=>{
        EleccionesController.deleteEleccion(req, res);
    });

routerElecciones.route('/update/:idEleccion')
    .put([
        authJwt.verifyToken,
        authJwt.isJGE,
        validarModificacion
    ], (req, res)=>{
        EleccionesController.updateEleccion(req, res);
    });

export default routerElecciones;