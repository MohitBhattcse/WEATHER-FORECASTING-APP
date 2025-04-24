import {useEffect, useState} from "react";
import WeatherRow from "../components/WeatherRow";
import WeatherSummary from "../components/WeatherSummary";
import getWeather from "../api/weatherApi";

const fetchCordinates=(callback)=>{
    navigator.geolocation.getCurrentPosition(
        ({
        coords:{latitude,longitude} }) => {
            console.log(latitude,longitude);
            callback(latitude,longitude);
        }, (err)=>{
            console.error(err);
        }
    );
}
const WeatherPage=()=>{
    const [todayWeather, setTodayWeather]= useState({});
    const [weekWeather, setWeekWeather]= useState([]);
    const [isCelsius, setisCelsius]= useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const isDay=todayWeather.isDay?? true;
    useEffect(()=>{
        fetchCordinates(async(latitude,longitude)=>{
            const weatherInfo=await getWeather({latitude, longitude})
            convertToStateVariable(weatherInfo);

        })
    }, []);
   

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? 'white' : '#121212';
    document.body.style.color = darkMode ? 'black' : 'white';
  };
    const convertToStateVariable = (tempWeekWeather)=>{
        let fetchedWeatherInfo=[];
        for(let i=0; i<tempWeekWeather.daily.time.length; i++){
            fetchedWeatherInfo.push({
                date: new Date(tempWeekWeather.daily.time[i]),
                maxTemperature: tempWeekWeather.daily.temperature_2m_max[i],
                minTemperature: tempWeekWeather.daily.temperature_2m_min[i],
                weatherCode: tempWeekWeather.daily.weathercode[i],
            })
        }
        setWeekWeather(fetchedWeatherInfo);
        let currentWeather= tempWeekWeather.current_weather;
        currentWeather.time= new Date(currentWeather.time);
        currentWeather.isDay= currentWeather.is_day===1? true:false;
        delete currentWeather.is_day;
        currentWeather.weatherCode= currentWeather.weathercode;
        delete currentWeather.weathercode;
        setTodayWeather(currentWeather);
    }
if(!weekWeather.length)
{ return <p>Loading...</p>

}
    return(
        <div className={isDay? "app": "app dark"}>
            <h1 className="my-heading">Weather</h1>
        <button className="ui icon button" onClick= {() => {
            setisCelsius(!isCelsius);}}
            style={{float:"right"}}
            >
            {isCelsius? "°F":"°C"}</button>
            <div>
            <button onClick={toggleTheme} style={{
      padding: '10px 20px',
      backgroundColor: darkMode ? '#333' : '#ddd',
      color: darkMode ? 'white' : 'black',
      position: 'absolute',
      left: '20rem',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer'
    }}>
      Toggle Theme
    </button>
            </div>
    <WeatherSummary currentWeather={todayWeather} isCelsius={isCelsius}/>
    <table className={`ui very basic table ${!isDay?  "dark":""}`} >
    {/* style={!isDay?{backgroundColor:"black", color:"white"}: {}}> */} 
        <thead className={`table-custom${!isDay?  "dark":""}`}>
        <tr>
            <th>Date</th>
            <th>Temperature</th>
            <th>Type</th>
        </tr>
        </thead>
        <tbody className="table-custom">
            {weekWeather.map((weather)=>(
                <WeatherRow 
                weather={weather}
                 isCelsius={isCelsius}
                  key={weather.date}
                  />
            ))}
    
        </tbody>
    </table>
        </div>
    )
}
export default WeatherPage;
