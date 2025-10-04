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

  const categories = [
    { id: 'city-tours', name: 'City Tours', icon: 'Building2' },
    { id: 'airport-transfers', name: 'Airport Transfers', icon: 'Plane' },
    { id: 'inter-city', name: 'Inter-city', icon: 'MapPin' }
  ];

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
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
              <button
                  key={category?.id}
                  onClick={() => setSelectedCategory(category?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === category?.id
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
              >
                <Icon name={category?.icon} size={16} />
                <span>{category?.name}</span>
              </button>
          ))}
        </div>

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
        <div className="grid md:grid-cols-2 gap-6">
              {packages?.map((pkg) => (
            <div key={pkg?._id} className="relative rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300">
              {/* Background Image */}
              <div className="relative h-80">
                    {/* Image */}
                    <div className="h-80 overflow-hidden">
                      <img 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src={pkg?.image}
                        alt={pkg?.name}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Route Type - Top Left */}
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {pkg?.wayType === 'oneway' ? 'One Way' : 'Round Trip'}
                </div>

                {/* Package Title - Large White Text */}
                <div className="absolute bottom-20 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {pkg?.name}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {pkg?.from} to {pkg?.to}
                  </p>
                </div>

                {/* Pricing - Bottom Left */}
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-white">
                      ₹{pkg?.price}
                    </span>
                  </div>
                </div>

                {/* Book Now Button - Bottom Right */}
                <div className="absolute bottom-6 right-6">
                  <button 
                    onClick={() => handleWhatsAppBooking(pkg)}
                    className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
  );
};

export default FixedRoutePackages;
