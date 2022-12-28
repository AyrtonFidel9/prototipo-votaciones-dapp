import { Agencias } from "../../models/index.js";

export default async function buscarAllAgencia () {
    try
    {
        const search = await Agencias.findAll();
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