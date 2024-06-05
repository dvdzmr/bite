import {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import "./css/weather.css"
import Form from "react-bootstrap/Form";

// TODO: redo UI for city, emoji, temperature and other data


export default function Weather(identifier) {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [widgetEdit, setWidgetEdit] = useState(false);
    const [widgetHeight, setWidgetHeight] = useState(0);
    let widgetWidth = useRef(null);
    // User settable settings:

    const [showC, setShowC] = useState('');
    const [showF, setShowF] = useState('');
    const [showHumidity, setShowHumidity] = useState('');
    const [showPressure, setShowPressure] = useState('');
    const [showWind, setShowWind] = useState('');


    //breakpoint at which widget goes from 'small' to 'big' mode, in px.
    const fullSizeWidth = 500;

    window.addEventListener('editWidgets', () => {
        setWidgetEdit(!widgetEdit);
    })

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (city === "") {
            setWeatherData(null);
            localStorage.removeItem("weather" + identifier.identifier)
        }
        else {
            try {
                // const apikey = 'f00c38e0279b7bc85480c3fe775d518c';
                const apikey = 'dbd4d2d5025be0af7f2b7defc253b392';
                const axiosResponse = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
                );
                setWeatherData(axiosResponse.data);
            } catch (error) {
                console.error(error);
            }
        }
    };


    useEffect(() => {
        if (weatherData !== null) localStorage.setItem("weather" + identifier.identifier, JSON.stringify(weatherData));

        // console.log("triggered", weatherData);
        if (showC !== '' && showF !== '' && showPressure !== '' && showWind !== '' && showHumidity !== '') {
            let userSettings = {celsius: showC, fahrenheit: showF, humidity: showHumidity, pressure: showPressure, wind: showWind};
            localStorage.setItem("weather_settings" + identifier.identifier, JSON.stringify(userSettings));
        }
    }, [weatherData, showC, showF, showWind, showHumidity, showPressure]);


    useEffect(() => {
        const tasksRaw = localStorage.getItem("weather" + identifier.identifier);
        setWeatherData(tasksRaw !== null ? JSON.parse(tasksRaw) : null);

        // console.log(weatherData);

        // base values if no values are found in localStorage
        let jsonRaw = {celsius: true, fahrenheit: false, wind: true, pressure: false, humidity: true};

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


    useEffect(() => {
        setWidgetHeight(widgetWidth.current.offsetWidth);
        window.addEventListener("resize", () => setWidgetHeight(widgetWidth.current.offsetWidth));
    }, [widgetWidth.current]);


    const searchbarPosition = {
        position: "relative",
        top: weatherData === null ? "30%" : "0%",
        // animationDelay: "1s",
        transition: "0.5s ease",
        opacity: 1
    }

    return (
        <>
            {widgetEdit ?
                <>
                    <br/>
                    <br/>
                    <Form ref={widgetWidth}>
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
                        {widgetHeight > fullSizeWidth ?
                            <>
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
                            </> : null}
                    </Form>
                </> :


                <div className="weather" style={{height: `${widgetHeight}px`}} ref={widgetWidth}>

                    <Form onSubmit={handleSubmit} style={searchbarPosition}>
                        {!weatherData ? <h1 className="weather-info-container">Weather 🌞</h1> : null}
                        <Form.Control
                            className="search-bar"
                            size={weatherData === null ? "lg" : "md"}
                            type="text"
                            placeholder="Enter city name"
                            value={city}
                            onChange={handleInputChange} />
                    </Form>
                    {weatherData ? (
                        <div className="weather-info-container">
                            {/*Title and emoji based on weather conditions*/}
                            <h1>{weatherData.name}</h1>
                            {getWeatherEmoji(weatherData)}


                            {/*Temperature*/}
                            <h3>{showC ? `${(weatherData.main.temp).toFixed(1)}°C`: null}
                                {showC && showF ? ' / ':null}{
                                    showF ? `${(weatherData.main.temp * (9 / 5) + 32).toFixed(1)}°F` : null}
                            </h3>

                            {/*Feels like*/}
                            {widgetHeight > (fullSizeWidth/1.5) ?
                                <h5>Feels like {showC ? `${(weatherData.main.feels_like).toFixed(1)}°C`:null}
                                    {showC && showF ? ' / ':null}
                                    {showF ? `${(weatherData.main.feels_like * (9/5) +32).toFixed(1)}°F`:null}</h5>
                                :null }

                            {widgetHeight > fullSizeWidth ?
                                <>
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
                                :null}
                        </div>
                    ) : null}
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