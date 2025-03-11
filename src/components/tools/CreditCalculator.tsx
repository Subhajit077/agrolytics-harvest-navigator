
import { useState } from "react";
import { CreditCard, Percent, TrendingUp, FileCheck, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const CreditCalculator = () => {
  const [userType, setUserType] = useState<'farmer' | 'institution'>('farmer');
  const [creditScore, setCreditScore] = useState<number | null>(null);
  const [loanAmount, setLoanAmount] = useState(200000);
  const [farmSize, setFarmSize] = useState(5);
  const [cropYield, setCropYield] = useState(80);
  const [farmingExperience, setFarmingExperience] = useState(8);
  const [previousLoans, setPreviousLoans] = useState(2);
  const [repaymentHistory, setRepaymentHistory] = useState(90);

  const calculateCredit = () => {
    // This is a simplified calculation for demonstration
    const baseScore = 500;
    
    // Yield factor (higher yield = better score)
    const yieldFactor = (cropYield / 100) * 100;
    
    // Experience factor
    const experienceFactor = Math.min(farmingExperience * 5, 50);
    
    // Repayment history factor
    const repaymentFactor = (repaymentHistory / 100) * 150;
    
    // Previous loans factor (some experience with loans is good, but not too many)
    const loanFactor = previousLoans > 0 ? Math.min(previousLoans * 10, 30) : 0;
    
    // Farm size factor (larger farms might be more stable)
    const sizeFactor = Math.min(farmSize * 2, 20);
    
    const calculatedScore = Math.min(850, Math.round(
      baseScore + yieldFactor + experienceFactor + repaymentFactor + loanFactor + sizeFactor
    ));
    
    setCreditScore(calculatedScore);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-800">Customized Credit Calculator</h3>
        <p className="text-gray-600 mt-2">
          Our AI-powered calculator helps {userType === 'farmer' ? 'farmers understand their creditworthiness' : 'financial institutions assess agricultural lending risks'} based on multiple factors.
        </p>
      </div>

      <Tabs value={userType} onValueChange={(value) => setUserType(value as 'farmer' | 'institution')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="farmer">I'm a Farmer</TabsTrigger>
          <TabsTrigger value="institution">I'm a Financial Institution</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Credit Score Calculator</CardTitle>
            <CardDescription>
              Enter your details to estimate your agricultural credit score
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="loan-amount">Loan Amount Required (₹)</Label>
              <Input 
                id="loan-amount" 
                type="number" 
                value={loanAmount} 
                onChange={(e) => setLoanAmount(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="farm-size">Farm Size (Hectares)</Label>
              <Input 
                id="farm-size" 
                type="number" 
                value={farmSize} 
                onChange={(e) => setFarmSize(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="crop-yield">Average Crop Yield (Percentile)</Label>
                <span className="text-sm text-gray-500">{cropYield}%</span>
              </div>
              <Slider 
                id="crop-yield"
                min={10} 
                max={100} 
                step={1}
                value={[cropYield]}
                onValueChange={(values) => setCropYield(values[0])}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="farming-experience">Years of Farming Experience</Label>
              <Input 
                id="farming-experience" 
                type="number" 
                value={farmingExperience} 
                onChange={(e) => setFarmingExperience(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="previous-loans">Number of Previous Loans</Label>
              <Input 
                id="previous-loans" 
                type="number" 
                value={previousLoans} 
                onChange={(e) => setPreviousLoans(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="repayment-history">Loan Repayment History</Label>
                <span className="text-sm text-gray-500">{repaymentHistory}%</span>
              </div>
              <Slider 
                id="repayment-history"
                min={0} 
                max={100} 
                step={1}
                value={[repaymentHistory]}
                onValueChange={(values) => setRepaymentHistory(values[0])}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={calculateCredit} 
              className="w-full bg-agro-green hover:bg-agro-green-dark"
            >
              Calculate Credit Score
            </Button>
          </CardFooter>
        </Card>

        <div>
          {creditScore ? (
            <div className="space-y-6">
              <Card className="bg-agro-green-light border-none">
                <CardHeader>
                  <CardTitle className="text-center">Your Agricultural Credit Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="relative w-40 h-40 mb-4">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PieChart className="w-32 h-32 text-agro-green opacity-10" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-agro-green">{creditScore}</div>
                          <div className="text-sm text-gray-600">out of 850</div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-agro-green h-3 rounded-full" 
                        style={{ width: `${Math.min((creditScore / 850) * 100, 100)}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between w-full text-xs text-gray-600 mt-1">
                      <span>Poor</span>
                      <span>Fair</span>
                      <span>Good</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <Percent className="text-agro-blue h-8 w-8" />
                  <div>
                    <h5 className="font-medium">Estimated Interest Rate</h5>
                    <p className="text-lg font-semibold text-agro-blue">
                      {creditScore > 750 ? '7.5%' : creditScore > 650 ? '9.2%' : creditScore > 550 ? '11.5%' : '14.8%'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <CreditCard className="text-agro-purple h-8 w-8" />
                  <div>
                    <h5 className="font-medium">Loan Eligibility</h5>
                    <p className="text-lg font-semibold text-agro-purple">
                      ₹ {(creditScore / 850 * loanAmount * 1.5).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <TrendingUp className="text-green-600 h-8 w-8" />
                  <div>
                    <h5 className="font-medium">Credit Score Factors</h5>
                    <p className="text-sm text-gray-600">
                      Crop yield and repayment history are the biggest factors affecting your score.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg text-center">
              <FileCheck className="h-16 w-16 text-gray-300 mb-4" />
              <h4 className="text-xl font-medium text-gray-700 mb-2">Your Credit Assessment</h4>
              <p className="text-gray-500">
                Enter your details and calculate to see your estimated agricultural credit score, 
                loan eligibility, and personalized interest rates.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
        <p className="font-medium">How Agrolytix improves agricultural credit scoring:</p>
        <p>
          Traditional credit scoring often fails to capture the unique aspects of agricultural lending. 
          Our AI-powered model incorporates over 50 agricultural and behavioral factors, satellite data, 
          weather patterns, and crop health to provide a more accurate assessment of creditworthiness.
        </p>
      </div>
    </div>
  );
};

export default CreditCalculator;
