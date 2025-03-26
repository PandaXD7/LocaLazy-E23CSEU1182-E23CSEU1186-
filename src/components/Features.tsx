
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TruckIcon, PackageIcon, UsersIcon, LineChartIcon } from 'lucide-react';

const Features = () => {
  return (
    <section className="bg-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">How It Works</h2>
          <p className="text-lg text-blue-700/80 max-w-2xl mx-auto">
            Our platform connects local businesses with nearby customers through our network of delivery partners
          </p>
        </div>

        <Tabs defaultValue="businesses" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-blue-100">
            <TabsTrigger value="businesses" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              For Businesses
            </TabsTrigger>
            <TabsTrigger value="couriers" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              For Couriers
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="businesses" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <PackageIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900">Easy Setup</h3>
                      <p className="text-blue-700/80">Create your store profile in minutes and start accepting orders immediately</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <UsersIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900">Local Customers</h3>
                      <p className="text-blue-700/80">Connect with nearby customers looking for your products and services</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <LineChartIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900">Growth Analytics</h3>
                      <p className="text-blue-700/80">Access detailed reports to optimize your delivery operations</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
                  alt="Business Dashboard" 
                  className="w-full h-[300px] object-cover"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="couriers" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <TruckIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900">Flexible Schedule</h3>
                      <p className="text-blue-700/80">Choose when you work and which deliveries you want to accept</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <UsersIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900">Local Routes</h3>
                      <p className="text-blue-700/80">Stay within your community with optimized delivery routes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <LineChartIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900">Earnings Tracker</h3>
                      <p className="text-blue-700/80">Track your earnings and performance metrics in real-time</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
                  alt="Courier App Interface" 
                  className="w-full h-[300px] object-cover"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature-card transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="h-40 mb-4 overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
                alt="Easy Integration" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Easy Integration</h3>
            <p className="text-blue-700/80">Connect with your existing systems without any hassle</p>
          </div>
          
          <div className="feature-card transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="h-40 mb-4 overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" 
                alt="Real-time Tracking" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Real-time Tracking</h3>
            <p className="text-blue-700/80">Monitor deliveries in real-time from pickup to destination</p>
          </div>
          
          <div className="feature-card transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="h-40 mb-4 overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                alt="Smart Notifications" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Smart Notifications</h3>
            <p className="text-blue-700/80">Keep customers informed with automated delivery updates</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
