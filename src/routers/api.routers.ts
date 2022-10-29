import { Router } from "express";
import { apiDetails } from "../controllers/api.controllers.js";
import { findLatestActivate } from "../services/cron.services.js";
import { getOnlineTime } from "../utils/time.js";

const apiRouter = Router();

apiRouter.get('/', apiDetails)

apiRouter.get('/health',async (req, res) => {
	console.log(process.cpuUsage())
	res.sendStatus(200);
})

export default apiRouter;