import { Representantes } from "../../models/index.js";

const representantesFindAll = async () => {
   try {
      const representantes = await Representantes.findAll();
      return ({
         status: 200,
         message: representantes,
      });
   } catch (ex) {
      throw ({
         status: 400,
         message: ex
      });
   }
};

const representanteFindOne = async (id) => {
   try {
      const representante = await Representantes.findByPk(id);
      if (representante === null)
         throw (`No existe un representante con el id: ${id}`);
      else
         return ({
            status: 200,
            message: representante,
         });
   } catch (ex) {
      throw ({
         status: 400,
         message: ex
      });
   }
};

export { representantesFindAll, representanteFindOne };
