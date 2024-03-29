import { Socios } from "../../models/index.js";
import { sequelize } from "../../database.js";
import { config } from "dotenv";
config();

export default async function buscarSocio(id) {
  try {
    const search = await Socios.findByPk(id, {
      attributes: [
        "id",
        "nombres",
        "apellidos",
        "cedula",
        "codigo",
        "imagen",
        "estado",
        "email",
        "celular",
        "idAgencia",
      ],
    });

    if (search === null) throw `No existe el socio con el id: ${id}`;
    else
      return {
        status: 200,
        message: search,
      };
  } catch (err) {
    throw {
      status: 400,
      message: err,
    };
  }
}
