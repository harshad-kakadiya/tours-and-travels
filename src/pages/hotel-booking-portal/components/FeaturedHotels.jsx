import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedHotels = ({ hotels, onViewDetails }) => {
  const handleWhatsAppInquiry = (hotel) => {
    const message = encodeURIComponent(`Hi! I'm interested in the featured hotel ${hotel?.name} in ${hotel?.location}. Could you provide more details about availability and special offers?`);
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Featured Hotels</h2>
          <p className="text-muted-foreground">Handpicked premium accommodations with exclusive offers</p>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Sparkles" size={16} className="text-accent" />
          <span>Special Deals Available</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {hotels?.map((hotel) => (
          <div key={hotel?.id} className="bg-card rounded-xl shadow-brand-soft hover:shadow-brand-medium transition-all duration-brand-normal hover-lift overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              {/* Image */}
              <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
                <Image
                  src={hotel?.images?.[0]}
                  alt={hotel?.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Featured Badge */}
                <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1">
                  <Icon name="Star" size={12} />
                  <span>Featured</span>
                </div>

                {/* Discount Badge */}
                {hotel?.discount && (
                  <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs font-bold">
                    {hotel?.discount}% OFF
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                      {hotel?.name}
                    </h3>
                    <div className="flex items-center text-muted-foreground text-sm mb-2">
                      <Icon name="MapPin" size={14} className="mr-1" />
                      <span>{hotel?.location}</span>
                    </div>
                  </div>
                  <div className="text-right ml-3">
                    {hotel?.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        ₹{hotel?.originalPrice?.toLocaleString()}
                      </div>
                    )}
                    <div className="text-lg font-bold text-foreground">
                      ₹{hotel?.pricePerNight?.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">per night</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={i < Math.floor(hotel?.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium text-foreground">{hotel?.rating}</span>
                  <span className="ml-1 text-sm text-muted-foreground">({hotel?.reviewCount})</span>
                  <div className="ml-2 bg-primary text-primary-foreground px-2 py-0.5 rounded text-xs font-medium">
                    {hotel?.starRating} Star
                  </div>
                </div>

                {/* Special Offer */}
                {hotel?.specialOffer && (
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-2 mb-3">
                    <div className="flex items-center space-x-2 text-sm text-accent font-medium">
                      <Icon name="Gift" size={14} />
                      <span>{hotel?.specialOffer}</span>
                    </div>
                  </div>
                )}

                {/* Key Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel?.amenities?.slice(0, 3)?.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                      <Icon name={amenity?.icon} size={12} />
                      <span>{amenity?.name}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(hotel)}
                    className="flex-1"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleWhatsAppInquiry(hotel)}
                    iconName="MessageCircle"
                    iconPosition="left"
                    iconSize={14}
                    className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white border-0"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedHotels;