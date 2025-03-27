import React, { useState } from 'react';
import { Search, Plus, Check, X, ShoppingCart, LineChart, Circle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import { toast } from 'sonner';

// Sample store data (in a real app, this would come from backend)
const initialStoreData = {
  name: 'My Amazing Store',
  tagline: 'The best products in town!',
  description: 'We offer high-quality products at affordable prices.',
  businessType: 'grocery'
};

// Sample product data structure
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  imageUrl?: string;
}

// Sample order data structure
interface Order {
  id: string;
  customerName: string;
  products: { productId: string, quantity: number }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  orderDate: Date;
}

// Sample initial products
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Coffee',
    price: 249.99,
    category: 'Beverages',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '2',
    name: 'Organic Tea',
    price: 149.99,
    category: 'Beverages',
    inStock: true
  },
  {
    id: '3',
    name: 'Fresh Bread',
    price: 35.99,
    category: 'Bakery',
    inStock: false
  }
];

// Sample initial orders
const initialOrders: Order[] = [
  {
    id: 'ORD001',
    customerName: 'Rahul Sharma',
    products: [{ productId: '1', quantity: 2 }],
    totalAmount: 499.98,
    status: 'pending',
    orderDate: new Date(2023, 5, 12)
  },
  {
    id: 'ORD002',
    customerName: 'Priya Patel',
    products: [{ productId: '2', quantity: 1 }, { productId: '3', quantity: 3 }],
    totalAmount: 257.96,
    status: 'processing',
    orderDate: new Date(2023, 5, 13)
  },
  {
    id: 'ORD003',
    customerName: 'Amit Kumar',
    products: [{ productId: '1', quantity: 1 }],
    totalAmount: 249.99,
    status: 'out_for_delivery',
    orderDate: new Date(2023, 5, 14)
  },
  {
    id: 'ORD004',
    customerName: 'Neha Singh',
    products: [{ productId: '3', quantity: 2 }],
    totalAmount: 71.98,
    status: 'delivered',
    orderDate: new Date(2023, 5, 10)
  }
];

// Sales data for charts
const salesData = {
  daily: [
    { date: '14 Jun', sales: 2800 },
    { date: '15 Jun', sales: 3200 },
    { date: '16 Jun', sales: 2700 },
    { date: '17 Jun', sales: 4500 },
    { date: '18 Jun', sales: 3800 },
    { date: '19 Jun', sales: 2900 },
    { date: '20 Jun', sales: 3300 }
  ],
  weekly: [
    { date: 'Week 1', sales: 18000 },
    { date: 'Week 2', sales: 22000 },
    { date: 'Week 3', sales: 19500 },
    { date: 'Week 4', sales: 26000 }
  ],
  monthly: [
    { date: 'Jan', sales: 76000 },
    { date: 'Feb', sales: 82000 },
    { date: 'Mar', sales: 89000 },
    { date: 'Apr', sales: 94000 },
    { date: 'May', sales: 102000 },
    { date: 'Jun', sales: 91000 }
  ]
};

