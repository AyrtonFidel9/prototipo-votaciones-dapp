import express from 'express';
import { AgenciaController } from '../controllers/index.js';
import { cantidadGanadores } from '../middleware/index.js';
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

routerAgencia.route('/:agenciaId')
    .get([authJwt.verifyToken,
        authJwt.isAdminOrSocio
    ],
    (req, res) => {
        AgenciaController.buscarAgencia(req,res);
    });

routerAgencia.route('/')
    .get([authJwt.verifyToken,
        authJwt.isAdminOrJGE,
    ],
    (req, res) => {
        AgenciaController.buscarAllAgencias(req,res);
    });

routerAgencia.route('/delete/:agenciaId')
    .delete([authJwt.verifyToken,
        authJwt.isAdmin
    ],
    (req, res) => {
        AgenciaController.eliminarAgencia(req,res);
    });

routerAgencia.route('/update/:agenciaId')
    .put([authJwt.verifyToken, 
        authJwt.isAdmin,
        cantidadGanadores
    ], (req, res)=>{
        AgenciaController.actualizarAgencia(req,res);
    });

export default routerAgencia;