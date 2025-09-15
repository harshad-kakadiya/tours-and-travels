import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PopularDestinations = () => {
  const destinations = [
    {
      id: 1,
      name: 'Kerala Backwaters',
      state: 'Kerala',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      articles: 12,
      description: 'Serene waterways and traditional houseboats',
      bestTime: 'Oct - Mar',
      highlights: ['Houseboat cruises', 'Spice plantations', 'Ayurvedic treatments']
    },
    {
      id: 2,
      name: 'Rajasthan Desert',
      state: 'Rajasthan',
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      articles: 18,
      description: 'Golden dunes and royal heritage',
      bestTime: 'Nov - Feb',
      highlights: ['Camel safaris', 'Desert camps', 'Folk music']
    },
    {
      id: 3,
      name: 'Himachal Hills',
      state: 'Himachal Pradesh',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      articles: 15,
      description: 'Snow-capped peaks and adventure sports',
      bestTime: 'Apr - Jun, Sep - Nov',
      highlights: ['Trekking', 'Paragliding', 'Hill stations']
    },
    {
      id: 4,
      name: 'Goa Beaches',
      state: 'Goa',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      articles: 22,
      description: 'Pristine beaches and vibrant nightlife',
      bestTime: 'Nov - Mar',
      highlights: ['Beach parties', 'Water sports', 'Portuguese heritage']
    },
    {
      id: 5,
      name: 'Tamil Nadu Temples',
      state: 'Tamil Nadu',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      articles: 9,
      description: 'Ancient architecture and spiritual heritage',
      bestTime: 'Nov - Mar',
      highlights: ['Temple architecture', 'Classical dance', 'South Indian cuisine']
    },
    {
      id: 6,
      name: 'Kashmir Valley',
      state: 'Jammu & Kashmir',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      articles: 14,
      description: 'Paradise on earth with stunning landscapes',
      bestTime: 'Apr - Oct',
      highlights: ['Shikara rides', 'Mughal gardens', 'Skiing']
    }
  ];

  return (
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our most-read destination guides and discover what makes these places special
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations?.map((destination) => (
            <div key={destination?.id} className="bg-card rounded-xl shadow-brand-soft hover:shadow-brand-medium transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={destination?.image}
                  alt={destination?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {destination?.articles} Articles
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-heading font-bold text-white mb-1">
                    {destination?.name}
                  </h3>
                  <p className="text-white/80 text-sm flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{destination?.state}</span>
                  </p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  {destination?.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Best Time:</span>
                    <span className="font-medium text-foreground">{destination?.bestTime}</span>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Highlights:</p>
                    <div className="flex flex-wrap gap-2">
                      {destination?.highlights?.map((highlight, index) => (
                        <span key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <button className="text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200 flex items-center space-x-1">
                    <span>Read Articles</span>
                    <Icon name="ArrowRight" size={14} />
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200">
                      <Icon name="Bookmark" size={16} />
                    </button>
                    <button className="p-2 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200">
                      <Icon name="Share2" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 mx-auto">
            <Icon name="Map" size={18} />
            <span>Explore All Destinations</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;