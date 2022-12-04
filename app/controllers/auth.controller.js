import { iniciarSesion, buscarCuenta } from "../use-cases/cuenta/index.js";


async function iniciarSesionController (req, res) {
    const {
        usuario,
        password
    } = req.body;
    
    const {
        status,
        message,
        accessToken
    } = await iniciarSesion(usuario, password);

    if(status === 200) // OK
        res.status(status).send({
            token: accessToken
        });

    res.status(status).send({
        message: message
    });
}

function buscarCuentaController(req, res){
    const { idSocio } = req.params;

    const cuenta = buscarCuenta(idSocio);

    cuenta.then(c => {
        res.status(c.status).send({
            message: c.message,
        })
    }).catch(err=>{
        res.status(err.status).send({
            message: err.message,
        })
    });
}

export default Object.freeze({
    iniciarSesion: iniciarSesionController,
    buscarCuenta: buscarCuentaController,
});