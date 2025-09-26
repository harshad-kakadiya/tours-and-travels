import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PackageCard = ({ package: pkg, onInquire, onCompare, isComparing, isSelected }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-800';
            case 'moderate': return 'bg-yellow-100 text-yellow-800';
            case 'challenging': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getThemeIcon = (theme) => {
        switch (theme) {
            case 'adventure': return 'Mountain';
            case 'cultural': return 'Building2';
            case 'spiritual': return 'Heart';
            case 'family': return 'Users';
            case 'romantic': return 'Heart';
            case 'wildlife': return 'TreePine';
            case 'beach': return 'Waves';
            default: return 'MapPin';
        }
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === pkg?.images?.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? pkg?.images?.length - 1 : prev - 1
        );
    };

    const handleWhatsAppInquiry = () => {
        const message = encodeURIComponent(`Hi! I'm interested in the "${pkg?.title}" package. Could you provide more details about pricing and availability?`);
        window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
    };

    return (
        <div className={`relative rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 ${
            isSelected ? 'ring-2 ring-primary' : ''
        }`}>
            {/* Background Image */}
            <div className="relative h-60 sm:h-72 md:h-80 lg:h-96">
                <Image
                    src={pkg?.images?.[currentImageIndex]}
                    alt={pkg?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Duration */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/20 backdrop-blur-sm text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {pkg?.duration} Days
                </div>

                {/* Status Badges */}
                <div className="absolute top-3 right-3 space-y-1 sm:space-y-2">
                    {pkg?.isNew && (
                        <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs sm:text-sm font-medium">
              New
            </span>
                    )}
                    {pkg?.isPopular && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs sm:text-sm font-medium">
              Popular
            </span>
                    )}
                </div>

                {/* Compare Checkbox */}
                {isComparing && (
                    <div className="absolute top-16 right-3 sm:right-4">
                        <button
                            onClick={() => onCompare(pkg?.id)}
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                                isSelected
                                    ? 'bg-primary border-primary text-primary-foreground'
                                    : 'bg-white/90 border-white hover:border-primary'
                            }`}
                            aria-label="Compare Package"
                        >
                            {isSelected && <Icon name="Check" size={14} />}
                        </button>
                    </div>
                )}

                {/* Tour Title and Location */}
                <div className="absolute bottom-24 left-4 right-4 sm:left-6 sm:right-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                        {pkg?.title}
                    </h3>
                    <p className="text-white/90 text-sm sm:text-base">
                        {pkg?.location}
                    </p>
                </div>

                {/* Pricing */}
                <div className="absolute bottom-4 left-4 sm:left-6">
                    <div className="flex flex-col items-start">
                        {pkg?.originalPrice && (
                            <span className="text-sm sm:text-base text-white/70 line-through">
                ₹{pkg?.originalPrice?.toLocaleString()}
              </span>
                        )}
                        <span className="text-xl sm:text-3xl font-bold text-white">
              ₹{pkg?.price?.toLocaleString()}
            </span>
                    </div>
                </div>

                {/* View Details Button */}
                <div className="absolute bottom-4 right-4 sm:right-6">
                    <a
                        href={`/tour/${pkg?.id}`}
                        className="bg-white text-black text-sm sm:text-base px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors inline-block"
                    >
                        View Details
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PackageCard;
