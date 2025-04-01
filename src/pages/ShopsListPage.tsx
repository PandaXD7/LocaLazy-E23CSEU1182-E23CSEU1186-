
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Clock, Star, ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { useAppContext } from '@/contexts/AppContext';

// Sample shop data
const mockShops = [
  {
    id: '1',
    name: 'Fresh Grocery Store',
    description: 'Your local grocery store with fresh produce and daily essentials',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    rating: 4.7,
    deliveryTime: '25-30 min',
    distance: '1.2 km'
  },
  {
    id: '2',
    name: 'Quick Mart',
    description: 'Convenience store with all daily necessities',
    imageUrl: 'https://images.unsplash.com/photo-1604719312566-8912e9c8a213?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    rating: 4.3,
    deliveryTime: '20-25 min',
    distance: '1.5 km'
  },
  {
    id: '3',
    name: 'Sweet Delight Bakery',
    description: 'Fresh baked goods delivered to your doorstep',
    imageUrl: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
    deliveryTime: '30-40 min',
    distance: '2.0 km'
  },
  {
    id: '4',
    name: 'Fashion Forward',
    description: 'Trendy clothes and accessories from local boutiques',
    imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    rating: 4.6,
    deliveryTime: '35-45 min',
    distance: '2.5 km'
  }
];

const ShopsListPage = () => {
  const navigate = useNavigate();
  const { currentLocation } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredShops = mockShops.filter(shop => 
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleShopSelect = (shopId: string) => {
    navigate(`/shop/${shopId}`);
  };
  
  return (
    <div className="min-h-screen bg-blue-50/50">
      <Header />
      <div className="container mx-auto px-4 py-10 pt-20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="h-5 w-5 text-localazy-teal" />
            <h2 className="font-medium">
              Delivering to: <span className="text-localazy-teal">{currentLocation}</span>
            </h2>
          </div>
          
          <div className="relative mb-8">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search shops and stores..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <h1 className="text-2xl font-bold mb-6">Shops Near You</h1>
          
          <div className="space-y-6">
            {filteredShops.map((shop) => (
              <div 
                key={shop.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-48 md:h-auto relative">
                    <img 
                      src={shop.imageUrl} 
                      alt={shop.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{shop.name}</h3>
                      <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{shop.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{shop.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-localazy-teal" />
                        {shop.deliveryTime}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-localazy-teal" />
                        {shop.distance}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleShopSelect(shop.id)}
                      className="bg-localazy-teal text-white"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Order Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredShops.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No shops found. Try a different search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopsListPage;
