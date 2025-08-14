import { useEffect, useState } from "react";
import { useWeather } from "../Context/Weather";
import { ArrowDown, ArrowUp, Droplets, Wind, Calendar } from "lucide-react";

function WeatherForecast() {
  const [, , weather] = useWeather();
  const [forecast, setForecast] = useState([]);
  
  const formatTemp = (temp) => {
    if (typeof temp !== "number" || isNaN(temp)) {
      return "--";
    }
    return Math.round(temp) + "°";
  };

  useEffect(() => {
    if (!weather?.list) return;
    
    const forecastData = weather.list.reduce((acc, item) => {
      const date = new Date(item.dt * 1000);
      const ddmmyy = date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "2-digit",
        month: "short",
      });
      
      if (!acc[ddmmyy]) {
        acc[ddmmyy] = {
          ddmmyy,
          description: item.weather[0].description,
          maxTemp: item.main.temp_max,
          minTemp: item.main.temp_min,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          wind: item.wind.speed,
        };
      } else {
        acc[ddmmyy].maxTemp = Math.max(acc[ddmmyy].maxTemp, item.main.temp_max);
        acc[ddmmyy].minTemp = Math.min(acc[ddmmyy].minTemp, item.main.temp_min);
      }
      return acc;
    }, {});
    
    setForecast(Object.values(forecastData).slice(1, 6));
  }, [weather]);

  return (
    <div className="glass-card">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="text-blue-400" size={24} />
        <h3 className="text-xl font-semibold text-white">5-Day Forecast</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {forecast.map((item, index) => (
          <div 
            key={index} 
            className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-4 border border-slate-700 hover:bg-slate-800/60 transition-all duration-200"
          >
            {/* Date */}
            <div className="text-center mb-3">
              <p className="text-sm font-semibold text-white">{item.ddmmyy}</p>
            </div>
            
            {/* Weather Icon */}
            <div className="flex justify-center mb-3">
              <img
                className="w-16 h-16"
                src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                alt={item.description}
              />
            </div>
            
            {/* Description */}
            <p className="text-xs text-slate-400 text-center capitalize mb-3">
              {item.description}
            </p>
            
            {/* Temperature */}
            <div className="flex justify-center gap-3 mb-3">
              <div className="flex items-center gap-1">
                <ArrowUp className="text-red-400" size={14} />
                <span className="text-sm font-medium text-red-400">
                  {formatTemp(item.maxTemp)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <ArrowDown className="text-blue-400" size={14} />
                <span className="text-sm font-medium text-blue-400">
                  {formatTemp(item.minTemp)}
                </span>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="flex justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Droplets size={12} />
                <span>{item.humidity}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind size={12} />
                <span>{item.wind.toFixed(1)}m/s</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherForecast;