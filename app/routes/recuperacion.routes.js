import express from 'express';
import { RecuperacionController } from '../controllers/index.js';

const routerRecuperacion = express.Router();

routerRecuperacion.use((res, req, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

routerRecuperacion.route('/ingresar/:number')
    .post((req, res)=>{
        RecuperacionController.ingresarRecuperacion(req, res);
    });

routerRecuperacion.route('/actualizarEstado/:codigo')
    .put((req, res)=>{
        RecuperacionController.actualizarEstadoCodigo(req, res);
    });

export default routerRecuperacion;