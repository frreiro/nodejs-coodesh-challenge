import { Router } from "express";
import { apiDetails } from "../controllers/api.controllers.js";
import { importFileNamesFromCoodesh } from "../services/import.services.js";

const apiRouter = Router();

apiRouter.get('/', apiDetails)

apiRouter.get('/health', async (req, res) => {
	res.sendStatus(200);
})

export default apiRouter;