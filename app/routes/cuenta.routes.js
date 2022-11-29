import express from 'express';
import { iniciarSesion } from '../controllers/index.js';

const routerCuenta = express.Router();

router.route('/iniciar-sesion')
    .post(iniciarSesion(res,req));

export default routerCuenta;