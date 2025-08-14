import React, { useEffect, useState } from "react";
import { useWeather } from "../Context/Weather";
import { ArrowUp, Sunrise, Sunset, Gauge, Eye, Droplets } from "lucide-react";

function WeatherDetailsCard() {
  const [weatherAPI] = useWeather();
  const [weatherDetails, setWeatherDetails] = useState({
    sunRise: null,
    sunSet: null,
    pressure: null,
    windDeg: null,
  });

  const formatTime = (timestamp) => {
    if (!timestamp) return "--";
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getWindDirection = (deg) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(deg / 45) % 8];
  };

  useEffect(() => {
    if (!weatherAPI) return;
    
    setWeatherDetails({
      sunRise: formatTime(weatherAPI.sys?.sunrise),
      sunSet: formatTime(weatherAPI.sys?.sunset),
      pressure: weatherAPI.main?.pressure,
      deg: weatherAPI.wind?.deg,
      degTxt: getWindDirection(weatherAPI.wind?.deg),
      visibility: weatherAPI.visibility,
      cloudiness: weatherAPI.clouds?.all,
    });
  }, [weatherAPI]);

  return (
    <div className="glass-card h-full">
      <h3 className="text-xl font-semibold mb-4 text-white">Weather Details</h3>
      <div className="space-y-3">
        {/* Sunrise & Sunset */}
        <div className="grid grid-cols-1 gap-3">
          <div className="weather-stat">
            <div className="flex items-center gap-2 w-full">
              <Sunrise className="text-amber-400" size={20} />
              <div className="flex-1">
                <p className="text-xs text-slate-400">Sunrise</p>
                <p className="text-sm font-semibold">{weatherDetails?.sunRise}</p>
              </div>
            </div>
          </div>
          
          <div className="weather-stat">
            <div className="flex items-center gap-2 w-full">
              <Sunset className="text-orange-400" size={20} />
              <div className="flex-1">
                <p className="text-xs text-slate-400">Sunset</p>
                <p className="text-sm font-semibold">{weatherDetails?.sunSet}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wind & Pressure */}
        <div className="grid grid-cols-1 gap-3">
          <div className="weather-stat">
            <div className="flex items-center gap-2 w-full">
              <ArrowUp 
                className="text-green-400 transition-transform" 
                style={{ transform: `rotate(${weatherDetails?.deg || 0}deg)` }}
                size={20}
              />
              <div className="flex-1">
                <p className="text-xs text-slate-400">Wind Direction</p>
                <p className="text-sm font-semibold">
                  {weatherDetails?.deg}° {weatherDetails?.degTxt}
                </p>
              </div>
            </div>
          </div>
          
          <div className="weather-stat">
            <div className="flex items-center gap-2 w-full">
              <Gauge className="text-blue-400" size={20} />
              <div className="flex-1">
                <p className="text-xs text-slate-400">Pressure</p>
                <p className="text-sm font-semibold">{weatherDetails?.pressure} hPa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visibility & Cloudiness */}
        <div className="grid grid-cols-1 gap-3">
          <div className="weather-stat">
            <div className="flex items-center gap-2 w-full">
              <Eye className="text-purple-400" size={20} />
              <div className="flex-1">
                <p className="text-xs text-slate-400">Visibility</p>
                <p className="text-sm font-semibold">
                  {weatherDetails?.visibility ? `${(weatherDetails.visibility / 1000).toFixed(1)} km` : "--"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="weather-stat">
            <div className="flex items-center gap-2 w-full">
              <Droplets className="text-slate-400" size={20} />
              <div className="flex-1">
                <p className="text-xs text-slate-400">Cloudiness</p>
                <p className="text-sm font-semibold">{weatherDetails?.cloudiness}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetailsCard;