import express from "express" 
import router from "./routers/routers.js"
import dotenv from "dotenv"
import cors from "cors"
import "express-async-errors"
import cron from "node-cron"
dotenv.config();


const app = express();
app.use(cors())
app.use(express.json());

app.use(router);

cron.schedule('* * * * *', () => {
	console.log('running a task every minute');
});

export default app;