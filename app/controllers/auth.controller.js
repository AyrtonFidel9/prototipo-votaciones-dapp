import { iniciarSesion } from "../use-cases/cuenta/iniciar-sesion.js";

export default Object.freeze({
    iniciarSesion: (req, res) => iniciarSesion(req, res),
});

