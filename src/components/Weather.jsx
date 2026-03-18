import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";

import search_png from "../assets/search.png";
import clear_png from "../assets/clear.png";
import cloud_png from "../assets/cloud.png";
import drizzle_png from "../assets/drizzle.png";
import rain_png from "../assets/rain.png";
import snow_png from "../assets/snow.png";
import wind_png from "../assets/wind.png";
import humidity_png from "../assets/humidity.png";

const Weather = () => {

  const inputRef = useRef();

  const [weatherData, setWeatherData] = useState({});

  const allIcons = {
    "01d": clear_png,
    "01n": clear_png,
    "02d": cloud_png,
    "02n": cloud_png,
    "03d": cloud_png,
    "03n": cloud_png,
    "04d": drizzle_png,
    "04n": drizzle_png,
    "09d": rain_png,
    "09n": rain_png,
    "10d": rain_png,
    "10n": rain_png,
    "13d": snow_png,
    "13n": snow_png,
  };

  const search = async (city) => {

    if (city === "") {
      alert("Enter city name");
      return;
    }

    try {

  
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=82ad7b70699eaa15728e3391331dc48a`;
      const response = await fetch(url);
      const data = await response.json();

      const icon = allIcons[data.weather[0].icon] || clear_png;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    search("New York");
  }, []);

  return (
    <div className="weather">

      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search city" />
        <img
          src={search_png}
          alt="search"
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      <img src={weatherData.icon} alt="weather icon" className="weather-icon" />

      <p className="temperature">{weatherData.temperature}°C</p>
      <p className="location">{weatherData.location}</p>

      <div className="weather-data">

        <div className="col">
          <img src={humidity_png} alt="humidity" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind_png} alt="wind" />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Weather;