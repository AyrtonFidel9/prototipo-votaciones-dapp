import { eleccionfindOne } from "../../use-cases/index.js";


async function validarEliminacion(req, res, next) {
    const { idEleccion } = req.params;

    const elecciones = await eleccionfindOne(idEleccion);
    const eleccion = elecciones.message.dataValues;

    if(eleccion.estado === 'EN-CURSO'){
        return res.status(400).send({
            message:
            "La elección no puede ser eliminada por que esta EN CURSO"
        });
    }

    next();
}


export { validarEliminacion };
