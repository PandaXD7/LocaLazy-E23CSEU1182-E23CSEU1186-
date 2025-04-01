
import React, { useState } from 'react';
import { Package, Check, MapPin, Phone, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import Header from '@/components/Header';
import { useAppContext } from '@/contexts/AppContext';
import { Order } from '@/contexts/AppContext';

// Sample orders data for delivery partners
const mockOrders: Order[] = [
  {
    id: 'ORD1001',
    total: 599.99,
    status: 'pending',
    shopId: '1',
    shopName: 'Fresh Grocery Store',
    customerAddress: 'Downtown Area, Main Street, City',
    customerName: 'John Smith',
    customerPhone: '9876543210',
    items: [
      {
        id: '101',
        name: 'Fresh Apples',
        price: 120,
        quantity: 2,
        description: 'Fresh and juicy apples, 1kg pack',
        category: 'Fruits',
        shopId: '1'
      },
      {
        id: '102',
        name: 'Organic Bananas',
        price: 60,
        quantity: 1,
        description: 'Organic ripe bananas, 1kg pack',
        category: 'Fruits',
        shopId: '1'
      },
      {
        id: '105',
        name: 'Wheat Bread',
        price: 35,
        quantity: 1,
        description: 'Fresh baked wheat bread',
        category: 'Bakery',
        shopId: '1'
      }
    ]
  },
  {
    id: 'ORD1002',
    total: 275,
    status: 'preparing',
    shopId: '3',
    shopName: 'Sweet Delight Bakery',
    customerAddress: 'North Shopping District, City',
    customerName: 'Emily Johnson',
    customerPhone: '9876543211',
    items: [
      {
        id: '301',
        name: 'Chocolate Cake',
        price: 350,
        quantity: 1,
        description: 'Rich chocolate cake, 500g',
        category: 'Cakes',
        shopId: '3'
      },
    ]
  },
  {
    id: 'ORD1003',
    total: 180,
    status: 'pending',
    shopId: '2',
    shopName: 'MediQuick Pharmacy',
    customerAddress: 'Central Park Avenue, City',
    customerName: 'Michael Brown',
    customerPhone: '9876543212',
    items: [
      {
        id: '202',
        name: 'Hand Sanitizer',
        price: 75,
        quantity: 1,
        description: '500ml bottle, 70% alcohol',
        category: 'Hygiene',
        shopId: '2'
      },
      {
        id: '203',
        name: 'Face Masks',
        price: 120,
        quantity: 1,
        description: 'Disposable 3-ply masks, pack of 10',
        category: 'Hygiene',
        shopId: '2'
      }
    ]
  }
];

const DeliveryOrdersPage = () => {
  const { user, updateOrderStatus } = useAppContext();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [activeTab, setActiveTab] = useState('available');
  const [acceptingOrderId, setAcceptingOrderId] = useState<string | null>(null);
  
  // Filter orders based on active tab
  const availableOrders = orders.filter(order => 
    order.status === 'pending' || order.status === 'preparing'
  );
  
  const myOrders = orders.filter(order => 
    order.status === 'accepted' || 
    order.status === 'out_for_delivery' || 
    order.status === 'delivered'
  );
  
  const handleAcceptOrder = (orderId: string) => {
    setAcceptingOrderId(orderId);
    
    // Simulate API call to accept order
    setTimeout(() => {
      // Update order status
      const orderIndex = orders.findIndex(order => order.id === orderId);
      
      if (orderIndex !== -1) {
        const updatedOrders = [...orders];
        updatedOrders[orderIndex] = {
          ...updatedOrders[orderIndex],
          status: 'accepted',
          deliveryPerson: {
            id: user?.id || '',
            name: user?.name || '',
            gender: user?.gender || '',
            phone: user?.phone || '',
            address: user?.address || '',
            imageUrl: user?.idProof
          }
        };
        
        setOrders(updatedOrders);
        setActiveTab('my-orders');
        
        // Simulate order status update notification to customer and store
        toast.success(`You have accepted order ${orderId}`);
        toast("Customer has been notified that you're on the way", {
          description: "Delivery info has been shared with them"
        });
      }
      
      setAcceptingOrderId(null);
    }, 1500);
  };
  
  const handleStartDelivery = (orderId: string) => {
    // Update order status to out_for_delivery
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
      const updatedOrders = [...orders];
      updatedOrders[orderIndex] = {
        ...updatedOrders[orderIndex],
        status: 'out_for_delivery'
      };
      
      setOrders(updatedOrders);
      
      toast.success(`You've started delivery for order ${orderId}`);
    }
  };
  
  const handleDeliveryComplete = (orderId: string) => {
    // Update order status to delivered
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
      const updatedOrders = [...orders];
      updatedOrders[orderIndex] = {
        ...updatedOrders[orderIndex],
        status: 'delivered'
      };
      
      setOrders(updatedOrders);
      
      toast.success(`Order ${orderId} has been delivered successfully`);
    }
  };
  
  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'preparing':
        return <Badge className="bg-blue-500">Preparing</Badge>;
      case 'accepted':
        return <Badge className="bg-purple-500">Accepted</Badge>;
      case 'out_for_delivery':
        return <Badge className="bg-indigo-500">Out for Delivery</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500">Delivered</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  return (
    <div className="min-h-screen bg-blue-50/50">
      <Header />
      <div className="container mx-auto px-4 py-10 pt-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Delivery Orders</h1>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
              <span className="font-medium">Active for Delivery</span>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full mb-8">
              <TabsTrigger value="available">
                Available Orders ({availableOrders.length})
              </TabsTrigger>
              <TabsTrigger value="my-orders">
                My Orders ({myOrders.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="available">
              {availableOrders.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-md">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-700">No Available Orders</h3>
                  <p className="text-gray-500 mt-2">Check back later for new delivery requests</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {availableOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-bold mb-1">{order.shopName}</h3>
                            <div className="flex items-center text-sm text-gray-600">
                              <Package className="h-4 w-4 mr-1 text-localazy-teal" />
                              <span>Order #{order.id}</span>
                            </div>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        
                        <div className="space-y-3 mb-4">
                          <div className="flex items-start gap-2 text-gray-700">
                            <MapPin className="h-4 w-4 text-gray-600 mt-0.5" />
                            <span>{order.customerAddress}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-700">
                            <User className="h-4 w-4 text-gray-600" />
                            <span>{order.customerName}</span>
                          </div>
                        </div>
                        
                        <div className="border-t border-b py-4 my-4">
                          <h4 className="font-medium mb-2">Order Items:</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            {order.items.map((item, index) => (
                              <li key={index}>
                                {item.name} x{item.quantity}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-600">Order Total:</p>
                            <p className="font-bold text-lg">₹{order.total.toFixed(2)}</p>
                          </div>
                          
                          <Button
                            onClick={() => handleAcceptOrder(order.id)}
                            disabled={!!acceptingOrderId}
                            className="bg-localazy-teal text-white"
                          >
                            {acceptingOrderId === order.id ? "Accepting..." : "Accept Order"}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="my-orders">
              {myOrders.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-md">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-700">No Active Orders</h3>
                  <p className="text-gray-500 mt-2">Accept orders to see them here</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {myOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-bold mb-1">{order.shopName}</h3>
                            <div className="flex items-center text-sm text-gray-600">
                              <Package className="h-4 w-4 mr-1 text-localazy-teal" />
                              <span>Order #{order.id}</span>
                            </div>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        
                        <div className="space-y-3 mb-4">
                          <div className="flex items-start gap-2 text-gray-700">
                            <MapPin className="h-4 w-4 text-gray-600 mt-0.5" />
                            <span>{order.customerAddress}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-700">
                            <User className="h-4 w-4 text-gray-600" />
                            <span>{order.customerName}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-700">
                            <Phone className="h-4 w-4 text-gray-600" />
                            <span>{order.customerPhone}</span>
                          </div>
                        </div>
                        
                        <div className="border-t border-b py-4 my-4">
                          <h4 className="font-medium mb-2">Order Items:</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            {order.items.map((item, index) => (
                              <li key={index}>
                                {item.name} x{item.quantity}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-600">Order Total:</p>
                            <p className="font-bold text-lg">₹{order.total.toFixed(2)}</p>
                          </div>
                          
                          {order.status === 'accepted' && (
                            <Button
                              onClick={() => handleStartDelivery(order.id)}
                              className="bg-localazy-teal text-white"
                            >
                              Start Delivery
                            </Button>
                          )}
                          
                          {order.status === 'out_for_delivery' && (
                            <Button
                              onClick={() => handleDeliveryComplete(order.id)}
                              className="bg-localazy-teal text-white"
                            >
                              Mark as Delivered
                            </Button>
                          )}
                          
                          {order.status === 'delivered' && (
                            <div className="flex items-center text-green-600">
                              <Check className="h-5 w-5 mr-1" />
                              <span>Completed</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOrdersPage;
