
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, MapPin, Clock, Star, ShoppingBag, ArrowLeft, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Header from '@/components/Header';
import { useAppContext } from '@/contexts/AppContext';
import { Shop, ShopItem } from '@/contexts/AppContext';

// Sample shop items data
const mockShopsData: Record<string, Shop> = {
  '1': {
    id: '1',
    name: 'Fresh Grocery Store',
    description: 'Your local grocery store with fresh produce and daily essentials',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    deliveryTime: '25-30 min',
    distance: '1.2 km',
    items: [
      { id: '101', name: 'Fresh Apples', price: 120, description: 'Fresh and juicy apples, 1kg pack', category: 'Fruits' },
      { id: '102', name: 'Organic Bananas', price: 60, description: 'Organic ripe bananas, 1kg pack', category: 'Fruits' },
      { id: '103', name: 'Milk', price: 55, description: 'Fresh cow milk, 1 liter', category: 'Dairy' },
      { id: '104', name: 'Eggs', price: 85, description: 'Farm fresh eggs, pack of 12', category: 'Dairy' },
      { id: '105', name: 'Wheat Bread', price: 35, description: 'Fresh baked wheat bread', category: 'Bakery' }
    ]
  },
  '2': {
    id: '2',
    name: 'Quick Mart',
    description: 'Convenience store with all daily necessities',
    imageUrl: 'https://images.unsplash.com/photo-1604719312566-8912e9c8a213?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.3,
    deliveryTime: '20-25 min',
    distance: '1.5 km',
    items: [
      { id: '201', name: 'Toilet Paper', price: 95, description: 'Pack of 6 rolls', category: 'Household' },
      { id: '202', name: 'Dish Soap', price: 65, description: '500ml bottle', category: 'Cleaning' },
      { id: '203', name: 'Laundry Detergent', price: 220, description: '1kg box, for all washing machines', category: 'Cleaning' },
      { id: '204', name: 'Batteries', price: 120, description: 'AA batteries, pack of 8', category: 'Electronics' }
    ]
  },
  '3': {
    id: '3',
    name: 'Sweet Delight Bakery',
    description: 'Fresh baked goods delivered to your doorstep',
    imageUrl: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    deliveryTime: '30-40 min',
    distance: '2.0 km',
    items: [
      { id: '301', name: 'Chocolate Cake', price: 350, description: 'Rich chocolate cake, 500g', category: 'Cakes' },
      { id: '302', name: 'Croissants', price: 80, description: 'Butter croissants, pack of 4', category: 'Pastries' },
      { id: '303', name: 'Whole Wheat Bread', price: 45, description: 'Healthy whole wheat bread loaf', category: 'Bread' },
      { id: '304', name: 'Cookies', price: 120, description: 'Assorted cookies, pack of 12', category: 'Biscuits' }
    ]
  },
  '4': {
    id: '4',
    name: 'Fashion Forward',
    description: 'Trendy clothes and accessories from local boutiques',
    imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    deliveryTime: '35-45 min',
    distance: '2.5 km',
    items: [
      { id: '401', name: 'Cotton T-shirt', price: 499, description: 'Comfortable cotton t-shirt, available in multiple colors', category: 'Clothing' },
      { id: '402', name: 'Denim Jeans', price: 1299, description: 'Classic denim jeans, slim fit', category: 'Clothing' },
      { id: '403', name: 'Leather Belt', price: 599, description: 'Genuine leather belt with metal buckle', category: 'Accessories' },
      { id: '404', name: 'Canvas Shoes', price: 899, description: 'Casual canvas shoes, perfect for everyday wear', category: 'Footwear' }
    ]
  }
};

const ShopDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, cart } = useAppContext();
  const [shop, setShop] = useState<Shop | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<ShopItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (id && mockShopsData[id]) {
      const shopData = mockShopsData[id];
      setShop(shopData);
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(shopData.items.map(item => item.category)));
      setCategories(uniqueCategories);
      
      // Initially show all items
      setFilteredItems(shopData.items);
    }
  }, [id]);

  useEffect(() => {
    if (shop) {
      let items = shop.items;
      
      // Filter by search query
      if (searchQuery) {
        items = items.filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Filter by category
      if (selectedCategory !== 'all') {
        items = items.filter(item => item.category === selectedCategory);
      }
      
      setFilteredItems(items);
    }
  }, [searchQuery, selectedCategory, shop]);

  const handleAddToCart = (item: ShopItem) => {
    if (shop) {
      addToCart(item, shop.id);
      toast.success(`Added ${item.name} to cart`);
    }
  };

  if (!shop) {
    return (
      <div className="min-h-screen bg-blue-50/50 flex items-center justify-center">
        <p>Loading shop details...</p>
      </div>
    );
  }

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-blue-50/50">
      <Header />
      <div className="container mx-auto px-4 py-10 pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link to="/shops" className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to shops
          </Link>
          
          {/* Shop header */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="h-40 relative">
              <img 
                src={shop.imageUrl} 
                alt={shop.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-6 text-white">
                <h1 className="text-2xl font-bold">{shop.name}</h1>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap justify-between items-center mb-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-medium">{shop.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-localazy-teal" />
                    {shop.deliveryTime}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-localazy-teal" />
                    {shop.distance}
                  </div>
                </div>
                
                {cartItemCount > 0 && (
                  <Link to="/cart">
                    <Button variant="outline" className="flex items-center gap-2 border-localazy-teal text-localazy-teal">
                      <ShoppingBag className="h-4 w-4" />
                      View Cart ({cartItemCount})
                    </Button>
                  </Link>
                )}
              </div>
              
              <p className="text-gray-700">{shop.description}</p>
            </div>
          </div>
          
          {/* Search and filter */}
          <div className="mb-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Search items..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge 
                className={`cursor-pointer ${selectedCategory === 'all' ? 'bg-localazy-teal' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Badge>
              
              {categories.map(category => (
                <Badge 
                  key={category}
                  className={`cursor-pointer ${selectedCategory === category ? 'bg-localazy-teal' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Items list */}
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-4 flex justify-between">
                <div>
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  <p className="font-bold">₹{item.price}</p>
                </div>
                <div className="flex items-center">
                  <Button 
                    size="sm" 
                    onClick={() => handleAddToCart(item)}
                    className="bg-localazy-teal text-white"
                  >
                    <Plus className="h-4 w-4 mr-1" /> 
                    Add
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredItems.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500">No items found. Try a different search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetailPage;
