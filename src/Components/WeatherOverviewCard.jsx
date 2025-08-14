import { useWeather } from "../Context/Weather";
import { Droplets, Wind, ArrowUp, ArrowDown, MapPin, Thermometer } from "lucide-react";

function WeatherOverviewCard() {
  const [currentWeather, location] = useWeather();
  
  const formatTemp = (temp) => {
    if (typeof temp !== "number" || isNaN(temp)) {
      return "--";
    }
    return Math.round(temp) + "°";
  };

  return (
    <div className="glass-card h-full">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section - Location and Temperature */}
        <div className="flex-1 space-y-4">
          {/* Location */}
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="text-blue-400" size={20} />
            <div>
              <h2 className="text-2xl font-bold text-white">
                {location?.name || "Loading..."}
              </h2>
              <p className="text-sm">
                {location?.state && `${location.state}, `}{location?.country}
              </p>
            </div>
          </div>

          {/* Main Temperature */}
          <div className="flex items-center gap-4">
            <div className="text-7xl font-bold text-white">
              {formatTemp(currentWeather?.main.temp)}
            </div>
            <div className="space-y-2">
              <div className="text-sm text-slate-400">
                Feels like {formatTemp(currentWeather?.main.feels_like)}
              </div>
              <div className="flex gap-3">
                <div className="flex items-center gap-1 text-red-400">
                  <ArrowUp size={16} />
                  <span className="text-sm">{formatTemp(currentWeather?.main.temp_max)}</span>
                </div>
                <div className="flex items-center gap-1 text-blue-400">
                  <ArrowDown size={16} />
                  <span className="text-sm">{formatTemp(currentWeather?.main.temp_min)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Droplets className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Humidity</p>
                <p className="text-lg font-semibold">{currentWeather?.main.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Wind className="text-cyan-400" size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Wind Speed</p>
                <p className="text-lg font-semibold">{currentWeather?.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Weather Icon */}
        <div className="flex flex-col items-center justify-center">
          <img
            className="w-40 h-40 drop-shadow-2xl"
            src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@4x.png`}
            alt="Weather"
          />
          <p className="text-lg capitalize text-slate-300 text-center">
            {currentWeather?.weather[0].description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherOverviewCard;