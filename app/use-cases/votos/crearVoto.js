import { Votos } from "../../models/index.js";

// verificar que los campos de cedula, codigo, email y celular no estae duplicados [x]
export default async function crearVoto({
  idRepresentante,
  idElecciones,
  idSocio,
}) {
  try {
    const voto = await Votos.create({
      idRepresentante,
      idElecciones,
      idSocio,
    });

    return {
      status: 200, //OK,
      message: "Voto ejecutado con éxito",
    };
  } catch (err) {
    throw {
      status: 400,
      message: err,
    };
  }
}
