import { Socios } from "../../models/index.js";

export default async function buscarSocioCondition(column, value) {
   try{
      const search = await Socios.findOne({
         where: { [column]: value },
      });

      if(search === null)
         throw(`No existe el socio con ${column} igual a ${value}`);
      else
         return({
            status: 200,
            message: search,
         });
   }catch(ex){
      throw ({
         status: 400,
         message: ex
      });
   }
}