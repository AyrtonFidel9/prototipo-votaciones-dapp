import { 
    iniciarSesion, 
    buscarCuenta, 
    actualizarCuenta 
} from "../use-cases/cuenta/index.js";

async function iniciarSesionController (req, res) {
    const {
        usuario,
        password
    } = req.body;
    
    const {
        status,
        message,
        accessToken
    } = await iniciarSesion(
        usuario, 
        password, 
        req.headers['x-real-ip'] || req.connection.remoteAddress);

    if(status === 200) // OK
        res.status(status).send({
            token: accessToken
        });
    else{
        res.status(status).send({
            message: message
        });
    }
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

function actualizarCuentaController(req, res){
    const { idSocio } = req.params;

    function search (id){
        return new Promise((res, rej)=>{
            const cuenta = buscarCuenta(id);
            res(cuenta);
        });
    }

    function actualizar (oldData, data){
        return new Promise((res, rej)=>{
            const updated = actualizarCuenta(oldData, {...data});
            res(updated);
        });
    }

    search(idSocio).then(socio=>{
        if(socio.status !== 200)
            res.status(socio.status).send({
                message: socio.message
            });

        return socio.message;
    })
    .then(cuenta => {
        req.body.ipCliente = req.headers['x-real-ip'] || req.connection.remoteAddress;
        return actualizar(cuenta._previousDataValues, req.body)
    })
    .then(up => {
        res.status(up.status).send({
            message: up.message
        });
    })
    .catch(err=>{
        res.status(err.status).send({
            message: err.message
        });
    });
}

export default Object.freeze({
    iniciarSesion: iniciarSesionController,
    buscarCuenta: buscarCuentaController,
    actualizarCuenta: actualizarCuentaController,
});