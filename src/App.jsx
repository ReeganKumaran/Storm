import Navbar from "./Components/Navbar";
import TemperatureTrendChart from "./Components/TemperatureTrendChart";
import WeatherDetailsCard from "./Components/WeatherDetailsCard";
import WeatherForecast from "./Components/WeatherForecast";
import WeatherOverviewCard from "./Components/WeatherOverviewCard";
import LoadingSpinner from "./Components/LoadingSpinner";
import ErrorMessage from "./Components/ErrorMessage";
import { WeatherContextWrapper, useWeather } from "./Context/Weather";

function WeatherContent() {
  const [currentWeather, location, forecast, searchByCity, loading, error] = useWeather();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar onSearch={searchByCity} />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {error && <ErrorMessage message={error} />}
        {loading && <LoadingSpinner />}
        {!loading && !error && currentWeather && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Weather Card */}
            <div className="lg:col-span-8">
              <WeatherOverviewCard />
            </div>
            
            {/* Weather Details Card */}
            <div className="lg:col-span-4">
              <WeatherDetailsCard />
            </div>
            
            {/* Temperature Chart - Full Width */}
            <div className="lg:col-span-12">
              <TemperatureTrendChart />
            </div>
            
            {/* Weather Forecast - Full Width */}
            <div className="lg:col-span-12">
              <WeatherForecast />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <WeatherContextWrapper>
      <WeatherContent />
    </WeatherContextWrapper>
  );
}

export default App;
