
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            {/* Logo */}
            <a href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-agro-green">Agro</span>
              <span className="text-2xl font-bold text-agro-purple">lytix</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="#features" className="text-gray-700 hover:text-agro-green transition-colors font-medium">
              Features
            </a>
            <a href="#audience" className="text-gray-700 hover:text-agro-green transition-colors font-medium">
              Solutions
            </a>
            <a href="#request-demo" className="text-gray-700 hover:text-agro-green transition-colors font-medium">
              Request Demo
            </a>
            <a href="#faq" className="text-gray-700 hover:text-agro-green transition-colors font-medium">
              FAQ
            </a>
            <Button className="bg-agro-green hover:bg-agro-green-dark text-white">
              Contact Us
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-agro-green"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden absolute w-full bg-white shadow-md transition-all duration-300 ease-in-out z-20",
          isMenuOpen ? "max-h-96 py-4" : "max-h-0 overflow-hidden py-0"
        )}
      >
        <div className="px-4 pt-2 pb-8 space-y-5">
          <a 
            href="#features" 
            className="block text-gray-700 hover:text-agro-green font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#audience" 
            className="block text-gray-700 hover:text-agro-green font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Solutions
          </a>
          <a 
            href="#request-demo" 
            className="block text-gray-700 hover:text-agro-green font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Request Demo
          </a>
          <a 
            href="#faq" 
            className="block text-gray-700 hover:text-agro-green font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </a>
          <Button className="w-full bg-agro-green hover:bg-agro-green-dark text-white">
            Contact Us
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
