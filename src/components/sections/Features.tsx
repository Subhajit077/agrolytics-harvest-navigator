
import { BarChart4, Cloud, Database, LineChart, PieChart, Leaf, AlertTriangle, MessageSquare } from "lucide-react";
import FeatureCard from "../ui/FeatureCard";

const Features = () => {
  const features = [
    {
      icon: LineChart,
      title: "AI-powered Yield Prediction",
      description: "Advanced machine learning algorithms analyze real-time weather, soil data, and farming practices to predict crop yields with up to 93% accuracy."
    },
    {
      icon: Leaf,
      title: "Soil & Crop Health Monitoring",
      description: "AI thermal imaging technology that detects crop diseases within 12 hours, enabling timely interventions to protect yields and credit scores."
    },
    {
      icon: Cloud,
      title: "Real-time Weather Integration",
      description: "Live weather data for your specific location helps optimize farming decisions and provides accurate yield forecasts based on current conditions."
    },
    {
      icon: BarChart4,
      title: "Farmer-Friendly Interface",
      description: "Simple, intuitive tools designed specifically for farmers, requiring minimal technical knowledge while providing powerful insights."
    },
    {
      icon: AlertTriangle,
      title: "Early Risk Detection",
      description: "Identify potential yield threats from weather, disease, or pests before they impact your crops and financial standing."
    },
    {
      icon: MessageSquare,
      title: "Personalized Recommendations",
      description: "Receive tailored farming advice based on your specific crops, location, and practices to maximize yield potential and credit worthiness."
    },
    {
      icon: PieChart,
      title: "Visual Data Dashboards",
      description: "Easy-to-understand visual representations of predictions, historical performance, and key agricultural metrics."
    },
    {
      icon: Database,
      title: "Historical Data Analysis",
      description: "Compare current predictions with past performance to identify trends and opportunities for improvement in both yields and credit ratings."
    }
  ];

  return (
    <section id="features" className="bg-gray-50 py-20">
      <div className="container-section">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powered by Advanced <span className="text-agro-purple">AI Technology</span>
          </h2>
          <p className="text-lg text-gray-600">
            Our farmer-friendly tools use real-time data and advanced AI to revolutionize agricultural credit scoring with unprecedented accuracy and simplicity.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className="transform transition-all duration-500 hover:scale-105"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
