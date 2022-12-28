import express from 'express';
import routerAgencia from './agencia.routes.js';
import routerCuenta from './cuenta.routes.js';
import routerNotificacion from './notificacion.routes.js';
import routerRecuperacion from './recuperacion.routes.js';
import routerSocios from './socio.routes.js';

const routes = express.Router();

routes.use(routerCuenta);
routes.use('/agencia', routerAgencia);
routes.use('/socios', routerSocios);
routes.use('/notificacion', routerNotificacion);
routes.use('/recuperacion', routerRecuperacion);

export default routes;