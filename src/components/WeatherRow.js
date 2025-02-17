import {convertToFarhenit, getWeatherTypeFromCode} from "../weatherUtil";

const dateFormatter= new Intl.DateTimeFormat("en-IN",{
    month:"short",
    day:"numeric",
    year:"2-digit",
});
const formatDate=(date)=>dateFormatter.format(date);
const WeatherRow=({
    weather:{date, maxTemperature, minTemperature, weatherCode}, isCelsius,})=> {
    return(
        <tr>
            <td>{formatDate(date)}</td>
            <td>
                H: {isCelsius? `${maxTemperature} °C`:`${convertToFarhenit(maxTemperature)} °F`} </td>
            <td>L: {isCelsius? `${minTemperature} °C`:`${convertToFarhenit(minTemperature)} °F`} </td>
            <td>{getWeatherTypeFromCode(weatherCode)}</td>
        </tr>
    )
}
export default WeatherRow;