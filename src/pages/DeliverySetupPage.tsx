import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Check, X, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { useAppContext } from '@/contexts/AppContext';

const setupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(5, "Complete address is required")
});

const DeliverySetupPage = () => {
  const navigate = useNavigate();
  const { setUser, user } = useAppContext();
  
  const [idUpload, setIdUpload] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof setupSchema>>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      name: user?.name || "",
      gender: "male",
      phone: user?.phone || "",
      address: ""
    }
  });
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate file upload with FileReader for preview
    const reader = new FileReader();
    reader.onload = () => {
      setIdUpload(reader.result as string);
      setIsUploading(false);
      toast.success("ID uploaded successfully");
    };
    reader.readAsDataURL(file);
  };
  
  const onSubmit = (data: z.infer<typeof setupSchema>) => {
    if (!idUpload) {
      toast.error("Please upload a valid ID proof");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call for profile setup
    setTimeout(() => {
      setUser({
        ...user,
        ...data,
        idProof: idUpload,
        isProfileComplete: true
      });
      
      setIsSubmitting(false);
      toast.success("Profile setup completed!");
      navigate("/delivery/orders");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-blue-50/50 relative">
      <Header />
      <BackButton />
      <div className="container mx-auto px-4 py-10 pt-20">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-center mb-8">
            Delivery Partner Profile Setup
          </h1>
          
          <div className="mb-8">
            <div className="relative rounded-full h-32 w-32 mx-auto bg-gray-100 flex items-center justify-center overflow-hidden">
              {user?.name ? (
                <span className="text-4xl font-semibold text-gray-500">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <span className="text-4xl font-semibold text-gray-500">D</span>
              )}
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complete Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Your complete address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <FormLabel>Government ID Proof</FormLabel>
                <div className="mt-2">
                  {!idUpload ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <input
                        type="file"
                        id="id-proof"
                        className="hidden"
                        onChange={handleFileUpload}
                        accept="image/*"
                      />
                      <label
                        htmlFor="id-proof"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <span className="text-sm font-medium">
                          {isUploading ? "Uploading..." : "Click to upload ID proof"}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          Aadhaar, PAN, Driving License, etc.
                        </span>
                      </label>
                    </div>
                  ) : (
                    <div className="relative border rounded-lg overflow-hidden">
                      <img 
                        src={idUpload} 
                        alt="ID Proof" 
                        className="w-full h-40 object-contain bg-gray-100" 
                      />
                      <button
                        type="button"
                        onClick={() => setIdUpload(null)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1"
                      >
                        <X className="h-5 w-5 text-red-500" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-localazy-teal text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Setting up..." : "Complete Setup"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default DeliverySetupPage;
