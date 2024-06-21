// import { useEffect, useState } from 'react'
// import './Weather.css'

// function Weather() {

    

//     let [city, setCity] = useState({});
//     let [icon, setIcon] = useState("");

//     useEffect(() => {
//         fetch("https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7a2f8062c7848568535b4452d1c0aebe", {
//             method: 'GET'
//         })
//             .then((response) => {
//                 return response.json();
//             })
//             .then((data) => {
//                 console.log(data);
//                 setCity(data);
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     }, []);



//     useEffect(() => {
//         if (city.weather && city.weather.length > 0) {
//             // console.log("https://openweathermap.org/img/wn/" + city.weather[0].icon + ".png");
//             setIcon("https://openweathermap.org/img/wn/" + city.weather[0].icon + ".png")

//         }
//     }, [city]);

//     return (
//         <div className='card_container'>
//             <div className='card'>
//                 <div>
//                     {city.main && <h1>{Math.round((city.main.temp) - 273.15) + " °C"}</h1>}
//                     <h1>{city.name}</h1>
//                 </div>
//                 <img src={icon} alt="Weather icon" className='image' />
//                 <div>
//                     {city.main && <h1>{"Humidity: " + (city.main.humidity) + " % "}</h1>}
//                     {city.main && <h1>{"Wind: " + (city.wind.speed) + " m/s "}</h1>}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Weather


import React, { useState } from 'react';
import './Weather.css'; // Import the CSS file

function Weather() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [icon, setIcon] = useState("");

    const fetchWeather = () => {
        if (city) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7a2f8062c7848568535b4452d1c0aebe`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    setWeatherData(data);
                    if (data.weather && data.weather.length > 0) {
                        setIcon(data.weather[0].icon);
                    }
                })
                .catch((error) => console.error("Error fetching weather data: ", error));
        }
    };

    return (
        <div className="weather-container">
            <h1>Weather Search</h1>
            <div className="search-bar">
                <input 
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Enter city name" 
                />
                <button onClick={fetchWeather}>Get Weather</button>
            </div>
            {weatherData && (
                <div className="weather-info">
                    <h2>Weather in {weatherData.name}</h2>
                    <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
                    <p>Condition: {weatherData.weather[0].description}</p>
                    <p>Pressure: {weatherData.main.pressure} pa</p>
                    {icon && <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="Weather icon" />}
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
}

export default Weather;
