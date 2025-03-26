
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="pt-32 pb-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-localazy-navy">
              Your Neighborhood, <span className="text-localazy-teal">Delivered</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              LocaLazy connects you with local stores within a 7-8km radius, bringing you fast delivery, 
              quality products, and the satisfaction of supporting your local businesses.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="btn-primary">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button className="btn-secondary">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="tablet-mockup w-full max-w-md lg:max-w-lg">
              <div className="tablet-screen">
                <img 
                  src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2215&q=80" 
                  alt="LocaLazy App Interface" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-localazy-navy/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-20 text-center container mx-auto px-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-localazy-navy">
          <span className="text-localazy-coral">Local</span> Service. <span className="text-localazy-teal">Lazy</span> Convenience.
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience the best of both worlds - the quality of local shopping with the convenience of online delivery.
        </p>
      </div>
    </section>
  );
};

export default Hero;
