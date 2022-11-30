import express from 'express';
import {AuthController} from '../controllers/index.js';

const routerCuenta = express.Router();

routerCuenta.route('/iniciar-sesion')
    .post(function(req,res){
        AuthController.iniciarSesion(req,res);
    });

routerCuenta.route('/Saludo')
    .get((req, res) => {
        res.send('Hola'+req.body);
    });

export default routerCuenta;