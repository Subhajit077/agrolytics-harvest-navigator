
import { useState, useEffect } from "react";
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
import { toast } from "@/components/ui/use-toast";

// Common crop diseases by crop type for more accurate detection
const cropDiseases = {
  rice: ["Rice Blast", "Bacterial Leaf Blight", "Sheath Blight"],
  wheat: ["Wheat Rust", "Powdery Mildew", "Fusarium Head Blight"],
  corn: ["Gray Leaf Spot", "Northern Corn Leaf Blight", "Common Rust"],
  potato: ["Late Blight", "Early Blight", "Black Scurf"]
};

// Symptoms visible in images for each crop
const diseaseSymptoms = {
  rice: ["brown spots on leaves", "yellowing leaf edges", "lesions on stem"],
  wheat: ["orange pustules", "white powdery patches", "bleached spikelets"],
  corn: ["rectangular gray lesions", "cigar-shaped lesions", "small reddish-brown pustules"],
  potato: ["dark water-soaked lesions", "concentric rings on leaves", "black masses on tubers"]
};

const CropHealthMonitor = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<'healthy' | 'disease' | null>(null);
  const [cropType, setCropType] = useState("rice");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [detectedDisease, setDetectedDisease] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(0);
  const [affectedArea, setAffectedArea] = useState<number>(0);
  const [diseaseSymptom, setDiseaseSymptom] = useState<string>("");

  // Reset results when crop type changes
  useEffect(() => {
    if (result) {
      setResult(null);
      setImagePreview(null);
      setImageFile(null);
    }
  }, [cropType]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Reset any previous analysis
      setResult(null);
    }
  };

  const analyzeImage = () => {
    if (!imageFile) {
      toast({
        title: "No image selected",
        description: "Please upload an image to analyze",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    // More sophisticated analysis based on image name to make demos more realistic
    // In a real app, this would be replaced with actual AI image analysis
    const fileName = imageFile.name.toLowerCase();
    
    setTimeout(() => {
      // Check if filename contains disease-related keywords for more accurate detection
      const diseaseKeywords = ['disease', 'infected', 'blight', 'rust', 'spot', 'mildew', 'rot'];
      const hasKeyword = diseaseKeywords.some(keyword => fileName.includes(keyword));
      
      // If filename suggests disease or random chance (with bias toward disease for demo purposes)
      const isDiseased = hasKeyword || Math.random() < 0.7;
      
      if (isDiseased) {
        // Select a disease for the current crop type
        const diseases = cropDiseases[cropType as keyof typeof cropDiseases];
        const selectedDisease = diseases[Math.floor(Math.random() * diseases.length)];
        const symptoms = diseaseSymptoms[cropType as keyof typeof diseaseSymptoms];
        const selectedSymptom = symptoms[Math.floor(Math.random() * symptoms.length)];
        
        setResult('disease');
        setDetectedDisease(selectedDisease);
        setConfidence(Math.floor(Math.random() * 15) + 80); // 80-95% confidence
        setAffectedArea(Math.floor(Math.random() * 30) + 10); // 10-40% affected
        setDiseaseSymptom(selectedSymptom);
        
        toast({
          title: "Disease Detected",
          description: `Our AI has detected ${selectedDisease} in your ${cropType} crop.`,
          variant: "destructive"
        });
      } else {
        setResult('healthy');
        setConfidence(Math.floor(Math.random() * 10) + 90); // 90-99% confidence
        
        toast({
          title: "Healthy Crop",
          description: `Your ${cropType} crop appears healthy.`,
          variant: "default"
        });
      }
      
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
            
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Image Preview:</p>
                <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden">
                  <img 
                    src={imagePreview} 
                    alt="Crop preview" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
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
                    <li>• Leaf coloration: Normal green ({confidence}% confidence)</li>
                    <li>• Leaf structure: Normal ({confidence-2}% confidence)</li>
                    <li>• Growth pattern: Healthy ({confidence-5}% confidence)</li>
                    <li>• Disease probability: Very low ({100-confidence}%)</li>
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
                <p className="text-sm text-red-600">Early signs of {detectedDisease} identified</p>
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
                    Our AI has detected early signs of {detectedDisease} in your {cropType} crop. 
                    Early intervention is recommended to prevent spread.
                  </p>
                </TabsContent>
                <TabsContent value="details" className="mt-0">
                  <ul className="text-sm space-y-2">
                    <li>• Disease: {detectedDisease} ({confidence}% confidence)</li>
                    <li>• Symptoms: {diseaseSymptom}</li>
                    <li>• Affected area: {affectedArea}% of crop</li>
                    <li>• Progression: Early stage</li>
                    <li>• Potential yield impact: {affectedArea + 20}-{affectedArea + 30}% if untreated</li>
                  </ul>
                </TabsContent>
                <TabsContent value="recommendations" className="mt-0">
                  <ul className="text-sm space-y-2">
                    <li>• Apply appropriate fungicide treatment within 48 hours</li>
                    <li>• Adjust irrigation to reduce leaf wetness</li>
                    <li>• Monitor daily for the next week</li>
                    <li>• Consider consulting with an agronomist</li>
                    <li>• Document treatment for credit score improvement</li>
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
