
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import { useAppContext } from '@/contexts/AppContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useAppContext();
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;
  
  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate('/checkout');
  };
  
  return (
    <div className="min-h-screen bg-blue-50/50">
      <Header />
      <div className="container mx-auto px-4 py-10 pt-20">
        <div className="max-w-2xl mx-auto">
          {/* Back button */}
          <Link to="/shops" className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continue shopping
          </Link>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            
            {cart.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-6">Your cart is empty</p>
                <Link to="/shops">
                  <Button className="bg-localazy-teal text-white">
                    Browse Shops
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {/* Cart items */}
                <div className="space-y-4 mb-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center pb-4 border-b">
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">₹{item.price} per item</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        
                        <span className="w-8 text-center">{item.quantity}</span>
                        
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="w-20 text-right font-medium">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Order summary */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>₹{deliveryFee.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Checkout button */}
                <Button 
                  className="w-full bg-localazy-teal text-white"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
