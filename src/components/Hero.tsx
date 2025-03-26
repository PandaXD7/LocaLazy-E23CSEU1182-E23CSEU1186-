
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, TruckIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-950 leading-tight">
            Local Delivery <span className="text-blue-600">Made Simple</span>
          </h1>
          <p className="text-lg text-blue-800/80 max-w-xl">
            Join our network of local couriers and businesses to provide fast, reliable delivery services in your community.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
              <Link to="/store-signup">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-blue-600 text-blue-700 hover:bg-blue-50 rounded-full">
              Learn More
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="tablet-mockup">
            <div className="tablet-screen">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                alt="Local Delivery Pals Dashboard" 
                className="w-full h-full object-cover rounded-md"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-slate-200"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-24 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-12">Trusted by businesses across the community</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70">
          <div className="flex justify-center items-center">
            <TruckIcon className="h-8 w-8 mr-2 text-blue-800" />
            <span className="text-lg font-semibold text-blue-800">QuickShip</span>
          </div>
          <div className="flex justify-center items-center">
            <TruckIcon className="h-8 w-8 mr-2 text-blue-800" />
            <span className="text-lg font-semibold text-blue-800">LocalEats</span>
          </div>
          <div className="flex justify-center items-center">
            <TruckIcon className="h-8 w-8 mr-2 text-blue-800" />
            <span className="text-lg font-semibold text-blue-800">CityGrocers</span>
          </div>
          <div className="flex justify-center items-center">
            <TruckIcon className="h-8 w-8 mr-2 text-blue-800" />
            <span className="text-lg font-semibold text-blue-800">FlashDelivery</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
