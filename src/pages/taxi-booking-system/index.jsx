import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';

import Button from '../../components/ui/Button';
import ServiceTypeSelector from './components/ServiceTypeSelector';
import FixedRoutePackages from './components/FixedRoutePackages';
import PerKmCalculator from './components/PerKmCalculator';
import SafetyFeatures from './components/SafetyFeatures';

const TaxiBookingSystem = () => {
    const [selectedService, setSelectedService] = useState('fixed-route');
    const [loading, setLoading] = useState(false);

    const handleServiceChange = (serviceType) => {
        setLoading(true);
        // Simulate loading delay, e.g., fetching data or processing
        setTimeout(() => {
            setSelectedService(serviceType);
            setLoading(false);
        }, 700); // 700ms delay to show loader
    };

    const handleWhatsAppSupport = () => {
        setLoading(true);
        const message = encodeURIComponent("Hi! I need help with taxi booking. Can you assist me?");
        // Open WhatsApp in a new tab after a short delay to show loader effect
        setTimeout(() => {
            window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
            setLoading(false);
        }, 500);
    };

    return (
        <>
            <Helmet>
                <title>Taxi Booking System - WanderWise Tours</title>
                <meta name="description" content="Book reliable taxi services with WanderWise Tours. Choose from fixed-route packages or flexible per-kilometer services with verified drivers and transparent pricing." />
                <meta name="keywords" content="taxi booking, car rental, airport transfer, city tours, transportation, travel" />
            </Helmet>

            <div className="min-h-screen bg-background">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/5 pt-20 pb-12">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200')] bg-cover bg-center opacity-5"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                                <Icon name="Car" size={16} />
                                <span>Reliable Transportation</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                Your Trusted <span className="text-gradient-brand">Taxi Service</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                                Experience safe, comfortable, and affordable transportation with our verified drivers and transparent pricing. Choose from fixed-route packages or flexible per-kilometer services.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                <div className="flex items-center space-x-2 bg-card px-4 py-2 rounded-lg border border-border">
                                    <Icon name="Shield" size={16} className="text-accent" />
                                    <span className="text-sm text-foreground">Verified Drivers</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-card px-4 py-2 rounded-lg border border-border">
                                    <Icon name="MapPin" size={16} className="text-accent" />
                                    <span className="text-sm text-foreground">Live Tracking</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-card px-4 py-2 rounded-lg border border-border">
                                    <Icon name="Phone" size={16} className="text-accent" />
                                    <span className="text-sm text-foreground">24/7 Support</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-card px-4 py-2 rounded-lg border border-border">
                                    <Icon name="CreditCard" size={16} className="text-accent" />
                                    <span className="text-sm text-foreground">Transparent Pricing</span>
                                </div>
                            </div>

                            <Button
                                variant="default"
                                size="lg"
                                onClick={handleWhatsAppSupport}
                                iconName="MessageCircle"
                                iconPosition="left"
                                iconSize={16}
                                className="bg-[#25D366] hover:bg-[#128C7E] text-white border-0"
                                disabled={loading}
                            >
                                {loading ? 'Please wait...' : 'Get Instant Support'}
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Service Selection */}
                <section className="py-12 bg-card/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-foreground mb-3">Choose Your Service</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Select the service that best fits your travel needs
                            </p>
                        </div>

                        {/* Show loader while changing service */}
                        {loading ? (
                            <div className="text-center py-10 text-xl font-semibold text-primary">
                                Loading...
                            </div>
                        ) : (
                            <ServiceTypeSelector
                                selectedService={selectedService}
                                onServiceChange={handleServiceChange}
                            />
                        )}
                    </div>
                </section>

                {/* Service Content */}
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {loading ? (
                            <div className="text-center py-20 text-2xl font-semibold text-primary">
                                Loading...
                            </div>
                        ) : selectedService === 'fixed-route' ? (
                            <div>
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-foreground mb-3">Fixed Route Packages</h2>
                                    <p className="text-muted-foreground max-w-2xl mx-auto">
                                        Pre-planned routes with all-inclusive pricing and curated experiences
                                    </p>
                                </div>
                                <FixedRoutePackages />
                            </div>
                        ) : (
                            <div>
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-foreground mb-3">Per-Kilometer Service</h2>
                                    <p className="text-muted-foreground max-w-2xl mx-auto">
                                        Flexible booking with transparent per-km rates and custom routes
                                    </p>
                                </div>
                                <PerKmCalculator />
                            </div>
                        )}
                    </div>
                </section>

                {/* Safety Features */}
                <section className="py-16 bg-muted/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SafetyFeatures />
                    </div>
                </section>

                {/* Quick Stats */}
                <section className="py-12 bg-primary text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <div className="text-3xl font-bold mb-2">50K+</div>
                                <div className="text-primary-foreground/80">Happy Customers</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-2">500+</div>
                                <div className="text-primary-foreground/80">Verified Drivers</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-2">25+</div>
                                <div className="text-primary-foreground/80">Cities Covered</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-2">4.8</div>
                                <div className="text-primary-foreground/80">Average Rating</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-gradient-to-r from-secondary/10 to-accent/10">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Ready to Book Your Ride?
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8">
                            Join thousands of satisfied customers who trust WanderWise Tours for their transportation needs
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="default"
                                size="lg"
                                onClick={() => handleServiceChange('fixed-route')}
                                iconName="MapPin"
                                iconPosition="left"
                                iconSize={16}
                                disabled={loading}
                            >
                                Browse Packages
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => handleServiceChange('per-km')}
                                iconName="Calculator"
                                iconPosition="left"
                                iconSize={16}
                                disabled={loading}
                            >
                                Calculate Fare
                            </Button>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
};

export default TaxiBookingSystem;
