import { Elecciones } from '../../models/index.js';


export const create = async ({
   nombre,
   dia,
   hora,
   duracion,
   estado,
   idAgencia,
}) => {
   estado = 'NO-INICIADO';
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