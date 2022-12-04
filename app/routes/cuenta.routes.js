import express from 'express';
import { AuthController } from '../controllers/index.js';
import { authJwt } from '../middleware/index.js';

const routerCuenta = express.Router();

routerCuenta.use((res, req, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

routerCuenta.route('/iniciar-sesion')
    .post(function (req, res) {
        AuthController.iniciarSesion(req, res);
    });

routerCuenta.route('/cuentas/:idSocio')
    .get([
        authJwt.verifyToken,
        authJwt.isAdmin
    ],(req, res)=>{
        AuthController.buscarCuenta(req, res);
    });


export default routerCuenta;