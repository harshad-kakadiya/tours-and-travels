import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickBookingWidget = ({ onSearch }) => {
  const [bookingData, setBookingData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    rooms: '1'
  });

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleQuickSearch = (e) => {
    e?.preventDefault();
    
    // Scroll to hotels section
    const hotelsSection = document.getElementById('hotels-section');
    if (hotelsSection) {
      hotelsSection?.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Apply filters/search in parent if provided instead of opening WhatsApp
    if (typeof onSearch === 'function') {
      onSearch({ ...bookingData });
    }
  };

  const popularDestinations = [
    'Goa', 'Kerala', 'Rajasthan', 'Himachal Pradesh', 'Uttarakhand', 'Karnataka'
  ];

  return (
    <div className="bg-gradient-to-br from-primary to-primary/90 rounded-xl p-6 mb-8 text-white">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Zap" size={20} className="text-yellow-300" />
        <h2 className="text-xl font-heading font-semibold">Quick Hotel Search</h2>
      </div>
      <p className="text-primary-foreground/80 mb-6">Find and book your perfect stay in seconds</p>
      <form onSubmit={handleQuickSearch} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Destination */}
          <div className="lg:col-span-2">
            <Input
              label="Where to?"
              type="text"
              placeholder="Enter city or hotel name"
              value={bookingData?.destination}
              onChange={(e) => handleInputChange('destination', e?.target?.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            
            {/* Popular Destinations */}
            <div className="mt-2 flex flex-wrap gap-1">
              {popularDestinations?.slice(0, 3)?.map((dest) => (
                <button
                  key={dest}
                  type="button"
                  onClick={() => handleInputChange('destination', dest)}
                  className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md transition-colors duration-brand-fast"
                >
                  {dest}
                </button>
              ))}
            </div>
          </div>

          {/* Check-in */}
          <div>
            <Input
              label="Check-in"
              type="date"
              value={bookingData?.checkIn}
              onChange={(e) => handleInputChange('checkIn', e?.target?.value)}
              required
              min={new Date()?.toISOString()?.split('T')?.[0]}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          {/* Check-out */}
          <div>
            <Input
              label="Check-out"
              type="date"
              value={bookingData?.checkOut}
              onChange={(e) => handleInputChange('checkOut', e?.target?.value)}
              required
              min={bookingData?.checkIn || new Date()?.toISOString()?.split('T')?.[0]}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          {/* Guests & Rooms */}
          <div className="space-y-2">
            <Input
              label="Guests"
              type="number"
              min="1"
              max="10"
              value={bookingData?.guests}
              onChange={(e) => handleInputChange('guests', e?.target?.value)}
              className="bg-white/10 border-white/20 text-white mb-2"
            />
            <Input
              label="Rooms"
              type="number"
              min="1"
              max="5"
              value={bookingData?.rooms}
              onChange={(e) => handleInputChange('rooms', e?.target?.value)}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center pt-2">
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            iconName="Search"
            iconPosition="left"
            iconSize={18}
            className="px-8 font-semibold"
          >
            Search Hotels
          </Button>
        </div>
      </form>
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">500+</div>
          <div className="text-xs text-primary-foreground/80">Partner Hotels</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">50+</div>
          <div className="text-xs text-primary-foreground/80">Cities Covered</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">24*7</div>
          <div className="text-xs text-primary-foreground/80">Support</div>
        </div>
      </div>
    </div>
  );
};

export default QuickBookingWidget;