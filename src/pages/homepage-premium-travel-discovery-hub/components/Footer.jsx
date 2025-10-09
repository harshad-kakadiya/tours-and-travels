import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import logo from "../../../../public/assets/images/mychoiceholiday_Logo Design Done_001.png";

const Footer = () => {
    const currentYear = new Date()?.getFullYear();
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        fetch('https://tour-travels-be-h58q.onrender.com/api/state')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setDestinations(data.slice(0, 6)); // take first 6 items
                }
            })
            .catch(err => console.error('Error fetching destinations:', err));
    }, []);

    const quickLinks = [
        { name: 'Tour Packages', path: '/tour-packages-discovery-center' },
        { name: 'Hotel Booking', path: '/hotel-booking-portal' },
        { name: 'Taxi Services', path: '/taxi-booking-system' },
        { name: 'Travel Blog', path: '/travel-blog-hub-journey-intelligence' },
        { name: 'Contact Us', path: '/contact-support-center' }
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
        window.open(`https://wa.me/919725855858?text=${message}`, '_blank');
    };

    const handleEmailClick = () => {
        window.location.href = 'mailto:mychoiceholiday889@gmail.com';
    };

    const handlePhoneClick = () => {
        window.location.href = 'tel:+919725855858';
    };

    return (
        <footer className="bg-[#256ba2] text-white text-sm">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info */}
                    <div>
                        <Link
                            to="/homepage-premium-travel-discovery-hub"
                            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-brand-fast"
                        >
                            <img
                                src={logo}
                                alt="Travel Discovery Hub"
                                className="h-[140px] w-[100px] object-contain"
                            />
                        </Link>

                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Your trusted travel companion for authentic experiences across India. We create memories that last a lifetime through carefully curated journeys.
                        </p>

                        <div className="space-y-3 break-words">
                            <button
                                onClick={handlePhoneClick}
                                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group"
                            >
                                <Icon name="Phone" size={18} className="group-hover:text-secondary transition-colors" />
                                <span>+91 97258 55858</span>
                            </button>

                            <button
                                onClick={handleEmailClick}
                                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group"
                            >
                                <Icon name="Mail" size={18} className="group-hover:text-secondary transition-colors" />
                                <span className="break-all">mychoiceholiday889@gmail.com</span>
                            </button>

                            <div className="flex items-center space-x-3 text-gray-300">
                                <Icon name="MapPin" size={18} />
                                <span>Ahmedabad, Gujarat, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-heading font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2 group"
                                    >
                                        <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Popular Destinations */}
                    <div>
                        <h3 className="text-lg font-heading font-semibold mb-4">Popular Destinations</h3>
                        <ul className="space-y-3">
                            {destinations.map((destination) => (
                                <li key={destination.name}>
                                    <Link
                                        to="/tour-packages-discovery-center"
                                        className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2 group"
                                    >
                                        <Icon name="MapPin" size={14} className="group-hover:text-secondary transition-colors" />
                                        <span>{destination.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support & Newsletter */}
                    <div>
                        <h3 className="text-lg font-heading font-semibold mb-4">Support & Updates</h3>

                        <ul className="space-y-3 mb-6">
                            {supportLinks.slice(0, 4).map((link) => (
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

                        <div className="bg-gray-800 rounded-lg p-4">
                            <h4 className="font-semibold mb-2">Stay Updated</h4>
                            <p className="text-sm text-gray-300 mb-3">Get travel tips and exclusive offers</p>
                            <div className="flex flex-row gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                <button className="w-auto px-4 py-2 bg-[#4891C9] rounded-md transition-colors flex items-center justify-center">
                                    <Icon name="Send" size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Media & Bottom Bar */}
            <div className="border-t border-gray-700">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <div className="flex flex-wrap items-center space-x-4">
                            <span className="text-gray-300 text-sm">Follow us:</span>
                            <div className="flex space-x-3">
                                <a href="https://facebook.com/wanderwisetours" target="_blank" rel="noopener noreferrer"
                                   className="w-10 h-10 bg-gray-700 hover:bg-[#1877F2] rounded-full flex items-center justify-center transition-colors"
                                   aria-label="Facebook">
                                    <Icon name="Facebook" size={18} />
                                </a>
                                <a href="https://instagram.com/wanderwisetours" target="_blank" rel="noopener noreferrer"
                                   className="w-10 h-10 bg-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-full flex items-center justify-center transition-all"
                                   aria-label="Instagram">
                                    <Icon name="Instagram" size={18} />
                                </a>
                                <a href="https://twitter.com/wanderwisetours" target="_blank" rel="noopener noreferrer"
                                   className="w-10 h-10 bg-gray-700 hover:bg-[#1DA1F2] rounded-full flex items-center justify-center transition-colors"
                                   aria-label="Twitter">
                                    <Icon name="Twitter" size={18} />
                                </a>
                                <button onClick={handleWhatsAppClick}
                                        className="w-10 h-10 bg-gray-700 hover:bg-[#25D366] rounded-full flex items-center justify-center transition-colors"
                                        aria-label="WhatsApp">
                                    <Icon name="MessageCircle" size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="text-center md:text-right">
                            <p className="text-gray-300 text-sm">© {currentYear} WanderWise Tours. All rights reserved.</p>
                            <p className="text-gray-400 text-xs mt-1">Crafted with ❤️ for wanderers and dreamers</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Emergency Contact Strip */}
            <div className="bg-[#0F172A]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-3 sm:space-y-0 text-white text-sm">
                        <div className="flex items-center space-x-2">
                            <Icon name="Phone" size={16} />
                            <span>24*7 Emergency: +91 97258 55858</span>
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