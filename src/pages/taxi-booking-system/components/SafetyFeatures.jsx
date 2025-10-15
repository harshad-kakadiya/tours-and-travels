import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SafetyFeatures = () => {
  const safetyFeatures = [
    {
      icon: 'Shield',
      title: 'Verified Drivers',
      description: 'All drivers undergo thorough background verification and regular training',
      details: ['Police verification', 'Driving license validation', 'Regular health checkups', 'Customer feedback monitoring']
    },
    {
      icon: 'MapPin',
      title: 'Real-time Tracking',
      description: 'Live GPS tracking with trip sharing capabilities for your safety',
      details: ['Live location sharing', 'Route optimization', 'Emergency alerts', 'Trip history']
    },
    {
      icon: 'Phone',
      title: '24*7 Support',
      description: 'Round-the-clock customer support and emergency assistance',
      details: ['Instant help via WhatsApp', 'Emergency hotline', 'Trip monitoring', 'Quick resolution']
    },
    {
      icon: 'Star',
      title: 'Quality Assurance',
      description: 'Regular vehicle inspections and driver performance monitoring',
      details: ['Vehicle maintenance', 'Cleanliness standards', 'Performance ratings', 'Service quality checks']
    }
  ];

  const trustBadges = [
    {
      name: 'Government Verified',
      icon: 'Award',
      description: 'Licensed transport operator'
    },
    {
      name: 'Insurance Covered',
      icon: 'Shield',
      description: 'Comprehensive insurance protection'
    },
    {
      name: 'Secure Payments',
      icon: 'Lock',
      description: 'Safe and encrypted transactions'
    },
    {
      name: '50K+ Happy Customers',
      icon: 'Users',
      description: 'Trusted by thousands'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Safety Features */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-3">Your Safety is Our Priority</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've implemented comprehensive safety measures to ensure your journey is secure and comfortable
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {safetyFeatures?.map((feature, index) => (
            <div key={index} className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name={feature?.icon} size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature?.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{feature?.description}</p>
                  <ul className="space-y-1">
                    {feature?.details?.map((detail, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="Check" size={14} className="text-accent" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Badges */}
      <div className="bg-muted/30 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-foreground text-center mb-6">Trusted & Certified</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustBadges?.map((badge, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon name={badge?.icon} size={20} className="text-primary" />
              </div>
              <h4 className="text-sm font-medium text-foreground mb-1">{badge?.name}</h4>
              <p className="text-xs text-muted-foreground">{badge?.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Emergency Features */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <Icon name="AlertTriangle" size={24} className="text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">Emergency Features</h3>
            <p className="text-muted-foreground text-sm mb-4">
              In case of any emergency during your trip, these features ensure your safety
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} className="text-red-600" />
                  <span className="text-sm text-foreground font-medium">Emergency Hotline</span>
                </div>
                <p className="text-xs text-muted-foreground ml-6">24*7 emergency support: +91-9725855858</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="Share" size={16} className="text-red-600" />
                  <span className="text-sm text-foreground font-medium">Trip Sharing</span>
                </div>
                <p className="text-xs text-muted-foreground ml-6">Share live location with family/friends</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={16} className="text-red-600" />
                  <span className="text-sm text-foreground font-medium">SOS Alert</span>
                </div>
                <p className="text-xs text-muted-foreground ml-6">One-tap emergency alert to authorities</p>
              </div>
              {/*<div className="space-y-2">*/}
              {/*  <div className="flex items-center space-x-2">*/}
              {/*    <Icon name="Camera" size={16} className="text-red-600" />*/}
              {/*    <span className="text-sm text-foreground font-medium">Driver Photo</span>*/}
              {/*  </div>*/}
              {/*  <p className="text-xs text-muted-foreground ml-6">Driver and vehicle photos before trip</p>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
      {/* Customer Testimonials */}
      <div>
        <h3 className="text-lg font-semibold text-foreground text-center mb-6">What Our Customers Say</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Priya Sharma',
              rating: 5,
              comment: 'Excellent service! The driver was professional and the vehicle was clean. Felt completely safe throughout the journey.',
              location: 'Delhi',
              image: 'https://randomuser.me/api/portraits/women/32.jpg'
            },
            {
              name: 'Rahul Gupta',
              rating: 5,
              comment: 'Used their airport transfer service. Driver arrived on time and helped with luggage. Highly recommended!',
              location: 'Mumbai',
              image: 'https://randomuser.me/api/portraits/men/45.jpg'
            },
            {
              name: 'Anjali Patel',
              rating: 5,
              comment: 'Great experience with their city tour package. The driver was knowledgeable about local attractions.',
              location: 'Bangalore',
              image: 'https://randomuser.me/api/portraits/women/28.jpg'
            }
          ]?.map((testimonial, index) => (
            <div key={index} className="bg-card p-4 rounded-lg border border-border">
              <div className="flex items-center space-x-3 mb-3">
                <Image
                  src={testimonial?.image}
                  alt={testimonial?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-medium text-foreground">{testimonial?.name}</h4>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial?.rating)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={12} className="text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{testimonial?.comment}</p>
              <p className="text-xs text-muted-foreground">{testimonial?.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafetyFeatures;