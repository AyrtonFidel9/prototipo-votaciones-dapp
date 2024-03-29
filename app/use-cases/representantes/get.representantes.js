import { Representantes } from "../../models/index.js";
import { sequelize } from "../../database.js";
import { config } from "dotenv";
import { Op } from "sequelize";

config();

const representantesFindAll = async () => {
  try {
    const representantes = await Representantes.findAll({
      attributes: [
        "id",
        "principal",
        "psuplente",
        "ssuplente",
        "createdAt",
        "updatedAt",
        "idInscripcion",
        "idElecciones",
      ],
    });
    return {
      status: 200,
      message: representantes,
    };
  } catch (ex) {
    throw {
      status: 400,
      message: ex,
    };
  }
};

const representanteFindOne = async (id) => {
  try {
    const representante = await Representantes.findByPk(id, {
      attributes: [
        "id",
        "principal",
        "psuplente",
        "ssuplente",
        "createdAt",
        "updatedAt",
        "idInscripcion",
        "idElecciones",
      ],
    });
    if (representante === null)
      throw `No existe un representante con el id: ${id}`;
    else
      return {
        status: 200,
        message: representante,
      };
  } catch (ex) {
    throw {
      status: 400,
      message: ex,
    };
  }
};

const buscarRepresentante = async (codigo1, codigo2, codigo3, eleccion) => {
  try {
    const search = await Representantes.findAll({
      where: {
        idElecciones: eleccion,
        [Op.or]: [
          {
            principal: codigo1,
          },
          {
            psuplente: codigo2,
          },
          {
            ssuplente: codigo3,
          },
        ],
      },
    });

    if (search.length > 0)
      throw `Uno de los socios proporcionados ya estan registrados como representantes`;
  } catch (ex) {
    throw {
      status: 400,
      message: ex,
    };
  }
};

const getCountRepresentantesByidEleccion = async (eleccion) => {
  try {
    const { count, rows } = await Representantes.findAndCountAll({
      where: {
        idElecciones: eleccion,
      },
    });

    return count;
  } catch (ex) {
    throw {
      status: 400,
      message: ex,
    };
  }
};

export {
  representantesFindAll,
  representanteFindOne,
  buscarRepresentante,
  getCountRepresentantesByidEleccion,
};
