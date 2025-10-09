import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FlexibleTransportation = () => {
  const [activeTab, setActiveTab] = useState('fixed-routes');

  const fixedRoutes = [
    {
      id: 1,
      route: "Airport to City Center",
      locations: "Delhi Airport → Connaught Place",
      duration: "45 mins",
      price: "₹800",
      vehicleType: "Sedan",
      features: ["AC", "GPS Tracking", "24*7 Available", "Fixed Price"],
      icon: "Plane"
    },
    {
      id: 2,
      route: "Railway Station Transfer",
      locations: "Mumbai Central → Hotel Areas",
      duration: "30 mins",
      price: "₹600",
      vehicleType: "Hatchback",
      features: ["AC", "Luggage Space", "Quick Pickup", "No Surge"],
      icon: "Train"
    },
    {
      id: 3,
      route: "City Sightseeing",
      locations: "Jaipur Heritage Circuit",
      duration: "8 hours",
      price: "₹2,500",
      vehicleType: "SUV",
      features: ["Full Day", "Driver Guide", "Fuel Included", "Multiple Stops"],
      icon: "Camera"
    },
    {
      id: 4,
      route: "Hill Station Transfer",
      locations: "Chandigarh → Shimla",
      duration: "3.5 hours",
      price: "₹3,200",
      vehicleType: "SUV",
      features: ["Mountain Roads", "Experienced Driver", "Scenic Route", "Rest Stops"],
      icon: "Mountain"
    }
  ];

  const perKmOptions = [
    {
      id: 1,
      vehicleType: "Hatchback",
      model: "Swift Dzire / Similar",
      perKmRate: "₹12",
      minKm: "25 km",
      features: ["4 Seater", "AC", "Fuel Included", "Basic"],
      image: "🚗",
      popular: false
    },
    {
      id: 2,
      vehicleType: "Sedan",
      model: "Honda City / Similar",
      perKmRate: "₹15",
      minKm: "25 km",
      features: ["4 Seater", "Premium AC", "Comfortable", "Spacious"],
      image: "🚙",
      popular: true
    },
    {
      id: 3,
      vehicleType: "SUV",
      model: "Innova / Similar",
      perKmRate: "₹18",
      minKm: "25 km",
      features: ["7 Seater", "Large Luggage", "Family Friendly", "Premium"],
      image: "🚐",
      popular: false
    },
    {
      id: 4,
      vehicleType: "Luxury",
      model: "Camry / Similar",
      perKmRate: "₹25",
      minKm: "50 km",
      features: ["Premium Interior", "Chauffeur", "Business Class", "Luxury"],
      image: "🚘",
      popular: false
    }
  ];

  const handleBooking = (type, item) => {
    let message = '';
    if (type === 'fixed') {
      message = encodeURIComponent(`Hi! I'd like to book the ${item?.route} taxi service (${item?.locations}) for ${item?.price}. Please confirm availability.`);
    } else {
      message = encodeURIComponent(`Hi! I'm interested in booking a ${item?.vehicleType} (${item?.model}) at ${item?.perKmRate}/km. Please help me with the booking.`);
    }
    window.open(`https://wa.me/919725855858?text=${message}`, '_blank');
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Icon name="Car" size={16} />
            <span className="text-sm font-medium">Reliable Transportation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Flexible Transportation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from fixed-route transfers or per-kilometer bookings for complete travel flexibility
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-muted p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('fixed-routes')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'fixed-routes' ?'bg-primary text-white shadow-brand-soft' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Fixed Routes
            </button>
            <button
              onClick={() => setActiveTab('per-km')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'per-km' ?'bg-primary text-white shadow-brand-soft' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Per Kilometer
            </button>
          </div>
        </div>

        {/* Fixed Routes Tab */}
        {activeTab === 'fixed-routes' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {fixedRoutes?.map((route, index) => (
                <motion.div
                  key={route?.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-2xl shadow-brand-soft hover:shadow-brand-medium transition-all duration-300 p-6 border border-border/50"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Icon name={route?.icon} size={24} color="var(--color-primary)" />
                      </div>
                      <div>
                        <h3 className="text-lg font-heading font-semibold text-foreground">
                          {route?.route}
                        </h3>
                        <p className="text-sm text-muted-foreground">{route?.vehicleType}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{route?.price}</div>
                      <div className="text-sm text-muted-foreground">Fixed Rate</div>
                    </div>
                  </div>

                  {/* Route Details */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 text-muted-foreground mb-2">
                      <Icon name="MapPin" size={16} />
                      <span className="text-sm">{route?.locations}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Icon name="Clock" size={16} />
                      <span className="text-sm">Duration: {route?.duration}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {route?.features?.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleBooking('fixed', route)}
                    iconName="Calendar"
                    iconPosition="left"
                    iconSize={16}
                    fullWidth
                    className="bg-primary hover:bg-primary/90"
                  >
                    Book This Route
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Per Kilometer Tab */}
        {activeTab === 'per-km' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {perKmOptions?.map((option, index) => (
                <motion.div
                  key={option?.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-card rounded-2xl shadow-brand-soft hover:shadow-brand-medium transition-all duration-300 p-6 border-2 relative ${
                    option?.popular ? 'border-secondary' : 'border-border/50'
                  }`}
                >
                  {/* Popular Badge */}
                  {option?.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}

                  {/* Vehicle Icon */}
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{option?.image}</div>
                    <h3 className="text-lg font-heading font-semibold text-foreground">
                      {option?.vehicleType}
                    </h3>
                    <p className="text-sm text-muted-foreground">{option?.model}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {option?.perKmRate}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      per km (Min: {option?.minKm})
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {option?.features?.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Icon name="Check" size={14} color="var(--color-success)" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button
                    variant={option?.popular ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleBooking('per-km', option)}
                    iconName="Car"
                    iconPosition="left"
                    iconSize={16}
                    fullWidth
                    className={option?.popular ? "bg-secondary hover:bg-secondary/90" : ""}
                  >
                    Book Now
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <div className="text-center bg-muted/50 rounded-2xl p-8">
          <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
            Need Custom Transportation?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Planning a group trip or need special arrangements? Our team can create customized transportation solutions for your unique requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/taxi-booking-system">
              <Button
                variant="default"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                className="px-8 py-4 text-lg font-semibold"
              >
                Explore All Options
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                let message = encodeURIComponent("Hi! I need custom transportation arrangements for my trip. Could you help me with a personalized quote?");
                window.open(`https://wa.me/919725855858?text=${message}`, '_blank');
              }}
              iconName="MessageCircle"
              iconPosition="left"
              className="px-8 py-4 text-lg font-semibold"
            >
              Get Custom Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlexibleTransportation;