import express from 'express';
import { AgenciaController } from '../controllers/index.js';
import { cantidadGanadores } from '../middleware/socios/index.js';
import { authJwt } from '../middleware/index.js';

const routerAgencia = express.Router();

routerAgencia.use((res, req, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

routerAgencia.route('/registrar')
    .post([
        authJwt.verifyToken,
        authJwt.isAdmin,
        cantidadGanadores
    ],
    (req, res) => {
        AgenciaController.ingresarAgencia(req,res);
    });

export default routerAgencia;