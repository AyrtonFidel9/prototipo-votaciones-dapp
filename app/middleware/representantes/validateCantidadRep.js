import { buscarAgencia, getCountRepresentantesByidEleccion } from "../../use-cases/index.js";
import { eleccionfindOne } from "../../use-cases/index.js";

async function validarCantidadRepresentantes(req, res, next) {
   const { idElecciones } = req.body;
   
   const representantes = await getCountRepresentantesByidEleccion(idElecciones);

   const eleccion = await eleccionfindOne(idElecciones);

   const agencia = await buscarAgencia(eleccion.message.dataValues.idAgencia);

   // se suma uno por el candidato donde se vota nulo
   if(representantes <= agencia.message.dataValues.numRepresentantes+1){
      next();
   }else{
      return res.status(400).send({
         message: "Ha excedido la cantidad de representantes para la agencia "+agencia.nombre,
      });
   }

}


export { validarCantidadRepresentantes };