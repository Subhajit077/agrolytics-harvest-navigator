
import { BarChart4, Cloud, Database, LineChart, PieChart, Leaf } from "lucide-react";
import FeatureCard from "../ui/FeatureCard";

const Features = () => {
  const features = [
    {
      icon: LineChart,
      title: "AI-powered Yield Prediction",
      description: "Advanced machine learning algorithms to accurately predict crop yields for more precise credit risk assessments."
    },
    {
      icon: Leaf,
      title: "Soil & Crop Health Monitoring",
      description: "AI thermal imaging technology that detects crop diseases within 12 hours, enabling timely interventions."
    },
    {
      icon: Cloud,
      title: "Advanced Weather Forecasting",
      description: "Predictive insights to optimize farming decisions and mitigate financial risks related to weather conditions."
    },
    {
      icon: BarChart4,
      title: "Customized Credit Calculators",
      description: "Allow both farmers and financial institutions to simulate credit scores based on specific parameters."
    },
    {
      icon: PieChart,
      title: "Real-time Data Dashboards",
      description: "Visual representation of weather, crop health, and yield predictions for informed decision-making."
    },
    {
      icon: Database,
      title: "Comprehensive Data Analysis",
      description: "Integration of multiple data sources for holistic agricultural and financial insights."
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
            Our suite of AI-driven tools revolutionizes agricultural credit scoring, providing unprecedented accuracy and insights.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
