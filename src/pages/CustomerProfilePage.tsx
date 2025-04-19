
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, MapPin, ShoppingBag, CreditCard, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import BackButton from '@/components/BackButton';

const CustomerProfilePage = () => {
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();
  
  // If no user is logged in or wrong user type, redirect to home
  React.useEffect(() => {
    if (!user || user.type !== 'customer') {
      navigate('/');
      toast.error("Please log in as a customer to access this page");
    }
  }, [user, navigate]);
  
  // User profile state
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      // Update user in context
      setUser({
        ...user,
        ...profile
      });
      toast.success("Profile updated successfully");
    }
  };
  
  if (!user || user.type !== 'customer') return null;
  
  return (
    <div className="min-h-screen bg-blue-50/30">
      <Header />
      <div className="container mx-auto px-4 py-10 pt-24">
        <BackButton />
        
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="h-20 w-20 rounded-full bg-localazy-teal/20 flex items-center justify-center mr-4">
              <User className="h-10 w-10 text-localazy-teal" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-localazy-navy">{user.name || 'Customer Profile'}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={profile.name} 
                          onChange={e => setProfile({...profile, name: e.target.value})} 
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={profile.email} 
                          onChange={e => setProfile({...profile, email: e.target.value})} 
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          value={profile.phone} 
                          onChange={e => setProfile({...profile, phone: e.target.value})} 
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Default Address</Label>
                        <Input 
                          id="address" 
                          value={profile.address} 
                          onChange={e => setProfile({...profile, address: e.target.value})} 
                          placeholder="Enter your address"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="bg-localazy-teal">Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View your past orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">You don't have any orders yet</p>
                    <Button 
                      variant="outline" 
                      className="mt-4 border-localazy-teal text-localazy-teal"
                      onClick={() => navigate('/stores')}
                    >
                      Browse Stores
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                  <CardDescription>Manage your delivery addresses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">No addresses saved</p>
                    <Button 
                      variant="outline" 
                      className="mt-4 border-localazy-teal text-localazy-teal"
                      onClick={() => navigate('/location')}
                    >
                      Add Address
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div className="flex items-center">
                      <Bell className="h-5 w-5 text-localazy-teal mr-3" />
                      <span>Notifications</span>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-localazy-teal mr-3" />
                      <span>Payment Methods</span>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => {
                        toast("Are you sure you want to delete your account?", {
                          action: {
                            label: "Delete Account",
                            onClick: () => toast.error("Account deletion is not implemented in this demo")
                          },
                        });
                      }}
                    >
                      Delete Account
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

export default CustomerProfilePage;
