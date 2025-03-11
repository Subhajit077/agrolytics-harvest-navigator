
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import AudienceTargeting from "@/components/sections/AudienceTargeting";
import DemoRequest from "@/components/sections/DemoRequest";
import FAQ from "@/components/sections/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <AudienceTargeting />
        <DemoRequest />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
