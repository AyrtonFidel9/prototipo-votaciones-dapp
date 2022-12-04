import app from './app.js';
import { sequelize } from './database.js';
import { PORT } from './config/index.js';
import './models/index.js';
import cors  from 'cors';
import bodyParser from 'body-parser';
import { Agencias, Cuenta, Socios } from './models/index.js';
import bcrypt from 'bcryptjs';

async function main() {
    console.log({PORT})
    try {
        await sequelize.sync ({force: true})
        app.listen(PORT, ()=>{
            console. log ("Server is listening on port", PORT);
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

        const socio = await Socios.create({
            nombres: 'Jane Jane',
            apellidos: 'Sanchez Mendoza',
            codigo: 1234,
            estado: true,
            email: 'jane@mail.com',
            celular: '0918734511',
            cedula: '0606276134',
            idAgencia: agencia.id,
        });

        const salt = bcrypt.genSaltSync(10);
        const pass = await bcrypt.hash('1234',salt);

        const cuenta = await Cuenta.create({ 
            usuario: "Jane92",
            password: pass, 
            rol: "ROLE_ADMIN",
            ultimoAcceso: '2022-12-10',
            ipCliente: '192.192.10.12',
            idSocio: socio.id,
        });
        
        console.log(cuenta.password);

    } catch (error) {
        console.error ("Unable to connect to the database:", error);
    }
}

main();