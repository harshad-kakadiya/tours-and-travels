import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import api from '../../../utils/api';

const FixedRoutePackages = ({ onBookingClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('city-tours');
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('https://tour-travels-be-h58q.onrender.com/api/taxi-tour');
      const data = response.data;

      // Filter packages with serviceType 'fix_route'
      const fixedRoutePackages = data.filter(pkg => pkg.serviceType === 'fix_route');
      setPackages(fixedRoutePackages);
    } catch (err) {
      console.error('Error fetching packages:', err);
      setError('Failed to load packages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppBooking = (pkg) => {
    const message = encodeURIComponent(
        `Hi! I'm interested in booking the ${pkg.name} package. ` +
        `Route: ${pkg.from} to ${pkg.to}. ` +
        `Price: ₹${pkg.price} (${pkg.wayType}). ` +
        `Please provide more details and booking assistance.`
    );
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  // Function to render features with appropriate icons
  const renderFeature = (feature, index) => {
    // Map common feature keywords to icons
    const getFeatureIcon = (featureText) => {
      const lowerFeature = featureText.toLowerCase();

      if (lowerFeature.includes('ac') || lowerFeature.includes('air conditioning') || lowerFeature.includes('cool')) {
        return { name: 'Snowflake', color: 'text-green-600', bgColor: 'bg-green-100' };
      }
      if (lowerFeature.includes('driver') || lowerFeature.includes('professional') || lowerFeature.includes('chauffeur')) {
        return { name: 'UserCheck', color: 'text-blue-600', bgColor: 'bg-blue-100' };
      }
      if (lowerFeature.includes('24/7') || lowerFeature.includes('24x7') || lowerFeature.includes('available')) {
        return { name: 'Clock', color: 'text-purple-600', bgColor: 'bg-purple-100' };
      }
      if (lowerFeature.includes('wifi') || lowerFeature.includes('wi-fi')) {
        return { name: 'Wifi', color: 'text-orange-600', bgColor: 'bg-orange-100' };
      }
      if (lowerFeature.includes('water') || lowerFeature.includes('bottle')) {
        return { name: 'Droplets', color: 'text-cyan-600', bgColor: 'bg-cyan-100' };
      }
      if (lowerFeature.includes('sightseeing') || lowerFeature.includes('tour')) {
        return { name: 'Map', color: 'text-red-600', bgColor: 'bg-red-100' };
      }
      if (lowerFeature.includes('fuel') || lowerFeature.includes('petrol') || lowerFeature.includes('diesel')) {
        return { name: 'Fuel', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
      }
      if (lowerFeature.includes('toll') || lowerFeature.includes('tax')) {
        return { name: 'Receipt', color: 'text-indigo-600', bgColor: 'bg-indigo-100' };
      }
      if (lowerFeature.includes('parking') || lowerFeature.includes('park')) {
        return { name: 'ParkingCircle', color: 'text-pink-600', bgColor: 'bg-pink-100' };
      }
      // Default icon for other features
      return { name: 'Check', color: 'text-gray-600', bgColor: 'bg-gray-100' };
    };

    const iconConfig = getFeatureIcon(feature);

    return (
        <div key={index} className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-full ${iconConfig.bgColor} flex items-center justify-center flex-shrink-0`}>
            <Icon name={iconConfig.name} size={16} className={iconConfig.color} />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-gray-800">{feature}</p>
          </div>
        </div>
    );
  };

  if (loading) {
    return (
        <div className="space-y-6">
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center space-x-2">
              <div className="animate-spin">
                <Icon name="Loader2" size={24} className="text-primary" />
              </div>
              <span className="text-muted-foreground">Loading packages...</span>
            </div>
          </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="space-y-6">
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <Icon name="AlertCircle" size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Failed to Load Packages</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button
                variant="outline"
                onClick={fetchPackages}
                iconName="RefreshCw"
                iconPosition="left"
            >
              Try Again
            </Button>
          </div>
        </div>
    );
  }

  return (
      <div className="space-y-6">
        {/* Packages Grid */}
        {packages.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Icon name="Package" size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No Packages Available</h3>
              <p className="text-muted-foreground">No fixed route packages are currently available.</p>
            </div>
        ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {packages?.map((pkg) => (
                  <div
                      key={pkg?._id}
                      className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white mb-8"
                  >
                    {/* Header with From & To */}
                    <div className="bg-primary text-white p-4 text-center">
                      <h3 className="text-lg font-medium flex items-center justify-center gap-2">
                        {pkg?.from} <Icon name="ArrowRight" size={16} /> {pkg?.to}
                      </h3>
                    </div>
                    <div className="p-4 text-center border-b">
                      <p className="text-2xl font-bold text-gray-800">from ₹ {pkg?.price}</p>
                    </div>

                    {/* Way Type */}
                    <div className="p-3 text-center ">
                      <p className="text-gray-700 font-medium">OneWay Trip</p>
                    </div>

                    {/* Image */}
                    <div className="h-48 overflow-hidden">
                      <Image
                          src={pkg?.image}
                          alt={pkg?.name}
                          className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Features Section - Show only first 3 features */}
                    <div className="p-4 border-t border-b">
                      <div className="space-y-3">
                        {pkg?.feactures && pkg.feactures.length > 0 ? (
                            pkg.feactures.slice(0, 3).map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <Icon name="Check" size={16} className="text-green-500" />
                                  <span className="text-gray-700">{feature}</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-2">
                              <p className="text-sm text-muted-foreground">No features listed</p>
                            </div>
                        )}
                      </div>
                    </div>

                    {/* Book Now Button */}
                    <div className="p-4 text-center">
                      <button
                          onClick={() => handleWhatsAppBooking(pkg)}
                          className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
                      >
                        Book Now On Whatsapp
                      </button>
                    </div>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default FixedRoutePackages;