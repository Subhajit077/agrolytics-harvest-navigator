
import { useState } from "react";
import { Leaf, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CropHealthMonitor = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<'healthy' | 'disease' | null>(null);
  const [cropType, setCropType] = useState("rice");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    
    // Simulated analysis (would be done by AI in real implementation)
    setTimeout(() => {
      // Randomly choose result for demo purposes
      setResult(Math.random() > 0.5 ? 'healthy' : 'disease');
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">Crop Health Monitoring</h3>
        <p className="text-gray-600">
          Our AI thermal imaging technology can detect crop diseases within 12 hours, 
          enabling early interventions that protect your yield and credit score.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Upload Crop Image</CardTitle>
            <CardDescription>
              Upload an image of your crops for AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="crop-type-health">Crop Type</Label>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger id="crop-type-health">
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="corn">Corn</SelectItem>
                  <SelectItem value="potato">Potato</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="crop-image">Upload Image</Label>
              <Input 
                id="crop-image" 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
              />
              <p className="text-xs text-gray-500">
                For best results, upload a clear image showing leaf detail
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={analyzeImage} 
              disabled={!imageFile || isAnalyzing}
              className="w-full bg-agro-green hover:bg-agro-green-dark"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Crop Health"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="text-center mb-6">
          <Leaf size={48} className="mx-auto text-agro-green mb-4" />
          <h4 className="text-xl font-bold text-gray-800">Health Analysis</h4>
          <p className="text-gray-600">AI-powered disease detection</p>
        </div>

        {result === null ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600">
              Upload an image of your crops and run the analysis to receive detailed health insights
            </p>
          </div>
        ) : result === 'healthy' ? (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-center">
              <CheckCircle className="text-green-500 mr-3" />
              <div>
                <h5 className="font-semibold text-green-700">Healthy Crop Detected</h5>
                <p className="text-sm text-green-600">No signs of disease or nutrient deficiency</p>
              </div>
            </div>
            
            <Tabs defaultValue="summary">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              <div className="bg-white p-4 rounded-lg mt-2">
                <TabsContent value="summary" className="mt-0">
                  <p className="text-sm">
                    Your {cropType} crop appears healthy with good leaf coloration and 
                    structure. No signs of common diseases detected.
                  </p>
                </TabsContent>
                <TabsContent value="details" className="mt-0">
                  <ul className="text-sm space-y-2">
                    <li>• Leaf coloration: Normal green (98% confidence)</li>
                    <li>• Leaf structure: Normal (97% confidence)</li>
                    <li>• Growth pattern: Healthy (95% confidence)</li>
                    <li>• Disease probability: Very low (3%)</li>
                  </ul>
                </TabsContent>
                <TabsContent value="recommendations" className="mt-0">
                  <ul className="text-sm space-y-2">
                    <li>• Continue current agricultural practices</li>
                    <li>• Maintain regular monitoring schedule</li>
                    <li>• Consider documenting for credit application</li>
                  </ul>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200 flex items-center">
              <AlertTriangle className="text-red-500 mr-3" />
              <div>
                <h5 className="font-semibold text-red-700">Potential Disease Detected</h5>
                <p className="text-sm text-red-600">Early signs of fungal infection identified</p>
              </div>
            </div>
            
            <Tabs defaultValue="summary">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              <div className="bg-white p-4 rounded-lg mt-2">
                <TabsContent value="summary" className="mt-0">
                  <p className="text-sm">
                    Our AI has detected early signs of leaf blast disease in your {cropType} crop. 
                    Early intervention is recommended to prevent spread.
                  </p>
                </TabsContent>
                <TabsContent value="details" className="mt-0">
                  <ul className="text-sm space-y-2">
                    <li>• Disease: Leaf Blast (89% confidence)</li>
                    <li>• Affected area: 12% of crop</li>
                    <li>• Progression: Early stage</li>
                    <li>• Potential yield impact: 30-40% if untreated</li>
                  </ul>
                </TabsContent>
                <TabsContent value="recommendations" className="mt-0">
                  <ul className="text-sm space-y-2">
                    <li>• Apply fungicide treatment within 48 hours</li>
                    <li>• Adjust irrigation to reduce leaf wetness</li>
                    <li>• Monitor daily for the next week</li>
                    <li>• Consider consulting with an agronomist</li>
                  </ul>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        )}
        
        <div className="mt-6 text-sm text-center text-gray-500">
          Agrolytix's AI analyzes thermal and visual imagery to detect over 200 crop diseases 
          with 94% accuracy, often before they're visible to the human eye.
        </div>
      </div>
    </div>
  );
};

export default CropHealthMonitor;
