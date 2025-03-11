
import { useState } from "react";
import { 
  BarChart, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon, 
  BarChart4, 
  LayoutDashboard, 
  MapPin, 
  Calendar 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DataDashboard = () => {
  const [region, setRegion] = useState("punjab");
  const [crop, setCrop] = useState("wheat");
  const [timeRange, setTimeRange] = useState("year");

  // Sample data for demonstration purposes
  const yieldData = [
    { month: 'Jan', actual: 0, predicted: 0 },
    { month: 'Feb', actual: 0, predicted: 0 },
    { month: 'Mar', actual: 0, predicted: 0 },
    { month: 'Apr', actual: 20, predicted: 22 },
    { month: 'May', actual: 35, predicted: 38 },
    { month: 'Jun', actual: 48, predicted: 45 },
    { month: 'Jul', actual: 65, predicted: 62 },
    { month: 'Aug', actual: 85, predicted: 88 },
    { month: 'Sep', actual: 100, predicted: 95 },
    { month: 'Oct', actual: 0, predicted: 0 },
    { month: 'Nov', actual: 0, predicted: 0 },
    { month: 'Dec', actual: 0, predicted: 0 },
  ];

  const healthData = [
    { name: 'Healthy', value: 78 },
    { name: 'Mild Issues', value: 15 },
    { name: 'Severe Issues', value: 7 },
  ];

  const weatherData = [
    { day: '1', temperature: 34, rainfall: 2 },
    { day: '2', temperature: 35, rainfall: 0 },
    { day: '3', temperature: 36, rainfall: 0 },
    { day: '4', temperature: 32, rainfall: 5 },
    { day: '5', temperature: 33, rainfall: 3 },
    { day: '6', temperature: 36, rainfall: 0 },
    { day: '7', temperature: 35, rainfall: 0 },
  ];

  const riskData = [
    { factor: 'Weather Risks', score: 72 },
    { factor: 'Disease Risks', score: 85 },
    { factor: 'Yield Forecast', score: 65 },
    { factor: 'Market Price', score: 58 },
    { factor: 'Infrastructure', score: 79 },
  ];

  const COLORS = ['#3A9278', '#FFB547', '#FF6B6B', '#4CAF50', '#2196F3'];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-800">Real-time Data Dashboard</h3>
        <p className="text-gray-600 mt-2">
          Comprehensive data insights for informed agricultural and financial decision-making.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-gray-500 block mb-1">Region</label>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="punjab">Punjab</SelectItem>
              <SelectItem value="haryana">Haryana</SelectItem>
              <SelectItem value="up">Uttar Pradesh</SelectItem>
              <SelectItem value="mp">Madhya Pradesh</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm text-gray-500 block mb-1">Crop Type</label>
          <Select value={crop} onValueChange={setCrop}>
            <SelectTrigger>
              <SelectValue placeholder="Select crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wheat">Wheat</SelectItem>
              <SelectItem value="rice">Rice</SelectItem>
              <SelectItem value="cotton">Cotton</SelectItem>
              <SelectItem value="sugarcane">Sugarcane</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm text-gray-500 block mb-1">Time Range</label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-agro-green mr-2" />
            <h4 className="font-medium">Dashboard for {region.charAt(0).toUpperCase() + region.slice(1)} Region - {crop.charAt(0).toUpperCase() + crop.slice(1)}</h4>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Last updated: Today, 8:45 AM</span>
          </div>
        </div>

        <Tabs defaultValue="yield">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="yield" className="flex items-center">
              <LineChartIcon className="h-4 w-4 mr-2" />
              Yield Prediction
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center">
              <PieChartIcon className="h-4 w-4 mr-2" />
              Crop Health
            </TabsTrigger>
            <TabsTrigger value="weather" className="flex items-center">
              <BarChart className="h-4 w-4 mr-2" />
              Weather Impact
            </TabsTrigger>
            <TabsTrigger value="risk" className="flex items-center">
              <BarChart4 className="h-4 w-4 mr-2" />
              Risk Assessment
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-4">
            <TabsContent value="yield" className="mt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={yieldData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis label={{ value: 'Crop Maturity (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      name="Actual Yield" 
                      stroke="#3A9278" 
                      strokeWidth={2} 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      name="AI Predicted" 
                      stroke="#9b87f5" 
                      strokeWidth={2} 
                      strokeDasharray="5 5" 
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p className="font-medium">AI-Powered Prediction Insights:</p>
                <p>Based on current growth patterns, soil conditions, and weather forecasts, 
                  we predict a final yield of 95-105% compared to regional average. This suggests 
                  a strong financial outlook for this crop cycle.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="health" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={healthData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {healthData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-lg font-medium mb-2">Crop Health Analysis</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Our AI has analyzed thermal and visual imagery from satellite and drone data 
                    to provide a comprehensive assessment of your crop health.
                  </p>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                      <h5 className="font-medium text-green-800">Healthy Areas (78%)</h5>
                      <p className="text-sm text-green-700">Optimal growth with no signs of disease or nutrient deficiency.</p>
                    </div>
                    <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                      <h5 className="font-medium text-yellow-800">Mild Issues (15%)</h5>
                      <p className="text-sm text-yellow-700">Some signs of water stress in the southwest section. Recommended action: Adjust irrigation.</p>
                    </div>
                    <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                      <h5 className="font-medium text-red-800">Potential Problems (7%)</h5>
                      <p className="text-sm text-red-700">Early signs of fungal infection detected in northeast fields. Urgent action required.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="weather" className="mt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={weatherData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" label={{ value: 'Next 7 Days', position: 'insideBottom', offset: -5 }} />
                    <YAxis yAxisId="left" orientation="left" stroke="#FF8B3D" label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#0EA5E9" label={{ value: 'Rainfall (mm)', angle: 90, position: 'insideRight' }} />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="temperature" name="Temperature" fill="#FF8B3D" />
                    <Bar yAxisId="right" dataKey="rainfall" name="Rainfall" fill="#0EA5E9" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p className="font-medium">Weather Impact Assessment:</p>
                <p>The upcoming rainfall on day 4 is beneficial for current crop stage. However, 
                   the high temperatures forecasted throughout the week may increase water requirements.
                   Recommended actions: Increase irrigation after day 5 if no additional rainfall occurs.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="risk" className="mt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={riskData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="factor" type="category" width={120} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" name="Risk Score (Lower is Better)" fill="#9b87f5" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p className="font-medium">Financial Risk Assessment:</p>
                <p>The current risk profile for this crop and region shows moderate market price risk 
                   due to expected harvest timing. Disease risk is well-managed with timely interventions. 
                   Overall credit risk assessment: Low to Moderate (74/100).</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <div className="flex justify-center">
        <Button className="bg-agro-purple hover:bg-agro-purple-dark text-white">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Download Full Report
        </Button>
      </div>
    </div>
  );
};

export default DataDashboard;
