import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const WhatsAppFloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 100px
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Show tooltip after 3 seconds of component mount (only on desktop)
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) return;
    const timer = setTimeout(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 4000);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in exploring travel packages with WanderWise Tours. Could you help me plan my next adventure?");
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 0.3 
          }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-full right-0 mb-3 bg-white rounded-lg shadow-brand-large p-3 max-w-xs hidden lg:block"
              >
                <div className="text-sm text-foreground font-medium mb-1">
                  Need help planning your trip?
                </div>
                <div className="text-xs text-muted-foreground">
                  Chat with our travel experts on WhatsApp!
                </div>
                {/* Arrow */}
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp Button */}
          <motion.button
            onClick={handleWhatsAppClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] rounded-full shadow-brand-large flex items-center justify-center text-white transition-all duration-300 group"
            aria-label="Chat on WhatsApp"
          >
            {/* Pulse Animation */}
            <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20"></div>
            
            {/* WhatsApp Icon */}
            <Icon name="MessageCircle" size={28} color="white" strokeWidth={2} />
            
            {/* Online Indicator */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </motion.button>

          {/* Quick Actions Menu (Hidden by default, can be expanded) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 bg-white rounded-xl shadow-brand-large p-4 min-w-48 hidden"
          >
            <div className="space-y-3">
              <button className="flex items-center space-x-3 w-full text-left p-2 rounded-lg hover:bg-muted transition-colors">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="MapPin" size={16} color="var(--color-primary)" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Tour Packages</div>
                  <div className="text-xs text-muted-foreground">Explore destinations</div>
                </div>
              </button>
              
              <button className="flex items-center space-x-3 w-full text-left p-2 rounded-lg hover:bg-muted transition-colors">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon name="Building2" size={16} color="var(--color-accent)" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Hotel Booking</div>
                  <div className="text-xs text-muted-foreground">Find accommodations</div>
                </div>
              </button>
              
              <button className="flex items-center space-x-3 w-full text-left p-2 rounded-lg hover:bg-muted transition-colors">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Icon name="Car" size={16} color="var(--color-secondary)" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Taxi Booking</div>
                  <div className="text-xs text-muted-foreground">Book transportation</div>
                </div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppFloatingButton;