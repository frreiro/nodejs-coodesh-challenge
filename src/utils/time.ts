import dayjs from "dayjs"

const timeWhenServerStarted = dayjs();

export function getOnlineTime(){
	return dayjs().diff(timeWhenServerStarted);
}