
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreSetup } from '@/components/StoreSetup';
import { toast } from 'sonner';

const StoreSignup = () => {
  const [setupComplete, setSetupComplete] = useState(false);
  const navigate = useNavigate();
  
  const handleSetupComplete = () => {
    setSetupComplete(true);
    
    // Show success message
    toast.success('Store setup complete!', {
      description: 'Your store has been successfully registered.',
      duration: 5000,
    });
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          {setupComplete ? (
            <div className="text-center py-16 animate-fade-in">
              <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-8">
                <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-localazy-navy">Setup Complete!</h2>
              <p className="text-gray-600 mb-8">
                Your store has been successfully registered with LocaLazy. 
                You'll be redirected to the dashboard shortly.
              </p>
              <div className="w-full max-w-xs mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-localazy-teal animate-pulse rounded-full"></div>
              </div>
            </div>
          ) : (
            <StoreSetup onComplete={handleSetupComplete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreSignup;
