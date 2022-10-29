import cron from "node-cron"


import { importFileNamesFromCoodesh } from "../services/import.services.js";
import {saveActivateCronTime} from "../services/cron.services.js";

//TODO: Change cron time to one day
cron.schedule('*/5 * * * *',async () => {
	console.log("opa")
	await importFileNamesFromCoodesh()
	await saveActivateCronTime();
});