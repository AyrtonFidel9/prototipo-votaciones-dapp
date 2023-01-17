import { Representantes } from "../../models/index.js";
import { sequelize } from "../../database.js";
import { config } from 'dotenv';
config();

const representantesFindAll = async () => {
   try {
      const representantes = await Representantes.findAll({
         attributes: [
            'id',
            'principal',
            'psuplente',
            'ssuplente',
            'ethCantVot',
            'createdAt',
            'updatedAt',
            [sequelize.fn(
               'PGP_SYM_DECRYPT',
               sequelize.cast(sequelize.col('billeteraAddress'), 'bytea'),
               process.env.SECRET_KEY_DATABASE
               ),
               "billeteraAddress"
            ],
            'idInscripcion',
            'idElecciones',
         ]
      });
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
      const representante = await Representantes.findByPk(id,{
         attributes: [
            'id',
            'principal',
            'psuplente',
            'ssuplente',
            'ethCantVot',
            'createdAt',
            'updatedAt',
            [sequelize.fn(
               'PGP_SYM_DECRYPT',
               sequelize.cast(sequelize.col('billeteraAddress'), 'bytea'),
               process.env.SECRET_KEY_DATABASE
               ),
               "billeteraAddress"
            ],
            'idInscripcion',
            'idElecciones',
         ]
      });
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

const buscarRepresentante = async (codigo1, codigo2, codigo3, eleccion) => {
   try{
      const search = await Representantes.findAll({
         where: {
            idElecciones: eleccion,
            $or: [
               {
                  principal: codigo1
               },
               {
                  psuplente: codigo2
               },
               {
                  ssuplente: codigo3
               }
            ]
         } 
      })

      if(search !== null)
         throw(`El socio ${codigo} está registrado con otro representante}`);
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


export { representantesFindAll, representanteFindOne, buscarRepresentante };
