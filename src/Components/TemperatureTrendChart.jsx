import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useWeather } from "../Context/Weather";
import CustomToolTip from "./CustomToolTip";
function TemperatureTrendChart() {
  const forecast = useWeather()[2];
  const data = forecast?.list?.slice(0, 12).map((item) => {
    let data = new Date(item.dt * 1000);
    return {
      temp: item.main.temp,
      feelTemp: item.main.feels_like,
      time: `${data.getHours()} ${(data.getHours() / 12) | 0 ? "PM" : "AM"}`,
    };
  });
  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col">
          <div className="card ">
          <h4 className="mb-2">Today's Temprature</h4>
            <div style={{ width: "99%", height: "220px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis dataKey="time" />
                  <YAxis
                    margin={{
                      top: 0,
                      right: 100,
                      left: 0,
                      bottom: 0,
                    }}
                    stroke="#888888"
                    tickFormatter={(value) => `${value}°`}
                  />
                  <Tooltip content={<CustomToolTip />} />
                  <Area
                    type="monotone"
                    dataKey="feelTemp"
                    stroke="#ff84d8"
                    fill="#AA84d8"
                  />
                  <Area
                    type="monotone"
                    dataKey="temp"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <>
    //   <div className="container-fluid">
    //     <div className="row ms- f-shrink">
    //       <div className="col">
    //         <div className="card">
    //
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
    //       <div className="card">
    //         <h1>Temprature-Trend_Chart</h1>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default TemperatureTrendChart;
