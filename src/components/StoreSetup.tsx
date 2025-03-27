
import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StoreSetupProps {
  onComplete: () => void;
}

export const StoreSetup = ({ onComplete }: StoreSetupProps) => {
  const [step, setStep] = useState<number>(0);
  const [catPosition, setCatPosition] = useState<'start' | 'end'>('start');
  const [formData, setFormData] = useState({
    storeName: '',
    email: '',
    contact: '',
    tagline: '',
    description: ''
  });
  
  const catRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (step === 4) {
      setTimeout(() => {
        setCatPosition('end');
      }, 500);
    }
  }, [step]);
  
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
            <div 
              className="cat-container cursor-pointer mb-10 relative mx-auto"
              onClick={nextStep}
            >
              <div className="blackboard max-w-md mx-auto shadow-xl relative mb-4">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-20 bg-slate-700"></div>
                <h3 className="text-2xl font-bold mb-3">Hi!! I'm Meko</h3>
                <p className="text-white/80">
                  I'll help you to setup your store on LocaLazy! Click on this board to continue.
                </p>
                <div className="absolute -right-12 -bottom-6 transform -rotate-12 w-10 h-10">
                  <span className="block h-3 w-3 rounded-full bg-slate-400"></span>
                </div>
                <div className="absolute -left-12 -bottom-6 transform rotate-12 w-10 h-10">
                  <span className="block h-3 w-3 rounded-full bg-slate-400"></span>
                </div>
              </div>
              
              <div className="w-32 h-32 relative mx-auto">
                <img 
                  src="https://cdn.dribbble.com/users/212646/screenshots/17006517/media/b39a108d0dd2ba0e1bafc30895e0a48e.png?resize=1600x1200&vertical=center" 
                  alt="Meko the Cat" 
                  className="w-full object-contain"
                />
                <div className="cat-wave absolute top-[40%] right-[20%] w-10 h-8 origin-bottom-right">
                  <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 15C1 15 5 5 15 5C25 5 29 15 29 15" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
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
                <span>Store Name</span>
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
                <span>Store Name</span>
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
                <span>Store Name</span>
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
                <span>Store Name</span>
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
            
            {catPosition === 'end' && (
              <div 
                ref={catRef}
                className="cat-container mt-8 text-center animate-cat-run"
              >
                <div className="blackboard max-w-md mx-auto shadow-xl relative mb-4">
                  <h3 className="text-2xl font-bold mb-3">Yay!!</h3>
                  <p className="text-white/80">
                    You are close to your destination!
                  </p>
                </div>
                
                <div className="w-32 h-32 relative mx-auto">
                  <img 
                    src="https://cdn.dribbble.com/users/212646/screenshots/17006517/media/b39a108d0dd2ba0e1bafc30895e0a48e.png?resize=1600x1200&vertical=center" 
                    alt="Meko the Cat" 
                    className="w-full object-contain"
                  />
                </div>
              </div>
            )}
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
