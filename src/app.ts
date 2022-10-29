import express from "express" 
import router from "./routers/routers.js"
import dotenv from "dotenv"
import cors from "cors"
import "express-async-errors"
import "./utils/cron.js"
import "./utils/time.js"
dotenv.config();


const app = express();
app.use(cors())
app.use(express.json());

app.use(router);


export default app;