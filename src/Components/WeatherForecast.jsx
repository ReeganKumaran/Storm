import { useEffect, useState } from "react";
import { useWeather } from "../Context/Weather";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

function WeatherForecast() {
  const weather = useWeather()[2];
  const [forecast, setForecast] = useState([]);
  const oneDecimal = (num) => {
    const temp = +num;
    if (typeof temp !== "number" || isNaN(temp)) {
      return null;
    }
    return (temp | 0) + "°";
  };
  useEffect(() => {
    if (!weather.list) return;
    const forecastData = weather?.list?.reduce((acc, item) => {
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
    setForecast(Object.values(forecastData).slice(1, 5));
  }, [weather]);
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col">
          <div className="card">
            <h4 className="mb-2 ">5-Day Forecast</h4>

            {forecast.map((item, index) => (
              <div key={index} className="card p-2 br-2 mt-2">
                <div className="row">
                  <div className="col-33p d-flex">
                    <div className="">
                      <div className="row">{item.ddmmyy}</div>
                      <div className="row">{item.description}</div>
                    </div>
                    <img
                      src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                      alt=""
                    />
                  </div>
                  <div className="col-33p d-flex  align-center justify-center">
                    <span className="txt-red">
                      <ArrowUp strokeWidth={2} size={15} />
                      {oneDecimal(item.maxTemp)}
                    </span>
                    <span className="txt-blue">
                      <ArrowDown strokeWidth={2} size={15} />
                      {oneDecimal(item.minTemp)}
                    </span>
                  </div>
                  <div className="col-33p d-flex align-center justify-end">
                    <span className="txt-blue">
                      <Droplets size={15} strokeWidth={1} absoluteStrokeWidth />
                      {item.humidity}
                    </span>
                    <span className="txt-light-blue ms-2">
                      <Wind size={15} strokeWidth={1} absoluteStrokeWidth />
                      {item.wind}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherForecast;
