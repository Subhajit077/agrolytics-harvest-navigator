
import { useState } from "react";
import { Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const YieldCalculator = () => {
  const [cropType, setCropType] = useState("corn");
  const [landArea, setLandArea] = useState(10);
  const [soilQuality, setSoilQuality] = useState(70);
  const [irrigationLevel, setIrrigationLevel] = useState(80);
  const [yield_result, setYieldResult] = useState<number | null>(null);
  const [creditScore, setCreditScore] = useState<number | null>(null);

  const calculateYield = () => {
    // Simplified example calculation
    let baseYield = 0;
    switch (cropType) {
      case "corn": baseYield = 180; break;
      case "wheat": baseYield = 60; break;
      case "rice": baseYield = 70; break;
      case "soybean": baseYield = 50; break;
      default: baseYield = 100;
    }
    
    // Adjust based on soil quality and irrigation
    const soilFactor = soilQuality / 100;
    const irrigationFactor = irrigationLevel / 100;
    
    const predictedYield = baseYield * soilFactor * irrigationFactor * landArea;
    setYieldResult(Math.round(predictedYield * 100) / 100);
    
    // Calculate a sample credit score based on yield
    const calculatedCreditScore = Math.min(850, 500 + (predictedYield / (baseYield * landArea)) * 350);
    setCreditScore(Math.round(calculatedCreditScore));
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">AI-Powered Yield Prediction</h3>
        <p className="text-gray-600">
          Our advanced AI algorithms analyze multiple factors to predict your crop yield with 
          high accuracy, helping financial institutions better assess credit risk.
        </p>

        <div className="space-y-4">
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
          </div>

          <Button onClick={calculateYield} className="w-full bg-agro-green hover:bg-agro-green-dark">
            Calculate Yield Prediction <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      <div className="bg-agro-green-light p-6 rounded-lg">
        <div className="text-center mb-6">
          <Leaf size={48} className="mx-auto text-agro-green mb-4" />
          <h4 className="text-xl font-bold text-gray-800">Prediction Results</h4>
          <p className="text-gray-600">AI-powered yield and credit assessment</p>
        </div>

        {yield_result !== null ? (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Predicted Yield</p>
              <p className="text-3xl font-bold text-agro-green">{yield_result} tons</p>
              <p className="text-xs text-gray-500 mt-1">Based on input parameters and historical data</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Estimated Credit Score Impact</p>
              <div className="flex items-center justify-between mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-agro-green h-2.5 rounded-full" style={{ width: `${(creditScore || 0) / 8.5}%` }}></div>
                </div>
                <span className="ml-4 text-xl font-bold">{creditScore}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">This is a simulated score for demonstration</p>
            </div>

            <div className="text-sm text-center text-gray-600 mt-4">
              Agrolytix's algorithms analyze over 50 additional factors including weather patterns, 
              soil composition, and historical yield data to provide financial institutions with 
              comprehensive risk assessments.
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-600">
            <p>Enter your farm details and calculate to see AI-powered yield predictions and credit score impact.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YieldCalculator;
