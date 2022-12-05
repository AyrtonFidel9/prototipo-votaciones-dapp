import { Cuenta } from "../../models/index.js";
import { generatePassEncrypt } from "./password.js";

export default async function registrarCuenta(nombres, apellidos, codigo, ip, idSocio){
    // ultimo inicio de sesion
    // ip 
    // id socio
    const name = nombres.split(' ');
    const lastname = apellidos.split(' ');
    const username = 
    capitalizeFirstLetter(name[0]).concat(
        capitalizeFirstLetter(lastname[0]),
        codigo
    );
    

    try{
        const cuenta = await Cuenta.create({
            rol: 'ROLE_SOCIO',
            usuario: username,
            password: generatePassEncrypt(),
            ipCliente: ip,
            ultimoAcceso: new Date(),
            idSocio: idSocio,
        });

        return {
            status: 200,
            message: cuenta
        }

    }catch(err){
        throw ({
            status: 400,
            message: err,
        });
    }

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}