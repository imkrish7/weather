import React, {useEffect, useState} from 'react';
import styles from '../styles/calendar.module.scss'
// import week from '../Utiles'
import { formatWeekDay } from '../Utiles/formateData'
export const Calendar = ({daily}) => {
	
	const [week, setWeek] = useState([])
	let iconUrl = "https://openweathermap.org/img/wn/"

	useEffect(()=>{

		const format = async() =>{
			const data = await formatWeekDay(daily)
			setWeek([...data])
		}
		format()
	}, [daily])

	return (
		<div className={styles.container}>

			<ul className={styles.week_days}>
				{week.slice(0, 5).map((day, ind) => {
					return <li 
					key={ind}
					className={[styles.week_day, day.border && styles.border].join(" ")} 
					
				>
					<span className={styles.name}>{day.day}</span>
				<span className={styles.temp}>
					{day.temp}
					<sup>&deg;</sup>
				</span>
				<span className={styles.icon_wrapper}>
					<img className={styles.icon} src={iconUrl + day.icon + "@2x.png"} alt="icon"/>
				</span>
				<span className={styles.type}>
					{day.type}
				</span>
				</li>

				})}
			</ul>
		</div>
	)
}