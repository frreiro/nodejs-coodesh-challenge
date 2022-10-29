import { Router } from "express";
import { importFileNamesFromCoodesh } from "../services/import.services.js";
import apiRouter from "./api.routers.js";
const router = Router();


router.get('/test',async (req, res) => {
	await importFileNamesFromCoodesh()
	res.sendStatus(200);
})

router.use(apiRouter);


export default router;