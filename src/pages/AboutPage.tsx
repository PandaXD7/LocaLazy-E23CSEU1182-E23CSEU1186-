
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Store, Truck, User, Clock, Shield, ThumbsUp } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-blue-50/50">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">About LocaLazy</h1>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Our Mission</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                LocaLazy was founded with a simple yet powerful mission: to connect local communities 
                with their neighborhood stores and businesses while providing convenient delivery 
                options for customers. We believe that supporting local businesses is essential for 
                vibrant and sustainable communities.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="flex flex-col items-center p-6 bg-blue-50 rounded-xl">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-center">For Customers</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Browse local stores, order products, and get them delivered to your doorstep quickly and conveniently.
                  </p>
                </div>
                
                <div className="flex flex-col items-center p-6 bg-green-50 rounded-xl">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Store className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-center">For Stores</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Expand your customer base, manage orders efficiently, and boost your business with our digital platform.
                  </p>
                </div>
                
                <div className="flex flex-col items-center p-6 bg-purple-50 rounded-xl">
                  <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Truck className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-center">For Delivery Partners</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Earn flexible income by joining our network of delivery partners serving the local community.
                  </p>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    <Clock className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Quick & Convenient</h3>
                    <p className="text-sm text-gray-600">
                      We're committed to fast deliveries and an easy-to-use platform.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    <Shield className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Trust & Safety</h3>
                    <p className="text-sm text-gray-600">
                      We prioritize security, quality, and reliability in all our services.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    <ThumbsUp className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Community Support</h3>
                    <p className="text-sm text-gray-600">
                      We're dedicated to helping local businesses thrive in the digital age.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-700 text-white rounded-2xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Join the LocaLazy Community Today!</h2>
              <p className="mb-6">
                Whether you're a customer looking for convenience, a store owner seeking to grow your business, 
                or someone looking for flexible delivery opportunities, we welcome you to our community.
              </p>
              <div className="inline-block bg-white text-blue-700 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors cursor-pointer">
                Sign Up Now
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
