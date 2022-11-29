import express from 'express';
import routerCuenta from './cuenta.routes.js';

const routes = express.Router();

routes.use(routerCuenta);

export default routes;