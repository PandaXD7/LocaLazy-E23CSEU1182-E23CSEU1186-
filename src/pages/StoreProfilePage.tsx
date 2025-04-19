
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Store, ShoppingBag, Settings, MapPin, Clock, ImagePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import BackButton from '@/components/BackButton';

const StoreProfilePage = () => {
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();
  
  // If no user is logged in or wrong user type, redirect to home
  React.useEffect(() => {
    if (!user || user.type !== 'store') {
      navigate('/');
      toast.error("Please log in as a store owner to access this page");
    }
  }, [user, navigate]);
  
  // Store profile state
  const [storeProfile, setStoreProfile] = useState({
    name: user?.storeName || 'My Store',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    description: user?.description || '',
    openingHours: user?.openingHours || '9:00 AM - 6:00 PM',
    category: user?.category || 'General',
    deliveryFee: user?.deliveryFee || '5.00',
    minimumOrder: user?.minimumOrder || '10.00',
  });
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      // Update user in context
      setUser({
        ...user,
        ...storeProfile
      });
      toast.success("Store profile updated successfully");
    }
  };
  
  if (!user || user.type !== 'store') return null;
  
  return (
    <div className="min-h-screen bg-blue-50/30">
      <Header />
      <div className="container mx-auto px-4 py-10 pt-24">
        <BackButton />
        
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="h-20 w-20 rounded-full bg-localazy-teal/20 flex items-center justify-center mr-4">
              <Store className="h-10 w-10 text-localazy-teal" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-localazy-navy">{storeProfile.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="profile">Store Profile</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Store Information</CardTitle>
                  <CardDescription>Update your store details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Store Name</Label>
                        <Input 
                          id="name" 
                          value={storeProfile.name} 
                          onChange={e => setStoreProfile({...storeProfile, name: e.target.value})} 
                          placeholder="Enter your store name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Store Category</Label>
                        <Input 
                          id="category" 
                          value={storeProfile.category} 
                          onChange={e => setStoreProfile({...storeProfile, category: e.target.value})} 
                          placeholder="e.g. Grocery, Pharmacy, Electronics"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Contact Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={storeProfile.email} 
                          onChange={e => setStoreProfile({...storeProfile, email: e.target.value})} 
                          placeholder="Enter contact email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Contact Phone</Label>
                        <Input 
                          id="phone" 
                          value={storeProfile.phone} 
                          onChange={e => setStoreProfile({...storeProfile, phone: e.target.value})} 
                          placeholder="Enter contact phone number"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Store Address</Label>
                        <Input 
                          id="address" 
                          value={storeProfile.address} 
                          onChange={e => setStoreProfile({...storeProfile, address: e.target.value})} 
                          placeholder="Enter store address"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="description">Store Description</Label>
                        <Textarea 
                          id="description" 
                          value={storeProfile.description} 
                          onChange={e => setStoreProfile({...storeProfile, description: e.target.value})} 
                          placeholder="Enter a brief description of your store"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="openingHours">Opening Hours</Label>
                        <Input 
                          id="openingHours" 
                          value={storeProfile.openingHours} 
                          onChange={e => setStoreProfile({...storeProfile, openingHours: e.target.value})} 
                          placeholder="e.g. 9:00 AM - 6:00 PM"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="storeLogo">Store Logo</Label>
                        <div className="flex items-center space-x-4">
                          <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 border border-dashed border-gray-300">
                            <ImagePlus className="h-6 w-6" />
                          </div>
                          <Button type="button" variant="outline" size="sm">Upload</Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deliveryFee">Delivery Fee ($)</Label>
                        <Input 
                          id="deliveryFee" 
                          value={storeProfile.deliveryFee} 
                          onChange={e => setStoreProfile({...storeProfile, deliveryFee: e.target.value})} 
                          placeholder="Enter delivery fee"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="minimumOrder">Minimum Order ($)</Label>
                        <Input 
                          id="minimumOrder" 
                          value={storeProfile.minimumOrder} 
                          onChange={e => setStoreProfile({...storeProfile, minimumOrder: e.target.value})} 
                          placeholder="Enter minimum order amount"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="bg-localazy-teal">Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>Store Products</CardTitle>
                  <CardDescription>Manage your product catalog</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Products (0)</h3>
                    <Button className="bg-localazy-teal">Add Product</Button>
                  </div>
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">You haven't added any products yet</p>
                    <p className="text-sm text-gray-500 mt-2">Add products to start selling</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order Management</CardTitle>
                  <CardDescription>View and manage customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Recent Orders (0)</h3>
                    <Button variant="outline" className="border-localazy-teal text-localazy-teal">Export</Button>
                  </div>
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">No orders to display</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Store Settings</CardTitle>
                  <CardDescription>Manage your store preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-localazy-teal mr-3" />
                      <span>Store Hours</span>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-localazy-teal mr-3" />
                      <span>Delivery Zones</span>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div className="flex items-center">
                      <Settings className="h-5 w-5 text-localazy-teal mr-3" />
                      <span>Payment Settings</span>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => {
                        toast("Are you sure you want to delete your store account?", {
                          action: {
                            label: "Delete Store",
                            onClick: () => toast.error("Store deletion is not implemented in this demo")
                          },
                        });
                      }}
                    >
                      Delete Store Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StoreProfilePage;
