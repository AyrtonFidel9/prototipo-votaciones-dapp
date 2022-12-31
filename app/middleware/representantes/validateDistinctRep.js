
function validateDisctictRep(req, res, next) {
   try {
      
      const { principal, ssuplente, psuplente } = req.body;

      if(principal === psuplente || principal === ssuplente ){
         return res.status(400).send({
            message: 'Un socio no puede ser principal y suplente a la vez'
         });
      }

      if(psuplente === ssuplente){
         return res.status(400).send({
            message: 'Un socio no puede ser suplente dos veces'
         });
      }

      next();
   } catch (err) {
      return res.status(err.status).send({
         message: err.message
      });
   }
}

export { validateDisctictRep };