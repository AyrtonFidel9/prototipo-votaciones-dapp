import app from './app.js';
import { sequelize } from './database.js';
import PORT from './config.js';
import './models/index.js'



async function main() {
    console.log({PORT})
    try {
        await sequelize.sync ({force: true})
        app.listen(PORT, ()=>{
            console. log ("Server is listening on port", PORT);
        });
    } catch (error) {
        console.error ("Unable to connect to the database:", error);
    }
}

main();