const StoreDashboard = () => {
  const [storeData] = useState(initialStoreData);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [view, setView] = useState<'overview' | 'add' | 'manage' | 'orders' | 'sales'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [salesPeriod, setSalesPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    category: '',
    inStock: true,
    imageUrl: ''
  });
  
  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter orders based on search query
  const filteredOrders = orders.filter(order => 
    order.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(orderSearchQuery.toLowerCase())
  );
  
  // Handle checkbox selection
  const handleSelect = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
  
  // Handle "Select All" functionality
  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(product => product.id));
    }
  };
  
  // Handle product deletion
  const handleDeleteSelected = () => {
    setProducts(prev => prev.filter(product => !selectedProducts.includes(product.id)));
    setSelectedProducts([]);
    toast.success('Products deleted successfully');
  };
  
  // Handle new product input changes
  const handleNewProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setNewProduct(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };
  
  // Toggle stock status
  const toggleStockStatus = (productId: string) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, inStock: !product.inStock }
          : product
      )
    );
    
    // Get the product name
    const productName = products.find(p => p.id === productId)?.name;
    const newStatus = !products.find(p => p.id === productId)?.inStock;
    
    toast.success(`${productName} is now ${newStatus ? 'in stock' : 'out of stock'}`);
  };
  
  // Add new product
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || newProduct.price <= 0) {
      toast.error('Please fill all required fields');
      return;
    }
    
    const newId = (products.length + 1).toString();
    
    setProducts(prev => [
      ...prev,
      { ...newProduct, id: newId }
    ]);
    
    // Reset form
    setNewProduct({
      name: '',
      price: 0,
      category: '',
      inStock: true,
      imageUrl: ''
    });
    
    toast.success('Product added successfully');
  };
  
  // Toggle new product's stock status
  const toggleNewProductStock = () => {
    setNewProduct(prev => ({
      ...prev,
      inStock: !prev.inStock
    }));
  };
  
  // Update order status
  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      )
    );
    
    const statusMessages = {
      'pending': 'marked as pending',
      'processing': 'being processed',
      'out_for_delivery': 'out for delivery',
      'delivered': 'delivered',
      'cancelled': 'cancelled'
    };
    
    toast.success(`Order ${orderId} is now ${statusMessages[newStatus]}`);
  };
  
  // Get status badge color
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get order product details
  const getOrderProductDetails = (order: Order) => {
    return order.products.map(item => {
      const product = products.find(p => p.id === item.productId);
      return `${product?.name || 'Unknown Product'} (x${item.quantity})`;
    }).join(', ');
  };
  
  return (
    <div className="min-h-screen bg-blue-50/50">
      <Header />
      <div className="container mx-auto px-4 py-10 pt-20">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          {/* Store header section */}
          <div className="text-center mb-8 pb-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-blue-800">{storeData.name}</h1>
            <p className="text-xl text-gray-600 my-2">{storeData.tagline}</p>
            <p className="text-gray-500 max-w-2xl mx-auto">{storeData.description}</p>
            <p className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {storeData.businessType.charAt(0).toUpperCase() + storeData.businessType.slice(1)}
            </p>
          </div>
          
          {/* Navigation tabs */}
          <div className="mb-8">
            <ToggleGroup 
              type="single" 
              value={view} 
              onValueChange={(value) => value && setView(value as 'overview' | 'add' | 'manage' | 'orders' | 'sales')}
              className="justify-start border-b border-gray-200 pb-2"
              variant="outline"
            >
              <ToggleGroupItem value="overview" className="rounded-t-md data-[state=on]:bg-gray-100">
                Store Overview
              </ToggleGroupItem>
              <ToggleGroupItem value="add" className="rounded-t-md data-[state=on]:bg-gray-100">
                Add Products
              </ToggleGroupItem>
              <ToggleGroupItem value="manage" className="rounded-t-md data-[state=on]:bg-gray-100">
                Manage Products
              </ToggleGroupItem>
              <ToggleGroupItem value="orders" className="rounded-t-md data-[state=on]:bg-gray-100">
                Orders
              </ToggleGroupItem>
              <ToggleGroupItem value="sales" className="rounded-t-md data-[state=on]:bg-gray-100">
                Sales Summary
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          {/* Content based on selected view */}
          {view === 'overview' && (
            <div className="py-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Store Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Total Products</h3>
                  <p className="text-3xl font-bold text-blue-700">{products.length}</p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">In Stock</h3>
                  <p className="text-3xl font-bold text-green-700">
                    {products.filter(p => p.inStock).length}
                  </p>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Out of Stock</h3>
                  <p className="text-3xl font-bold text-orange-700">
                    {products.filter(p => !p.inStock).length}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-purple-50 p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Total Orders</h3>
                  <p className="text-3xl font-bold text-purple-700">{orders.length}</p>
                </div>
                
                <div className="bg-teal-50 p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Pending Orders</h3>
                  <p className="text-3xl font-bold text-teal-700">
                    {orders.filter(o => o.status === 'pending' || o.status === 'processing').length}
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  onClick={() => setView('add')}
                  className="mr-4"
                >
                  <Plus className="mr-1" /> 
                  Add New Products
                </Button>
                
                <Button 
                  onClick={() => setView('manage')}
                  variant="outline"
                  className="mr-4"
                >
                  Manage Inventory
                </Button>
                
                <Button 
                  onClick={() => setView('orders')}
                  variant="outline"
                >
                  <ShoppingCart className="mr-1 h-4 w-4" />
                  View Orders
                </Button>
              </div>
            </div>
          )}
          
          {view === 'add' && (
            <div className="py-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Product</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={newProduct.name}
                    onChange={handleNewProductChange}
                    placeholder="Enter product name"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <Input
                    id="category"
                    name="category"
                    value={newProduct.category}
                    onChange={handleNewProductChange}
                    placeholder="Enter product category"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹)
                  </label>
                  <Input
                    id="price"
                    name="price"
                    value={newProduct.price || ''}
                    onChange={handleNewProductChange}
                    placeholder="Enter price"
                    type="number"
                    step="0.01"
                    min="0"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Image URL (Optional)
                  </label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    value={newProduct.imageUrl}
                    onChange={handleNewProductChange}
                    placeholder="Enter image URL"
                    className="w-full"
                  />
                </div>
                
                <div className="flex items-center">
                  <label htmlFor="inStock" className="mr-4 text-sm font-medium text-gray-700">
                    Stock Status:
                  </label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="inStock"
                      checked={newProduct.inStock}
                      onCheckedChange={toggleNewProductStock}
                    />
                    <span>{newProduct.inStock ? 'In Stock' : 'Out of Stock'}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  onClick={handleAddProduct}
                  className="mr-4"
                >
                  <Plus className="mr-1" /> 
                  Add Product
                </Button>
                
                <Button 
                  onClick={() => setView('overview')}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          {view === 'manage' && (
            <div className="py-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Manage Products</h2>
              
              <div className="flex justify-between items-center mb-6">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAll}
                  >
                    {selectedProducts.length === filteredProducts.length 
                      ? 'Unselect All' 
                      : 'Select All'}
                  </Button>
                  
                  {selectedProducts.length > 0 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleDeleteSelected}
                    >
                      <X className="mr-1 h-4 w-4" /> 
                      Delete Selected
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Image</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedProducts.includes(product.id)}
                            onCheckedChange={() => handleSelect(product.id)}
                          />
                        </TableCell>
                        <TableCell>
                          {product.imageUrl ? (
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="w-10 h-10 object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                              <span className="text-xs text-gray-500">No img</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>₹{product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.inStock 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            <Switch
                              checked={product.inStock}
                              onCheckedChange={() => toggleStockStatus(product.id)}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {filteredProducts.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No products found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          
          {view === 'orders' && (
            <div className="py-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Manage Orders</h2>
              
              <div className="flex justify-between items-center mb-6">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search orders by ID or customer name..."
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell className="max-w-xs truncate" title={getOrderProductDetails(order)}>
                          {getOrderProductDetails(order)}
                        </TableCell>
                        <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                        <TableCell>{order.orderDate.toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                            className="p-1 border rounded text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="out_for_delivery">Out for Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {filteredOrders.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No orders found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          
          {view === 'sales' && (
            <div className="py-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Sales Summary</h2>
              
              <div className="mb-6">
                <Tabs defaultValue="daily">
                  <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="daily" onClick={() => setSalesPeriod('daily')}>Daily</TabsTrigger>
                    <TabsTrigger value="weekly" onClick={() => setSalesPeriod('weekly')}>Weekly</TabsTrigger>
                    <TabsTrigger value="monthly" onClick={() => setSalesPeriod('monthly')}>Monthly</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="p-6 border rounded-lg mb-8">
                <h3 className="text-lg font-semibold mb-4">
                  {salesPeriod === 'daily' && 'Daily Sales (Last 7 Days)'}
                  {salesPeriod === 'weekly' && 'Weekly Sales (Last 4 Weeks)'}
                  {salesPeriod === 'monthly' && 'Monthly Sales (Last 6 Months)'}
                </h3>
                
                <div className="h-64 flex items-end space-x-2">
                  {salesData[salesPeriod].map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-blue-500 rounded-t-md hover:bg-blue-600 transition-colors cursor-pointer relative group"
                        style={{ 
                          height: `${(item.sales / Math.max(...salesData[salesPeriod].map(d => d.sales))) * 200}px` 
                        }}
                      >
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                          ₹{item.sales.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-xs mt-2 text-gray-600">{item.date}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">
                    {salesPeriod === 'daily' && 'Today\'s Sales'}
                    {salesPeriod === 'weekly' && 'This Week\'s Sales'}
                    {salesPeriod === 'monthly' && 'This Month\'s Sales'}
                  </h3>
                  <p className="text-3xl font-bold text-green-700">
                    ₹{salesData[salesPeriod][salesData[salesPeriod].length - 1].sales.toLocaleString()}
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Total Orders</h3>
                  <p className="text-3xl font-bold text-blue-700">{orders.length}</p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Average Order Value</h3>
                  <p className="text-3xl font-bold text-purple-700">
                    ₹{(orders.reduce((sum, order) => sum + order.totalAmount, 0) / (orders.length || 1)).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreDashboard;
