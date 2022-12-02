import express from 'express';
import routerAgencia from './agencia.routes.js';
import routerCuenta from './cuenta.routes.js';

const routes = express.Router();

routes.use(routerCuenta);
routes.use('/agencia',routerAgencia);

export default routes;