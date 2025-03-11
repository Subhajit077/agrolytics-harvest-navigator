
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-agro-green-light">
      <div className="container-section relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="gradient-text">AI-Powered Credit Scoring</span> for
              <br />
              Sustainable Agriculture
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Revolutionizing agricultural financing with advanced AI technology that provides accurate credit assessments for farmers and financial institutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-agro-green hover:bg-agro-green-dark text-white gap-2"
                asChild
              >
                <a href="#request-demo">
                  Request Demo <ArrowRight size={16} />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-agro-green text-agro-green hover:text-agro-green-dark hover:border-agro-green-dark"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-br from-agro-blue-light/30 to-agro-purple-light/30 rounded-2xl blur-2xl opacity-70"></div>
              <img 
                src="https://images.unsplash.com/photo-1590682681756-ea39a5d37dcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3000&q=80" 
                alt="Farmer using Agrolytix technology" 
                className="relative z-10 rounded-2xl shadow-xl animate-float object-cover"
                style={{ width: '500px', height: '375px' }}
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg z-20 max-w-xs animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h4 className="font-medium text-gray-800">Credit Score Improved</h4>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Yield Prediction Accuracy</div>
                  <div className="text-agro-green font-semibold">94%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-agro-blue-light/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-agro-purple-light/20 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default Hero;
