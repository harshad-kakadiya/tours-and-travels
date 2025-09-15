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
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <div className="relative rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300">
      {/* Background Image */}
      <div className="relative h-80">
        <Image
          src={hotel?.images?.[currentImageIndex]}
          alt={hotel?.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
                {/* Star Rating - Top Left */}
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {hotel?.starRating} Star
                </div>

                {/* Status Badge - Top Right */}
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Verified
                </div>

        {/* Hotel Title - Large White Text */}
        <div className="absolute bottom-20 left-6 right-6">
          <h3 className="text-2xl font-bold text-white mb-2">
            {hotel?.name}
          </h3>
          <p className="text-white/90 text-sm">
            {hotel?.location}
          </p>
        </div>

        {/* Pricing - Bottom Left */}
        <div className="absolute bottom-6 left-6">
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-white">
              ₹{hotel?.pricePerNight?.toLocaleString()}
            </span>
            <span className="text-lg text-white/70">
              per night
            </span>
          </div>
        </div>

        {/* View Details Button - Bottom Right */}
        <div className="absolute bottom-6 right-6">
          <button 
            onClick={() => onViewDetails(hotel)}
            className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;