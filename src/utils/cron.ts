import cron from "node-cron"


import { importServices } from "../services/import.services.js";
import {saveActivateCronTime} from "../services/cron.services.js";

cron.schedule('0 30 23 */ * *',async () => {
	await importServices.importFileNamesFromCoodesh()
	await saveActivateCronTime();
},{ timezone : "America/Sao_Paulo" })
