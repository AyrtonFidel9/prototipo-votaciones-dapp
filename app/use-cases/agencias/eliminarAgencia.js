import { Agencias } from "../../models/index.js";

export default async function eliminarAgencia (id){
    try
    {
        await Agencias.destroy({
            where: {id: id}
        });

        return {
            status: 200,
            message: 'La agencia ha sido eliminada satisfactoriamente'
        };
    }
    catch (err){
        throw ({
            status: 400,
            message: err
        });
    }
}