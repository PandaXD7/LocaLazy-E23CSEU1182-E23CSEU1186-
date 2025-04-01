
import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  category: string;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  items: ShopItem[];
}

export interface CartItem extends ShopItem {
  quantity: number;
  shopId: string;
}

export interface DeliveryPerson {
  id: string;
  name: string;
  gender: string;
  phone: string;
  address: string;
  imageUrl?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'accepted' | 'preparing' | 'out_for_delivery' | 'delivered';
  deliveryPerson?: DeliveryPerson;
  shopId: string;
  shopName: string;
  customerAddress: string;
  customerName: string;
  customerPhone: string;
}

interface AppContextType {
  currentLocation: string;
  setCurrentLocation: (location: string) => void;
  user: any | null;
  setUser: (user: any | null) => void;
  cart: CartItem[];
  addToCart: (item: ShopItem, shopId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  createOrder: () => string;
  updateOrderStatus: (orderId: string, status: Order['status'], deliveryPerson?: DeliveryPerson) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentLocation, setCurrentLocation] = useState('Set your location');
  const [user, setUser] = useState<any | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (item: ShopItem, shopId: string) => {
    setCart(prevCart => {
      // Check if cart has items from a different shop
      const existingShopId = prevCart.length > 0 ? prevCart[0].shopId : null;
      
      if (existingShopId && existingShopId !== shopId) {
        // Replace cart with the new item from different shop
        return [{...item, quantity: 1, shopId}];
      }
      
      // Check if item already exists in cart
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // Increase quantity if item already exists
        return prevCart.map(cartItem => 
          cartItem.id === item.id 
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
      }
      
      // Add new item to cart
      return [...prevCart, {...item, quantity: 1, shopId}];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId ? {...item, quantity} : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = () => {
    if (cart.length === 0) return '';
    
    const shopId = cart[0].shopId;
    const mockShops: Record<string, {name: string}> = {
      '1': { name: 'Grocery Store' },
      '2': { name: 'Pharmacy' },
      '3': { name: 'Bakery' }
    };
    
    const newOrder: Order = {
      id: `ORD${Math.floor(Math.random() * 10000)}`,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'pending',
      shopId,
      shopName: mockShops[shopId]?.name || 'Store',
      customerAddress: currentLocation,
      customerName: user?.name || 'Guest',
      customerPhone: user?.phone || '000-000-0000'
    };
    
    setOrders(prev => [...prev, newOrder]);
    clearCart();
    
    return newOrder.id;
  };

  const updateOrderStatus = (orderId: string, status: Order['status'], deliveryPerson?: DeliveryPerson) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? {...order, status, ...(deliveryPerson && {deliveryPerson})}
          : order
      )
    );
  };

  const value = {
    currentLocation,
    setCurrentLocation,
    user,
    setUser,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    orders,
    createOrder,
    updateOrderStatus
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
