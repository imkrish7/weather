import { weekDay } from './dateUtils'
export const formatData = (data, offset) =>{

	let pastDate = new Date().getDate() - 1
	let minTime =Number.MAX_SAFE_INTEGER, maxTime=Number.MIN_SAFE_INTEGER;
	let minTemp =Number.MAX_SAFE_INTEGER, maxTemp=Number.MIN_SAFE_INTEGER;
	if(data){
	let result = data.map(temp => {
		let { dt } = temp
		
		let date = new Date((dt*1000)).getDate()
		let currentDate = new Date().getDate()
		if((pastDate === date) || (date === currentDate)){
			
			if(minTime>dt ){
				minTime = dt
			}
			if(maxTime < dt){
				maxTime = dt
			}
			if(minTemp>temp.temp ){
				minTemp = temp.temp
			}
			if(maxTemp < temp.temp){
				maxTemp = temp.temp
			}
			let hourdata = { temp: temp.temp, time: dt, date}
			return hourdata;
		}
		return undefined
	}).filter(temp => temp !== undefined)
	return {data: [...result], minTime, maxTime, minTemp, maxTemp};
}
}

export const formatWeekDay = (data) => {
	let result = data.map(day => {
		let date = new Date(day.dt*1000)
		let currentDate = new Date()
		let temp = {
			icon: day.weather[0].icon,
			date,
			day: weekDay[date.getDay()],
			border: currentDate.getDate() === date.getDate(),
			type: day.weather[0].main,
			temp: day.temp.day
		}
		return temp;
	})

	return result;
}