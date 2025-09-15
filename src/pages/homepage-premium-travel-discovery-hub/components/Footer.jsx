import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const quickLinks = [
    { name: 'Tour Packages', path: '/tour-packages-discovery-center' },
    { name: 'Hotel Booking', path: '/hotel-booking-portal' },
    { name: 'Taxi Services', path: '/taxi-booking-system' },
    { name: 'Travel Blog', path: '/travel-blog-hub-journey-intelligence' },
    { name: 'Contact Us', path: '/contact-support-center' }
  ];

  const destinations = [
    'Kerala Backwaters',
    'Rajasthan Heritage',
    'Himalayan Treks',
    'Goa Beaches',
    'Karnataka Temples',
    'Uttarakhand Spiritual'
  ];

  const supportLinks = [
    'Customer Support',
    'Booking Terms',
    'Privacy Policy',
    'Refund Policy',
    'Travel Insurance',
    'FAQ'
  ];

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I need assistance with my travel planning. Could you help me?");
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:info@wanderwisetours.com';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+919876543210';
  };

  return (
    <footer className="bg-foreground text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/homepage-premium-travel-discovery-hub" className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-brand-soft">
                  <Icon name="Compass" size={28} color="white" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="Sparkles" size={12} color="white" strokeWidth={3} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold">WanderWise</h1>
                <p className="text-sm text-gray-300 -mt-1">Tours</p>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted travel companion for authentic experiences across India. We create memories that last a lifetime through carefully curated journeys.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <button
                onClick={handlePhoneClick}
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group"
              >
                <Icon name="Phone" size={18} className="group-hover:text-secondary transition-colors" />
                <span>+91 98765 43210</span>
              </button>
              
              <button
                onClick={handleEmailClick}
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group"
              >
                <Icon name="Mail" size={18} className="group-hover:text-secondary transition-colors" />
                <span>info@wanderwisetours.com</span>
              </button>
              
              <div className="flex items-center space-x-3 text-gray-300">
                <Icon name="MapPin" size={18} />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks?.map((link) => (
                <li key={link?.path}>
                  <Link
                    to={link?.path}
                    className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2 group"
                  >
                    <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                    <span>{link?.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Popular Destinations</h3>
            <ul className="space-y-3">
              {destinations?.map((destination) => (
                <li key={destination}>
                  <Link
                    to="/tour-packages-discovery-center"
                    className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2 group"
                  >
                    <Icon name="MapPin" size={14} className="group-hover:text-secondary transition-colors" />
                    <span>{destination}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Newsletter */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Support & Updates</h3>
            
            {/* Support Links */}
            <ul className="space-y-3 mb-6">
              {supportLinks?.slice(0, 4)?.map((link) => (
                <li key={link}>
                  <Link
                    to="/contact-support-center"
                    className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2 group"
                  >
                    <Icon name="HelpCircle" size={14} className="group-hover:text-accent transition-colors" />
                    <span>{link}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Stay Updated</h4>
              <p className="text-sm text-gray-300 mb-4">
                Get travel tips and exclusive offers
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button className="px-4 py-2 bg-primary hover:bg-primary/90 rounded-md transition-colors">
                  <Icon name="Send" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Social Media & Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Social Media Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">Follow us:</span>
              <div className="flex space-x-3">
                <a
                  href="https://facebook.com/wanderwisetours"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-[#1877F2] rounded-full flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Icon name="Facebook" size={18} />
                </a>
                <a
                  href="https://instagram.com/wanderwisetours"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-full flex items-center justify-center transition-all"
                  aria-label="Instagram"
                >
                  <Icon name="Instagram" size={18} />
                </a>
                <a
                  href="https://twitter.com/wanderwisetours"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-[#1DA1F2] rounded-full flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Icon name="Twitter" size={18} />
                </a>
                <button
                  onClick={handleWhatsAppClick}
                  className="w-10 h-10 bg-gray-700 hover:bg-[#25D366] rounded-full flex items-center justify-center transition-colors"
                  aria-label="WhatsApp"
                >
                  <Icon name="MessageCircle" size={18} />
                </button>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-300 text-sm">
                © {currentYear} WanderWise Tours. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Crafted with ❤️ for wanderers and dreamers
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Emergency Contact Strip */}
      <div className="bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center space-x-6 text-white text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={16} />
              <span>24/7 Emergency: +91 98765 43210</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/30"></div>
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center space-x-2 hover:text-gray-200 transition-colors"
            >
              <Icon name="MessageCircle" size={16} />
              <span>WhatsApp Support</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;