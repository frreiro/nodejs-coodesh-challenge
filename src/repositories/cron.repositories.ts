import {db} from "../config/db.js"

export async function insertCronInfo(): Promise<void> {
	await db.collection('details').insertOne({cron_activated_t: new Date()});	
}

export async function findLatest(){
	return await db.collection('details').findOne({}, { sort: { cron_activated_t: -1}});	
}