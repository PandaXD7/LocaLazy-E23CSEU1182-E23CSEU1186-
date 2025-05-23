import React, { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StoreSetupProps {
  onComplete: (storeData: any) => void;
}

export const StoreSetup = ({ onComplete }: StoreSetupProps) => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState({
    storeName: '',
    email: '',
    contact: '',
    tagline: '',
    description: '',
    businessType: '',
    phone: '',
    address: '',
    openingHours: '9:00 AM - 6:00 PM',
    category: 'General'
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      onComplete(formData);
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
              <h2 className="text-2xl font-bold mb-4 text-localazy-navy">Welcome to Store Setup</h2>
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
            <h2 className="text-2xl font-bold mb-6 text-localazy-navy">Step 1: Store Information</h2>
            
            <div className="mb-6">
              <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">
                Store Name
              </label>
              <input 
                id="storeName"
                name="storeName"
                value={formData.storeName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-localazy-teal/50"
                placeholder="Enter your store name"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
                Business Type
              </label>
              <Select
                value={formData.businessType}
                onValueChange={(value) => handleSelectChange('businessType', value)}
              >
                <SelectTrigger className="w-full px-4 py-2 h-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-localazy-teal/50">
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grocery">Grocery Store</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing & Apparel</SelectItem>
                  <SelectItem value="homegoods">Home Goods</SelectItem>
                  <SelectItem value="stationery">Books & Stationery</SelectItem>
                  <SelectItem value="bakery">Bakery</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
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
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="checklist-item">
                <div className="h-6 w-6 rounded-full bg-localazy-teal/20 flex items-center justify-center text-localazy-teal">
                  <Check className="h-4 w-4" />
                </div>
                <span>Store Name & Type</span>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-localazy-navy">Step 2: Contact Information</h2>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email (For customers)
              </label>
              <input 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-localazy-teal/50"
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-localazy-teal/50"
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
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="checklist-item">
                <div className="h-6 w-6 rounded-full bg-localazy-teal/20 flex items-center justify-center text-localazy-teal">
                  <Check className="h-4 w-4" />
                </div>
                <span>Store Name & Type</span>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="checklist-item">
                <div className="h-6 w-6 rounded-full bg-localazy-teal/20 flex items-center justify-center text-localazy-teal">
                  <Check className="h-4 w-4" />
                </div>
                <span>Contact Information</span>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-localazy-navy">Step 3: Store Tagline</h2>
            
            <div className="mb-6">
              <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-1">
                Tagline
              </label>
              <input 
                id="tagline"
                name="tagline"
                value={formData.tagline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-localazy-teal/50"
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
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="checklist-item">
                <div className="h-6 w-6 rounded-full bg-localazy-teal/20 flex items-center justify-center text-localazy-teal">
                  <Check className="h-4 w-4" />
                </div>
                <span>Store Name & Type</span>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="checklist-item">
                <div className="h-6 w-6 rounded-full bg-localazy-teal/20 flex items-center justify-center text-localazy-teal">
                  <Check className="h-4 w-4" />
                </div>
                <span>Contact Information</span>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="checklist-item">
                <div className="h-6 w-6 rounded-full bg-localazy-teal/20 flex items-center justify-center text-localazy-teal">
                  <Check className="h-4 w-4" />
                </div>
                <span>Store Tagline</span>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-localazy-navy">Step 4: Store Description</h2>
            
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-localazy-teal/50"
                placeholder="Tell customers about your store and what makes it special"
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
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="checklist-item">
                <div className="h-6 w-6 rounded-full bg-localazy-teal/20 flex items-center justify-center text-localazy-teal">
                  <Check className="h-4 w-4" />
                </div>
                <span>Store Name & Type</span>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="checklist-item">
                <div className="h-6 w-6 rounded-full bg-localazy-teal/20 flex items-center justify-center text-localazy-teal">
                  <Check className="h-4 w-4" />
                </div>
                <span>Contact Information</span>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="checklist-item">
                <div className="h-6 w-6 rounded-full bg-localazy-teal/20 flex items-center justify-center text-localazy-teal">
                  <Check className="h-4 w-4" />
                </div>
                <span>Store Tagline</span>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="checklist-item">
                <div className="h-6 w-6 rounded-full bg-localazy-teal/20 flex items-center justify-center text-localazy-teal">
                  <Check className="h-4 w-4" />
                </div>
                <span>Store Description</span>
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-localazy-navy">Step 5: Store Image</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Store Image (Optional)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
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
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="checklist-item">
                <div className="h-6 w-6 rounded-full bg-localazy-teal/20 flex items-center justify-center text-localazy-teal">
                  <Check className="h-4 w-4" />
                </div>
                <span>Store Name & Type</span>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="checklist-item">
                <div className="h-6 w-6 rounded-full bg-localazy-teal/20 flex items-center justify-center text-localazy-teal">
                  <Check className="h-4 w-4" />
                </div>
                <span>Contact Information</span>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="checklist-item">
                <div className="h-6 w-6 rounded-full bg-localazy-teal/20 flex items-center justify-center text-localazy-teal">
                  <Check className="h-4 w-4" />
                </div>
                <span>Store Tagline</span>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="checklist-item">
                <div className="h-6 w-6 rounded-full bg-localazy-teal/20 flex items-center justify-center text-localazy-teal">
                  <Check className="h-4 w-4" />
                </div>
                <span>Store Description</span>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="checklist-item">
                <div className="h-6 w-6 rounded-full bg-localazy-teal/20 flex items-center justify-center text-localazy-teal">
                  <Check className="h-4 w-4" />
                </div>
                <span>Store Image</span>
              </div>
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
