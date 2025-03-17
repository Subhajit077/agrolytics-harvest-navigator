
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon } from "lucide-react";

const testimonials = [
  {
    quote: "Agrolytix revolutionized how we evaluate loan applications from farmers. Their AI risk assessment model has reduced our default rates by 35%.",
    author: "Sarah Johnson",
    position: "Agricultural Loan Manager, First Rural Bank",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
  },
  {
    quote: "As a small-scale farmer, I struggled to access affordable credit. Agrolytix helped me build a credit profile that secured funding at rates I never thought possible.",
    author: "Michael Rodriguez",
    position: "Small-Scale Farmer, California",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80"
  },
  {
    quote: "The crop disease detection feature saved my rice harvest last season. I was able to identify and treat a fungal infection before it spread across my fields.",
    author: "Rebecca Chen",
    position: "Commercial Rice Farmer, Arkansas",
    image: "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80"
  },
  {
    quote: "Integrating Agrolytix's API into our fintech platform was seamless. Their credit scoring algorithm has enabled us to expand our agricultural lending portfolio with confidence.",
    author: "Daniel Okafor",
    position: "CTO, AgriFinance Solutions",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-agro-blue-light/20 to-white">
      <div className="container-section">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-agro-purple">Clients</span> Say
          </h2>
          <p className="text-lg text-gray-600">
            Hear from farmers and financial institutions who have transformed their approach to agricultural financing with Agrolytix.
          </p>
        </div>

        <Carousel 
          className="w-full max-w-5xl mx-auto"
          opts={{ loop: true }}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 p-4">
                <Card className="h-full border-gray-200">
                  <CardContent className="flex flex-col h-full p-6">
                    <div className="mb-6 text-agro-purple opacity-80">
                      <QuoteIcon size={36} />
                    </div>
                    <p className="text-gray-700 mb-6 flex-grow">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-agro-green-light">
                        <AspectRatio ratio={1/1}>
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.author} 
                            className="object-cover w-full h-full"
                          />
                        </AspectRatio>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{testimonial.author}</h4>
                        <p className="text-sm text-gray-600">{testimonial.position}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-1" />
            <CarouselNext className="right-1" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
