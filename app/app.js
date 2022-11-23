import express from 'express';
import { cors } from 'cors';
import { bodyParser } from 'body-parser';
//import routes from "routes";
// other imports

// initialize express server
const app = express();

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());



//app.use("/", routes);	
export default app;