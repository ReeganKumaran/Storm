import React, { createContext, useContext, useEffect, useState } from "react";
import { Weather_API } from "../API/WeatherAPI";
import axios from "axios";
const WeatherContext = createContext([null, null]);
export function WeatherContextWrapper(props) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState({ lat: 0, lon: 0 });
  const [forecast, setForecast] = useState({});

  useEffect(() => {
    if (!navigator.geolocation) {
      alert(
        "Your broswer not support geolocation you need give location manully"
      );
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, []);

  useEffect(() => {
    // THE CODE FOR THE GET THE DATA FROM OpenWeatherMap
    if (coords.lat === 0 && coords.lon === 0) return;
    async function fetchAllData() {
      try {
        const [currentWeatherRes, locationRes, forecast] = await Promise.all([
          axios(
            `${Weather_API.BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${Weather_API.API_KEY}&units=metric`
          ),
          axios(
            `${Weather_API.GEO}/reverse?lat=${coords.lat}&lon=${coords.lon}&limit=1&appid=${Weather_API.API_KEY}`
          ),
          axios(
            `${Weather_API.BASE_URL}/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${Weather_API.API_KEY}&units=metric`
          ),
        ]);
        console.log(
          `${Weather_API.BASE_URL}/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${Weather_API.API_KEY}&units=metric`
        );
        setForecast(forecast.data);
        setCurrentWeather(currentWeatherRes.data);
        setLocation(locationRes.data[0]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAllData();
  }, [coords]);
  return (
    <WeatherContext.Provider value={[currentWeather, location, forecast]}>
      {props.children}
    </WeatherContext.Provider>
  );
}
export function useWeather() {
  return useContext(WeatherContext);
}
