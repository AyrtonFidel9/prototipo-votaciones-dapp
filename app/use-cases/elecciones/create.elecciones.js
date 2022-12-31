import { Elecciones } from '../../models/index.js';


export const create = async ({
   nombre,
   dia,
   hora,
   duracion,
   estado,
   idAgencia,
}) => {
   console.log(nombre);
   try {
      const eleccion = await Elecciones.create({
         nombre,
         dia,
         hora,
         duracion,
         estado,
         idAgencia
      });
      return ({
         status: 200, //OK,
         message: eleccion.dataValues,
      });
   } catch (err) {
      throw ({
         status: 400,
         message: err
      });
   }
};