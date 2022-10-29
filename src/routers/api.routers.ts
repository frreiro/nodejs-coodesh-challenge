import { Router } from "express";
import { apiDetails } from "../controllers/api.controllers.js";
import AppError from "../utils/appError.js";

const apiRouter = Router();

apiRouter.get('/', apiDetails)

apiRouter.get('/health', (req, res) => {
	res.sendStatus(200);
})

export default apiRouter;