import express from "express" 
import axios from "axios"
import {unzip} from "node:zlib"
import ndjson from "ndjson"
import fs from "fs"
import router from "./routers/routers.js"
import { importFileNamesFromCoodesh } from "./services/import/import.js"


const app = express();
app.use(router);

app.get('/test',async (req, res) => {
	await importFileNamesFromCoodesh()
	res.sendStatus(200);
})
	


export default app;