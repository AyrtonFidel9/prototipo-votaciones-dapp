import {
    iniciarSesion,
    buscarCuentaBySocio,
    actualizarCuenta,
    buscarCuentaById,
    buscarCuentaByUsername,
} from "../use-cases/cuenta/index.js";

function iniciarSesionController(req, res) {
    console.time('bad await')
    const {
        usuario,
        password
    } = req.body;

    const login = iniciarSesion(
        usuario,
        password,
        req.headers['x-real-ip'] || req.connection.remoteAddress);

    login.then(log => {
        if (log.status === 200){ // OK
            console.timeEnd('bad await');
            return res.status(log.status).send({
                token: log.accessToken
            });
        }
        else {
            console.timeEnd('bad await');
            return res.status(log.status).send({
                message: log.message
            });
        }
    });
}

function buscarCuentaBySocioController(req, res) {
    const { idSocio } = req.params;
    const cuenta = buscarCuentaBySocio(idSocio);

    cuenta.then(c => {
        return res.status(c.status).send({
            message: c.message,
        })
    }).catch(err => {
        return res.status(err.status).send({
            message: err.message,
        })
    });
}

function buscarCuentaByIdController(req, res) {
    const { id } = req.params;

    const cuenta = buscarCuentaById(id);

    cuenta.then(c => {
        return res.status(c.status).send({
            message: c.message,
        })
    }).catch(err => {
        return res.status(err.status).send({
            message: err.message,
        })
    });
}

function actualizarCuentaController(req, res) {
    const { idSocio } = req.params;

    function search(idSocio) {
        return new Promise((res, rej) => {
            const cuenta = buscarCuentaBySocio(idSocio);
            res(cuenta);
        });
    }

    function actualizar(oldData, data) {
        return new Promise((res, rej) => {
            const updated = actualizarCuenta(oldData, { ...data });
            res(updated);
        });
    }

    search(idSocio).then(socio => {
        if (socio.status !== 200)
            return res.status(socio.status).send({
                message: socio.message
            });

        return socio.message;
    })
        .then(cuenta => {
            req.body.ipCliente = req.headers['x-real-ip'] || req.connection.remoteAddress;
            return actualizar(cuenta._previousDataValues, req.body)
        })
        .then(up => {
            return res.status(up.status).send({
                message: up.message
            });
        })
        .catch(err => {
            return res.status(err.status).send({
                message: err.message
            });
        });
}


function rebootCuentaSocioController (req, res){
    const { idSocio } = req.params;
    const { newPassword } = req.body;

    function search(idSocio) {
        return new Promise((res, rej) => {
            const cuenta = buscarCuentaBySocio(idSocio);
            res(cuenta);
        });
    }

    function actualizar(oldData, data) {
        return new Promise((res, rej) => {
            const updated = actualizarCuenta(oldData, { ...data });
            res(updated);
        });
    }

    search(idSocio).then(socio => {
        if (socio.status !== 200)
            res.status(socio.status).send({
                message: socio.message
            });

        return socio.message;
    }).then(cuenta => {
        const ipCliente = req.headers['x-real-ip'] || req.connection.remoteAddress;
        const updatedData = { ...cuenta._previousDataValues };
        updatedData.ipCliente = ipCliente;
        updatedData.password = newPassword;
        return actualizar(cuenta._previousDataValues, updatedData)
    }).then(up => {
        return res.status(up.status).send({
            message: up.message
        });
    }).catch(err => {
        return res.status(err.status).send({
            message: err.message
        });
    });
}

export default Object.freeze({
    iniciarSesion: iniciarSesionController,
    buscarCuentaBySocio: buscarCuentaBySocioController,
    actualizarCuenta: actualizarCuentaController,
    rebootCuentaSocio: rebootCuentaSocioController,
    buscarCuentaById: buscarCuentaByIdController,
});