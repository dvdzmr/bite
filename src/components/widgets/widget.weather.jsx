import {useEffect, useState} from 'react';
import axios from 'axios';
import "./css/weather.css"
import Form from "react-bootstrap/Form";

//todo: fix UI
//todo: add all CSS to this file

export default function Weather(identifier) {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [widgetEdit, setWidgetEdit] = useState(false);

    // User settable settings:

    const [showC, setShowC] = useState(undefined);
    const [showF, setShowF] = useState(undefined);
    const [showHumidity, setShowHumidity] = useState(undefined);
    const [showPressure, setShowPressure] = useState(undefined);
    const [showWind, setShowWind] = useState(undefined);

    window.addEventListener('editWidgets', () => {
        setWidgetEdit(!widgetEdit);
    })

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


    useEffect(() => {
        if (weatherData !== null) localStorage.setItem("weather" + identifier.identifier, JSON.stringify(weatherData));

        console.log("triggered", weatherData);
        if (showC !== undefined && showF !== undefined && showPressure !== undefined && showWind !== undefined && showHumidity !== undefined) {
            let userSettings = {celsius: showC, fahrenheit: showF, humidity: showHumidity, pressure: showPressure, wind: showWind};
            localStorage.setItem("weather_settings" + identifier.identifier, JSON.stringify(userSettings));
        }
    }, [weatherData, showC, showF, showWind, showHumidity, showPressure]);


    useEffect(() => {
        const tasksRaw = localStorage.getItem("weather" + identifier.identifier);
        setWeatherData(tasksRaw !== null ? JSON.parse(tasksRaw) : null);

        // base values if no values are found in localStorage
        let jsonRaw = {celsius: true, fahrenheit: false, wind: true, pressure: true, humidity: true};

        // Checking if we have values already in localStorage
        const settingsRaw = localStorage.getItem("weather_settings" + identifier.identifier);
        if (settingsRaw !== null) jsonRaw = JSON.parse(settingsRaw);
        setShowC(jsonRaw.celsius );
        setShowF(jsonRaw.fahrenheit);
        setShowWind(jsonRaw.wind);
        setShowHumidity(jsonRaw.humidity);
        setShowPressure(jsonRaw.pressure);

    }, []);

    useEffect(() => {
        window.addEventListener("storage", storage => {
            setWeatherData(storage.newValue === null ? [] : JSON.parse(storage.newValue));
        })
    }, [])


    return (
        <>
            {widgetEdit ?
                <>
                    <br/>
                    <br/>
                    <Form>
                        <Form.Check
                            type="switch"
                            id="1"
                            label="Show celsius"
                            checked={showC}
                            onChange={() => setShowC(!showC)}
                        />
                        <Form.Check
                            type="switch"
                            id="1"
                            label="Show Fahrenheit"
                            checked={showF}
                            onChange={() => setShowF(!showF)}
                        />
                        <Form.Check
                            type="switch"
                            id="1"
                            label="Show pressure"
                            checked={showPressure}
                            onChange={() => setShowPressure(!showPressure)}
                        />
                        <Form.Check
                            type="switch"
                            id="1"
                            label="Show wind"
                            checked={showWind}
                            onChange={() => setShowWind(!showWind)}
                        />
                        <Form.Check
                            type="switch"
                            id="1"
                            label="Show humidity"
                            checked={showHumidity}
                            onChange={() => setShowHumidity(!showHumidity)}
                        />
                    </Form>
                </> :


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
                            <span>
                                {showC ?
                                    <h3>{(weatherData.main.temp).toFixed(1)}°C</h3>
                                    : null}

                                {showF ?
                                    <h3>{(weatherData.main.temp * (9/5) + 32).toFixed(1)}°F</h3>
                                    : null}
                            </span>

                            {getWeatherEmoji(weatherData)}
                            <h4>Conditions:</h4>
                            <h5>{weatherData.weather[0].description}, feels like {weatherData.main.feels_like}°C.</h5>
                            <h5>Other stats:</h5>
                            <ul>
                                {showHumidity ?
                                    <li>
                                        <h5>Humidity : {weatherData.main.humidity}%</h5>
                                    </li> : null}
                                {showPressure?
                                <li>
                                    <h5>Pressure : {weatherData.main.pressure}</h5>
                                </li>:null}
                                {showWind ?
                                <li>
                                    <h5>Wind Speed : {weatherData.wind.speed}m/s</h5>
                                </li>:null}
                            </ul>
                        </>
                    ) : <p>Enter a city name</p>}
                </div>
            }
        </>
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