import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';
import YAML from 'js-yaml';
import { uploadFile } from './middleware/index.js';

const swaggerDocument  = YAML.load(
    await readFile(new URL('../swagger.yaml', import.meta.url)));

const app = express();

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(uploadFile.single('imagen'))
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", routes);	

export default app;