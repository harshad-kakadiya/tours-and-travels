import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SocialProofSection = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [recentBookings, setRecentBookings] = useState([]);

    const testimonials = [
        {
            id: 1,
            name: "Priya Sharma",
            location: "Mumbai",
            rating: 5,
            text: `WanderWise Tours made our Kerala backwaters trip absolutely magical! The houseboat experience was beyond our expectations, and the local guide shared fascinating stories about the region.`,
            image: "https://randomuser.me/api/portraits/women/32.jpg",
            package: "Kerala Backwaters Bliss",
            date: "2 weeks ago"
        },
        {
            id: 2,
            name: "Rajesh Kumar",
            location: "Delhi",
            rating: 5,
            text: `Our Rajasthan heritage tour was a dream come true! The palace hotels were stunning, and the desert safari under the stars was unforgettable.`,
            image: "https://randomuser.me/api/portraits/men/45.jpg",
            package: "Rajasthan Royal Heritage",
            date: "1 month ago"
        },
        {
            id: 3,
            name: "Anita Patel",
            location: "Ahmedabad",
            rating: 5,
            text: `The Himalayan trek was challenging but incredibly rewarding! Our guide was knowledgeable and ensured our safety throughout.`,
            image: "https://randomuser.me/api/portraits/women/28.jpg",
            package: "Himalayan Adventure Trek",
            date: "3 weeks ago"
        },
        {
            id: 4,
            name: "Vikram Singh",
            location: "Bangalore",
            rating: 5,
            text: `Goa with WanderWise was perfect for our anniversary! The beachfront resort was luxurious, and the sunset cruise was romantic.`,
            image: "https://randomuser.me/api/portraits/men/38.jpg",
            package: "Goa Beach Paradise",
            date: "1 week ago"
        }
    ];

    const trustBadges = [
        { name: "Ministry of Tourism", description: "Approved Tour Operator", icon: "Award", color: "text-accent" },
        { name: "IATA Certified", description: "International Air Transport", icon: "Plane", color: "text-primary" },
        { name: "SSL Secured", description: "Safe Payment Gateway", icon: "Shield", color: "text-success" },
        { name: "24/7 Support", description: "Round the Clock Assistance", icon: "Headphones", color: "text-secondary" }
    ];

    const bookingNotifications = [
        { name: "Priya from Mumbai", action: "booked Kerala Backwaters", time: "2 minutes ago" },
        { name: "Rahul from Delhi", action: "booked Rajasthan Heritage", time: "5 minutes ago" },
        { name: "Sneha from Pune", action: "booked Goa Beach Paradise", time: "8 minutes ago" },
        { name: "Amit from Chennai", action: "booked Himalayan Trek", time: "12 minutes ago" },
        { name: "Kavya from Hyderabad", action: "booked Karnataka Temple Trail", time: "15 minutes ago" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    useEffect(() => {
        const shuffleBookings = () => {
            const shuffled = [...bookingNotifications].sort(() => Math.random() - 0.5);
            setRecentBookings(shuffled.slice(0, 3));
        };
        shuffleBookings();
        const interval = setInterval(shuffleBookings, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full mb-4">
                        <Icon name="Users" size={16} />
                        <span className="text-sm font-medium">Trusted by Thousands</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        What Our Travelers Say
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Real experiences from real travelers who chose WanderWise for their memorable journeys
                    </p>
                </div>

                {/* Testimonials + Sidebar */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-12">
                    {/* Testimonials Carousel */}
                    <div className="lg:col-span-2">
                        <div className="bg-card rounded-2xl shadow-brand-soft p-6 sm:p-8 h-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentTestimonial}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col h-full"
                                >
                                    {/* Rating */}
                                    <div className="flex items-center space-x-1 mb-4">
                                        {[...Array(testimonials[currentTestimonial]?.rating)].map((_, i) => (
                                            <Icon key={i} name="Star" size={20} color="#F59E0B" />
                                        ))}
                                    </div>

                                    {/* Text */}
                                    <blockquote className="text-lg text-foreground leading-relaxed mb-6 flex-grow">
                                        "{testimonials[currentTestimonial]?.text}"
                                    </blockquote>

                                    {/* Author */}
                                    <div className="flex items-center space-x-4">
                                        <Image
                                            src={testimonials[currentTestimonial]?.image}
                                            alt={testimonials[currentTestimonial]?.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-semibold text-foreground">
                                                {testimonials[currentTestimonial]?.name}
                                            </h4>
                                            <p className="text-muted-foreground text-sm">
                                                {testimonials[currentTestimonial]?.location}
                                            </p>
                                            <p className="text-primary text-sm font-medium">
                                                {testimonials[currentTestimonial]?.package}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {testimonials[currentTestimonial]?.date}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Dots Navigation */}
                            <div className="flex justify-center space-x-2 mt-6">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentTestimonial(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            index === currentTestimonial
                                                ? 'bg-primary scale-125'
                                                : 'bg-muted hover:bg-muted-foreground/30'
                                        }`}
                                        aria-label={`Go to testimonial ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Bookings & Stats */}
                    <div className="space-y-6">
                        {/* Recent Bookings */}
                        <div className="bg-card rounded-2xl shadow-brand-soft p-6">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                                <h3 className="font-semibold text-foreground">Recent Bookings</h3>
                            </div>
                            <div className="space-y-3">
                                {recentBookings.map((booking, index) => (
                                    <motion.div
                                        key={`${booking?.name}-${index}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg"
                                    >
                                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Icon name="User" size={14} color="var(--color-primary)" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-foreground">{booking?.name}</p>
                                            <p className="text-xs text-muted-foreground">{booking?.action}</p>
                                        </div>
                                        <span className="text-xs text-muted-foreground">{booking?.time}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="bg-card rounded-2xl shadow-brand-soft p-6">
                            <h3 className="font-semibold text-foreground mb-4">Our Impact</h3>
                            <div className="space-y-4">
                                {[
                                    ["Happy Travelers", "15,000+"],
                                    ["Destinations Covered", "150+"],
                                    ["Years of Experience", "12+"]
                                ].map(([label, value]) => (
                                    <div key={label} className="flex items-center justify-between">
                                        <span className="text-muted-foreground">{label}</span>
                                        <span className="font-bold text-primary">{value}</span>
                                    </div>
                                ))}
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Customer Rating</span>
                                    <div className="flex items-center space-x-1">
                                        <span className="font-bold text-primary">4.8</span>
                                        <Icon name="Star" size={16} color="#F59E0B" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {trustBadges.map((badge, index) => (
                        <motion.div
                            key={badge.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card rounded-xl shadow-brand-soft p-6 text-center hover:shadow-brand-medium transition-all duration-300"
                        >
                            <div
                                className={`w-12 h-12 mx-auto mb-3 bg-muted rounded-full flex items-center justify-center ${badge.color}`}
                            >
                                <Icon name={badge.icon} size={24} />
                            </div>
                            <h4 className="font-semibold text-foreground mb-1">{badge.name}</h4>
                            <p className="text-sm text-muted-foreground">{badge.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialProofSection;
