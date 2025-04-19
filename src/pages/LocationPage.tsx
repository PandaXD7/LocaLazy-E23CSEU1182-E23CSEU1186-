
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Navigation } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAppContext } from '@/contexts/AppContext';
import Header from '@/components/Header';

const LocationPage = () => {
  const navigate = useNavigate();
  const { setCurrentLocation } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  
  const mockLocations = [
    'Downtown Area, Main Street, City',
    'North Shopping District, City',
    'Central Park Avenue, City', 
    'Business Bay, 5th Block, City',
    'University Campus, City'
  ];
  
  const [filteredLocations, setFilteredLocations] = useState(mockLocations);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredLocations(mockLocations);
    } else {
      setFilteredLocations(
        mockLocations.filter(location => 
          location.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };
  
  const selectLocation = (location: string) => {
    setCurrentLocation(location);
    toast.success("Location set successfully!");
    navigate('/stores');
  };
  
  const detectLocation = () => {
    setIsDetecting(true);
    
    // Simulate geolocation API request
    setTimeout(() => {
      const detectedLocation = 'Detected: City Center, Main Street';
      setIsDetecting(false);
      selectLocation(detectedLocation);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-blue-50/50">
      <Header />
      <div className="container mx-auto px-4 py-10 pt-20">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h1 className="text-2xl font-bold mb-4">Set Your Location</h1>
            <p className="text-gray-600 mb-6">
              Help us find shops and stores near you
            </p>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Search for your location..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
            
            <Button 
              onClick={detectLocation} 
              variant="outline"
              className="w-full mb-6 flex items-center justify-center gap-2"
              disabled={isDetecting}
            >
              <Navigation className="h-4 w-4" />
              {isDetecting ? "Detecting..." : "Use current location"}
            </Button>
            
            <div className="space-y-3">
              {filteredLocations.map((location, index) => (
                <Card 
                  key={index} 
                  className="hover:bg-blue-50 cursor-pointer transition-colors"
                  onClick={() => selectLocation(location)}
                >
                  <CardContent className="p-4 flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-localazy-teal mt-0.5" />
                    <div>
                      <p className="font-medium">{location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredLocations.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  No locations found. Try a different search.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
