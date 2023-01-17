import { request } from "express";
import { buscarRepresentante, buscarSocioCondition } from "../../use-cases/index.js";


async function validateRepresentante(req, res, next) {
   try {
      const principal = await buscarSocioCondition('codigo', req.body.principal);

      const psuplente = await buscarSocioCondition('codigo', req.body.psuplente);

      const ssuplente = await buscarSocioCondition('codigo', req.body.ssuplente);
      
      next();
   } catch (err) {
      console.log(err);
      return res.status(err.status).send({
         message: err.message
      });
   }
}

const validarRepresentante = async (req, res, next) => {
   const {principal, psuplente, ssuplente, idElecciones} = req.body;
   console.log(req.body);

   try{
      const validar = await buscarRepresentante(principal, psuplente, ssuplente, idElecciones);
      next();
   } catch(err){
      console.log(err);
      return res.status(err.status).send({
         message: err.message
      });
   }
}

export { validateRepresentante, validarRepresentante };