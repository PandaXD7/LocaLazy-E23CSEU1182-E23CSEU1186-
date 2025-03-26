
import React, { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StoreSetupProps {
  onComplete: () => void;
}

export const StoreSetup = ({ onComplete }: StoreSetupProps) => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState({
    storeName: '',
    email: '',
    contact: '',
    tagline: '',
    description: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };
  
  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="animate-fade-in">
            <div className="text-center">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 mx-auto mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-blue-800">Welcome to Store Setup</h2>
              <p className="text-gray-600 mb-6">
                Let's get your store ready for LocaLazy. Follow the simple steps and you'll be up and running in no time!
              </p>
              <Button onClick={nextStep} className="btn-primary">
                Start Setup
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case 1:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-blue-800">Step 1: Store Information</h2>
            
            <div className="mb-6">
              <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">
                Store Name
              </label>
              <input 
                id="storeName"
                name="storeName"
                value={formData.storeName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Enter your store name"
              />
            </div>
            
            <div className="flex justify-between gap-4 mb-6">
              <Button onClick={prevStep} variant="outline" className="w-1/2">
                Back
              </Button>
              <Button onClick={nextStep} className="w-1/2 btn-primary">
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-3 py-2">
              <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <Check className="h-4 w-4" />
              </div>
              <span className="text-blue-800">Store Name</span>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-blue-800">Step 2: Contact Information</h2>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email (For customers)
              </label>
              <input 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Enter your business email"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number (For admin use only)
              </label>
              <input 
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Enter your contact number"
              />
            </div>
            
            <div className="flex justify-between gap-4 mb-6">
              <Button onClick={prevStep} variant="outline" className="w-1/2">
                Back
              </Button>
              <Button onClick={nextStep} className="w-1/2 btn-primary">
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 py-2">
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-blue-800">Store Name</span>
              </div>
              
              <div className="flex items-center gap-3 py-2">
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-blue-800">Contact Information</span>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-blue-800">Step 3: Store Tagline</h2>
            
            <div className="mb-6">
              <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-1">
                Tagline
              </label>
              <input 
                id="tagline"
                name="tagline"
                value={formData.tagline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Enter a catchy tagline for your store"
              />
            </div>
            
            <div className="flex justify-between gap-4 mb-6">
              <Button onClick={prevStep} variant="outline" className="w-1/2">
                Back
              </Button>
              <Button onClick={nextStep} className="w-1/2 btn-primary">
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 py-2">
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-blue-800">Store Name</span>
              </div>
              
              <div className="flex items-center gap-3 py-2">
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-blue-800">Contact Information</span>
              </div>
              
              <div className="flex items-center gap-3 py-2">
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-blue-800">Store Tagline</span>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-blue-800">Step 4: Store Description</h2>
            
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea 
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Tell customers about your store and what makes it special"
              />
            </div>
            
            <div className="flex justify-between gap-4 mb-6">
              <Button onClick={prevStep} variant="outline" className="w-1/2">
                Back
              </Button>
              <Button onClick={nextStep} className="w-1/2 btn-primary">
                Finish Setup
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 py-2">
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-blue-800">Store Name</span>
              </div>
              
              <div className="flex items-center gap-3 py-2">
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-blue-800">Contact Information</span>
              </div>
              
              <div className="flex items-center gap-3 py-2">
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-blue-800">Store Tagline</span>
              </div>
              
              <div className="flex items-center gap-3 py-2">
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-blue-800">Store Description</span>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <div className="w-full max-w-xs mx-auto h-2 bg-blue-100 rounded-full overflow-hidden">
                <div className="h-full w-full bg-blue-500 animate-pulse rounded-full"></div>
              </div>
              <p className="text-blue-600 mt-2">Almost there! Click "Finish Setup" to complete registration.</p>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {renderStepContent()}
    </div>
  );
};
