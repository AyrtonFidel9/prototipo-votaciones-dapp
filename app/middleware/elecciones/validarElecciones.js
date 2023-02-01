import { eleccionesfindOneByAgencia } from "../../use-cases/index.js";


async function validarElecciones(req, res, next) {
    const { idAgencia, dia } = req.body;

    const elecciones = await eleccionesfindOneByAgencia(idAgencia);
    const lista = elecciones.message.dataValues;

    if(lista.length === 0) next();

    if(!existeEleccionDia(lista, dia)) next();
    else return res.status(400).send({
        message:
        "Ya existe una elección registrada en la fecha: " +
        dia,
    });



}

function existeEleccionDia (lista, dia) {
    return lista.some(item => {
        const dateA = new Date(dia);
        const dateB = new Date(item.dia);
        return dateA.getTime() === dateB.getTime();
    })
}

export { validarElecciones };
