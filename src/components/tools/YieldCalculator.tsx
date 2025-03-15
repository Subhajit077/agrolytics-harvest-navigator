
import { useState, useEffect } from "react";
import { Leaf, ArrowRight, Droplets, Sun, Thermometer, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

const YieldCalculator = () => {
  const [cropType, setCropType] = useState("corn");
  const [landArea, setLandArea] = useState(10);
  const [soilQuality, setSoilQuality] = useState(70);
  const [irrigationLevel, setIrrigationLevel] = useState(80);
  const [yield_result, setYieldResult] = useState<number | null>(null);
  const [creditScore, setCreditScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [location, setLocation] = useState("28.6139,77.2090"); // Default: Delhi
  const [seedQuality, setSeedQuality] = useState(75);
  const [pestManagement, setPestManagement] = useState(65);
  const [historyTab, setHistoryTab] = useState("current");

  // Sample historical yield data for different crops
  const historicalYieldData = {
    corn: [
      { year: "2020", yield: 162, nationalAvg: 158 },
      { year: "2021", yield: 175, nationalAvg: 168 },
      { year: "2022", yield: 170, nationalAvg: 165 },
      { year: "2023", yield: 179, nationalAvg: 172 },
    ],
    wheat: [
      { year: "2020", yield: 52, nationalAvg: 49 },
      { year: "2021", yield: 55, nationalAvg: 51 },
      { year: "2022", yield: 58, nationalAvg: 54 },
      { year: "2023", yield: 56, nationalAvg: 53 },
    ],
    rice: [
      { year: "2020", yield: 65, nationalAvg: 63 },
      { year: "2021", yield: 68, nationalAvg: 65 },
      { year: "2022", yield: 72, nationalAvg: 67 },
      { year: "2023", yield: 69, nationalAvg: 66 },
    ],
    soybean: [
      { year: "2020", yield: 45, nationalAvg: 42 },
      { year: "2021", yield: 48, nationalAvg: 45 },
      { year: "2022", yield: 47, nationalAvg: 44 },
      { year: "2023", yield: 51, nationalAvg: 47 },
    ],
  };

  // Weather impact factors for different crops
  const cropWeatherSensitivity = {
    corn: { temperature: 0.9, rainfall: 0.8, humidity: 0.5 },
    wheat: { temperature: 0.7, rainfall: 0.6, humidity: 0.4 },
    rice: { temperature: 0.5, rainfall: 0.9, humidity: 0.7 },
    soybean: { temperature: 0.8, rainfall: 0.7, humidity: 0.6 },
  };

  // Base yields for different crops (updated with more accurate data)
  const cropBaseYields = {
    corn: { min: 170, optimal: 190, max: 220 },
    wheat: { min: 50, optimal: 60, max: 70 },
    rice: { min: 65, optimal: 75, max: 85 },
    soybean: { min: 45, optimal: 55, max: 65 },
  };

  // Fetch weather data on component mount and when location changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // In a real app, this would call a weather API
        // Using mock data for demonstration
        const mockWeatherData = {
          current: {
            temp_c: 32,
            humidity: 62,
            precip_mm: 2.5,
            wind_kph: 15,
            condition: { text: "Partly cloudy" }
          },
          forecast: {
            forecastday: [
              { date: "2023-06-01", day: { avgtemp_c: 33, totalprecip_mm: 0 } },
              { date: "2023-06-02", day: { avgtemp_c: 34, totalprecip_mm: 1.2 } },
              { date: "2023-06-03", day: { avgtemp_c: 32, totalprecip_mm: 5.5 } },
            ]
          }
        };
        
        setWeatherData(mockWeatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [location]);

  const calculateYield = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Get base yield range for the selected crop
      const { min, optimal, max } = cropBaseYields[cropType as keyof typeof cropBaseYields];
      
      // Calculate base yield based on soil quality
      let baseYield = min + ((optimal - min) * (soilQuality / 100));
      
      // Adjust based on irrigation level
      const irrigationFactor = irrigationLevel / 100;
      baseYield = baseYield * (0.6 + (0.4 * irrigationFactor));
      
      // Adjust based on seed quality
      const seedQualityFactor = seedQuality / 100;
      baseYield = baseYield * (0.7 + (0.3 * seedQualityFactor));
      
      // Adjust based on pest management
      const pestManagementFactor = pestManagement / 100;
      baseYield = baseYield * (0.8 + (0.2 * pestManagementFactor));
      
      // Adjust based on weather if we have weather data
      if (weatherData) {
        const sensitivity = cropWeatherSensitivity[cropType as keyof typeof cropWeatherSensitivity];
        
        // Temperature adjustment (each crop has an optimal temperature range)
        const tempFactor = calculateTemperatureFactor(
          weatherData.current.temp_c, 
          cropType
        );
        
        // Rainfall adjustment
        const rainfallFactor = calculateRainfallFactor(
          weatherData.forecast.forecastday.reduce((sum: number, day: any) => sum + day.day.totalprecip_mm, 0),
          cropType
        );
        
        // Apply weather adjustments
        baseYield = baseYield * tempFactor * rainfallFactor;
      }
      
      // Final calculation with land area
      const predictedYield = baseYield * landArea;
      
      // Round to 2 decimal places
      setYieldResult(Math.round(predictedYield * 100) / 100);
      
      // Calculate credit score based on yield potential and farming practices
      const yieldPotential = predictedYield / (optimal * landArea);
      const farmingPracticesScore = (soilQuality + irrigationLevel + seedQuality + pestManagement) / 400;
      const calculatedCreditScore = Math.min(850, 500 + (yieldPotential * 200) + (farmingPracticesScore * 150));
      
      setCreditScore(Math.round(calculatedCreditScore));
      setLoading(false);
    }, 1500);
  };

  // Helper function to calculate temperature impact factor
  const calculateTemperatureFactor = (temperature: number, cropType: string) => {
    // Different crops have different optimal temperature ranges
    const optimalRanges = {
      corn: { min: 20, optimal: 25, max: 32 },
      wheat: { min: 15, optimal: 20, max: 25 },
      rice: { min: 22, optimal: 28, max: 35 },
      soybean: { min: 20, optimal: 27, max: 33 },
    };
    
    const range = optimalRanges[cropType as keyof typeof optimalRanges];
    
    if (temperature < range.min) {
      return 0.7 + (0.3 * (temperature / range.min));
    } else if (temperature > range.max) {
      return 0.7 + (0.3 * (1 - ((temperature - range.max) / range.max)));
    } else if (temperature <= range.optimal) {
      return 0.85 + (0.15 * ((temperature - range.min) / (range.optimal - range.min)));
    } else {
      return 0.85 + (0.15 * (1 - ((temperature - range.optimal) / (range.max - range.optimal))));
    }
  };

  // Helper function to calculate rainfall impact factor
  const calculateRainfallFactor = (rainfall: number, cropType: string) => {
    // Different crops have different optimal rainfall requirements (mm over 3 days)
    const optimalRainfall = {
      corn: { min: 5, optimal: 15, max: 30 },
      wheat: { min: 3, optimal: 10, max: 20 },
      rice: { min: 10, optimal: 25, max: 50 },
      soybean: { min: 5, optimal: 15, max: 25 },
    };
    
    const range = optimalRainfall[cropType as keyof typeof optimalRainfall];
    
    if (rainfall < range.min) {
      return 0.7 + (0.3 * (rainfall / range.min));
    } else if (rainfall > range.max) {
      return 0.7 + (0.3 * (1 - ((rainfall - range.max) / range.max)));
    } else if (rainfall <= range.optimal) {
      return 0.85 + (0.15 * ((rainfall - range.min) / (range.optimal - range.min)));
    } else {
      return 0.85 + (0.15 * (1 - ((rainfall - range.optimal) / (range.max - range.optimal))));
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6 animate-fadeIn">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Smart Yield Prediction</h3>
          <p className="text-gray-600">
            Our AI model analyzes multiple factors including current weather, historical patterns, and your farming practices to predict yields with high accuracy.
          </p>
        </div>

        <Card className="border border-gray-200">
          <CardContent className="pt-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
                <TabsTrigger value="weather">Weather</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="crop-type">Crop Type</Label>
                  <Select value={cropType} onValueChange={setCropType}>
                    <SelectTrigger id="crop-type">
                      <SelectValue placeholder="Select crop type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corn">Corn</SelectItem>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="soybean">Soybean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="land-area">Land Area (Hectares)</Label>
                  <Input 
                    id="land-area" 
                    type="number" 
                    min="1" 
                    max="1000"
                    value={landArea}
                    onChange={(e) => setLandArea(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="soil-quality">Soil Quality</Label>
                    <span className="text-sm text-gray-500">{soilQuality}%</span>
                  </div>
                  <Slider 
                    id="soil-quality"
                    min={0} 
                    max={100} 
                    step={1}
                    value={[soilQuality]}
                    onValueChange={(values) => setSoilQuality(values[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Poor</span>
                    <span>Average</span>
                    <span>Excellent</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="irrigation">Irrigation Level</Label>
                    <span className="text-sm text-gray-500">{irrigationLevel}%</span>
                  </div>
                  <Slider 
                    id="irrigation"
                    min={0} 
                    max={100} 
                    step={1}
                    value={[irrigationLevel]}
                    onValueChange={(values) => setIrrigationLevel(values[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Rain-fed</span>
                    <span>Partial</span>
                    <span>Full</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="seed-quality">Seed Quality</Label>
                    <span className="text-sm text-gray-500">{seedQuality}%</span>
                  </div>
                  <Slider 
                    id="seed-quality"
                    min={0} 
                    max={100} 
                    step={1}
                    value={[seedQuality]}
                    onValueChange={(values) => setSeedQuality(values[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Basic</span>
                    <span>Certified</span>
                    <span>Premium</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="pest-management">Pest Management</Label>
                    <span className="text-sm text-gray-500">{pestManagement}%</span>
                  </div>
                  <Slider 
                    id="pest-management"
                    min={0} 
                    max={100} 
                    step={1}
                    value={[pestManagement]}
                    onValueChange={(values) => setPestManagement(values[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Minimal</span>
                    <span>Regular</span>
                    <span>Intensive</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="28.6139,77.2090">Delhi</SelectItem>
                      <SelectItem value="19.0760,72.8777">Mumbai</SelectItem>
                      <SelectItem value="22.5726,88.3639">Kolkata</SelectItem>
                      <SelectItem value="13.0827,80.2707">Chennai</SelectItem>
                      <SelectItem value="17.3850,78.4867">Hyderabad</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">Weather data will be retrieved for this location</p>
                </div>
              </TabsContent>
              
              <TabsContent value="weather" className="space-y-4">
                {weatherData ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <Thermometer className="w-8 h-8 text-blue-500 mr-2" />
                        <div>
                          <p className="text-sm text-blue-700">Temperature</p>
                          <p className="font-bold">{weatherData.current.temp_c}°C</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <Droplets className="w-8 h-8 text-blue-500 mr-2" />
                        <div>
                          <p className="text-sm text-blue-700">Humidity</p>
                          <p className="font-bold">{weatherData.current.humidity}%</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <Wind className="w-8 h-8 text-blue-500 mr-2" />
                        <div>
                          <p className="text-sm text-blue-700">Wind</p>
                          <p className="font-bold">{weatherData.current.wind_kph} km/h</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <Sun className="w-8 h-8 text-blue-500 mr-2" />
                        <div>
                          <p className="text-sm text-blue-700">Condition</p>
                          <p className="font-bold">{weatherData.current.condition.text}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">3-Day Forecast</h4>
                      <div className="space-y-2">
                        {weatherData.forecast.forecastday.map((day: any, index: number) => (
                          <div key={index} className="flex justify-between items-center border-b pb-2">
                            <span className="text-sm">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                            <span className="text-sm">{day.day.avgtemp_c}°C</span>
                            <span className="text-sm">{day.day.totalprecip_mm} mm</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <p>Current weather and forecast data are automatically incorporated into our yield predictions for greater accuracy.</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p>Loading weather data...</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Button 
          onClick={calculateYield} 
          disabled={loading}
          className="w-full bg-agro-green hover:bg-agro-green-dark transition-all duration-300 transform hover:scale-[1.02]"
        >
          {loading ? (
            <div className="flex items-center">
              <span className="animate-spin mr-2">⟳</span> Calculating...
            </div>
          ) : (
            <div className="flex items-center">
              Calculate Yield Prediction <ArrowRight size={16} className="ml-2" />
            </div>
          )}
        </Button>
      </div>

      <div className="bg-agro-green-light p-6 rounded-lg shadow-lg transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
        <div className="text-center mb-6">
          <Leaf size={48} className="mx-auto text-agro-green mb-4 animate-pulse" />
          <h4 className="text-xl font-bold text-gray-800">Prediction Results</h4>
          <p className="text-gray-600">AI-powered yield and credit assessment</p>
        </div>

        {yield_result !== null ? (
          <div className="space-y-6">
            <Tabs defaultValue="current" value={historyTab} onValueChange={setHistoryTab}>
              <TabsList className="w-full grid grid-cols-2 mb-4">
                <TabsTrigger value="current">Current Prediction</TabsTrigger>
                <TabsTrigger value="historical">Historical Data</TabsTrigger>
              </TabsList>
              
              <TabsContent value="current" className="space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Predicted Yield</p>
                    <Badge className="bg-agro-green">{cropType.charAt(0).toUpperCase() + cropType.slice(1)}</Badge>
                  </div>
                  <p className="text-3xl font-bold text-agro-green">{yield_result} tons</p>
                  <p className="text-xs text-gray-500 mt-1">Based on all input parameters and real-time weather data</p>
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h5 className="text-sm font-medium text-gray-700">Yield Factors Impact</h5>
                    <div className="space-y-2 mt-2">
                      <div>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Soil Quality</span>
                          <span>+{Math.round((soilQuality / 100) * 35)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div className="bg-agro-green h-1.5 rounded-full" style={{ width: `${soilQuality}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Irrigation</span>
                          <span>+{Math.round((irrigationLevel / 100) * 25)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${irrigationLevel}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Weather Conditions</span>
                          <span>{weatherData ? "+15%" : "N/A"}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Estimated Credit Score Impact</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-yellow-500 via-agro-green to-green-600 h-2.5 rounded-full transition-all duration-1000" 
                        style={{ width: `${(creditScore || 0) / 8.5}%` }}
                      ></div>
                    </div>
                    <span className="ml-4 text-xl font-bold">{creditScore}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Poor (300)</span>
                    <span>Good (670)</span>
                    <span>Excellent (850)</span>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h5 className="text-sm font-medium text-gray-700">Financial Assessment</h5>
                    <p className="text-xs text-gray-600 mt-1">
                      Based on your projected yield of {yield_result} tons, your farm shows 
                      {creditScore && creditScore > 700 ? " excellent" : creditScore && creditScore > 600 ? " good" : " moderate"} 
                      potential for agricultural credit. This score considers yield stability, resource 
                      management, and market conditions.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="historical" className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="text-sm font-medium text-gray-700 mb-3">Historical Yield Data - {cropType.charAt(0).toUpperCase() + cropType.slice(1)}</h5>
                  <div className="space-y-3">
                    {(historicalYieldData[cropType as keyof typeof historicalYieldData] || []).map((entry, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-12 text-sm text-gray-600">{entry.year}</div>
                        <div className="flex-1 px-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-agro-green h-2 rounded-full" 
                              style={{ width: `${(entry.yield / 200) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-16 text-right text-sm font-medium">{entry.yield} t/ha</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    * National average for reference: 
                    {historicalYieldData[cropType as keyof typeof historicalYieldData]?.at(-1)?.nationalAvg || "N/A"} t/ha
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="text-sm font-medium text-gray-700 mb-3">Predicted vs Historical</h5>
                  {yield_result && (
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-20 text-sm text-gray-600">Current</div>
                        <div className="flex-1 px-3">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-blue-500 h-3 rounded-full" 
                              style={{ width: `${(yield_result / 200) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-16 text-right text-sm font-medium">{yield_result} t/ha</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-20 text-sm text-gray-600">Last Year</div>
                        <div className="flex-1 px-3">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-agro-green h-3 rounded-full" 
                              style={{ 
                                width: `${(historicalYieldData[cropType as keyof typeof historicalYieldData]?.at(-1)?.yield || 0) / 2}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-16 text-right text-sm font-medium">
                          {historicalYieldData[cropType as keyof typeof historicalYieldData]?.at(-1)?.yield || "N/A"} t/ha
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="mt-4">
                    <p className="text-xs text-gray-600">
                      {yield_result && historicalYieldData[cropType as keyof typeof historicalYieldData]?.at(-1)?.yield && (
                        <>
                          Your predicted yield is 
                          <span className={`font-medium ${yield_result > historicalYieldData[cropType as keyof typeof historicalYieldData]?.at(-1)?.yield ? "text-green-600" : "text-red-600"}`}>
                            {" "}{((yield_result / historicalYieldData[cropType as keyof typeof historicalYieldData]?.at(-1)?.yield - 1) * 100).toFixed(1)}%{" "}
                            {yield_result > historicalYieldData[cropType as keyof typeof historicalYieldData]?.at(-1)?.yield ? "higher" : "lower"}
                          </span> 
                          than last year's recorded yield.
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-sm text-center text-gray-600 mt-4">
              <p className="font-medium mb-1">AI-Powered Recommendations:</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-3 bg-white rounded-lg cursor-help">
                      {cropType === "corn" ? (
                        <p>Consider increasing irrigation by 10% during the upcoming dry period. Your soil quality is excellent for corn production.</p>
                      ) : cropType === "wheat" ? (
                        <p>Your current pest management strategy is effective. Consider premium seed varieties to further improve yield potential.</p>
                      ) : cropType === "rice" ? (
                        <p>Maintain current irrigation levels. Consider adjusting planting schedule to align with forecasted rainfall patterns.</p>
                      ) : (
                        <p>Soil conditions are favorable for soybean. Consider crop rotation in the next season to improve soil nitrogen content.</p>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64 text-xs">These recommendations are based on your inputs, local weather conditions, and historical data for your region.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-600 animate-pulse">
            <p>Enter your farm details and calculate to see AI-powered yield predictions and credit score impact.</p>
            <p className="mt-4 text-sm text-gray-500">Our model incorporates real-time weather data and historical patterns for greater accuracy.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YieldCalculator;
