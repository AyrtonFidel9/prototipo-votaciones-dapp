import { secret } from '../../config/auth.config.js';
import { Cuenta } from '../../models';
import { Sequelize, Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default function iniciarSesion(req, res){
    Cuenta.findOne({
        where: {
            usuario: req.body.usuario,
        }
    }).then( user =>{
        if(!user)
            return res.status(404).send({
                message: 'Cuenta no encontrada!!'
            });

        const passIsValid = bcrypt.compareSync(req.body.pass,Cuenta.pass);
        
        if(!passIsValid)
            return res.status(401).send({
                message: 'Contraseña incorrecta',
                accessToken: null,
            });

        const token = jwt.sign(
            {id: Cuenta.id, rol: Cuenta.rol},
            secret,
            {exporesIn: 14400},
        );

        const authorities = [];
        console.log(user);

    });
}