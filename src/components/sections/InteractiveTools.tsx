
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YieldCalculator from "../tools/YieldCalculator";
import CropHealthMonitor from "../tools/CropHealthMonitor";
import WeatherForecast from "../tools/WeatherForecast";
import CreditCalculator from "../tools/CreditCalculator";
import DataDashboard from "../tools/DataDashboard";

const InteractiveTools = () => {
  return (
    <section id="tools" className="py-20 bg-gray-50">
      <div className="container-section">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interactive <span className="text-agro-green">Tools</span>
          </h2>
          <p className="text-lg text-gray-600">
            Experience Agrolytix's powerful AI-driven tools that help farmers access better credit and financial institutions make smarter lending decisions.
          </p>
        </div>

        <Tabs defaultValue="yield" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="yield">Yield Calculator</TabsTrigger>
            <TabsTrigger value="health">Crop Health</TabsTrigger>
            <TabsTrigger value="weather">Weather Forecast</TabsTrigger>
            <TabsTrigger value="credit">Credit Calculator</TabsTrigger>
            <TabsTrigger value="dashboard">Data Dashboard</TabsTrigger>
          </TabsList>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <TabsContent value="yield" className="mt-0">
              <YieldCalculator />
            </TabsContent>
            
            <TabsContent value="health" className="mt-0">
              <CropHealthMonitor />
            </TabsContent>
            
            <TabsContent value="weather" className="mt-0">
              <WeatherForecast />
            </TabsContent>
            
            <TabsContent value="credit" className="mt-0">
              <CreditCalculator />
            </TabsContent>
            
            <TabsContent value="dashboard" className="mt-0">
              <DataDashboard />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default InteractiveTools;
