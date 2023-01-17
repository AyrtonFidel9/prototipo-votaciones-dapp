import express from 'express';
import routerAgencia from './agencia.routes.js';
import routerCuenta from './cuenta.routes.js';
import routerElecciones from './elecciones.routes.js';
import routerNotificacion from './notificacion.routes.js';
import routerRecuperacion from './recuperacion.routes.js';
import routerRepresentantes from './representantes.routes.js';
import routerSocios from './socio.routes.js';
import routerVotacion from './votacion.routes.js';
import routerInscripciones from './inscripciones.routes.js';
import { uploadDocs, uploadFile } from '../middleware/index.js';

const routes = express.Router();

routes.use(routerCuenta);
routes.use('/agencia', routerAgencia);
routes.use('/socios', uploadFile.single('imagen'), routerSocios);
routes.use('/notificacion', routerNotificacion);
routes.use('/recuperacion', routerRecuperacion);
routes.use('/elecciones', routerElecciones);
routes.use('/representantes', routerRepresentantes);
routes.use('/votaciones', routerVotacion);
routes.use('/inscripciones', uploadDocs.fields([
    { name: 'declaracion', maxCount: 1},
    { name: 'formulario', maxCount: 1},
]), routerInscripciones);

export default routes;