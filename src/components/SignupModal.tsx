
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, User, Store, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { useAppContext } from '@/contexts/AppContext';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
  const [step, setStep] = useState<'userType' | 'login'>('userType');
  const navigate = useNavigate();
  const { setUser } = useAppContext();
  
  const handleUserTypeSelect = (type: string) => {
    if (type === 'user') {
      navigate('/auth');
      onClose();
    } else if (type === 'store') {
      navigate('/signup/store');
      onClose();
    } else if (type === 'delivery') {
      navigate('/signup/delivery');
      onClose();
    } else if (type === 'login') {
      setStep('login');
    }
  };

  const handleBusinessLogin = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUser({
      id: '123',
      email: 'store@example.com',
      name: 'Store Owner',
      type: 'store',
      storeName: 'Sample Store',
      category: 'General',
      phone: '123-456-7890',
      address: '123 Main St',
    });
    navigate('/store/dashboard');
    onClose();
    toast.success("Login successful!");
  };
  
  const handleDeliveryLogin = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUser({
      id: '124',
      email: 'delivery@example.com',
      name: 'Delivery Partner',
      type: 'delivery',
      phone: '123-456-7891',
      vehicle: 'Motorcycle',
      licenseNumber: 'DL12345',
      availability: 'Full-time'
    });
    navigate('/delivery/orders');
    onClose();
    toast.success("Login successful!");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would authenticate the user
    // We're simulating a successful login
    
    // Get form data
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const userType = (form.elements.namedItem('userType') as HTMLInputElement)?.value || 'customer';
    
    // Set user context (simulated login)
    setUser({
      id: '123',
      email: email,
      name: userType === 'delivery' ? 'Delivery Person' : userType === 'store' ? 'Store Owner' : 'Customer',
      type: userType as 'customer' | 'store' | 'delivery'
    });
    
    toast.success("Login successful!");
    
    // Direct to appropriate dashboard
    if (userType === 'delivery') {
      navigate('/delivery/orders');
    } else if (userType === 'store') {
      navigate('/store/dashboard');
    } else {
      navigate('/location');
    }
    
    onClose();
  };
  
  const renderContent = () => {
    switch (step) {
      case 'userType':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center mb-2">Join LocaLazy</DialogTitle>
              <DialogDescription className="text-center">
                Choose how you want to be part of the LocaLazy community
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <button
                onClick={() => handleUserTypeSelect('user')}
                className="flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:border-localazy-teal hover:bg-localazy-teal/5 transition-colors"
              >
                <div className="h-16 w-16 rounded-full bg-localazy-teal/10 flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-localazy-teal" />
                </div>
                <h3 className="font-bold text-lg mb-2">Customer</h3>
                <p className="text-sm text-gray-600 text-center">
                  I want to order from local stores
                </p>
                <div className="mt-4 flex flex-col gap-2 w-full">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/auth');
                      onClose();
                    }}
                    variant="outline" 
                    size="sm"
                    className="w-full"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/auth');
                      onClose();
                    }}
                    size="sm"
                    className="w-full bg-localazy-teal"
                  >
                    Sign Up
                  </Button>
                </div>
              </button>
              
              <button
                onClick={() => handleUserTypeSelect('store')}
                className="flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:border-localazy-teal hover:bg-localazy-teal/5 transition-colors"
              >
                <div className="h-16 w-16 rounded-full bg-localazy-teal/10 flex items-center justify-center mb-4">
                  <Store className="h-8 w-8 text-localazy-teal" />
                </div>
                <h3 className="font-bold text-lg mb-2">Business</h3>
                <p className="text-sm text-gray-600 text-center">
                  I want to register my store
                </p>
                <div className="mt-4 flex flex-col gap-2 w-full">
                  <Button 
                    onClick={handleBusinessLogin}
                    variant="outline" 
                    size="sm"
                    className="w-full"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/signup/store');
                      onClose();
                    }}
                    size="sm"
                    className="w-full bg-localazy-teal"
                  >
                    Sign Up
                  </Button>
                </div>
              </button>
              
              <button
                onClick={() => handleUserTypeSelect('delivery')}
                className="flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:border-localazy-teal hover:bg-localazy-teal/5 transition-colors"
              >
                <div className="h-16 w-16 rounded-full bg-localazy-teal/10 flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-localazy-teal" />
                </div>
                <h3 className="font-bold text-lg mb-2">Delivery</h3>
                <p className="text-sm text-gray-600 text-center">
                  I want to become a delivery partner
                </p>
                <div className="mt-4 flex flex-col gap-2 w-full">
                  <Button 
                    onClick={handleDeliveryLogin}
                    variant="outline" 
                    size="sm"
                    className="w-full"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/signup/delivery');
                      onClose();
                    }}
                    size="sm"
                    className="w-full bg-localazy-teal"
                  >
                    Sign Up
                  </Button>
                </div>
              </button>
            </div>
          </>
        );
        
      case 'login':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center mb-2">Welcome Back</DialogTitle>
              <DialogDescription className="text-center">
                Log in to your LocaLazy account
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              <input type="hidden" name="userType" value="customer" />
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input 
                  id="email"
                  name="email"
                  type="email" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-localazy-teal/50"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input 
                  id="password"
                  name="password"
                  type="password" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-localazy-teal/50"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <input 
                    id="remember"
                    type="checkbox" 
                    className="h-4 w-4 text-localazy-teal focus:ring-localazy-teal border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <button className="text-sm text-localazy-teal hover:underline">
                  Forgot password?
                </button>
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-localazy-teal hover:bg-localazy-teal/90 text-white py-2 rounded-lg"
              >
                Log In
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button 
                onClick={() => setStep('userType')}
                className="text-localazy-teal font-medium hover:underline"
              >
                Sign up
              </button>
            </div>
          </>
        );
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-xl">
        {/* Removed the custom X button here since DialogContent already includes a close button */}
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};
