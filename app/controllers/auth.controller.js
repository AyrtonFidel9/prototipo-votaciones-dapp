import { iniciarSesion } from "../use-cases/cuenta/index.js";

export default Object.freeze({
    iniciarSesion: (req, res) => iniciarSesion(req, res),
    holaMundo: () => 'Hola Mundo',
    
});

