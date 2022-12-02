import { ingresarAgencia, buscarAgencia } from "../use-cases/agencias/index.js";

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

const buscarAgenciaController = (req, res) => {
    const { agenciaId } = req.params;
    
    const search = buscarAgencia(agenciaId);

    search.then(resp => {
        res.status(resp.status).send({
            message: resp.message
        })
    });
}

export default Object.freeze({
    ingresarAgencia: ingresarAgenciaController,
    buscarAgencia: buscarAgenciaController,
});