
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  HelpCircle, MessageCircle, FileQuestion, Phone, Mail, AlertCircle, 
  CheckCircle, MoveRight 
} from 'lucide-react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const HelpPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-blue-50/50">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                <HelpCircle className="h-8 w-8 text-blue-700" />
              </div>
              <h1 className="text-4xl font-bold text-blue-800 mb-2">How Can We Help?</h1>
              <p className="text-lg text-gray-600">Find answers to common questions or contact our support team</p>
            </div>
            
            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
              <h2 className="text-2xl font-semibold flex items-center mb-6 text-blue-700">
                <FileQuestion className="mr-2 h-6 w-6" />
                Frequently Asked Questions
              </h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I place an order?</AccordionTrigger>
                  <AccordionContent>
                    To place an order, first sign up or log in to your account. Then, set your location, 
                    browse nearby shops, select products you want, add them to your cart, and proceed to checkout. 
                    You can then track your order until delivery.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>How can I become a delivery partner?</AccordionTrigger>
                  <AccordionContent>
                    You can sign up as a delivery partner through our app or website. You'll need to 
                    provide personal details, valid identification, and complete a brief verification process. 
                    Once approved, you can start accepting delivery assignments.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>How do I register my store on LocaLazy?</AccordionTrigger>
                  <AccordionContent>
                    Store owners can register by selecting the "Business" option during signup. You'll need 
                    to provide store details, location, contact information, and a catalog of your products. 
                    Our team will verify your information before activating your store profile.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                  <AccordionContent>
                    We accept various payment methods including credit/debit cards, UPI, digital wallets, 
                    and cash on delivery. You can save your preferred payment method for faster checkout 
                    in the future.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>How long does delivery usually take?</AccordionTrigger>
                  <AccordionContent>
                    Delivery times typically range from 30-60 minutes depending on your location, the store's 
                    location, and current demand. You can track your delivery in real-time through the app 
                    once your order is confirmed.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            {/* Contact Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
              <h2 className="text-2xl font-semibold flex items-center mb-6 text-blue-700">
                <MessageCircle className="mr-2 h-6 w-6" />
                Contact Support
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <Phone className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                      <p className="text-gray-700">+91 1234567890</p>
                      <p className="text-sm text-gray-500">Available 9 AM - 9 PM, 7 days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <Mail className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email Support</h3>
                      <p className="text-gray-700">support@localazy.com</p>
                      <p className="text-sm text-gray-500">We respond within 24 hours</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Send Us a Message</h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                    
                    <Button type="submit" className="w-full bg-localazy-teal hover:bg-localazy-teal/90">
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
            
            {/* Quick Help Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-green-50 p-6 rounded-xl border border-green-100 hover:border-green-200 transition-colors">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-lg">Shipping Policy</h3>
                </div>
                <p className="text-gray-600 mb-3">Learn about our delivery areas, timing, and charges.</p>
                <Button variant="link" className="p-0 h-auto text-green-700 flex items-center">
                  View Details <MoveRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 hover:border-orange-200 transition-colors">
                <div className="flex items-center mb-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
                  <h3 className="font-semibold text-lg">Refund & Returns</h3>
                </div>
                <p className="text-gray-600 mb-3">Understand our policies regarding refunds and returns.</p>
                <Button variant="link" className="p-0 h-auto text-orange-700 flex items-center">
                  View Details <MoveRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpPage;
