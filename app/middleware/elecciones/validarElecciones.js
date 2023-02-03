import { eleccionesfindOneByAgencia, eleccionesfindOneByFecha } from "../../use-cases/index.js";


async function validarElecciones(req, res, next) {
    const { idAgencia, dia } = req.body;

    const elecciones = await eleccionesfindOneByFecha(idAgencia, dia);
    const lista = elecciones.message;
    if(lista.length === 0) next();
    else return res.status(400).send({
        message:
        "Ya existe una elección registrada en la fecha: " +
        dia,
    });
}

export { validarElecciones };
