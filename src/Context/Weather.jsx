import React, { createContext, useContext, useEffect, useState } from "react";
import { Weather_API } from "../API/WeatherAPI";
import axios from "axios";

const WeatherContext = createContext([null, null]);

export function WeatherContextWrapper(props) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState({ lat: 0, lon: 0 });
  const [forecast, setForecast] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Your browser doesn't support geolocation. Please search for a city manually.");
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
          setError("Unable to get your location. Please search for a city manually.");
        }
      );
    }
  }, []);

  const searchByCity = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const geoRes = await axios(
        `${Weather_API.GEO}/direct?q=${cityName}&limit=1&appid=${Weather_API.API_KEY}`
      );
      
      if (geoRes.data.length === 0) {
        setError("City not found. Please try another search.");
        setLoading(false);
        return;
      }
      
      const { lat, lon } = geoRes.data[0];
      setCoords({ lat, lon });
    } catch (error) {
      console.error(error);
      setError("Failed to search for city. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coords.lat === 0 && coords.lon === 0) return;
    
    async function fetchAllData() {
      setLoading(true);
      setError(null);
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
        
        setForecast(forecast.data);
        setCurrentWeather(currentWeatherRes.data);
        setLocation(locationRes.data[0]);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch weather data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchAllData();
  }, [coords]);

  return (
    <WeatherContext.Provider value={[currentWeather, location, forecast, searchByCity, loading, error]}>
      {props.children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}
