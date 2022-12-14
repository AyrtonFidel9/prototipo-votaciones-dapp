import express from 'express';
import { RepresentantesController } from '../controllers/index.js';
import { authJwt, validateDisctictRep, validateRepresentante, validateRolRepresentante } from '../middleware/index.js';

const routerRepresentantes = express.Router();

routerRepresentantes.use((res, req, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

/**
 * Validar que el representante no este participando en otra eleccion al mismo tiempo
 */

routerRepresentantes.route('/registrar')
    .post([
        authJwt.verifyToken,
        authJwt.isJGE,
        validateRepresentante,
        validateRolRepresentante,
        validateDisctictRep,
    ],
    (req, res) => {
        RepresentantesController.ingresarRepresentantes(req, res);
    });

routerRepresentantes.route('/:idRepresentante')
    .get([authJwt.verifyToken,
        authJwt.isJGE
    ],
    (req, res) => {
        RepresentantesController.getRepresentante(req, res);
    });

routerRepresentantes.route('/')
    .get([authJwt.verifyToken,
        authJwt.isJGEorSocio,
    ],
    (req, res) => {
        RepresentantesController.getAllRepresentantes(req, res);
    });

routerRepresentantes.route('/delete/:idRepresentante')
    .delete([authJwt.verifyToken,
        authJwt.isJGE
    ],
    (req, res) => {
        RepresentantesController.deleteRepresentante(req, res);
    });

routerRepresentantes.route('/update/:idRepresentante')
    .put([authJwt.verifyToken, 
        authJwt.isJGE,
        validateRepresentante,
        validateRolRepresentante,
        validateDisctictRep,
    ], (req, res)=>{
        RepresentantesController.updateRepresentante(req, res);
    });


export default routerRepresentantes;