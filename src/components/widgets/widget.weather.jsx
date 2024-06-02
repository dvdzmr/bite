import { useState } from 'react';
import axios from 'axios';
import "./css/weather.css"
import Form from "react-bootstrap/Form";

//todo: fix UI
//todo: add all CSS to this file

export default function Weather () {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const fetchData = async () => {
        try {
            const apikey = 'f00c38e0279b7bc85480c3fe775d518c';
            const axiosResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
            );
            setWeatherData(axiosResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        //style={{ width:`${width}`, height:`${height}` }}
        <div className="weather">
            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={handleInputChange}
                />
                <button type="submit">Get Weather</button>
            </Form>
            {weatherData ? (
                <>
                    <h2>{weatherData.name}</h2>
                    <h3>{weatherData.main.temp}°C</h3>
                    {getWeatherEmoji(weatherData)}
                    <h4>Conditions:</h4>
                    <h5>{weatherData.weather[0].description}, feels like {weatherData.main.feels_like}°C.</h5>
                        <h5>Other stats:</h5>
                        <ul>
                            <li>
                                <h5>Humidity : {weatherData.main.humidity}%</h5>
                            </li>
                            <li>
                                <h5>Pressure : {weatherData.main.pressure}</h5>
                            </li>
                            <li>
                                <h5>Wind Speed : {weatherData.wind.speed}m/s</h5>
                            </li>
                        </ul>
                </>
            ) : (
                <p>Enter a city name</p>
            )}
        </div>
    );
}


function getWeatherEmoji(weatherData) {
    if (weatherData.weather[0].description.includes("rain")) {
        return <h3>🌧</h3>;
    }
    if (weatherData.weather[0].description.includes("thunder")) {
        return <h3>⛈</h3>;
    }
    if (weatherData.weather[0].description.includes("clouds")) {
        return <h3>🌥</h3>;
    }
    if (weatherData.weather[0].description.includes("snow")) {
        return <h3>🌨</h3>;
    } else {
        return <h3>😶‍🌫</h3>
    }
}