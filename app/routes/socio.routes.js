import express from 'express';
import { SociosController } from '../controllers/index.js';
import { authJwt, uploadFile } from '../middleware/index.js';
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
        validateCedula, ],
    (req, res) => {
        if (req.fileValidationError) {
            res.status(400).send({
                message: req.fileValidationError
            });
        }

        if(req.file)
            req.body.imagen = req.file.filename
        else
            req.body.imagen = null
            
        SociosController.ingresarSocio(req, res);
    });

export default routerSocios;