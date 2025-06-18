import { useWeather } from "../Context/Weather";
import { Droplets, Wind, ArrowUp, ArrowDown } from "lucide-react";
import "../Style/WeatherOverviewCard.css";
function WeatherOverviewCard() {
  const [currentWeather, location] = useWeather();
  const oneDecimal = (num) => {
    if (typeof num !== "number" || isNaN(num)) {
      return null;
    }
    return (num | 0) + "°";
  };
  return (
    <>
      <div className="card h-100p">
            <h4 className="mb-2">Your's Location</h4>
        <div className="row-ms">
          <div className="col">
            <div className="row d-flex align-end">
              <h2>{location?.name}</h2>, {location?.state}
            </div>
            <div className="row">{location?.country}</div>
            <div className="row">
              <div className="col d-flex">
                <h1 className="tempShow">
                  {oneDecimal(currentWeather?.main.temp)}
                </h1>
                <div className="row mt-2 ms-2 justify-center align-center f-direction-col">
                  <div className="row">
                    Feel like {oneDecimal(currentWeather?.main.feels_like)}
                  </div>
                  <div className="row">
                    <div className=" txt-red d-flex ">
                      <ArrowUp strokeWidth={2} size={15} />
                      {oneDecimal(currentWeather?.main.temp_min)}
                    </div>
                    <div className=" txt-blue d-flex">
                      {" "}
                      <ArrowDown strokeWidth={2} size={15} />
                      {oneDecimal(currentWeather?.main.temp_max)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="row">
                  <span className="d-flex align-center txt-blue">
                    <Droplets size={25} strokeWidth={2.5} absoluteStrokeWidth />
                  </span>
                  <div className="d-flex f-direction-col">
                    <div className="col">
                      <h5>Humidity</h5>
                    </div>
                    <div className="col">
                      <p>{currentWeather?.main.humidity}%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row">
                  <span className="d-flex align-center txt-light-blue">
                    <Wind size={25} strokeWidth={2.5} absoluteStrokeWidth />
                  </span>
                  <div className="col">
                    <div className="row">
                      <h5>Wind Speed</h5>
                    </div>
                    <div className="row">
                      <p>{currentWeather?.wind.speed}m/s</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="d-flex relative justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@4x.png`}
                alt="image"
              />
              <p className="absolute buttom-5 txt-center">
                {currentWeather?.weather[0].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherOverviewCard;
