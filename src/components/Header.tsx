import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, ShoppingBag, MapPin, LogOut, Home, Store, Truck, Info, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SignupModal } from './SignupModal';
import { useAppContext } from '@/contexts/AppContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, cart, currentLocation } = useAppContext();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const navigateToProfile = () => {
    if (user) {
      if (user.type === 'customer') {
        navigate('/profile/customer');
      } else if (user.type === 'store') {
        navigate('/profile/store');
      } else if (user.type === 'delivery') {
        navigate('/profile/delivery');
      }
    }
  };
  
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm py-4 fixed w-full z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-localazy-teal flex items-center justify-center">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <span className="font-display font-bold text-xl text-localazy-navy">LocaLazy</span>
        </Link>
        
        {user && (
          <div className="hidden md:flex items-center gap-1 cursor-pointer" onClick={() => navigate('/location')}>
            <MapPin className="h-4 w-4 text-localazy-teal" />
            <span className="text-sm truncate max-w-xs">{currentLocation || 'Set location'}</span>
          </div>
        )}
        
        <div className="hidden lg:flex items-center gap-8">
          {user && user.type === 'customer' && (
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for stores or products" 
                className="w-64 px-4 py-2 pr-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          )}
          
          <nav className="flex items-center gap-6">
            <Link to="/" className="nav-link flex items-center gap-1 text-blue-600 hover:text-blue-800">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            
            <Link to="/about" className="nav-link flex items-center gap-1 text-blue-600 hover:text-blue-800">
              <Info className="h-4 w-4 mr-1" />
              About
            </Link>
            
            <Link to="/stores" className="nav-link flex items-center gap-1">
              <Store className="h-4 w-4" />
              <span>Stores</span>
            </Link>
            
            <Link to="/help" className="nav-link flex items-center gap-1 text-blue-600 hover:text-blue-800">
              <HelpCircle className="h-4 w-4 mr-1" />
              Help
            </Link>
            
            {user?.type === 'delivery' && (
              <Link to="/delivery/orders" className="nav-link text-blue-600 hover:text-blue-800">Orders</Link>
            )}
          </nav>
          
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {user.type === 'customer' && (
                  <Link to="/cart">
                    <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800 relative">
                      <ShoppingBag className="h-5 w-5" />
                      {cartItemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-localazy-coral h-4 w-4 rounded-full text-white flex items-center justify-center text-xs">
                          {cartItemCount}
                        </span>
                      )}
                    </Button>
                  </Link>
                )}
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-blue-600 hover:text-blue-800"
                    onClick={navigateToProfile}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                  <Button 
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <Button 
                onClick={() => setIsSignupOpen(true)}
                className="bg-localazy-teal text-white px-5 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
              >
                Login / Sign Up
              </Button>
            )}
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden text-localazy-teal"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 border-t border-gray-100 animate-fade-in z-50">
          {user && (
            <div className="flex items-center gap-1 mb-4 cursor-pointer" onClick={() => {
              navigate('/location');
              setIsMenuOpen(false);
            }}>
              <MapPin className="h-4 w-4 text-localazy-teal" />
              <span className="text-sm truncate">{currentLocation || 'Set location'}</span>
            </div>
          )}
          
          <div className="mb-4">
            {user?.type === 'customer' && (
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search for stores or products" 
                  className="w-full px-4 py-2 pr-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            )}
          </div>
          
          <nav className="flex flex-col gap-3 mb-4">
            <Link to="/" className="nav-link flex items-center gap-2 text-blue-600 hover:text-blue-800" onClick={() => setIsMenuOpen(false)}>
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link to="/about" className="nav-link flex items-center gap-2 text-blue-600 hover:text-blue-800" onClick={() => setIsMenuOpen(false)}>
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
            
            <Link to="/stores" className="nav-link flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <Store className="h-4 w-4" />
              <span>Stores</span>
            </Link>
            
            <Link to="/help" className="nav-link flex items-center gap-2 text-blue-600 hover:text-blue-800" onClick={() => setIsMenuOpen(false)}>
              <HelpCircle className="h-4 w-4" />
              <span>Help</span>
            </Link>
            
            {user?.type === 'customer' && (
              <Link to="/cart" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Cart {cartItemCount > 0 && `(${cartItemCount})`}
              </Link>
            )}
            
            {user?.type === 'delivery' && (
              <Link to="/delivery/orders" className="nav-link" onClick={() => setIsMenuOpen(false)}>Orders</Link>
            )}
            
            {user && (
              <Link 
                to={`/profile/${user.type}`} 
                className="nav-link flex items-center gap-2 text-blue-600 hover:text-blue-800" 
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            )}
          </nav>
          
          <div>
            {user ? (
              <Button 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                variant="outline"
                className="w-full text-red-600 border-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            ) : (
              <Button 
                onClick={() => {
                  setIsSignupOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full bg-localazy-teal text-white px-5 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
              >
                Login / Sign Up
              </Button>
            )}
          </div>
        </div>
      )}
      
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </header>
  );
};

export default Header;
