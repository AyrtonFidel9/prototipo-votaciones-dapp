import express from 'express';
import { SociosController } from '../controllers/index.js';
import { authJwt, uploadFile, uploadFileCSV } from '../middleware/index.js';
import { validateCedula } from '../middleware/index.js';

const routerSocios = express.Router();

routerSocios.use((res, req, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

routerSocios.route('/registrar')
    .post([
        authJwt.verifyToken,
        authJwt.isAdmin,
        uploadFile.single('imagen'),
        validateCedula,
    ], (req, res) => {
        if (req.fileValidationError) {
            res.status(400).send({
                message: req.fileValidationError
            });
        }

        if (req.file)
            req.body.imagen = req.file.filename
        else
            req.body.imagen = null

        SociosController.ingresarSocio(req, res);
    });

routerSocios.route('/:idSocio')
    .get([
        authJwt.verifyToken,
    ], (req, res) => {
        SociosController.buscarSocio(req, res);
    });
routerSocios.route('/')
    .get([
        authJwt.verifyToken,
    ], (req, res) => {
        SociosController.buscarAllSocios(req, res);
    });

routerSocios.route('/update/:idSocio')
    .put([
        authJwt.verifyToken,
        validateCedula
    ], (req, res) => {
        SociosController.actualizarSocio(req, res);
    });

routerSocios.route('/delete/:idSocio')
    .delete([
        authJwt.verifyToken,
        authJwt.isAdmin,
    ], (req, res) => {
        SociosController.eliminarSocio(req, res);
    });

routerSocios.route('/existbyPhone/:number')
    .get((req, res)=>{
        SociosController.existSocioByPhone(req, res);
    });

routerSocios.route('/innerjoin/cuentas')
    .get([
        authJwt.verifyToken,
    ],(req, res)=>{
        SociosController.buscarSocioCuenta(req, res);
    });

routerSocios.route('/carga-masiva')
    .post([
        uploadFileCSV.single('datos'),
        authJwt.verifyToken,
        authJwt.isAdmin,
    ], (req, res) => {
        req.body.buffer = req.file.buffer;
        req.body.nombreArchivo = req.file.originalname;
        SociosController.ingresoMasivo(req, res);
    });


export default routerSocios;