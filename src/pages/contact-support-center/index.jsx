import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ContactHero from './components/ContactHero';
import QuickContactCards from './components/QuickContactCards';
import ContactForm from './components/ContactForm';
import OfficeLocation from './components/OfficeLocation';
import FAQSection from './components/FAQSection';
import SupportTestimonials from './components/SupportTestimonials';

const ContactSupportCenter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact & Support Center - WanderWise Tours | 24/7 Travel Assistance</title>
        <meta
          name="description"
          content="Get instant support for your travel needs. Contact WanderWise Tours via WhatsApp, phone, or email. 24/7 emergency assistance, expert consultation, and personalized travel planning."
        />
        <meta name="keywords" content="travel support, customer service, travel assistance, WanderWise contact, travel help, booking support" />
        <meta property="og:title" content="Contact & Support Center - WanderWise Tours" />
        <meta property="og:description" content="24/7 travel support and assistance. Multiple ways to reach our expert travel advisors for all your travel needs." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/contact-support-center" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <ContactHero />
          <QuickContactCards />
          <ContactForm />
          <OfficeLocation />
          <FAQSection />
          <SupportTestimonials />
        </main>
      </div>
    </>
  );
};

export default ContactSupportCenter;
