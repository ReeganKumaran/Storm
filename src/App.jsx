import "./App.css";
import Navbar from "./Components/Navbar";
import TemperatureTrendChart from "./Components/TemperatureTrendChart";
import WeatherDetailsCard from "./Components/WeatherDetailsCard";
import WeatherForecast from "./Components/WeatherForecast";
import WeatherOverviewCard from "./Components/WeatherOverviewCard";
import { WeatherContextWrapper } from "./Context/Weather";
import "./Style/Basic.css";
// import "bootstrap/dist/css/bootstrap.min.css"
function App() {
  return (
    <>
      <div className="container-fluid ">
        <Navbar />
        <WeatherContextWrapper>
          <div className="row-ms g-4 justify-center p-2 ">
            <div className="col-8 ">
              <WeatherOverviewCard />
            </div>
            <div className="col-12 ">
              <TemperatureTrendChart />
            </div>
          </div>
          <div className="row-ms g-4 justify-center p-2 mt-2">
            <div className="col-10 ">
              <WeatherDetailsCard/>
            </div>
            <div className="col-10 ">
              <WeatherForecast />
            </div>
          </div>
        </WeatherContextWrapper>
      </div>
    </>
  );
}

export default App;
