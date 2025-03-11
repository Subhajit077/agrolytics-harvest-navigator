
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
              <a href="#" className="text-gray-500 hover:text-agro-purple">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-agro-purple">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-agro-purple">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-agro-purple">
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Solutions</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-agro-green">For Farmers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-agro-green">For Banks</a></li>
                <li><a href="#" className="text-gray-600 hover:text-agro-green">For NBFCs</a></li>
                <li><a href="#" className="text-gray-600 hover:text-agro-green">For Agri-Fintech</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-agro-green">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-agro-green">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-agro-green">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-agro-green">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-agro-green">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-agro-green">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-agro-green">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <hr className="my-8 border-gray-200" />
        
        <div className="sm:flex sm:items-center sm:justify-between">
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
