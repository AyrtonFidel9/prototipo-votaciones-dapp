import { Socios } from "../../models/index.js";

export default async function buscarAllSocios () {
    try
    {
        const search = await Socios.findAll();
        return {
            status: 200,
            message: search,
        }
    }catch(ex){
        throw ({
            status: 400,
            message: ex
        });
    }
}