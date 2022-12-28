import app from './app.js';
import { sequelize } from './database.js';
import { PORT } from './config/index.js';
import './models/index.js';
import { Agencias, Cuenta, Socios } from './models/index.js';
import CryptoJS from "crypto-js";

async function main() {
    console.log({PORT});
    try {
        await sequelize.sync ({force: true})
        app.listen(PORT, ()=>{
            console.log("Server is listening on port", PORT);
        });

        // simple route
        app.get("/", (req, res) => {
            res.json({ message: "Welcome to DAPP Vote." });
        });

        const agencia = await Agencias.create({
            nombre: 'La Matriz',
            ubicacion: 'La Matriz',
            numRepresentantes: 6,
            numGanadores: 3,
        });

        const agencia2 = await Agencias.create({
            nombre: 'San Andres',
            ubicacion: 'San Andres',
            numRepresentantes: 6,
            numGanadores: 3,
        });

        const socio = await Socios.create({
            nombres: 'Jane Jane',
            apellidos: 'Sanchez Mendoza',
            codigo: 1234,
            estado: true,
            email: 'jane@mail.com',
            celular: '0981500751',
            cedula: '0104292461',
            idAgencia: agencia.id,
        });

        const socio2 = await Socios.create({
            nombres: 'Jose Luis',
            apellidos: 'Alvarez Mendoza',
            codigo: 1231,
            estado: true,
            email: 'jose@mail.com',
            celular: '0606276134',
            cedula: '0501675946',
            idAgencia: agencia2.id,
        });

        

        const pass = CryptoJS.AES.encrypt(
            '1234',
            'key-caycne-189321').toString();

        const date = new Date();

        const cuenta = await Cuenta.create({ 
            usuario: "Jane92",
            password: pass, 
            rol: "ROLE_ADMIN",
            ultimoAcceso: '2022-12-10',
            ipCliente: '192.192.10.12',
            idSocio: socio.id,
            ipCliente: '172.45.10.1',
            ultimoAcceso: date
        });

        const cuenta2 = await Cuenta.create({ 
            usuario: "Luis92",
            password: pass, 
            rol: "ROLE_SOCIO",
            ultimoAcceso: '2022-12-10',
            ipCliente: '192.192.10.12',
            idSocio: socio2.id,
            ipCliente: '172.45.10.1',
            ultimoAcceso: date
        });
        
        
        console.log(cuenta.password);

    } catch (error) {
        console.error ("Unable to connect to the database:", error);
    }
}

main();