import { Cuenta } from "../../models/index.js";
import { decryptPass } from "./password.js";

export default async function buscarCuentaById(id){
    const cuenta = await Cuenta.findByPk(id);
    
    if(cuenta === null){
        return {
            status: 404,
            message: `No existe una cuenta para el id: ${id}`,
        }
    }
    else{
        cuenta.password = decryptPass(cuenta.password);
        return {
            status: 200,
            message: cuenta,
        }
    }
}