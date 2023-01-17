import { request } from "express";
import { buscarRepresentante, buscarSocioCondition } from "../../use-cases/index.js";


async function validateRepresentante(req, res, next) {
   try {
      const principal = await buscarSocioCondition('codigo', req.body.principal);
      if(principal.status !== 200){
         return res.status(principal.status).send({
            message: principal.message,
         });
      }

      const psuplente = await buscarSocioCondition('codigo', req.body.psuplente);
      if(psuplente.status !== 200){
         return res.status(psuplente.status).send({
            message: psuplente.message,
         });
      }

      const ssuplente = await buscarSocioCondition('codigo', req.body.ssuplente);
      if(ssuplente.status !== 200){
         return res.status(ssuplente.status).send({
            message: ssuplente.message,
         });
      }
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

   try{
      const validar = await buscarRepresentante(principal, psuplente, ssuplente, idElecciones);

      if(validar.status !== 200){
         return res.status(validar.status).send({
            message:validar.message
         });
      }
      next()
   } catch{
      console.log(err);
      return res.status(err.status).send({
         message: err.message
      });
   }
}

export { validateRepresentante, validarRepresentante };