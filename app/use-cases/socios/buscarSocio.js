import { Socios } from "../../models/index.js";

export default async function buscarSocio (id) {
    const search = await Socios.findByPk(id);
    if(search === null)
        return {
            status: 404,
            message: `No existe el socio con el id: ${id}`,
        }
    else
        return {
            status: 200,
            message: search,
        }
}