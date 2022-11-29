import express from 'express';
import { iniciarSesion } from '../controllers/index.js';

const routerCuenta = express.Router();

routerCuenta.route('/iniciar-sesion')
    .post(function(res,req){
        iniciarSesion(res,req);
    });

export default routerCuenta;