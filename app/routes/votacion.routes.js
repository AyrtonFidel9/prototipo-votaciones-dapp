import express from 'express';
import { VotacionesController } from '../controllers/index.js';

const routerVotacion = express.Router();

routerVotacion.use((res, req, next) => {
   res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
   );
   next();
});

routerVotacion.route('/enviar-voto')
   .post((req, res) => {
      VotacionesController.emitirVoto(req, res);
   });

export default routerVotacion;