import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HotelCard = ({ hotel, onInquire, onViewDetails }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === hotel?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? hotel?.images?.length - 1 : prev - 1
    );
  };

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(`Hi! I'm interested in ${hotel?.name} in ${hotel?.location}. Could you provide more details about availability and pricing?`);
    window.open(`https://wa.me/919725855858?text=${message}`, '_blank');
  };

  const getAmenityIcon = (name) => {
    if (!name) return 'Circle';
    const n = String(name).toLowerCase();
    if (n.includes('wifi')) return 'Wifi';
    if (n.includes('pool')) return 'Waves';
    if (n.includes('spa')) return 'Flower2';
    if (n.includes('gym') || n.includes('fitness')) return 'Dumbbell';
    if (n.includes('restaurant')) return 'UtensilsCrossed';
    if (n.includes('parking')) return 'Car';
    if (n.includes('air') && n.includes('conditioning')) return 'Snowflake';
    if (n.includes('breakfast')) return 'Coffee';
    return 'Check';
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-brand-medium transition-all duration-300">
      {/* IMAGE */}
      <div className="relative h-48 md:h-56">
        <Image
          src={hotel?.images?.[currentImageIndex]}
          alt={hotel?.name}
          className="w-full h-full object-cover"
        />
        {/* badges */}
        <div className="absolute top-3 left-3 bg-black/50 text-white px-2 py-0.5 rounded-md text-xs">{hotel?.starRating} Star</div>
        <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-0.5 rounded-md text-xs">Verified</div>
      </div>

      {/* BODY */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground line-clamp-1">{hotel?.name}</h3>
        <div className="mt-1 flex items-center text-sm text-muted-foreground">
          <Icon name="MapPin" size={14} className="mr-1" />
          <span className="line-clamp-1">{hotel?.location}</span>
        </div>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name="Star" size={14} className={i < Math.round(hotel?.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
            ))}
          </div>
          {hotel?.rating && <span className="text-xs text-muted-foreground">{Number(hotel?.rating).toFixed(1)}</span>}
        </div>

        {/* Amenities */}
        <div className="mt-3 flex flex-wrap gap-2">
          {(hotel?.amenities || []).slice(0, 4).map((a, idx) => (
            <div key={idx} className="flex items-center gap-1 bg-muted/50 text-muted-foreground px-2 py-1 rounded-md text-xs">
              <Icon name={getAmenityIcon(a?.name || a)} size={12} />
              <span className="truncate max-w-[110px]">{a?.name || a}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            {hotel?.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">₹{hotel?.originalPrice?.toLocaleString()}</span>
            )}
            <span className="text-xl font-bold text-foreground">₹{hotel?.pricePerNight?.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">/ night</span>
          </div>
          <button
            onClick={() => onViewDetails(hotel)}
            className="px-3 py-2 text-sm rounded-md border border-border hover:bg-muted/60 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;