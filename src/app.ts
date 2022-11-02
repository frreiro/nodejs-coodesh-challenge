import express from "express" 
import router from "./routers/routers.js"
import dotenv from "dotenv"
import cors from "cors"
import "express-async-errors"

import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js"

import "./utils/cron.js"
import "./utils/time.js"

dotenv.config();


const app = express();
app.use(cors())
app.use(express.json());

app.use(router);

app.use(errorHandlerMiddleware)
export default app;