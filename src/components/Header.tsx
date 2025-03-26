
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, User, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SignupModal } from './SignupModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm py-4 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <span className="font-display font-bold text-xl text-blue-800">LocaLazy</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Search Bar */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for stores or products" 
              className="w-64 px-4 py-2 pr-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          {/* Nav Links */}
          <nav className="flex items-center gap-6">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/stores" className="nav-link">Stores</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>
          
          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-blue-600">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-blue-600">
              <User className="h-5 w-5" />
            </Button>
            <Button 
              onClick={() => setIsSignupOpen(true)}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
            >
              Login / Sign Up
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden text-blue-600"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 border-t border-gray-100 animate-fade-in z-50">
          <div className="mb-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for stores or products" 
                className="w-full px-4 py-2 pr-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <nav className="flex flex-col gap-3 mb-4">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/stores" className="nav-link">Stores</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => {
                setIsSignupOpen(true);
                setIsMenuOpen(false);
              }}
              className="bg-blue-600 text-white w-full px-5 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
            >
              Login / Sign Up
            </Button>
          </div>
        </div>
      )}
      
      {/* Sign-up Modal */}
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </header>
  );
};

export default Header;
