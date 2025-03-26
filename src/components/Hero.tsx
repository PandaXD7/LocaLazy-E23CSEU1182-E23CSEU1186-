
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="pt-20 pb-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-blue-800">
              Your Neighborhood, <span className="text-blue-500">Delivered</span>
            </h1>
            <p className="text-lg text-blue-700/80 mb-8 max-w-lg">
              LocaLazy connects you with local stores within a 7-8km radius, bringing you fast delivery, 
              quality products, and the satisfaction of supporting your local businesses.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button className="bg-white text-blue-800 border border-blue-800/20 px-5 py-2.5 rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative w-full max-w-md lg:max-w-lg aspect-[9/16] rounded-[2rem] bg-gradient-to-b from-blue-900 to-blue-950 p-3 shadow-xl border-[14px] border-gray-800">
              {/* Power Button */}
              <div className="absolute right-[-7px] top-12 h-2 w-6 bg-gray-700 rounded-l-sm"></div>
              {/* Volume Buttons */}
              <div className="absolute left-[-7px] top-10 h-6 w-2 bg-gray-700 rounded-r-sm"></div>
              <div className="absolute left-[-7px] top-20 h-6 w-2 bg-gray-700 rounded-r-sm"></div>
              
              {/* Screen */}
              <div className="h-full w-full rounded-[1.25rem] overflow-hidden border border-gray-700 relative">
                <img 
                  src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2215&q=80" 
                  alt="LocaLazy App Interface" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                
                {/* Screen Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
                
                {/* Camera Notch */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-1/4 h-6 bg-black rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mr-1"></div>
                  <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-20 text-center container mx-auto px-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-800">
          <span className="text-blue-500">Local</span> Service. <span className="text-blue-600">Lazy</span> Convenience.
        </h2>
        <p className="text-lg text-blue-700/80 max-w-2xl mx-auto">
          Experience the best of both worlds - the quality of local shopping with the convenience of online delivery.
        </p>
      </div>
    </section>
  );
};

export default Hero;
