import express from 'express';
import routerAgencia from './agencia.routes.js';
import routerCuenta from './cuenta.routes.js';
import routerSocios from './socio.routes.js';

const routes = express.Router();

routes.use(routerCuenta);
routes.use('/agencia', routerAgencia);
routes.use('/socios', routerSocios)

export default routes;