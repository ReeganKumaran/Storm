import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useWeather } from "../Context/Weather";
import { TrendingUp } from "lucide-react";

function TemperatureTrendChart() {
  const [, , forecast] = useWeather();
  
  const data = forecast?.list?.slice(0, 12).map((item) => {
    const date = new Date(item.dt * 1000);
    return {
      temp: Math.round(item.main.temp),
      feelTemp: Math.round(item.main.feels_like),
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric',
        hour12: true 
      }),
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/90 backdrop-blur-sm p-3 rounded-lg border border-slate-600">
          <p className="text-sm text-slate-300 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name === 'temp' ? 'Temperature' : 'Feels Like'}: {entry.value}°C
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-blue-400" size={24} />
        <h3 className="text-xl font-semibold text-white">Temperature Trend</h3>
      </div>
      <div style={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorFeel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="time" 
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${value}°`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }}
              iconType="circle"
            />
            <Area
              type="monotone"
              dataKey="feelTemp"
              name="Feels Like"
              stroke="#ec4899"
              fillOpacity={1}
              fill="url(#colorFeel)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="temp"
              name="Temperature"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorTemp)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TemperatureTrendChart;