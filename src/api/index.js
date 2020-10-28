import axios from 'axios'

const api_key = "337b934033a83f12ed47bbf09434ed9a"
// const url = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid="
export const weatherRequest = async(quard, city) => {
	let date = new Date()
	date.setHours(date.getHours() - 1)
	let lastHour = new Date(date.toUTCString()).getTime()
	const url =` https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${quard.lat}&lon=${quard.lon}&dt=${Math.floor(lastHour/1000)}&appid=${api_key}`
	const { data }  = await axios.get(url, { params:{units: 'metric'}})
	return data;
}

export const currentForecastRequest = async(quard, city) => {
	const url =` https://api.openweathermap.org/data/2.5/onecall?lat=${quard.lat}&lon=${quard.lon}&appid=${api_key}`
	const { data }  = await axios.get(url, { params:{units: 'metric'}})
	return data;
}

export const multipleCity = async(cities) => {
	const ids = cities.map(city => city.id)
	const url =` https://api.openweathermap.org/data/2.5/group?id=${ids}&appid=${api_key}`
	const { data }  = await axios.get(url, { params:{units: 'metric'}})
	return data;
}

export const locationRequest = async () => {
	const {data} = await axios.get('http://ip-api.com/json')
	return data;
}