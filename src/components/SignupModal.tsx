
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

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
  const [step, setStep] = useState<'userType' | 'others' | 'login'>('userType');
  const navigate = useNavigate();
  
  const handleUserTypeSelect = (type: string) => {
    if (type === 'user') {
      navigate('/signup/user');
      onClose();
    } else if (type === 'others') {
      setStep('others');
    } else {
      setStep('login');
    }
  };
  
  const handleOthersSelect = (type: string) => {
    if (type === 'store') {
      navigate('/signup/store');
      onClose();
    } else if (type === 'delivery') {
      navigate('/signup/delivery');
      onClose();
    }
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
              </button>
              
              <button
                onClick={() => handleUserTypeSelect('others')}
                className="flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:border-localazy-teal hover:bg-localazy-teal/5 transition-colors"
              >
                <div className="h-16 w-16 rounded-full bg-localazy-teal/10 flex items-center justify-center mb-4">
                  <Store className="h-8 w-8 text-localazy-teal" />
                </div>
                <h3 className="font-bold text-lg mb-2">Business</h3>
                <p className="text-sm text-gray-600 text-center">
                  I want to register my store
                </p>
              </button>
              
              <button
                onClick={() => handleUserTypeSelect('others')}
                className="flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:border-localazy-teal hover:bg-localazy-teal/5 transition-colors"
              >
                <div className="h-16 w-16 rounded-full bg-localazy-teal/10 flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-localazy-teal" />
                </div>
                <h3 className="font-bold text-lg mb-2">Delivery</h3>
                <p className="text-sm text-gray-600 text-center">
                  I want to become a delivery partner
                </p>
              </button>
            </div>
            
            <div className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button 
                onClick={() => handleUserTypeSelect('login')}
                className="text-localazy-teal font-medium hover:underline"
              >
                Log in
              </button>
            </div>
          </>
        );
        
      case 'others':
        return (
          <>
            <DialogHeader>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-4 top-4"
                onClick={() => setStep('userType')}
              >
                <X className="h-4 w-4" />
              </Button>
              <DialogTitle className="text-2xl font-bold text-center mb-2">Join as Partner</DialogTitle>
              <DialogDescription className="text-center">
                Choose your role in the LocaLazy ecosystem
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <button
                onClick={() => handleOthersSelect('store')}
                className="flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:border-localazy-teal hover:bg-localazy-teal/5 transition-colors"
              >
                <div className="h-16 w-16 rounded-full bg-localazy-teal/10 flex items-center justify-center mb-4">
                  <Store className="h-8 w-8 text-localazy-teal" />
                </div>
                <h3 className="font-bold text-lg mb-2">Store Owner</h3>
                <p className="text-sm text-gray-600 text-center">
                  Register my local business on LocaLazy
                </p>
              </button>
              
              <button
                onClick={() => handleOthersSelect('delivery')}
                className="flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:border-localazy-teal hover:bg-localazy-teal/5 transition-colors"
              >
                <div className="h-16 w-16 rounded-full bg-localazy-teal/10 flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-localazy-teal" />
                </div>
                <h3 className="font-bold text-lg mb-2">Delivery Partner</h3>
                <p className="text-sm text-gray-600 text-center">
                  Deliver items and earn with LocaLazy
                </p>
              </button>
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                variant="outline" 
                onClick={() => setStep('userType')}
              >
                Back to Options
              </Button>
            </div>
          </>
        );
        
      case 'login':
        return (
          <>
            <DialogHeader>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-4 top-4"
                onClick={() => setStep('userType')}
              >
                <X className="h-4 w-4" />
              </Button>
              <DialogTitle className="text-2xl font-bold text-center mb-2">Welcome Back</DialogTitle>
              <DialogDescription className="text-center">
                Log in to your LocaLazy account
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-8 space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input 
                  id="email"
                  type="email" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-localazy-teal/50"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input 
                  id="password"
                  type="password" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-localazy-teal/50"
                  placeholder="Enter your password"
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
                className="w-full bg-localazy-teal hover:bg-localazy-teal/90 text-white py-2 rounded-lg"
                onClick={onClose}
              >
                Log In
              </Button>
            </div>
            
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
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};
