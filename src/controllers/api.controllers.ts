import { Request, Response } from "express";
import { findLatestActivate } from "../services/cron.services.js";
import { getOnlineTime } from "../utils/time.js";
import {isConnect} from "../config/db.js"


export async function apiDetails(req: Request, res: Response){
	const lastCronActivated = await findLatestActivate();
	const onlineTime = getOnlineTime()
	res.send({
		memory_usage: process.memoryUsage.rss(), 
		last_cron_import: lastCronActivated.cron_activated_t,
		online_time: onlineTime,
		db_check: isConnect ? "OK" : "Disconnected"  
	}).status(200);
}