import { buscarCuentaByUsername } from "../../use-cases/cuenta/index.js";
import { buscarSocio } from "../../use-cases/socios/index.js";

async function validateEstado(req, res, next){

    let { usuario } = req.body;

    /*function searchCuenta(username){
        return new Promise((resolve, reject)=>{
            const resp = buscarCuentaByUsername(usuario);
            resolve(resp);
        });
    }


    function searchSocio(idSocio){
        return new Promise((resolve, reject)=>{
            const resp = buscarSocio(idSocio);
            resolve(resp);
        });
    }

    searchCuenta(usuario).then( resp => {
        if(resp.status === 200){
            return resp.message.idSocio; 
        }
    }).then( idSocio => searchSocio(idSocio))
    .then(socio => {
        console.log("sociooooooooooooooooooooo");
        console.log(socio);
        if(socio.status === 200 && !socio.message.dataValues.estado){
            return res.status(400).send({
                message: 'Cuenta no habilitada'
            });
        }
    }).catch(err=>{
        return res.status(err.status).send({
            message: err.message
        });
    });

    next();*/

    
    try{
        const resp = await buscarCuentaByUsername(usuario);
        if(resp.status === 200){
            const socio = await buscarSocio(resp.message.idSocio);
            if(socio.status === 200 && !socio.message.dataValues.estado){
                return res.status(400).send({
                    message: 'Cuenta no habilitada'
                });
            
            }
            next();
        }
    }catch(err){
        return res.status(err.status).send({
            message: err.message
        });
    }
}

export { validateEstado };