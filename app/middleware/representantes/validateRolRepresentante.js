import { buscarCuentaBySocio, buscarSocioCondition } from "../../use-cases/index.js";


async function validateRolRepresentante(req, res, next) {
   try {
      const principal = await buscarSocioCondition('codigo', req.body.principal);
      if(principal.status === 200){
         const id = principal.message.dataValues.id;
         const usuario = principal.message.dataValues.nombres +" "+
            principal.message.dataValues.apellidos;
         const cuenta = await buscarCuentaBySocio(id);
         if(cuenta.message.dataValues.rol !== 'ROLE_SOCIO')
            return res.status(400).send({
               message: `El rol del usuario ${usuario} le impide participar como representante`,
            });
      }

      const psuplente = await buscarSocioCondition('codigo', req.body.psuplente);
      if(psuplente === 200){
         const id = psuplente.message.dataValues.id;
         const usuario = psuplente.message.dataValues.nombres +" "+
            psuplente.message.dataValues.apellidos;
         const cuenta = await buscarCuentaBySocio(id);
         if(cuenta.message.dataValues.rol !== 'ROLE_SOCIO')
            return res.status(400).send({
               message: `El rol del usuario ${usuario} le impide participar como representante`,
            });
      }

      const ssuplente = await buscarSocioCondition('codigo', req.body.ssuplente);
      if(ssuplente === 200){
         const id = ssuplente.message.dataValues.id;
         const usuario = ssuplente.message.dataValues.nombres +" "+
            ssuplente.message.dataValues.apellidos;
         const cuenta = await buscarCuentaBySocio(id);
         if(cuenta.message.dataValues.rol !== 'ROLE_SOCIO')
            return res.status(400).send({
               message: `El rol del usuario ${usuario} le impide participar como representante`,
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

export { validateRolRepresentante };