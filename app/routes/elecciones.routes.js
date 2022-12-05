import express from 'express';
import { AuthController } from '../controllers/index.js';
import { authJwt } from '../middleware/index.js';

const routerElecciones = express.Router();

routerElecciones.use((res, req, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// comprobar que el socio este habilitado
routerElecciones.route('/iniciar-sesion')
    .post(function (req, res) {
        AuthController.iniciarSesion(req, res);
    });

routerElecciones.route('/elecciones/:id')
    .get([
        authJwt.verifyToken,
        authJwt.isAdmin
    ],(req, res)=>{
        AuthController.buscarCuenta(req, res);
    });

routerElecciones.route('/elecciones/:id')
    .put([
        authJwt.verifyToken,
        authJwt.isAdmin
    ], (req, res)=>{
        AuthController.actualizarCuenta(req, res);
    });

export default routerElecciones;