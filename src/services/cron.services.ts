import * as cronRepository from "../repositories/cron.repositories.js"


export async function saveActivateCronTime(){
	await cronRepository.insertCronInfo();
}

export async function findLatestActivate(){
	return cronRepository.findLatest()
}