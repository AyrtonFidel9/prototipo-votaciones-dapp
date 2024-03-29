import express from "express";
import { InscripcionesController } from "../controllers/index.js";
import { authJwt } from "../middleware/index.js";

const routerInscripciones = express.Router();

routerInscripciones.use((res, req, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

routerInscripciones
  .route("/registrar")
  .post([authJwt.verifyToken, authJwt.isSocio], function (req, res) {
    InscripcionesController.ingresarInscripciones(req, res);
  });

routerInscripciones
  .route("/:idInscripcion")
  .get([authJwt.verifyToken, authJwt.isJGEorSocio], (req, res) => {
    InscripcionesController.getInscripcion(req, res);
  });

routerInscripciones
  .route("/")
  .get([authJwt.verifyToken, authJwt.isJGEorSocio], (req, res) => {
    InscripcionesController.getAllInscripciones(req, res);
  });

routerInscripciones
  .route("/update/:idInscripcion")
  .put([authJwt.verifyToken, authJwt.isJGE], (req, res) => {
    InscripcionesController.inscripcionesUpdate(req, res);
  });

export default routerInscripciones;
