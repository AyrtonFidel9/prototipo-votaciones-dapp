import { Cuenta } from "../models";
import jwt from "jsonwebtoken";
import { secret } from "../config/index.js";

const verifyToken = (req, res, next) =>{
    const token = req.headers['x-access-token'];

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

const idAdmin = (req, res, next) => {
    const token = req.headers['x-access-token'];
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
    const token = req.headers['x-access-token'];
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
    const token = req.headers['x-access-token'];
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

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isSocio: isSocio,
    isJGE: isJGE
};

module.exports = authJwt;


