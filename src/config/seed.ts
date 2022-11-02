import { importServices } from "../services/import.services.js";

(async () => {
	await importServices.importFileNamesFromCoodesh()	
})()