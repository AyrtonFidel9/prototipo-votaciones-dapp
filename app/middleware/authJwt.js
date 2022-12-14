import { Cuenta } from "../models/index.js";
import jwt from "jsonwebtoken";
import { secret } from "../config/index.js";

const verifyToken = (req, res, next) =>{
    //const token = req.headers['x-access-token'];
    //console.log(req.headers)

    if(!req.headers['authorization'])
        return res.status(400).send({
            message: 'El token no ha sido proveído'
        });


    const bearer = req.headers['authorization'].split(' ');
    const token = bearer[1];


    if(!token)
        return res.status(406).send({
            message: 'El token no ha sido proveído'
        });

    jwt.verify(token, secret, (err)=>{
        if(err){
            return res.status(401).send({
                message: "Token no válido!",
            });
        }
        next();
    });
};

const isAdmin = (req, res, next) => {
    const bearer = req.headers['authorization'].split(' ');
    const token = bearer[1];

    const decoded = jwt.verify(token, secret);

    Cuenta.findByPk(decoded.id).then( account => {
        if(account.rol === 'ROLE_ADMIN'){
            next();
            return;
        }
        
        res.status(403).send({
            message: "Se requiere el rol de administrador"
        });
    });
};

const isSocio = (req, res, next) => {
    const bearer = req.headers['authorization'].split(' ');
    const token = bearer[1];

    const decoded = jwt.verify(token, secret);

    Cuenta.findByPk(decoded.id).then( account => {
        if(account.rol === 'ROLE_SOCIO'){
            next();
            return;
        }
        
        res.status(403).send({
            message: "Se requiere el rol de socio"
        });
    });
};

const isJGE = (req, res, next) => {
    const bearer = req.headers['authorization'].split(' ');
    const token = bearer[1];

    const decoded = jwt.verify(token, secret);

    Cuenta.findByPk(decoded.id).then( account => {
        if(account.rol === 'ROLE_JGE'){
            next();
            return;
        }
        
        res.status(403).send({
            message: "Se requiere el rol de presidente de la JGE"
        });
    });
};

const isJGEorSocio = (req, res, next) => {
    const bearer = req.headers['authorization'].split(' ');
    const token = bearer[1];

    const decoded = jwt.verify(token, secret);

    Cuenta.findByPk(decoded.id).then( account => {
        if(account.rol === 'ROLE_JGE' || account.rol === 'ROLE_SOCIO'){
            next();
            return;
        }
        
        res.status(403).send({
            message: "Se requiere el rol de presidente de la JGE o de Socio"
        });
    });
};

const isAdminOrJGE = (req, res, next) => {
    const bearer = req.headers['authorization'].split(' ');
    const token = bearer[1];

    const decoded = jwt.verify(token, secret);

    Cuenta.findByPk(decoded.id).then( account => {
        if(account.rol === 'ROLE_JGE' || account.rol === 'ROLE_ADMIN'){
            next();
            return;
        }
        
        res.status(403).send({
            message: "Se requiere el rol de presidente de la JGE o de Admin"
        });
    });
};


const isAdminOrSocio = (req, res, next) => {
    const bearer = req.headers['authorization'].split(' ');
    const token = bearer[1];

    const decoded = jwt.verify(token, secret);

    Cuenta.findByPk(decoded.id).then( account => {
        if(account.rol === 'ROLE_SOCIO' || account.rol === 'ROLE_ADMIN'){
            next();
            return;
        }
        
        res.status(403).send({
            message: "Se requiere el rol de presidente de la JGE o de Admin"
        });
    });
};


const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isSocio: isSocio,
    isJGE: isJGE,
    isAdminOrJGE: isAdminOrJGE,
    isJGEorSocio,
    isAdminOrSocio,
};

export { authJwt };


