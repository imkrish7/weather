import React from 'react'
import styles from '../styles/description.module.scss';
import { LineChart } from './LineChart'

// Utils
import { formatData } from '../Utiles/formateData'



export const Description = ({ current, hourly, offset }) => {
	let {data, minTime, maxTime, maxTemp, minTemp} = formatData(hourly, offset)
	let iconUrl = "https://openweathermap.org/img/wn/"
	let {sunrise, sunset } = current;
	let sunriseDate = new Date(sunrise*1000)
	let sunsetDate = new Date(sunset*1000)
	let sunriseHour = sunriseDate.getHours()
	let sunriseMinute = sunriseDate.getMinutes()
	let sunsetHour = sunsetDate.getHours()
	let sunsetMinute = sunsetDate.getMinutes()
	return <div className={styles.container}>
			<div className={styles.current_temp}>
				<div className={styles.temp}>
					<h1 className={styles.temp_text}>
						{current.temp}
						<sup>&deg;</sup>
						C
					</h1>
				</div>
				<div className={styles.icon_wrapper}>
					{ current.weather && <img className={styles.icon} src={iconUrl +  current.weather[0].icon + "@2x.png" } alt="icon"/>}
				</div>
				
			</div>
			{data.length && <LineChart data={data} minTime={minTime} maxTime={maxTime} minTemp={minTemp} maxTemp={maxTemp} />}
			<div className={styles.other_info}>
				<div className={styles.info_wrapper}>
					<span className={styles.header}>Pressure</span>
					<span className={styles.value}>{ current.pressure || 0}  hpa</span>
				</div>
				<div className={styles.info_wrapper}>
					<span className={styles.header}>Humidity</span>
					<span className={styles.value}>{current.humidity || 0} %</span>
				</div>
			</div>
			<div className={styles.other_info}>
				<div className={styles.info_wrapper}>
					<span className={styles.header}>Sunrise</span>
					<span className={styles.value}>{ `${sunriseHour}:${sunriseMinute}` || 0} am</span>
				</div>
				<div className={styles.info_wrapper}>
					<span className={styles.header}>Sunset</span>
					<span className={styles.value}>{`${sunsetHour%12}:${sunsetMinute}` || 0} pm</span>
				</div>
			</div>
	</div>
}