
import { Button } from "@/components/ui/button";
import ServiceCard from "../ui/ServiceCard";
import { ArrowRight } from "lucide-react";

const AudienceTargeting = () => {
  return (
    <section id="audience" className="bg-white">
      <div className="container-section">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-agro-green">Tailored Solutions</span> for Every Stakeholder
          </h2>
          <p className="text-lg text-gray-600">
            Our platform addresses the unique needs of farmers and financial institutions, creating value across the agricultural financing ecosystem.
          </p>
        </div>

        {/* For Financial Institutions */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">
            <div className="md:max-w-xl mb-8 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                For Financial Institutions
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Enhance your agricultural lending portfolio with AI-powered risk assessment and monitoring tools that reduce defaults and improve overall loan performance.
              </p>
              <Button 
                className="bg-agro-green hover:bg-agro-green-dark text-white"
                asChild
              >
                <a href="#request-demo">
                  Learn More <ArrowRight size={16} className="ml-2" />
                </a>
              </Button>
            </div>
            <div className="relative">
              <div className="w-full h-full absolute top-0 left-0 bg-agro-blue-light/30 rounded-xl blur-2xl opacity-50"></div>
              <img 
                src="/placeholder.svg" 
                alt="Financial institution using Agrolytix" 
                className="relative rounded-xl shadow-lg max-w-sm lg:max-w-md z-10"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard 
              title="Banks"
              description="Optimize agricultural loan portfolios with data-driven risk assessment."
              benefits={[
                "Reduce default rates by up to 40%",
                "Improve loan approval process efficiency",
                "Access real-time monitoring of agricultural assets"
              ]}
            />
            <ServiceCard 
              title="NBFCs"
              description="Expand agricultural lending with confidence using AI-powered insights."
              benefits={[
                "Target the right farming segments",
                "Develop tailored agricultural credit products",
                "Implement efficient risk management systems"
              ]}
              isHighlighted={true}
            />
            <ServiceCard 
              title="Agri-Fintech Firms"
              description="Integrate our API to enhance your agricultural financial services."
              benefits={[
                "Seamless API integration",
                "White-label credit assessment tools",
                "Advanced data analytics capabilities"
              ]}
            />
          </div>
        </div>
        
        {/* For Farmers */}
        <div>
          <div className="flex flex-col md:flex-row-reverse items-center justify-between mb-10">
            <div className="md:max-w-xl mb-8 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                For Farmers
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Access affordable credit and improve farm productivity with AI-powered tools that showcase your creditworthiness and help prevent crop diseases.
              </p>
              <Button 
                className="bg-agro-green hover:bg-agro-green-dark text-white"
                asChild
              >
                <a href="#request-demo">
                  Learn More <ArrowRight size={16} className="ml-2" />
                </a>
              </Button>
            </div>
            <div className="relative">
              <div className="w-full h-full absolute top-0 left-0 bg-agro-purple-light/30 rounded-xl blur-2xl opacity-50"></div>
              <img 
                src="/placeholder.svg" 
                alt="Farmer using Agrolytix mobile app" 
                className="relative rounded-xl shadow-lg max-w-sm lg:max-w-md z-10"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard 
              title="Small-Scale Farmers"
              description="Build your credit profile to access affordable financing options."
              benefits={[
                "Personalized credit assessment",
                "Early disease detection alerts",
                "Weather forecasting for optimal planting"
              ]}
            />
            <ServiceCard 
              title="Commercial Farmers"
              description="Optimize operations and secure larger credit facilities with comprehensive farm data."
              benefits={[
                "Detailed yield prediction reports",
                "Comprehensive soil health monitoring",
                "Custom credit score calculators"
              ]}
            />
            <ServiceCard 
              title="Agricultural Cooperatives"
              description="Strengthen your members' access to credit with group-based assessments."
              benefits={[
                "Aggregate credit scoring for better rates",
                "Collective risk management insights",
                "Shared weather and disease alerts"
              ]}
              isHighlighted={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudienceTargeting;
