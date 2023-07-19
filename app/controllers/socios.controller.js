import { buscarAgencia } from "../use-cases/agencias/index.js";

import {
  ingresarSocio,
  buscarSocio,
  actualizarSocio,
  eliminarSocio,
  buscarSocioByPhone,
  buscarAllSocios,
  buscarSocioCuenta,
} from "../use-cases/socios/index.js";
import fs from "fs";
import csv from "csv-parser";
import path from "path";
import os from "os";
import { actualizarEstadoSocio } from "../use-cases/socios/actualizarSocio.js";

const ingresarSocioController = (req, res) => {
  function searchAgencia(id) {
    return new Promise((resolve, rej) => {
      const buscar = buscarAgencia(id);
      resolve(buscar);
    });
  }

  function ingresar(socio) {
    return new Promise((resolve, rej) => {
      const added = ingresarSocio(
        { ...socio },
        req.headers["x-real-ip"] || req.connection.remoteAddress
      );
      resolve(added);
    });
  }

  searchAgencia(req.body.idAgencia)
    .then((agencia) => {
      return agencia.message.id;
    })
    .then((id) => {
      req.body.idAgencia = id;
      console.log(req.body);
      return ingresar(req.body);
    })
    .then((result) => {
      return res.status(result.status).send({
        message: result.message,
      });
    })
    .catch((err) => {
      console.log(err);
      if (err.message.errors) {
        const __dirname = process.cwd();
        fs.unlinkSync(__dirname + err.message.errors[0].instance.imagen);
      }
      return res.status(err.status).send({
        message: err.message,
      });
    });
};

const leftJoinNotMatching = (array1, array2) => {
  const result = [];
  array1.forEach((obj1) => {
    const obj2 = array2.find(
      (x) => parseInt(x.codigo) === parseInt(obj1.dataValues.codigo)
    );
    if (!obj2) {
      result.push({ ...obj1 });
    }
  });
  return result;
};

const rightJoinNotMatching = (array1, array2) => {
  const result = [];
  array2.forEach((obj2) => {
    const obj1 = array1.find(
      (x) => parseInt(x.dataValues.codigo) === parseInt(obj2.codigo)
    );
    if (!obj1) {
      result.push({ ...obj2 });
    }
  });
  return result;
};

const ingresoMasivoController = async (req, res) => {
  const { idAgencia, buffer, nombreArchivo } = req.body;
  const tmpFile = path.join(os.tmpdir(), nombreArchivo);
  fs.writeFileSync(tmpFile, buffer);

  function searchAgencia(id) {
    return new Promise((resolve, rej) => {
      const buscar = buscarAgencia(id);
      resolve(buscar);
    });
  }

  searchAgencia(idAgencia)
    .then((agencia) => {
      return agencia.message.id;
    })
    .catch((err) => {
      return res.status(err.status).send({
        message: err.message,
      });
    });

  const dbUsuarios = await buscarSocioCuenta();
  const dbSocios = dbUsuarios.message.filter((item) => {
    return (
      item.dataValues.idAgencia === parseInt(idAgencia) &&
      item.dataValues.cuentum.dataValues.rol === "ROLE_SOCIO"
    );
  });

  const dataArray = [];
  fs.createReadStream(tmpFile)
    .pipe(csv())
    .on("data", (data) => {
      const cleanedData = {};
      const usuario = {};
      Object.entries(data).forEach(([rawK, value]) => {
        const key = rawK.trim();
        cleanedData[key] = value.trim();
        const valores = cleanedData[key].split(";");
        key.split(";").forEach((item, index) => {
          usuario[item] = valores[index];
        });
      });
      //console.log(usuario);
      const usuario_clean = {
        nombres: usuario.NOMBRE,
        apellidos: usuario.APELLIDO1 + " " + usuario.APELLIDO2,
        cedula: usuario.NRO_IDENTIFICACION,
        codigo: usuario.CODIGO_SOCIO,
        celular: usuario.CELULAR,
        email: usuario.EMAIL,
      };

      if (
        !usuario_clean.nombres ||
        !usuario_clean.apellidos ||
        !usuario_clean.cedula ||
        !usuario_clean.codigo
      )
        return res.status(400).send({
          message:
            "Hubo un error al ingresar los datos, revise el formato del archivo .CSV",
        });

      dataArray.push(usuario_clean);
      //console.log(dataArray);
    })
    .on("end", () => {
      const arrayDeshabilitar = leftJoinNotMatching(dbSocios, dataArray); //array de los socios a deshabilitar

      const arrayNuevos = rightJoinNotMatching(dbSocios, dataArray); //array nuevos socios

      // se desahabilitan a los usuarios que no estan en la nueva lista (.csv)
      arrayDeshabilitar.map(async (usuario) => {
        try {
          const result = await actualizarEstadoSocio(
            usuario.dataValues.id,
            false
          );
        } catch (err) {
          //console.log(err);
        }
      });

      arrayNuevos.forEach(async (usuario) => {
        try {
          usuario.estado = true; //---------------CONDICIONADO FALTA
          usuario.idAgencia = idAgencia;
          if (!usuario.celular) {
            usuario.celular = null;
          }
          const result = await ingresarSocio(
            { ...usuario },
            req.headers["x-real-ip"] || req.connection.remoteAddress
          );
        } catch (err) {
          //console.log(err);
        }
      });
      return res.status(200).send({
        message: "¡Datos ingresados con éxito!",
      });
    });
};

