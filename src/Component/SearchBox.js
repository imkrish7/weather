import React, { useState, useEffect } from 'react';
import styles from '../styles/search.module.scss';
import Location from './Icons/pin.svg';
import Search from './Icons/loupe.svg';
import { data } from '../Utiles/cities'
import { multipleCity } from '../api'
export const SearchBox = ({ city, fetch, setCity }) => {
	let iconUrl = "https://openweathermap.org/img/wn/"
	const [newCity, setNewCity] = useState('');
	const [cities, setCities] = useState([]);
	const [cityQuard, setCityQuard] = useState({})
	useEffect(()=>{
		setNewCity(city)
	}, [city])
	const onSearch = e => {
		if (e.key === 'Enter' || e.type === "click") {
			setCity(newCity)
			fetch(cityQuard)
		}
	};

	const handleChange = async(e)=>{
		const value = e.target.value;
		setNewCity(value)
		if(value.length>0){
			let selectedCity = data.filter(city => {
			if (city.name.includes(value)){
				return city;
			}
		})
		const cityFetch = await multipleCity(selectedCity)
		setCities([...cityFetch.list])
	}
	}

	const changeCity = (city) => {
		setNewCity(city.name)
		setCity(city.name)
		setCityQuard({...city.coord})
		setCities([])
	}

	return (
		<div className={styles.container}>
			<div className={styles.input_wrapper}>
			<img src={Location} className={styles.icon} alt="icon" />
			<input
				type="text"
				value={newCity}
				className={styles.input}
				placeholder="City..."
				onChange={handleChange}
				onKeyPress={onSearch}
			/>
			<img onClick={onSearch} src={Search} className={styles.icon} alt="icon"/>
			</div>
			<div className={styles.suggestion}>
				{cities.length > 0 && <ul className={styles.list}>
						{cities.map((city, ind) => <li key={ind} onClick={() =>changeCity(city)} className={styles.list_item}>
							<span className={styles.city}>{city.name}</span>
							<div className={styles.temp_info}>
						<span className={styles.temp}>
							<span>{city.main.temp}<sup>&deg;</sup>C</span>
						<span className={styles.type}>{city.weather[0].main}</span>
							</span>
						<img className={styles.icon_suggestion} src={iconUrl +  city.weather[0].icon + "@2x.png"}  alt="icon"  />
							</div>
						</li>)}
				</ul>
				}
			</div>
		</div>
	);
};
