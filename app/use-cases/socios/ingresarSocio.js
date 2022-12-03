import { Socios } from "../../models/index.js";
import { fs } from 'fs';

export default function ingresarSocio(
    nombres,
    apellidos,
    cedula,
    codigo,
    imagen,
    estado,
    email,
    celular,
    idAgencia,
){
    return Socios.create({
        nombres: nombres,
        apellidos: apellidos,
        cedula: cedula,
        codigo: codigo,
        imagen: fs.readFileSync(
            __dirname+'app/puplic/images'+imagen
        ),
        estado: estado,
        email: email,
        celular: celular,
        idAgencia: idAgencia,
    })
}