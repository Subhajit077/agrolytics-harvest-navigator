import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0 max-w-sm">
            <a href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-agro-green">Agro</span>
              <span className="text-2xl font-bold text-agro-purple">lytix</span>
            </a>
            <p className="text-gray-600 mb-4">
              Revolutionizing agricultural credit scoring with AI-driven insights for farmers and financial institutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-agro-purple transition-colors duration-300 transform hover:scale-110">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-agro-purple transition-colors duration-300 transform hover:scale-110">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-agro-purple transition-colors duration-300 transform hover:scale-110">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-agro-purple transition-colors duration-300 transform hover:scale-110">
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Solutions</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-agro-green transition-colors duration-300">For Farmers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-agro-green transition-colors duration-300">For Banks</a></li>
                <li><a href="#" className="text-gray-600 hover:text-agro-green transition-colors duration-300">For NBFCs</a></li>
                <li><a href="#" className="text-gray-600 hover:text-agro-green transition-colors duration-300">For Agri-Fintech</a></li>
              </ul>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-agro-green transition-colors duration-300">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-agro-green transition-colors duration-300">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-agro-green transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-agro-green transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-agro-green transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-agro-green transition-colors duration-300">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-agro-green transition-colors duration-300">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 mb-10">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6 text-center animate-fade-in">
            Our Leadership Team
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-white rounded-lg shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md animate-fade-in" style={{ animationDelay: "100ms" }}>
              <div className="relative w-36 h-36 mx-auto mb-4 overflow-hidden rounded-full shadow-lg border-2 border-agro-green">
                <img 
                  src="/lovable-uploads/4dab5818-7495-4e97-b814-348d461c524f.png" 
                  alt="Krishna Saproo"
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  width="400"
                  height="400"
                  loading="eager"
                />
              </div>
              <p className="font-medium text-gray-800 text-lg">Krishna Saproo</p>
              <p className="text-sm text-gray-500 mt-1">CEO</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="relative w-36 h-36 mx-auto mb-4 overflow-hidden rounded-full shadow-lg border-2 border-agro-green">
                <img 
                  src="/lovable-uploads/34faacc4-93b8-474d-97b1-91c67362acb5.png" 
                  alt="Ratul Tarafdar"
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  width="400"
                  height="400"
                  loading="eager"
                />
              </div>
              <p className="font-medium text-gray-800 text-lg">Ratul Tarafdar</p>
              <p className="text-sm text-gray-500 mt-1">CTO</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md animate-fade-in" style={{ animationDelay: "300ms" }}>
              <div className="relative w-36 h-36 mx-auto mb-4 overflow-hidden rounded-full shadow-lg border-2 border-agro-green">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" 
                  alt="Subhajit Biswas"
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  width="400"
                  height="400"
                  loading="eager"
                />
              </div>
              <p className="font-medium text-gray-800 text-lg">Subhajit Biswas</p>
              <p className="text-sm text-gray-500 mt-1">COO</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md animate-fade-in" style={{ animationDelay: "400ms" }}>
              <div className="relative w-36 h-36 mx-auto mb-4 overflow-hidden rounded-full shadow-lg border-2 border-agro-green">
                <img 
                  src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop" 
                  alt="Bikram J. Roy"
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  width="400"
                  height="400"
                  loading="eager"
                />
              </div>
              <p className="font-medium text-gray-800 text-lg">Bikram J. Roy</p>
              <p className="text-sm text-gray-500 mt-1">CFO</p>
            </div>
          </div>
        </div>
        
        <hr className="my-8 border-gray-200" />
        
        <div className="sm:flex sm:items-center sm:justify-between animate-fade-in">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Agrolytix. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0">
            <p className="text-sm text-gray-500">
              Made with advanced AI technology for sustainable agriculture
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
