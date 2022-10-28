import { Router } from "express";
import { importFileNamesFromCoodesh } from "../services/import/import.js";

const router = Router();


router.get('/test',async (req, res) => {
	await importFileNamesFromCoodesh()
	res.sendStatus(200);
})
	
router.get('/health',async (req, res) => {
	res.sendStatus(200);
})

export default router;