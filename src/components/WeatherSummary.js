import { convertToFarhenit, getWeatherTypeFromCode} from "../weatherUtil";
const WeatherSummary =({
    currentWeather:{temperature,weatherCode},
    isCelsius,
})=> {
    return (
        <div>
        <h1>
        {isCelsius?
        `${temperature} °C`
        : `${convertToFarhenit(temperature)} °F`}{" "}
         | {getWeatherTypeFromCode(weatherCode)}{" "}
         </h1>
        </div>
    );
};
export default WeatherSummary;