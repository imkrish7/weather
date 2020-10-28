import React, {useEffect, useState} from 'react';
import styles from './styles/app.module.scss'

// Utils
import { locationRequest, weatherRequest, currentForecastRequest } from './api'

// Components
import { SearchBox } from './Component/SearchBox'
import { Calendar } from './Component/Calendar'
import { Description } from './Component/Description'
function App() {
  const [city, setCity] = useState('')
  const [currentTemp, setCurrentTemp] = useState({})
  const [hourlyTemp, setHourlyTemp] = useState([])
  const [offset, setOffset] = useState(null)
  const [dailyForecast, setDailyForeCast] = useState([])
  useEffect(()=>{
    fetchData()
  }, [])

  const fetchData = async (quard = {}) => {
    if(quard.lat === undefined){
      var { city, lat, lon } = await locationRequest()
      quard = { lat: lat, lon: lon}
    }
    setCity(city)
    let { current, hourly, timezone_offset} = await weatherRequest(quard, city)
    setCurrentTemp(current)
    setHourlyTemp([...hourly])
    setOffset(timezone_offset)
    let { daily } = await currentForecastRequest(quard, city)
    setDailyForeCast([...daily])
  }
  return (
    <div className={styles.container}>
        <SearchBox city={city} fetch={fetchData} setCity={setCity}/>
       {dailyForecast.length > 0 && <Calendar daily={dailyForecast} />}
        <Description current={currentTemp} hourly={hourlyTemp} offset={offset} />
    </div>
  );
}

export default App;
