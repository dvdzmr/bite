import { useState } from 'react';
import axios from 'axios';
import "./css/weather.css"
import "./css/widgets.css"
import Form from "react-bootstrap/Form";


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
        <div className="widget" >
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
                    <p>{weatherData.weather[0].description}, feels like {weatherData.main.feels_like}°C.</p>
                    <h4>Other stats:</h4>
                    <ul>
                        <li>Humidity : {weatherData.main.humidity}%</li>
                        <li>Pressure : {weatherData.main.pressure}</li>
                        <li>Wind Speed : {weatherData.wind.speed}m/s</li>
                    </ul>

                </>
            ) : (
                <p>Loading weather...</p>
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