const actualizarSocioController = (req, res) => {
  const { idSocio } = req.params;

  function searchSocio(id) {
    return new Promise((res, rej) => {
      const buscar = buscarSocio(id);
      res(buscar);
    });
  }

  function updateSocio(id, oldImage, newSocio) {
    return new Promise((res, rej) => {
      const updated = actualizarSocio(id, oldImage, { ...newSocio });
      res(updated);
    });
  }
  searchSocio(idSocio)
    .then((socio) => {
      return socio.message;
    })
    .then((datos) => updateSocio(datos.id, datos.imagen, req.body))
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

const buscarSocioController = (req, res) => {
  const { idSocio } = req.params;

  const search = buscarSocio(idSocio);

  search.then((resp) => {
    res.status(resp.status).send({
      message: resp.message,
    });
  });
};

const eliminarSocioController = (req, res) => {
  const { idSocio } = req.params;

  if (!idSocio)
    res.status(400).send({
      message: "Ha ocurrido un error",
    });

  function search(id) {
    return new Promise((res, rej) => {
      const buscar = buscarSocio(id);
      res(buscar);
    });
  }

  function eliminar(id) {
    return new Promise((res, rej) => {
      const deleted = eliminarSocio(id);
      res(deleted);
    });
  }

  search(idSocio)
    .then((socio) => {
      if (socio.status !== 200) {
        res.status(socio.status).send({
          message: socio.message,
        });
      }
      return socio.message.id;
    })
    .then((id) => eliminar(id))
    .then((resp) => {
      res.status(resp.status).send({
        message: resp.message,
      });
    })
    .catch((err) => {
      res.status(err.status).send({
        message: err.message,
      });
    });
};

function existSocioByPhoneController(req, res) {
  const { number } = req.params;

  const search = buscarSocioByPhone(number);

  search
    .then((resp) => {
      if (resp.status == 200) {
        res.status(200).send({
          message: {
            existe: true,
            idSocio: resp.message.id,
          },
        });
      } else {
        res.status(resp.status).send({
          message: resp.message,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function buscarAllSociosController(req, res) {
  const buscar = buscarAllSocios();

  buscar
    .then((socios) => {
      if (socios.status === 200)
        res.status(socios.status).send({
          message: socios.message,
        });
    })
    .catch((err) => {
      res.status(err.status).send({
        message: err.message,
      });
    });
}

function buscarSocioCuentaController(req, res) {
  const buscar = buscarSocioCuenta();

  buscar
    .then((socios) => {
      if (socios.status === 200)
        res.status(socios.status).send({
          message: socios.message,
        });
    })
    .catch((err) => {
      res.status(err.status).send({
        message: err.message,
      });
    });
}

export default Object.freeze({
  ingresarSocio: ingresarSocioController,
  buscarSocio: buscarSocioController,
  actualizarSocio: actualizarSocioController,
  eliminarSocio: eliminarSocioController,
  existSocioByPhone: existSocioByPhoneController,
  buscarAllSocios: buscarAllSociosController,
  buscarSocioCuenta: buscarSocioCuentaController,
  ingresoMasivo: ingresoMasivoController,
});
