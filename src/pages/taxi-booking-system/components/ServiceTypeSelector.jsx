import React from 'react';
import Icon from '../../../components/AppIcon';

const ServiceTypeSelector = ({ selectedService, onServiceChange }) => {
  const services = [
    {
      id: 'fixed-route',
      title: 'Fixed Route Packages',
      description: 'Pre-planned routes with all-inclusive pricing',
      icon: 'MapPin',
      features: ['City Tours', 'Airport Transfers', 'Inter-city Connections', 'Fixed Pricing'],
      popular: true
    },
    {
      id: 'per-km',
      title: 'Per-Kilometer Service',
      description: 'Flexible booking with transparent per-km rates',
      icon: 'Route',
      features: ['Custom Routes', 'Hourly Booking', 'Distance-based Pricing', 'Real-time Tracking'],
      popular: false
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {services?.map((service) => (
        <div
          key={service?.id}
          onClick={() => onServiceChange(service?.id)}
          className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
            selectedService === service?.id
              ? 'border-primary bg-primary/5 shadow-md'
              : 'border-border bg-card hover:border-primary/30'
          }`}
        >
          {service?.popular && (
            <div className="absolute -top-3 left-6">
              <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
          )}
          
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg ${
              selectedService === service?.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
            }`}>
              <Icon name={service?.icon} size={24} />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {service?.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {service?.description}
              </p>
              
              <div className="space-y-2">
                {service?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-accent" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedService === service?.id
                ? 'border-primary bg-primary' :'border-muted-foreground'
            }`}>
              {selectedService === service?.id && (
                <Icon name="Check" size={14} className="text-white" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceTypeSelector;