import { Socios } from "../../models/index.js";

export default async function ingresarSocio(
    {nombres,
    apellidos,
    cedula,
    codigo,
    imagen,
    estado,
    email,
    celular,
    idAgencia}
){

    try{
        const socio = await Socios.create({
            nombres: nombres,
            apellidos: apellidos,
            cedula: cedula,
            codigo: codigo,
            imagen: imagen && ('/app/public/images/'+imagen),
            estado: estado,
            email: email,
            celular: celular,
            idAgencia: idAgencia,
        });

        return {
            status: 200, //OK,
            message: socio,
        }
    }
    catch(err){
        throw ({
            status: 400,
            message: err,
        });
    }
}