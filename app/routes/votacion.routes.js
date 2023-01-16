import express from 'express';
import { VotacionesController } from '../controllers/index.js';
import { authJwt } from '../middleware/authJwt.js';

const routerVotacion = express.Router();

routerVotacion.use((res, req, next) => {
   res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
   );
   next();
});

routerVotacion.route('/enviar-voto')
   .post([
      authJwt.verifyToken,
      authJwt.isSocio,
   ],(req, res) => {
      VotacionesController.sufragar(req, res);
   });

routerVotacion.route('/enviar-token')
   .post([
      authJwt.verifyToken,
      authJwt.isAdmin,
   ],(req, res) => {
      VotacionesController.enviarToken(req, res);
   });

routerVotacion.route('/aprobar-gasto')
   .post([
      authJwt.verifyToken,
      authJwt.isAdmin,
   ],(req, res) => {
      VotacionesController.aprovarGastoToken(req, res);
   });

routerVotacion.route('/obtener-balance/:wallet')
   .get([
      authJwt.verifyToken,
   ],(req, res) => {
      VotacionesController.retornarBalance(req, res);
   });

export default routerVotacion;