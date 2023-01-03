import { Cuenta } from "../../models/index.js";
import { decryptPass } from "./password.js";

export default async function buscarCuentaBySocio(id) {
    try {
        const cuenta = await Cuenta.findOne({
            where: { idSocio: id },
        });
        if (cuenta === null) {
            throw(`No existe una cuenta para el socio con el id: ${id}`);
        }
        else {
            cuenta.password = decryptPass(cuenta.password);
            return {
                status: 200,
                message: cuenta,
            }
        }
    } catch (ex) {
        throw ({
            status: 400,
            message: ex
        });
    }
    
}