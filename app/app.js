import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';

const swaggerDocument  = JSON.parse(
    await readFile(new URL('../swagger.json', import.meta.url)));

const app = express();

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", routes);	

export default app;