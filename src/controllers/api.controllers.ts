import { Request, Response } from "express";
import { findLatestActivate } from "../services/cron.services.js";
import { getOnlineTime } from "../utils/time.js";
import db from "../config/db.js"


export async function apiDetails(req: Request, res: Response){
	console.log("foi")
	const lastCronActivated = await findLatestActivate();
	const onlineTime = getOnlineTime()
	res.send({
		memory_usage: `${Math.round(process.memoryUsage.rss() / 1024 / 1024)} MB`, 
		las_cron_import: lastCronActivated.cron_activated_t,
		online_time: onlineTime,
		db_stats: (await db.stats()).ok
	}).status(200);
}