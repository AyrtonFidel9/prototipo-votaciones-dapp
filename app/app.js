import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import { readFile } from "fs/promises";
import YAML from "js-yaml";
import { uploadDocs, uploadFile } from "./middleware/index.js";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const swaggerDocument = YAML.load(
  await readFile(new URL("../swagger.yaml", import.meta.url))
);

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use("/images", express.static(path.join(__dirname, "/public/images/")));
app.use(
  "/files",
  express.static(path.join(__dirname, "/public/docs/inscripcion"))
);
app.use(
  "/justificacion",
  express.static(path.join(__dirname, "/public/docs/justificacion"))
);
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", routes);

export default app;
