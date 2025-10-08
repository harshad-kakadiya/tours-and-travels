import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import api from '../../../utils/api';

const PerKmCalculator = ({ onBookingClick }) => {
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

      // Filter packages with serviceType 'per_km'
      const perKmPackages = data.filter(pkg => pkg.serviceType === 'per_km');
      setPackages(perKmPackages);
    } catch (err) {
      console.error('Error fetching packages:', err);
      setError('Failed to load packages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppBooking = (pkg) => {
    const message = encodeURIComponent(
        `Hi! I'm interested in booking the ${pkg.name} per-km service. ` +
        `Rate: ₹${pkg.perKmPrice} per km. ` +
        `Features: ${pkg.feactures?.join(', ')}. ` +
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

        {/* Packages Grid */}
        {packages.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Icon name="Package" size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No Packages Available</h3>
              <p className="text-muted-foreground">No per-km packages are currently available.</p>
            </div>
        ) : (
            <div className="grid md:grid-cols-4 gap-6">
              {packages?.map((pkg) => (
                  <div key={pkg?._id} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white">
                    {/* Car Name Header */}
                    <div className="bg-primary text-white p-4 text-center">
                      <h3 className="text-lg font-medium">{pkg?.name}</h3>
                    </div>

                    {/* Car Image */}
                    <div className="h-48 overflow-hidden">
                      <Image
                          src={pkg?.image}
                          alt={pkg?.name}
                          className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Per KM Price */}
                    <div className="p-4 text-center border-b">
                      <p className="text-2xl font-bold text-gray-800">From ₹ {pkg?.perKmPrice} / KM</p>
                    </div>
                    <div className="p-3 text-center ">
                      <p className="text-gray-700 font-medium">Round Trip</p>
                    </div>

                    {/* Features */}
                    <div className="p-4 space-y-2">
                      {pkg?.feactures?.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Icon name="Check" size={16} className="text-green-500" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                      ))}
                    </div>

                    {/* Book Now Button */}
                    <div className="p-4 text-center">
                      <button
                          onClick={() => handleWhatsAppBooking(pkg)}
                          className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                      >
                        <Icon name="MessageCircle" size={16} />
                        Book on WhatsApp
                      </button>
                    </div>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default PerKmCalculator;