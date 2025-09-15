import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BlogHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Travel blogging inspiration"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Icon name="BookOpen" size={48} color="white" strokeWidth={1.5} />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            Journey Intelligence
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover India's hidden gems, cultural treasures, and travel secrets through our expert guides and authentic stories
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <div className="flex items-center space-x-2 text-white/80">
              <Icon name="Users" size={20} />
              <span className="text-sm font-medium">50,000+ Readers</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/30"></div>
            <div className="flex items-center space-x-2 text-white/80">
              <Icon name="MapPin" size={20} />
              <span className="text-sm font-medium">500+ Destinations</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/30"></div>
            <div className="flex items-center space-x-2 text-white/80">
              <Icon name="Star" size={20} />
              <span className="text-sm font-medium">Expert Insights</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search destinations, guides, tips..."
                className="w-full sm:w-96 px-6 py-4 rounded-full text-foreground placeholder-muted-foreground bg-white/95 backdrop-blur-sm border-0 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white p-2 rounded-full transition-colors duration-200">
                <Icon name="Search" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default BlogHero;