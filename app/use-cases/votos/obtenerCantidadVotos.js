import { Votos } from "../../models/index.js";

export default async function buscarVotoPorEleccion(
  idRepresentante,
  idElecciones
) {
  try {
    const search = await Votos.count({
      where: {
        idRepresentante: idRepresentante,
        idElecciones: idElecciones,
      },
    });

    return {
      status: 200,
      message: {
        votos: search,
      },
    };
  } catch (ex) {
    throw {
      status: 400,
      message: ex,
    };
  }
}
