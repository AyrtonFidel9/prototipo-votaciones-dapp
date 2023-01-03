import { Cuenta, Recuperacion } from "../../models/index.js";

export default async function ingresarRecovery(ipRecovery, codigo, idSocio) {
    try {
        const date = new Date(Date.now()).toISOString().replace('T',' ').replace('Z','');
        const time = new Date(Date.now()+(1000*60*(-(new Date()).getTimezoneOffset()))).toISOString().replace('T',' ').replace('Z','');
        const cuenta = await Cuenta.findOne({
            where: {
                idSocio: idSocio
            }
        });

        if (cuenta === null)
            throw (`El socio con el id ${idSocio} no existe`);

        const recover = await Recuperacion.create({
            ipRecovery: ipRecovery,
            fecha: date,
            hora: time,
            codigo: codigo,
            isRecuperado: false,
            idCuenta: cuenta.dataValues.id,
        });

        return {
            status: 200,
            datos: recover.dataValues,
        }
    } catch (err) {
        throw({
            status: 400,
            message: err,
        });
    }
}