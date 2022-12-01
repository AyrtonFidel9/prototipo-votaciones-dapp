import express from 'express';
import { AuthController } from '../controllers/index.js';

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

routerCuenta.route('/Saludo')
    .get((req, res) => {
        res.send('Hola' + req.body);
    });

export default routerCuenta;