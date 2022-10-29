import { Router } from "express";
import { apiDetails } from "../controllers/api.controllers.js";

const apiRouter = Router();

apiRouter.get('/', apiDetails)

apiRouter.get('/health', (req, res) => {
	res.sendStatus(200);
})

export default apiRouter;