import {
  crearVoto,
  obtenerCantidadVotos,
  obtenerVotoEleccion,
  buscarSocio,
  eleccionfindOne,
  representantesFindAll,
} from "../use-cases/index.js";

const sufragarController = async (req, res) => {
  function searchEleccion(id) {
    return new Promise((resolve, rej) => {
      const buscar = eleccionfindOne(id);
      resolve(buscar);
    });
  }

  function searchSocio(idSocio) {
    return new Promise((resolve, rej) => {
      const buscar = buscarSocio(idSocio);
      resolve(buscar);
    });
  }

  function searchVoto(idE, idS) {
    return new Promise((resolve, rej) => {
      const buscar = obtenerVotoEleccion(idE, idS);
      resolve(buscar);
    });
  }

  function ingresarVoto(voto) {
    return new Promise((resolve, rej) => {
      const added = crearVoto({ ...voto });
      resolve(added);
    });
  }

  function searchRepresentantes() {
    return new Promise((resolve, rej) => {
      const search = representantesFindAll();
      resolve(search);
    });
  }

  searchRepresentantes()
    .then((data) => {
      if (req.body.idRepresentante === 0) {
        const valor = data.message.filter(
          (i) =>
            i.dataValues.principal === 0 &&
            i.dataValues.psuplente === 0 &&
            i.dataValues.ssuplente === 0 &&
            i.dataValues.idElecciones === req.body.idElecciones
        );
        req.body.idRepresentante = valor[0].dataValues.id;
      }
      return searchEleccion(req.body.idElecciones);
    })
    .then(() => searchSocio(req.body.idSocio))
    .then(() => searchVoto(req.body.idElecciones, req.body.idSocio))
    .then(() => ingresarVoto(req.body))
    .then((result) => {
      return res.status(result.status).send({
        message: result.message,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(err.status).send({
        message: err.message,
      });
    });
};

const retornarVotosController = async (req, res) => {
  const { idRepresentante, idEleccion } = req.params;

  function searchVotos(idR, idE) {
    return new Promise((resolve, rej) => {
      const buscar = obtenerCantidadVotos(idR, idE);
      resolve(buscar);
    });
  }

  searchVotos(idRepresentante, idEleccion)
    .then((result) => {
      return res.status(result.status).send({
        votos: result.message.votos,
      });
    })
    .catch((err) => {
      return res.status(err.status).send({
        message: err.message,
      });
    });
};

const validarVotoController = async (req, res) => {
  const { idSocio, idEleccion } = req.body;

  function searchVoto(idE, idS) {
    return new Promise((resolve, rej) => {
      const buscar = obtenerVotoEleccion(idE, idS);
      resolve(buscar);
    });
  }

  searchVoto(idEleccion, idSocio)
    .then((result) => {
      return res.status(result.status).send({
        yaVoto: result.yaVoto,
      });
    })
    .catch((err) => {
      return res.status(err.status).send({
        message: err.message,
      });
    });
};

export default Object.freeze({
  sufragar: sufragarController,
  retornarVotos: retornarVotosController,
  validarVoto: validarVotoController,
});
