import app from "./app.js";
import { sequelize } from "./database.js";
import { PORT } from "./config/index.js";
import "./models/index.js";
import { Agencias, Cuenta, Socios } from "./models/index.js";
import CryptoJS from "crypto-js";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  console.log({ PORT });

  //install pgcrypto en database for encrypt
  //CREATE EXTENSION IF NOT EXISTS pgcrypto;
  try {
    //await sequelize.sync({ force: true }); //para actualizar borrando todo
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log("Server is listening on port", PORT);
    });

    // simple route
    app.get("/", (req, res) => {
      res.json({ message: "Welcome to DAPP Vote." });
    });

    /*carga de datos por defecto*/

    const bAgencia = await Agencias.findOne({
      where: { nombre: "La Matriz" },
    });

    const bSocio = await Socios.findOne({
      where: { nombres: "Administrador" },
    });

    const bCuenta = await Cuenta.findOne({
      where: { usuario: "AdminNE2023" },
    });

    if (bAgencia === null && bSocio === null && bCuenta === null) {
      const agencia = await Agencias.create({
        nombre: "La Matriz",
        ubicacion: "La Matriz",
        numRepresentantes: 6,
        numGanadores: 3,
      });

      const socio = await Socios.create({
        nombres: "Administrador",
        apellidos: "Nueva Esperanza",
        codigo: 1234,
        estado: true,
        email: "jane@mail.com",
        celular: "0981500751",
        cedula: "0604538058",
        idAgencia: agencia.id,
      });

      const pass = CryptoJS.AES.encrypt(
        "1234",
        process.env.SECRET_KEY_PASSWORD
      ).toString();

      const date = new Date();

      const cuenta = await Cuenta.create({
        usuario: "AdminNE2023",
        password: pass,
        rol: "ROLE_ADMIN",
        ultimoAcceso: "2022-12-10",
        ipCliente: "192.192.10.12",
        idSocio: socio.id,
        ipCliente: "172.45.10.1",
        ultimoAcceso: date,
      });
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
