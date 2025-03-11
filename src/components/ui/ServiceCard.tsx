
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  benefits: string[];
  className?: string;
  isHighlighted?: boolean;
}

const ServiceCard = ({ 
  title, 
  description, 
  benefits, 
  className,
  isHighlighted = false
}: ServiceCardProps) => {
  return (
    <div 
      className={cn(
        "rounded-xl shadow-md p-6 transition-all duration-300 h-full flex flex-col",
        isHighlighted 
          ? "bg-gradient-to-br from-agro-purple-light to-white border-agro-purple border-2 shadow-lg" 
          : "bg-white border border-gray-100 hover:shadow-lg",
        className
      )}
    >
      <h3 className={cn(
        "text-xl font-bold mb-3",
        isHighlighted ? "text-agro-purple-dark" : "text-gray-800"
      )}>
        {title}
      </h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mt-auto">
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-agro-green mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceCard;
