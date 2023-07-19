import { justificacionFindEleccionaAndSocio } from "../../use-cases/index.js";

async function validarJustificacion(req, res, next) {
  let { idElecciones, idSocio } = req.body;
  try {
    const resp = await justificacionFindEleccionaAndSocio(
      idSocio,
      idElecciones
    );
    if (resp) {
      next();
    } else {
      return res.status(400).send({
        message: "Solo se puede tener una justificación por elección",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(err.status).send({
      message: err.message,
    });
  }
}

export { validarJustificacion };
