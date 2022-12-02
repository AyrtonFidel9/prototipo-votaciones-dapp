import { ingresarAgencia } from "../use-cases/agencias/index.js";

const ingresarAgenciaController = async (req, res) => {
    const {
        nombre,
        ubicacion,
        representantes,
        ganadores
    } = req.body;

    const addedAgencia = ingresarAgencia(
        nombre, ubicacion, representantes, ganadores
    );

    addedAgencia.then(resp => {
        res.status(resp.status).send({
            message: resp.message,
            datos: resp.datos
        })
    }).catch(err => {
        res.status(err.status).send({
            name: err.message.name,
            message: err.message.errors[0].message,
            tipo: err.message.errors[0].type,
        })
    });
}

export default Object.freeze({
    ingresarAgencia: ingresarAgenciaController,
});