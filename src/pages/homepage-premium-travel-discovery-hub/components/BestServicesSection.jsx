import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const BestServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Expert Tour Guides",
      description: "Professional local guides with deep knowledge of destinations, culture, and history",
      icon: "UserCheck",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      id: 2,
      title: "24/7 Customer Support",
      description: "Round-the-clock assistance for all your travel needs and emergencies",
      icon: "Headphones",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      id: 3,
      title: "Flexible Booking",
      description: "Easy cancellation, rescheduling, and payment options for your convenience",
      icon: "Calendar",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      id: 4,
      title: "Authentic Experiences",
      description: "Curated local experiences that showcase the true essence of each destination",
      icon: "Heart",
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      id: 5,
      title: "Safety & Security",
      description: "Comprehensive safety measures and insurance coverage for all travelers",
      icon: "Shield",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      id: 6,
      title: "Best Price Guarantee",
      description: "We guarantee the best prices for all our tour packages and services",
      icon: "DollarSign",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Icon name="Award" size={16} />
            <span className="text-sm font-medium">Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Our Best Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are committed to providing exceptional travel experiences with our comprehensive range of services
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 shadow-brand-soft hover:shadow-brand-medium transition-all duration-300 group text-center"
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon 
                  name={service.icon} 
                  size={32} 
                  className={service.color}
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white"
          >
            <h3 className="text-2xl font-heading font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Let us help you create unforgettable memories with our expert travel services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const message = encodeURIComponent("Hi! I'm interested in your travel services. Could you help me plan my next trip?");
                  window.open(`https://wa.me/919725855858?text=${message}`, '_blank');
                }}
                className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <Icon name="MessageCircle" size={20} />
                <span>Get Free Consultation</span>
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors flex items-center justify-center space-x-2"
              >
                <Icon name="Search" size={20} />
                <span>Explore Tours</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BestServicesSection;