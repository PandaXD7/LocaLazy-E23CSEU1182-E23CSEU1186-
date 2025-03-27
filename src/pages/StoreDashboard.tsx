
import React, { useState } from 'react';
import { Search, Plus, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import Header from '@/components/Header';

// Sample store data (in a real app, this would come from backend)
const initialStoreData = {
  name: 'My Amazing Store',
  tagline: 'The best products in town!',
  description: 'We offer high-quality products at affordable prices.'
};

// Sample product data structure
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

// Sample initial products
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Coffee',
    price: 12.99,
    category: 'Beverages',
    inStock: true
  },
  {
    id: '2',
    name: 'Organic Tea',
    price: 8.99,
    category: 'Beverages',
    inStock: true
  },
  {
    id: '3',
    name: 'Fresh Bread',
    price: 4.99,
    category: 'Bakery',
    inStock: false
  }
];

const StoreDashboard = () => {
  const [storeData] = useState(initialStoreData);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [view, setView] = useState<'overview' | 'add' | 'manage'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    category: '',
    inStock: true
  });
  
  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
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
  };
  
  // Add new product
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || newProduct.price <= 0) {
      return; // Basic validation
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
      inStock: true
    });
  };
  
  // Toggle new product's stock status
  const toggleNewProductStock = () => {
    setNewProduct(prev => ({
      ...prev,
      inStock: !prev.inStock
    }));
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
          </div>
          
          {/* Navigation tabs */}
          <div className="mb-8">
            <ToggleGroup 
              type="single" 
              value={view} 
              onValueChange={(value) => value && setView(value as 'overview' | 'add' | 'manage')}
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
            </ToggleGroup>
          </div>
          
          {/* Content based on selected view */}
          {view === 'overview' && (
            <div className="py-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Store Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                >
                  Manage Inventory
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
                    Price ($)
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
                
                <div className="flex items-center pt-7">
                  <div 
                    onClick={toggleNewProductStock}
                    className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors ${newProduct.inStock ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${newProduct.inStock ? 'left-7' : 'left-1'}`}></div>
                  </div>
                  <span className="ml-3">
                    {newProduct.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
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
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
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
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleStockStatus(product.id)}
                          >
                            {product.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {filteredProducts.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No products found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreDashboard;
