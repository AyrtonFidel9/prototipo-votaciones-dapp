import app from "./app.js";
import { sequelize } from "./database.js";
import { PORT } from "./config/index.js";
import "./models/index.js";
import {
  Agencias,
  Cuenta,
  Elecciones,
  Inscripciones,
  Socios,
  Representantes,
} from "./models/index.js";
import CryptoJS from "crypto-js";
import Web3 from "web3";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  console.log({ PORT });

  //install pgcrypto en database for encrypt
  //CREATE EXTENSION IF NOT EXISTS pgcrypto;
  try {
    const web3 = new Web3();
    //await sequelize.sync({ force: true }); //para actualizar borrando todo
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log("Server is listening on port", PORT);
    });

    // simple route
    app.get("/", (req, res) => {
      res.json({ message: "Welcome to DAPP Vote." });
    });

    /*const agencia = await Agencias.create({
      nombre: "La Matriz",
      ubicacion: "La Matriz",
      numRepresentantes: 6,
      numGanadores: 3,
    });

    const agencia2 = await Agencias.create({
      nombre: "San Andres",
      ubicacion: "San Andres",
      numRepresentantes: 6,
      numGanadores: 3,
    });

    const agencia3 = await Agencias.create({
      nombre: "Penipe",
      ubicacion: "Penipe",
      numRepresentantes: 6,
      numGanadores: 3,
    });

    const socio = await Socios.create({
      nombres: "Jane Jane",
      apellidos: "Sanchez Mendoza",
      codigo: 1234,
      estado: true,
      email: "jane@mail.com",
      celular: "0981500751",
      cedula: "0604538058",
      idAgencia: agencia.id,
    });
    const socio2 = await Socios.create({
      nombres: "Jose Luis",
      apellidos: "Alvarez Mendoza",
      codigo: 1231,
      estado: true,
      email: "jose@mail.com",
      celular: "0606276134",
      cedula: "0501675946",
      idAgencia: agencia2.id,
    });

    const socio3 = await Socios.create({
      nombres: "Maria Jose",
      apellidos: "Perez Solorzano",
      codigo: 1237,
      estado: true,
      email: "mariajose3@mail.com",
      celular: "0981588753",
      cedula: "0104292461",
      idAgencia: agencia2.id,
    });

    const socio4 = await Socios.create({
      nombres: "Luis Hernesto",
      apellidos: "Alvarez Villa",
      codigo: 1233,
      estado: true,
      email: "mariajose4@mail.com",
      celular: "0981588754",
      cedula: "1750180745",
      idAgencia: agencia2.id,
    });

    const socio5 = await Socios.create({
      nombres: "Sonia Maria",
      apellidos: "Guaman Diaz",
      codigo: 1232,
      estado: true,
      email: "mariajose5@mail.com",
      celular: "0981588752",
      cedula: "0605153618",
      idAgencia: agencia2.id,
    });

    const pass = CryptoJS.AES.encrypt("1234", "key-caycne-189321").toString();

    const date = new Date();

    const cuenta = await Cuenta.create({
      usuario: "Jane92",
      password: pass,
      rol: "ROLE_ADMIN",
      ultimoAcceso: "2022-12-10",
      ipCliente: "192.192.10.12",
      idSocio: socio.id,
      ipCliente: "172.45.10.1",
      ultimoAcceso: date,
    });

    const cuenta2 = await Cuenta.create({
      usuario: "Luis92",
      password: pass,
      rol: "ROLE_SOCIO",
      ultimoAcceso: "2022-12-10",
      ipCliente: "192.192.10.12",
      idSocio: socio2.id,
      ipCliente: "172.45.10.1",
      ultimoAcceso: date,
    });

    const cuenta3 = await Cuenta.create({
      usuario: "JGE92",
      password: pass,
      rol: "ROLE_JGE",
      ultimoAcceso: "2022-12-10",
      ipCliente: "192.192.10.12",
      idSocio: socio3.id,
      ipCliente: "172.45.10.1",
      ultimoAcceso: date,
    });

    const cuenta4 = await Cuenta.create({
      usuario: "LuisAlvarez92",
      password: pass,
      rol: "ROLE_SOCIO",
      ultimoAcceso: "2022-12-10",
      ipCliente: "192.192.10.12",
      idSocio: socio4.id,
      ipCliente: "172.45.10.1",
      ultimoAcceso: date,
    });

    const cuenta5 = await Cuenta.create({
      usuario: "Sonia92",
      password: pass,
      rol: "ROLE_SOCIO",
      ultimoAcceso: "2022-12-10",
      ipCliente: "192.192.10.12",
      idSocio: socio5.id,
      ipCliente: "172.45.10.1",
      ultimoAcceso: date,
    });

    const eleccion = await Elecciones.create({
      nombre: "Elecciones 1",
      duracion: 8,
      idAgencia: agencia.id,
    });

    const eleccion2 = await Elecciones.create({
      nombre: "Elecciones 2",
      duracion: 8,
      idAgencia: agencia2.id,
    });

    const eleccion3 = await Elecciones.create({
      nombre: "Elecciones 3 penipe",
      duracion: 8,
      idAgencia: agencia3.id,
    });

    /*

        const inscripcion = await Inscripciones.create({
            formulario: '',
            declaracion: '',
            idSocio: socio4.id,
            idElecciones: eleccion2.id,
        });

        const inscripcion2 = await Inscripciones.create({
            formulario: '',
            declaracion: '',
            idSocio: socio4.id,
            idElecciones: eleccion2.id,
        })
        
        const representante = await Representantes.create({
            principal: 1232,
            "psuplente": 1231,
            "ssuplente": 1233,
            "ethCantVot": 20,
            "idInscripcion": inscripcion.id,
            "idElecciones": eleccion2.id,
        });

        const representante2 = await Representantes.create({
            principal: 1231,
            "psuplente": 1233,
            "ssuplente": 1232,
            "ethCantVot": 20,
            "idInscripcion": inscripcion2.id,
            "idElecciones": eleccion2.id,
            billeteraAddress: billeteraRep.address,
        });
        */
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
