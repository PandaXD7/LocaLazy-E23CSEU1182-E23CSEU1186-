
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Truck, Clock, Settings, Wallet, MapPin, ImagePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import BackButton from '@/components/BackButton';

const DeliveryProfilePage = () => {
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();
  
  // If no user is logged in or wrong user type, redirect to home
  React.useEffect(() => {
    if (!user || user.type !== 'delivery') {
      navigate('/');
      toast.error("Please log in as a delivery partner to access this page");
    }
  }, [user, navigate]);
  
  // Delivery profile state
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    vehicleType: user?.vehicleType || 'Bicycle',
    vehicleModel: user?.vehicleModel || '',
    licensePlate: user?.licensePlate || '',
    workingHours: user?.workingHours || 'Flexible',
    workingArea: user?.workingArea || '',
    bankDetails: user?.bankDetails || '',
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
  
  if (!user || user.type !== 'delivery') return null;
  
  return (
    <div className="min-h-screen bg-blue-50/30">
      <Header />
      <div className="container mx-auto px-4 py-10 pt-24">
        <BackButton />
        
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="h-20 w-20 rounded-full bg-localazy-teal/20 flex items-center justify-center mr-4">
              <Truck className="h-10 w-10 text-localazy-teal" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-localazy-navy">{user.name || 'Delivery Profile'}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your delivery partner details</CardDescription>
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
                        <Label htmlFor="profilePhoto">Profile Photo</Label>
                        <div className="flex items-center space-x-4">
                          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-dashed border-gray-300">
                            <ImagePlus className="h-6 w-6" />
                          </div>
                          <Button type="button" variant="outline" size="sm">Upload</Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vehicleType">Vehicle Type</Label>
                        <Input 
                          id="vehicleType" 
                          value={profile.vehicleType} 
                          onChange={e => setProfile({...profile, vehicleType: e.target.value})} 
                          placeholder="e.g. Bicycle, Motorcycle, Car"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vehicleModel">Vehicle Model</Label>
                        <Input 
                          id="vehicleModel" 
                          value={profile.vehicleModel} 
                          onChange={e => setProfile({...profile, vehicleModel: e.target.value})} 
                          placeholder="Enter vehicle model"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="licensePlate">License Plate</Label>
                        <Input 
                          id="licensePlate" 
                          value={profile.licensePlate} 
                          onChange={e => setProfile({...profile, licensePlate: e.target.value})} 
                          placeholder="Enter license plate number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="workingHours">Working Hours</Label>
                        <Input 
                          id="workingHours" 
                          value={profile.workingHours} 
                          onChange={e => setProfile({...profile, workingHours: e.target.value})} 
                          placeholder="e.g. Weekdays 9-5, Weekends, Flexible"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="workingArea">Preferred Working Area</Label>
                        <Input 
                          id="workingArea" 
                          value={profile.workingArea} 
                          onChange={e => setProfile({...profile, workingArea: e.target.value})} 
                          placeholder="Enter neighborhoods or areas you prefer to work in"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bankDetails">Bank Details</Label>
                        <Input 
                          id="bankDetails" 
                          value={profile.bankDetails} 
                          onChange={e => setProfile({...profile, bankDetails: e.target.value})} 
                          placeholder="Enter your bank account details for payments"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="bg-localazy-teal">Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="deliveries">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery History</CardTitle>
                  <CardDescription>View your past and upcoming deliveries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Recent Deliveries (0)</h3>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/delivery/orders')}
                      className="border-localazy-teal text-localazy-teal"
                    >
                      View All Orders
                    </Button>
                  </div>
                  <div className="text-center py-8">
                    <Truck className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">No delivery history yet</p>
                    <Button 
                      variant="outline" 
                      className="mt-4 border-localazy-teal text-localazy-teal"
                      onClick={() => navigate('/delivery/orders')}
                    >
                      Find Deliveries
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="earnings">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings & Payments</CardTitle>
                  <CardDescription>Track your earnings and payment history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="bg-localazy-teal/10">
                      <CardContent className="pt-6">
                        <p className="text-sm text-gray-600">Current Balance</p>
                        <h3 className="text-2xl font-bold text-localazy-teal">$0.00</h3>
                      </CardContent>
                    </Card>
                    <Card className="bg-localazy-navy/10">
                      <CardContent className="pt-6">
                        <p className="text-sm text-gray-600">This Week</p>
                        <h3 className="text-2xl font-bold text-localazy-navy">$0.00</h3>
                      </CardContent>
                    </Card>
                    <Card className="bg-localazy-coral/10">
                      <CardContent className="pt-6">
                        <p className="text-sm text-gray-600">Total Earned</p>
                        <h3 className="text-2xl font-bold text-localazy-coral">$0.00</h3>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="text-center py-8">
                    <Wallet className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">No earnings history yet</p>
                    <p className="text-sm text-gray-500 mt-2">Complete deliveries to start earning</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your delivery account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-localazy-teal mr-3" />
                      <span>Availability Hours</span>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-localazy-teal mr-3" />
                      <span>Service Areas</span>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div className="flex items-center">
                      <Settings className="h-5 w-5 text-localazy-teal mr-3" />
                      <span>Notification Settings</span>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => {
                        toast("Are you sure you want to delete your delivery partner account?", {
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

export default DeliveryProfilePage;
