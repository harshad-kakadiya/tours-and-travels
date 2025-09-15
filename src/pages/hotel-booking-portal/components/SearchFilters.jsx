import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const priceRanges = [
    { label: 'Under ₹2,000', min: 0, max: 2000 },
    { label: '₹2,000 - ₹5,000', min: 2000, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
    { label: 'Above ₹20,000', min: 20000, max: 999999 }
  ];

  const starRatings = [5, 4, 3, 2, 1];

  const amenityOptions = [
    { id: 'wifi', name: 'Free WiFi', icon: 'Wifi' },
    { id: 'pool', name: 'Swimming Pool', icon: 'Waves' },
    { id: 'spa', name: 'Spa & Wellness', icon: 'Flower2' },
    { id: 'gym', name: 'Fitness Center', icon: 'Dumbbell' },
    { id: 'restaurant', name: 'Restaurant', icon: 'UtensilsCrossed' },
    { id: 'parking', name: 'Free Parking', icon: 'Car' },
    { id: 'ac', name: 'Air Conditioning', icon: 'Snowflake' },
    { id: 'breakfast', name: 'Breakfast', icon: 'Coffee' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handlePriceRangeChange = (range) => {
    handleFilterChange('priceRange', range);
  };

  const handleStarRatingChange = (rating) => {
    const newRatings = filters?.starRatings?.includes(rating)
      ? filters?.starRatings?.filter(r => r !== rating)
      : [...filters?.starRatings, rating];
    handleFilterChange('starRatings', newRatings);
  };

  const handleAmenityChange = (amenityId) => {
    const newAmenities = filters?.amenities?.includes(amenityId)
      ? filters?.amenities?.filter(a => a !== amenityId)
      : [...filters?.amenities, amenityId];
    handleFilterChange('amenities', newAmenities);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.location) count++;
    if (filters?.priceRange) count++;
    if (filters?.starRatings?.length > 0) count++;
    if (filters?.amenities?.length > 0) count++;
    return count;
  };

  return (
    <div className="bg-card rounded-xl shadow-brand-soft p-4 mb-6">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search by city, hotel name, or area..."
            value={filters?.location}
            onChange={(e) => handleFilterChange('location', e?.target?.value)}
            className="w-full"
          />
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            iconSize={16}
            className="whitespace-nowrap"
          >
            Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
          </Button>
          {getActiveFiltersCount() > 0 && (
            <Button
              variant="ghost"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={16}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-border pt-4 space-y-6">
          {/* Price Range */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center">
              <Icon name="IndianRupee" size={16} className="mr-2" />
              Price Range (per night)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {priceRanges?.map((range, index) => (
                <button
                  key={index}
                  onClick={() => handlePriceRangeChange(range)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all duration-brand-fast ${
                    filters?.priceRange?.min === range?.min && filters?.priceRange?.max === range?.max
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {range?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Star Rating */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center">
              <Icon name="Star" size={16} className="mr-2" />
              Star Rating
            </h4>
            <div className="flex flex-wrap gap-2">
              {starRatings?.map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleStarRatingChange(rating)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-brand-fast ${
                    filters?.starRatings?.includes(rating)
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>{rating}</span>
                  <Icon name="Star" size={14} className="fill-current" />
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center">
              <Icon name="Settings" size={16} className="mr-2" />
              Amenities
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {amenityOptions?.map((amenity) => (
                <button
                  key={amenity?.id}
                  onClick={() => handleAmenityChange(amenity?.id)}
                  className={`flex items-center space-x-2 p-3 rounded-lg border text-sm font-medium transition-all duration-brand-fast ${
                    filters?.amenities?.includes(amenity?.id)
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={amenity?.icon} size={16} />
                  <span className="truncate">{amenity?.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;