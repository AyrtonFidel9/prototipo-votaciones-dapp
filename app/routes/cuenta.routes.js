import express from 'express';
import { AuthController, MessagesController } from '../controllers/index.js';
import { authJwt, validateEstado } from '../middleware/index.js';

const routerCuenta = express.Router();

routerCuenta.use((res, req, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// comprobar que el socio este habilitado
routerCuenta.route('/iniciar-sesion')
    .post([validateEstado],function (req, res) {
        AuthController.iniciarSesion(req, res);
    });

routerCuenta.route('/cuentas/:idSocio')
    .get([
        authJwt.verifyToken,
        authJwt.isAdmin
    ],(req, res)=>{
        AuthController.buscarCuentaBySocio(req, res);       
    });

routerCuenta.route('/cuentas/findById/:id')
    .get([
        authJwt.verifyToken
    ],(req, res)=>{
        AuthController.buscarCuentaById(req, res);       
    });

routerCuenta.route('/cuentas/:idSocio')
    .put([
        authJwt.verifyToken,
        authJwt.isAdmin
    ], (req, res)=>{
        AuthController.actualizarCuenta(req, res);
    });

routerCuenta.route('/cuentas/reboot/:idSocio')
    .put((req, res)=>{
        AuthController.rebootCuentaSocio(req, res);
    });

export default routerCuenta;