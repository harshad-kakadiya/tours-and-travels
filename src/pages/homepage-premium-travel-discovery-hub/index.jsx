import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HeroCarousel from './components/HeroCarousel';
import SmartSearchWidget from './components/SmartSearchWidget';
import UpcomingToursSlider from './components/UpcomingToursSlider';
import PopularToursSection from './components/PopularToursSection';
import PopularDestinationsSection from './components/PopularDestinationsSection';
import BestServicesSection from './components/BestServicesSection';
import FlexibleTransportation from './components/FlexibleTransportation';
import SocialProofSection from './components/SocialProofSection';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';

const HomepagePremiumTravelDiscoveryHub = () => {
  useEffect(() => {
    // Smooth scroll to top on component mount
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
      <div className="min-h-screen bg-background">
        {/* SEO Meta Tags */}
        <Helmet>
          <title>WanderWise Tours - Premium Travel Discovery Hub | Authentic Indian Experiences</title>
          <meta
              name="description"
              content="Discover authentic Indian travel experiences with WanderWise Tours. Curated packages, handpicked hotels, flexible transportation, and expert guidance for unforgettable journeys across India."
          />
          <meta
              name="keywords"
              content="India travel, tour packages, hotel booking, taxi services, Kerala backwaters, Rajasthan heritage, Himalayan treks, Goa beaches, travel blog, authentic experiences"
          />
          <meta name="author" content="WanderWise Tours" />
          <meta property="og:title" content="WanderWise Tours - Premium Travel Discovery Hub" />
          <meta
              property="og:description"
              content="Your trusted travel companion for authentic experiences across India. We create memories that last a lifetime through carefully curated journeys."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://wanderwisetours.com/homepage-premium-travel-discovery-hub" />
          <meta property="og:image" content="https://wanderwisetours.com/assets/images/og-homepage.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="WanderWise Tours - Premium Travel Discovery Hub" />
          <meta
              name="twitter:description"
              content="Discover authentic Indian travel experiences with curated packages, handpicked hotels, and expert guidance."
          />
          <link rel="canonical" href="https://wanderwisetours.com/homepage-premium-travel-discovery-hub" />

          {/* Structured Data for SEO */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "WanderWise Tours",
              "description": "Premium travel agency specializing in authentic Indian experiences",
              "url": "https://wanderwisetours.com",
              "telephone": "+919876543210",
              "email": "info@wanderwisetours.com",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN",
                "addressRegion": "Maharashtra",
                "addressLocality": "Mumbai"
              },
              "sameAs": [
                "https://facebook.com/wanderwisetours",
                "https://instagram.com/wanderwisetours",
                "https://twitter.com/wanderwisetours"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "1500"
              }
            })}
          </script>
        </Helmet>

        {/* Main Content */}
        <main>
          {/* Hero Section with Carousel */}
          <section id="hero" className="relative">
            <HeroCarousel />
            {/*<SmartSearchWidget />*/}
          </section>

          {/* Upcoming Tours Slider Section */}
          <section id="upcoming-tours" className="relative">
            <UpcomingToursSlider />
          </section>

          {/* Popular Tours Section */}
          <section id="popular-tours" className="relative">
            <PopularToursSection />
          </section>

          {/* Popular Destinations Section */}
          <section id="popular-destinations" className="relative">
            <PopularDestinationsSection />
          </section>

          {/* Best Services Section */}
          <section id="best-services" className="relative">
            <BestServicesSection />
          </section>

          {/* Flexible Transportation Section */}
          {/*<section id="flexible-transportation" className="relative">*/}
          {/*  <FlexibleTransportation />*/}
          {/*</section>*/}

          {/*/!* Social Proof Section *!/*/}
          {/*<section id="social-proof" className="relative">*/}
          {/*  <SocialProofSection />*/}
          {/*</section>*/}
        </main>

        {/* WhatsApp Floating Button */}
        <WhatsAppFloatingButton />
      </div>
  );
};

export default HomepagePremiumTravelDiscoveryHub;