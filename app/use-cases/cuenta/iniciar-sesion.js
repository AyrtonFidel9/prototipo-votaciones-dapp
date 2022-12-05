import { Cuenta } from '../../models/index.js';
import { secret } from '../../config/index.js';
import jwt from 'jsonwebtoken';
import { decryptPass } from './password.js';
import actualizarCuenta from './actualizarCuenta.js';

export default function iniciarSesion(usuario, password, ip){
    return Cuenta.findOne({
        where: {
            usuario: usuario,
        }
    }).then( user =>{
        if(!user)
            return {
                status: 404,
                message: 'Cuenta no encontrada!!',
                accessToken: null,
            };
        const passIsValid = password === decryptPass(user.dataValues.password);
        if(!passIsValid)
            return {
                status: 401,
                message: 'Contraseña incorrecta',
                accessToken: null,
            };
        
        user.dataValues.ipCliente = ip;
        actualizarCuenta(user.dataValues, user.dataValues).then();
        
        const token = jwt.sign(
            {id: user.id, rol: user.rol, usuario: user.usuario},
            secret,
            {expiresIn: 14400},
        );
        
        /*const authorities = [];
        authorities.push(user.rol);*/

        return {
            status: 200,
            message: 'Inicio de sesión correcto!!',
            accessToken: token,
        }
    });
}