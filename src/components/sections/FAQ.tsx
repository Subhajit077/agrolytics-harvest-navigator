
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqItems = [
    {
      question: "How does Agrolytix's AI technology improve credit scoring for farmers?",
      answer: "Agrolytix uses advanced AI algorithms to analyze multiple data points including soil health, weather patterns, crop disease detection, and historical yield data to create more accurate credit risk assessments. This comprehensive approach provides a more holistic view of a farmer's creditworthiness beyond traditional financial metrics."
    },
    {
      question: "What makes Agrolytix different from traditional agricultural credit assessment?",
      answer: "Traditional credit assessment relies heavily on financial history and collateral, which many farmers lack. Agrolytix integrates real-time agricultural data, AI-powered yield predictions, and early disease detection to provide a forward-looking assessment of a farmer's ability to repay loans, resulting in more accurate risk profiles and better credit terms."
    },
    {
      question: "How accurate is the AI crop disease detection system?",
      answer: "Our AI thermal imaging technology can detect crop diseases within 12 hours of infection with over 90% accuracy, allowing for early intervention before significant crop damage occurs. This early detection capability significantly reduces the risk of yield loss, thereby improving the farmer's repayment capacity."
    },
    {
      question: "Can financial institutions integrate Agrolytix with their existing systems?",
      answer: "Yes, Agrolytix offers secure API integration with existing banking and lending platforms. Our system is designed to complement and enhance your current credit assessment processes rather than replace them entirely, providing additional agricultural-specific insights for more informed lending decisions."
    },
    {
      question: "Is Agrolytix suitable for all types of farmers?",
      answer: "Agrolytix is designed to serve farmers of all scales, from smallholder farmers to large commercial operations. The platform adapts to different farming contexts and crops, providing tailored insights based on the specific agricultural activities being undertaken."
    },
    {
      question: "How does the weather forecasting feature help in credit assessment?",
      answer: "Our advanced weather forecasting uses AI to predict weather patterns specific to a farmer's location. This helps assess climate-related risks that might affect crop yields and, consequently, loan repayment ability. Financial institutions can use this data to better understand seasonal cash flow patterns and potential risks."
    },
    {
      question: "What data security measures does Agrolytix have in place?",
      answer: "Agrolytix employs bank-grade encryption for all data, complies with international data protection regulations, and implements rigorous access controls. We never share individual farmer data without explicit consent, ensuring that sensitive financial and agricultural information remains secure."
    }
  ];

  return (
    <section id="faq" className="bg-white py-20">
      <div className="container-section max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-agro-purple">Questions</span>
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about Agrolytix's agricultural credit scoring solutions.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium text-gray-800">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? Our team is here to help.
          </p>
          <a 
            href="#" 
            className="text-agro-green hover:text-agro-green-dark font-medium underline underline-offset-4"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
