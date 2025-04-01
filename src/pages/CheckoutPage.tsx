
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, MapPin, Phone, User, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import Header from '@/components/Header';
import { useAppContext } from '@/contexts/AppContext';

const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(5, "Complete address is required"),
  paymentMethod: z.enum(["cash", "card", "upi"])
});

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, createOrder, currentLocation, user } = useAppContext();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      address: currentLocation || "",
      paymentMethod: "cash"
    }
  });
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;
  
  const onSubmit = (data: z.infer<typeof checkoutSchema>) => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing and order creation
    setTimeout(() => {
      const orderId = createOrder();
      
      setIsProcessing(false);
      
      toast.success("Order placed successfully!");
      toast.success("Payment was successful!");
      
      // Show success and redirect
      navigate('/');
      
      // Display a toast with delivery status after a delay
      setTimeout(() => {
        toast("Your order has been accepted by the store", {
          icon: <Check className="h-4 w-4 text-green-500" />,
        });
      }, 3000);
    }, 2000);
  };
  
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="min-h-screen bg-blue-50/50">
      <Header />
      <div className="container mx-auto px-4 py-10 pt-20">
        <div className="max-w-2xl mx-auto">
          {/* Back button */}
          <Link to="/cart" className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to cart
          </Link>
          
          <div className="grid md:grid-cols-5 gap-6">
            {/* Checkout form */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6">Checkout</h1>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Delivery details */}
                    <div>
                      <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-localazy-teal" />
                        Delivery Details
                      </h2>
                      
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                  <Input placeholder="Your full name" className="pl-10" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                  <Input placeholder="Your phone number" className="pl-10" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Delivery Address</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                  <Input placeholder="Your complete address" className="pl-10" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/* Payment method */}
                    <div>
                      <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <CreditCard className="h-5 w-5 mr-2 text-localazy-teal" />
                        Payment Method
                      </h2>
                      
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup 
                                value={field.value} 
                                onValueChange={field.onChange}
                                className="flex flex-col gap-3"
                              >
                                <div className="flex items-center space-x-2 border p-3 rounded-md">
                                  <RadioGroupItem value="cash" id="cash" />
                                  <label htmlFor="cash" className="cursor-pointer flex-1">Cash on Delivery</label>
                                </div>
                                
                                <div className="flex items-center space-x-2 border p-3 rounded-md">
                                  <RadioGroupItem value="card" id="card" />
                                  <label htmlFor="card" className="cursor-pointer flex-1">Credit / Debit Card</label>
                                </div>
                                
                                <div className="flex items-center space-x-2 border p-3 rounded-md">
                                  <RadioGroupItem value="upi" id="upi" />
                                  <label htmlFor="upi" className="cursor-pointer flex-1">UPI Payment</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Place order button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-localazy-teal text-white py-6 text-lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Place Order"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="font-bold text-lg mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-500 block">x{item.quantity}</span>
                      </div>
                      <div className="font-medium">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>₹{deliveryFee.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
