import { Elecciones } from '../../models/index.js';

async function eleccionesFindAll() {
   try {
      const elecciones = await Elecciones.findAll();
      return ({
         status: 200,
         message: elecciones,
      });
   } catch (ex) {
      throw ({
         status: 400,
         message: ex
      });
   }
}

// Find a single Elecciones with an id
const eleccionFindOne = async (id) => {
   try {
      const eleccion = await Elecciones.findByPk(id);
      if (eleccion === null)
         throw (`No existe una elección con el id: ${id}`);
      else
         return ({
            status: 200,
            message: eleccion,
         });

   } catch (ex) {
      throw ({
         status: 400,
         message: ex
      });
   }
};

export { eleccionesFindAll, eleccionFindOne };