import React, { useEffect, useState } from "react";
import { useWeather } from "../Context/Weather";
import { ArrowUp, Sunrise, Sunset , Gauge} from "lucide-react";

function WeatherDetailsCard() {
  const weatherAPI = useWeather()[0];
  console.log(weatherAPI);
  const [weatherDetails, setWeatherDetails] = useState({
    sunRise: null,
    sunSet: null,
    pressure: null,
    windDeg: null,
  });
  const format = (time) => {
    const date = new Date(time * 1000);
    return `${
      !(date.getHours() % 12) ? "12" : date.getHours() % 12
    }:${date.getMinutes()} ${date.getHours() / 12 ? "PM" : "AM"}`;
  };
  const degFormat = (deg) => {
    const direction = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return direction[(deg / 45) | 0];
  };
  useEffect(() => {
    if (!weatherAPI) return;
    // const date = new Date(weatherAPI.dt * 1000)
    // console.log( )
    const data = {
      sunRise: format(weatherAPI.sys.sunrise),
      sunSet: format(weatherAPI.sys.sunset),
      pressure: `${weatherAPI.main.pressure} mb`,
      deg: weatherAPI.wind.deg,
      degTxt: degFormat(weatherAPI.wind.deg),
    };
    console.log(data);
    setWeatherDetails(data);
  }, [weatherAPI]);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="card ">
            <h4 className="mb-2 ">Your's Location</h4>
            <div className="row-ls justify-space-between flex-grow-all g-4 ">
              <div className="card p-2 br-2">
                <div className="row align-center">
                  <Sunrise className="txt-yellow" />
                  <div className="row ms-2 f-direction-col">
                    <h5>Sunrise</h5>
                    <p className="txt-gray">{weatherDetails?.sunRise}</p>
                  </div>
                </div>
              </div>
              <div className="card p-2 br-2">
                <div className="row align-center">
                  <Sunset className="txt-light-blue" />
                  <div className="row ms-2 f-direction-col">
                    <h5>Sunset</h5>
                    <p className="txt-gray">{weatherDetails?.sunSet}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row-ls justify-space-between flex-grow-all g-4 mt-4">
              <div className="card p-2 br-2">
               <div className="row align-center">
                <ArrowUp className="txt-light-green" style={{rotate:weatherDetails?.deg+ "deg"}}/>
                  {/* <Sunset className="txt-light-blue" /> */}
                  <div className="row ms-2 f-direction-col">
                    <h5>Wind</h5> 
                    <p className="txt-gray">{weatherDetails?.deg}° {weatherDetails?.degTxt}</p>
                  </div>
                </div>
              </div>
              <div className="card p-2 br-2">
                <div className="row align-center">
                 <Gauge className="txt-orange"/>
                  <div className="row ms-2 f-direction-col">
                    <h5>Pressure</h5>
                    <p className="txt-gray">{weatherDetails?.pressure}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetailsCard;
