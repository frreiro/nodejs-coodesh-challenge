import cron from "node-cron"


import { importServices } from "../services/import.services.js";
import {saveActivateCronTime} from "../services/cron.services.js";

cron.schedule('0 10 17 1/1 *',async () => {
	console.log("opa")
	await importServices.importFileNamesFromCoodesh()
	await saveActivateCronTime();
});