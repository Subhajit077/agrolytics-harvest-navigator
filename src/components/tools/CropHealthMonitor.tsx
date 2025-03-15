
import { useState, useEffect } from "react";
import { Leaf, AlertTriangle, CheckCircle, ImageOff } from "lucide-react";
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

// Common visual characteristics of crop images for validation
const cropVisualCharacteristics = {
  // Green hues common in crops (in HSL - approximated values)
  greenHues: {
    min: 75,  // Hue range for typical crop greens
    max: 150
  },
  // Patterns common in crop images
  patterns: [
    "uniform rows", 
    "leaf textures", 
    "field patterns"
  ],
  // Keywords that suggest crop images
  keywords: [
    "crop", "plant", "field", "farm", "leaf", "rice", "wheat", "corn", "potato", 
    "agriculture", "harvest", "soil", "grow", "seedling"
  ],
  // Non-crop indicators (things that suggest it's not a crop)
  nonCropIndicators: [
    "person", "car", "building", "indoor", "face", "city", "street", "computer", 
    "phone", "furniture", "animal", "pet", "food", "drink"
  ]
};

const CropHealthMonitor = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [result, setResult] = useState<'healthy' | 'disease' | null>(null);
  const [cropType, setCropType] = useState("rice");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [detectedDisease, setDetectedDisease] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(0);
  const [affectedArea, setAffectedArea] = useState<number>(0);
  const [diseaseSymptom, setDiseaseSymptom] = useState<string>("");
  const [isValidCropImage, setIsValidCropImage] = useState<boolean | null>(null);
  const [invalidReason, setInvalidReason] = useState<string>("");

  // Reset results when crop type changes
  useEffect(() => {
    if (result) {
      setResult(null);
      setImagePreview(null);
      setImageFile(null);
      setIsValidCropImage(null);
      setInvalidReason("");
    }
  }, [cropType]);

  const validateCropImage = (file: File): Promise<{ isValid: boolean, reason?: string }> => {
    return new Promise((resolve) => {
      setIsValidating(true);
      
      // First check filename for non-crop indicators
      const fileName = file.name.toLowerCase();
      const hasNonCropKeyword = cropVisualCharacteristics.nonCropIndicators.some(
        keyword => fileName.includes(keyword)
      );
      
      if (hasNonCropKeyword) {
        setIsValidating(false);
        resolve({ 
          isValid: false, 
          reason: "Filename suggests this might not be a crop image" 
        });
        return;
      }
      
      // Check if filename has crop-related keywords
      const hasCropKeyword = cropVisualCharacteristics.keywords.some(
        keyword => fileName.includes(keyword)
      );
      
      // Create image for analysis
      const img = new Image();
      img.onload = () => {
        // Create canvas to analyze pixel data
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Simple image analysis: Check for predominance of green pixels (common in crops)
          let greenPixels = 0;
          let totalPixels = data.length / 4;
          
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Convert RGB to HSL and check if in green range
            const [h, s, l] = rgbToHsl(r, g, b);
            
            if (h >= cropVisualCharacteristics.greenHues.min && 
                h <= cropVisualCharacteristics.greenHues.max &&
                s > 0.15) { // Only count reasonably saturated greens
              greenPixels++;
            }
          }
          
          const greenRatio = greenPixels / totalPixels;
          
          // Determine if it's likely a crop image based on green content and filename
          const isLikelyCrop = (greenRatio > 0.25) || hasCropKeyword;
          
          setIsValidating(false);
          
          if (!isLikelyCrop) {
            resolve({ 
              isValid: false, 
              reason: "Image doesn't appear to contain crops or plants" 
            });
          } else {
            resolve({ isValid: true });
          }
        } else {
          // Fallback if canvas context is not available
          setIsValidating(false);
          resolve({ isValid: hasCropKeyword });
        }
      };
      
      img.onerror = () => {
        setIsValidating(false);
        resolve({ 
          isValid: false, 
          reason: "Failed to load image for analysis" 
        });
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  // Convert RGB to HSL helper function
  const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;
  
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
  
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
  
      h /= 6;
    }
  
    return [h * 360, s, l]; // Convert h to degrees (0-360)
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Validate if this is a crop image
      const validationResult = await validateCropImage(file);
      setIsValidCropImage(validationResult.isValid);
      
      if (!validationResult.isValid) {
        setInvalidReason(validationResult.reason || "This doesn't appear to be a crop image");
        toast({
          title: "Non-crop image detected",
          description: validationResult.reason || "Please upload an image of crops for analysis",
          variant: "destructive"
        });
      } else {
        setImageFile(file);
      }
      
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
    
    if (isValidCropImage === false) {
      toast({
        title: "Invalid image",
        description: "Please upload a valid crop image for analysis",
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
      const diseaseKeywords = ['disease', 'infected', 'blight', 'rust', 'spot', 'mildew', 'rot', 'fungus', 'pest'];
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
                For best results, upload a clear image showing crop leaf detail
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
                  
                  {isValidCropImage === false && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white p-4">
                      <ImageOff size={40} className="mb-2 text-red-400" />
                      <p className="text-center font-medium mb-1">Non-crop image detected</p>
                      <p className="text-center text-sm">{invalidReason}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={analyzeImage} 
              disabled={!imageFile || isAnalyzing || isValidating || isValidCropImage === false}
              className="w-full bg-agro-green hover:bg-agro-green-dark"
            >
              {isValidating ? "Validating image..." : isAnalyzing ? "Analyzing..." : "Analyze Crop Health"}
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
