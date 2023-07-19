import { Votos } from "../../models/index.js";

export default async function buscarVotoPorEleccion(idElecciones, idSocio) {
  try {
    const search = await Votos.findOne({
      where: {
        idElecciones: idElecciones,
        idSocio: idSocio,
      },
    });

    return {
      status: 200,
      yaVoto: search !== null,
    };
  } catch (ex) {
    throw {
      status: 400,
      message: ex,
    };
  }
}
