import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const CallFloatingButton = () => {
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

    const handleCallClick = () => {
        window.location.href = 'tel:+919725855858';
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
                    className="fixed bottom-24 sm:bottom-32 right-4 sm:right-6 z-50"
                >
                    {/* Tooltip */}
                    <AnimatePresence>
                        {showTooltip && (
                            <motion.div
                                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="absolute bottom-full right-0 mb-3 bg-white rounded-lg shadow-brand-large p-3 max-w-[160px] sm:max-w-xs hidden lg:block"
                            >
                                <div className="text-xs sm:text-sm text-gray-800 font-medium mb-1">
                                    Need immediate assistance?
                                </div>
                                <div className="text-[10px] sm:text-xs text-gray-600">
                                    Call our travel experts now!
                                </div>
                                {/* Arrow */}
                                <div className="absolute top-full right-3 sm:right-4 w-0 h-0 border-l-3 sm:border-l-4 border-r-3 sm:border-r-4 border-t-3 sm:border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Call Button */}
                    <motion.button
                        onClick={handleCallClick}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-12 h-12 sm:w-14 sm:h-14 bg-[#256ba2] hover:bg-[#1a4f7a] rounded-full shadow-brand-large flex items-center justify-center text-white transition-all duration-300 group"
                        aria-label="Call Travel Expert"
                    >
                        {/* Pulse Animation */}
                        <div className="absolute inset-0 bg-[#256ba2] rounded-full animate-ping opacity-20"></div>

                        {/* Phone Icon */}
                        <Icon name="Phone" size={20} sm:size={24} color="white" strokeWidth={2.5} />

                        {/* Online Indicator */}
                        <div className="absolute -top-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                    </motion.button>

                    {/* Quick Actions Menu (Hidden by default, can be expanded) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="absolute bottom-16 right-0 bg-white rounded-xl shadow-brand-large p-3 min-w-40 hidden"
                    >
                        <div className="space-y-2">
                            <button
                                onClick={handleCallClick}
                                className="flex items-center space-x-2 w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Icon name="Phone" size={14} color="#256ba2" />
                                </div>
                                <div>
                                    <div className="text-xs font-medium text-gray-800">Call Now</div>
                                    <div className="text-[10px] text-gray-600">+91 97258 55858</div>
                                </div>
                            </button>

                            <button
                                onClick={() => {
                                    const message = encodeURIComponent("Hi! I'm interested in exploring travel packages with WanderWise Tours. Could you help me plan my next adventure?");
                                    window.open(`https://wa.me/919725855858?text=${message}`, '_blank');
                                }}
                                className="flex items-center space-x-2 w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center">
                                    <Icon name="MessageCircle" size={14} color="#25D366" />
                                </div>
                                <div>
                                    <div className="text-xs font-medium text-gray-800">WhatsApp</div>
                                    <div className="text-[10px] text-gray-600">Chat with us</div>
                                </div>
                            </button>

                            <button
                                onClick={() => window.location.href = 'mailto:mychoiceholiday889@gmail.com'}
                                className="flex items-center space-x-2 w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center">
                                    <Icon name="Mail" size={14} color="#DC2626" />
                                </div>
                                <div>
                                    <div className="text-xs font-medium text-gray-800">Email</div>
                                    <div className="text-[10px] text-gray-600">Send inquiry</div>
                                </div>
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CallFloatingButton;