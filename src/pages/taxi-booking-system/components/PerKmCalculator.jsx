import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PerKmCalculator = ({ onBookingClick }) => {
  const [formData, setFormData] = useState({
    pickup: '',
    destination: '',
    vehicleType: '',
    tripType: 'one-way',
    date: '',
    time: ''
  });
  const [calculation, setCalculation] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const vehicleTypes = [
    { value: 'hatchback', label: 'Hatchback', rate: 12, description: '4 Seater • AC • Fuel Efficient' },
    { value: 'sedan', label: 'Sedan', rate: 15, description: '4 Seater • AC • Comfortable' },
    { value: 'suv', label: 'SUV', rate: 20, description: '6-7 Seater • AC • Spacious' },
    { value: 'luxury', label: 'Luxury', rate: 35, description: 'Premium • AC • High-end' }
  ];

  const tripTypes = [
    { value: 'one-way', label: 'One Way' },
    { value: 'round-trip', label: 'Round Trip' },
    { value: 'hourly', label: 'Hourly Rental' }
  ];

  const popularRoutes = [
    { from: 'Delhi Airport', to: 'Connaught Place', distance: 18 },
    { from: 'Mumbai Central', to: 'Bandra', distance: 12 },
    { from: 'Bangalore Airport', to: 'MG Road', distance: 35 },
    { from: 'Chennai Airport', to: 'T Nagar', distance: 22 }
  ];

  useEffect(() => {
    if (formData?.pickup && formData?.destination && formData?.vehicleType) {
      calculateFare();
    }
  }, [formData?.pickup, formData?.destination, formData?.vehicleType, formData?.tripType]);

  const calculateFare = () => {
    setIsCalculating(true);
    
    // Simulate API call
    setTimeout(() => {
      const selectedVehicle = vehicleTypes?.find(v => v?.value === formData?.vehicleType);
      const baseDistance = Math.floor(Math.random() * 50) + 10; // Random distance between 10-60 km
      const baseFare = baseDistance * selectedVehicle?.rate;
      const driverAllowance = formData?.tripType === 'hourly' ? 500 : 200;
      const tollCharges = baseDistance > 30 ? 150 : 0;
      const taxes = Math.round((baseFare + driverAllowance + tollCharges) * 0.05);
      
      const multiplier = formData?.tripType === 'round-trip' ? 1.8 : 1;
      const total = Math.round((baseFare + driverAllowance + tollCharges + taxes) * multiplier);

      setCalculation({
        distance: baseDistance,
        baseFare,
        driverAllowance,
        tollCharges,
        taxes,
        total,
        estimatedTime: Math.round(baseDistance * 1.5) + ' mins',
        vehicleDetails: selectedVehicle
      });
      setIsCalculating(false);
    }, 1500);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuickRoute = (route) => {
    setFormData(prev => ({
      ...prev,
      pickup: route?.from,
      destination: route?.to
    }));
  };

  return (
    <div className="space-y-6">
      {/* Quick Routes */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Popular Routes</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {popularRoutes?.map((route, index) => (
            <button
              key={index}
              onClick={() => handleQuickRoute(route)}
              className="p-3 bg-card border border-border rounded-lg text-left hover:border-primary/30 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-foreground">{route?.from}</div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="ArrowRight" size={12} />
                    <span>{route?.to}</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  ~{route?.distance} km
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Booking Form */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Calculate Your Fare</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Pickup Location"
            type="text"
            placeholder="Enter pickup location"
            value={formData?.pickup}
            onChange={(e) => handleInputChange('pickup', e?.target?.value)}
            required
          />
          
          <Input
            label="Destination"
            type="text"
            placeholder="Enter destination"
            value={formData?.destination}
            onChange={(e) => handleInputChange('destination', e?.target?.value)}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Select
            label="Vehicle Type"
            placeholder="Select vehicle"
            options={vehicleTypes}
            value={formData?.vehicleType}
            onChange={(value) => handleInputChange('vehicleType', value)}
            required
          />
          
          <Select
            label="Trip Type"
            options={tripTypes}
            value={formData?.tripType}
            onChange={(value) => handleInputChange('tripType', value)}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Input
            label="Travel Date"
            type="date"
            value={formData?.date}
            onChange={(e) => handleInputChange('date', e?.target?.value)}
            min={new Date()?.toISOString()?.split('T')?.[0]}
            required
          />
          
          <Input
            label="Travel Time"
            type="time"
            value={formData?.time}
            onChange={(e) => handleInputChange('time', e?.target?.value)}
            required
          />
        </div>

        {/* Calculation Results */}
        {isCalculating && (
          <div className="bg-muted/50 p-4 rounded-lg mb-4">
            <div className="flex items-center space-x-2">
              <div className="animate-spin">
                <Icon name="Loader2" size={16} className="text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Calculating best fare...</span>
            </div>
          </div>
        )}

        {calculation && !isCalculating && (
          <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg mb-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">Fare Breakdown</h4>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">₹{calculation?.total}</div>
                <div className="text-xs text-muted-foreground">{calculation?.estimatedTime}</div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Distance ({calculation?.distance} km)</span>
                <span className="text-foreground">₹{calculation?.baseFare}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Driver Allowance</span>
                <span className="text-foreground">₹{calculation?.driverAllowance}</span>
              </div>
              {calculation?.tollCharges > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Toll Charges</span>
                  <span className="text-foreground">₹{calculation?.tollCharges}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes (5%)</span>
                <span className="text-foreground">₹{calculation?.taxes}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-semibold">
                <span className="text-foreground">Total Amount</span>
                <span className="text-primary">₹{calculation?.total}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-accent/10 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Info" size={16} className="text-accent" />
                <span className="text-sm font-medium text-foreground">What's Included</span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Check" size={12} className="text-accent" />
                  <span>Fuel Charges</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Check" size={12} className="text-accent" />
                  <span>Driver Charges</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Check" size={12} className="text-accent" />
                  <span>State Tax</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Check" size={12} className="text-accent" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {calculation && (
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={() => onBookingClick('per-km', { ...formData, calculation })}
            iconName="Calendar"
            iconPosition="left"
            iconSize={16}
          >
            Book This Ride - ₹{calculation?.total}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PerKmCalculator;