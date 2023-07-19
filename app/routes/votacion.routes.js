import express from "express";
import { VotacionesController } from "../controllers/index.js";
import { authJwt } from "../middleware/authJwt.js";

const routerVotacion = express.Router();

routerVotacion.use((res, req, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

routerVotacion
  .route("/enviar-voto")
  .post([authJwt.verifyToken, authJwt.isSocio], (req, res) => {
    VotacionesController.sufragar(req, res);
  });

routerVotacion
  .route("/obtener-votos/:idRepresentante&:idEleccion")
  .get([authJwt.verifyToken], (req, res) => {
    VotacionesController.retornarVotos(req, res);
  });

routerVotacion
  .route("/validar-sufragio")
  .post([authJwt.verifyToken], (req, res) => {
    VotacionesController.validarVoto(req, res);
  });

export default routerVotacion;
