
import { useState, useEffect } from "react";
import { Cloud, Sun, Wind, Droplets, ThermometerSun, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const WeatherForecast = () => {
  const [location, setLocation] = useState("Delhi, India");
  const [forecast, setForecast] = useState<null | any[]>(null);
  const [loading, setLoading] = useState(false);

  // Generate some sample weather data for demonstration
  const generateSampleData = () => {
    const today = new Date();
    const data = [];
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Create some random but plausible weather patterns
      const baseTemp = 25 + Math.sin(i / 2) * 5;
      const temp = baseTemp + (Math.random() * 4 - 2);
      const rainfall = i % 3 === 0 ? 5 + Math.random() * 15 : Math.random() * 3;
      const humidity = 50 + Math.sin(i / 3) * 20 + (Math.random() * 10);
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        temperature: Math.round(temp * 10) / 10,
        rainfall: Math.round(rainfall * 10) / 10,
        humidity: Math.round(humidity),
        wind: Math.round((5 + Math.random() * 8) * 10) / 10,
        conditions: i % 3 === 0 ? 'Rainy' : i % 5 === 0 ? 'Cloudy' : 'Sunny'
      });
    }
    
    return data;
  };

  const getForecast = () => {
    setLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setForecast(generateSampleData());
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    // Auto load on first render
    getForecast();
  }, []);

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'Sunny': return <Sun className="text-yellow-500" />;
      case 'Cloudy': return <Cloud className="text-gray-500" />;
      case 'Rainy': return <Droplets className="text-blue-500" />;
      default: return <Sun className="text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-800">Advanced Weather Forecasting</h3>
        <p className="text-gray-600 mt-2">
          Our AI-powered weather forecasting provides accurate predictions up to 14 days in advance, 
          helping farmers and financial institutions make informed decisions.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="Enter location" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
              className="max-w-sm"
            />
            <Button 
              onClick={getForecast} 
              disabled={loading}
              className="bg-agro-green hover:bg-agro-green-dark"
            >
              {loading ? "Loading..." : "Update"}
            </Button>
          </div>
        </div>
        <div className="md:col-span-1 flex justify-end">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-agro-blue rounded-full mr-1"></div>
              <span className="text-xs">Rainfall</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-1"></div>
              <span className="text-xs">Temperature</span>
            </div>
          </div>
        </div>
      </div>

      {forecast ? (
        <div className="space-y-6">
          {/* Weather chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={forecast}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" stroke="#FF8B3D" />
                  <YAxis yAxisId="right" orientation="right" stroke="#0EA5E9" />
                  <Tooltip />
                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#FF8B3D" 
                    fill="#FFD7B9" 
                    strokeWidth={2}
                    name="Temperature (°C)"
                  />
                  <Area 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="rainfall" 
                    stroke="#0EA5E9" 
                    fill="#D3E4FD" 
                    strokeWidth={2}
                    name="Rainfall (mm)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 7-day forecast */}
          <div>
            <div className="flex items-center mb-3">
              <Calendar className="mr-2 text-agro-green" />
              <h4 className="text-lg font-semibold">14-Day Forecast for {location}</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
              {forecast.slice(0, 7).map((day, index) => (
                <div key={index} className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <p className="text-sm font-medium">{day.date}</p>
                  <div className="my-2">{getConditionIcon(day.conditions)}</div>
                  <p className="text-xs text-gray-600">{day.conditions}</p>
                  <div className="flex justify-between mt-2">
                    <div className="flex items-center">
                      <ThermometerSun className="h-3 w-3 mr-1 text-orange-500" />
                      <span className="text-xs">{day.temperature}°C</span>
                    </div>
                    <div className="flex items-center">
                      <Droplets className="h-3 w-3 mr-1 text-blue-500" />
                      <span className="text-xs">{day.rainfall}mm</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agricultural insights */}
          <div className="bg-agro-green-light p-4 rounded-lg">
            <h4 className="font-semibold mb-3 text-agro-green-dark">AI-Generated Agricultural Insights</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <h5 className="text-sm font-medium flex items-center">
                  <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                  Irrigation Recommendation
                </h5>
                <p className="text-xs text-gray-600 mt-1">
                  Reduce irrigation by 30% for the next 3 days due to forecasted rainfall.
                  Expected savings: 45,000 liters of water.
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <h5 className="text-sm font-medium flex items-center">
                  <Wind className="h-4 w-4 mr-2 text-gray-500" />
                  Disease Risk Alert
                </h5>
                <p className="text-xs text-gray-600 mt-1">
                  High humidity forecasted on days 4-6 increases risk of fungal disease. 
                  Consider preventative treatment.
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <h5 className="text-sm font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-green-500" />
                  Optimal Planting Window
                </h5>
                <p className="text-xs text-gray-600 mt-1">
                  Ideal temperature and moisture conditions for paddy sowing 
                  expected between days A and C.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-72 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">Loading weather forecast...</p>
        </div>
      )}

      <div className="text-sm text-gray-500 mt-4">
        <p className="font-medium">How this improves credit assessment:</p>
        <p>Financial institutions use Agrolytix's weather insights to better assess climate-related risks, 
          adjust loan terms based on weather patterns, and provide tailored insurance products.</p>
      </div>
    </div>
  );
};

export default WeatherForecast;
