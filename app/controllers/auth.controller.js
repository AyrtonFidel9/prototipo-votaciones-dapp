import { iniciarSesion } from "../use-cases/cuenta/index.js";

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

export default Object.freeze({
    iniciarSesion: (req, res) => iniciarSesionController(req,res),
    holaMundo: () => 'Hola Mundo',
});