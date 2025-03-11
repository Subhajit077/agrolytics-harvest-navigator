
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  organization: z.string().min(2, { message: "Organization name is required." }),
  organizationType: z.string({ required_error: "Please select an organization type." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const DemoRequest = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      organizationType: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real implementation, you would send this data to your backend
    console.log(values);
    toast.success("Demo request submitted! Our team will contact you shortly.");
    form.reset();
  }

  return (
    <section id="request-demo" className="bg-gradient-to-br from-white to-agro-purple-light/20 py-20">
      <div className="container-section max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Ready to Transform Agricultural Financing?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Request a personalized demo to see how Agrolytix can revolutionize credit scoring for your organization or farm.
            </p>
            
            <div className="bg-white rounded-lg p-6 shadow-md mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-agro-green-light flex items-center justify-center mr-4">
                  <span className="text-agro-green font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Submit Your Request</h3>
                  <p className="text-gray-600">Fill out the form with your details</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-agro-green-light flex items-center justify-center mr-4">
                  <span className="text-agro-green font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Consultation Call</h3>
                  <p className="text-gray-600">Discuss your specific needs with our experts</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-agro-green-light flex items-center justify-center mr-4">
                  <span className="text-agro-green font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Personalized Demo</h3>
                  <p className="text-gray-600">See Agrolytix in action with your use case</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-center">Request a Demo</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization</FormLabel>
                        <FormControl>
                          <Input placeholder="Your organization" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="organizationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="bank">Bank</SelectItem>
                            <SelectItem value="nbfc">NBFC</SelectItem>
                            <SelectItem value="fintech">Agri-Fintech</SelectItem>
                            <SelectItem value="farmer">Farmer</SelectItem>
                            <SelectItem value="cooperative">Agricultural Cooperative</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Let us know your specific requirements or questions..."
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-agro-green hover:bg-agro-green-dark text-white"
                >
                  Submit Request
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoRequest;
