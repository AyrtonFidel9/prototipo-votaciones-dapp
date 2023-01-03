import { Cuenta } from "../../models/index.js";

export default async function buscarCuentaByUsername(usuario){
    const cuenta = await Cuenta.findOne({
        where: {
            usuario: usuario,
        }
    });
    try{
        if(cuenta === null){
            throw (`No existe una cuenta para el usuario: ${usuario}`);
        }
        else{
            return {
                status: 200,
                message: cuenta,
            }
        }
    }catch(err){
        throw {
            status: 400,
            message: err,
        }
    }
}