import { Cuenta } from "../../models/index.js";
import { decryptPass, encryptPass } from "./password.js";

export default async function actualizarCuenta(
    oldCuenta,
    {rol, usuario, password, ipCliente}){
    
    
    const pass = 
        decryptPass(oldCuenta.password) !== decryptPass(password) ?
        encryptPass(password) : oldCuenta.password;

    try{
        const cuenta = await Cuenta.update({
            rol: rol,
            usuario: usuario,
            password: pass,
            ipCliente: ipCliente,
            ultimoAcceso: new Date(),
        }, {
            where: {
                idSocio: oldCuenta.idSocio
            }
        });
        return {
            status: 200,
            message: 'Datos actualizados correctamente',
        };
    }catch(err){
        throw ({
            status: 400,
            message: err,
        });
    }
}