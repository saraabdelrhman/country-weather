import React, { useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './WeatherApp.css';
import search from '../Assets/search.png';
import cloud from '../Assets/cloud.png';
import humidityIcon from '../Assets/humidity.png';
import windIcon from '../Assets/wind.png';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const Api_key = "85b300141f832563d7c2277023d1ac39";

    const searchWeather = async () => {
        if (!city)  return 'not found'
        try {
            setLoading(true);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Api_key}`);
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            // Handle error, e.g., display error message to user
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='parent'>
            {loading ? (
               <div className="loader"></div>
            ) : (
                <div className='container text-center'>
                    <div className="row">
                    <div className="nav col-md-12 ">
                        <input
                            className="search"
                            id="here"
                            placeholder="Search City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <div className="search_icon" onClick={searchWeather}>
                            <img src={search} alt="Search" />
                        </div>
                    </div>
                    <div className="weather_img p-0">
                        <img src={cloud} alt="Weather" />
                    </div>
                    </div>
                    <React.Fragment className="row">
                        <div className="temp text-light font weather-temp ">
                            {weatherData && weatherData.main.temp}°C
                        </div>
                        <div className="location text-light">
                            {weatherData && weatherData.name}
                        </div>

                        <div className="d-flex justify-content-center align-items-center ">
                            <div className="data-container m-5">
                                <div className="element">
                                    <img src={humidityIcon} alt="Humidity" />
                                    <div className="data">
                                        <div className='humidity text-light'>
                                            {weatherData && weatherData.main.humidity}%
                                        </div>
                                        <div className="text text-light">Humidity</div>
                                    </div>
                                </div>
                            </div>
                            <div className="data-container m-5">
                                <div className="element">
                                    <img src={windIcon} alt="Wind" />
                                    <div className="data">
                                        <div className='wind text-light'>
                                            {weatherData && weatherData.wind.speed} Km/h
                                        </div>
                                        <div className="text text-light">Wind</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                </div>
            )}
        </div>
    );
}

export default WeatherApp;
