import React from 'react';
import Icon from '../../../components/AppIcon';

const ContactHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Icon name="Headphones" size={40} color="white" strokeWidth={2} />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            We're Here to Help
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your journey matters to us. Get instant support, expert guidance, and personalized assistance for all your travel needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center space-x-2 text-white/90">
              <Icon name="Clock" size={20} />
              <span className="text-lg">24*7 Emergency Support</span>
            </div>
            {/*<div className="hidden sm:block w-px h-6 bg-white/30"></div>*/}
            {/*<div className="flex items-center space-x-2 text-white/90">*/}
            {/*  <Icon name="MessageCircle" size={20} />*/}
            {/*  <span className="text-lg">Instant WhatsApp Response</span>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;