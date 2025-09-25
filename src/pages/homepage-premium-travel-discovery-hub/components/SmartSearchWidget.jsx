import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const SmartSearchWidget = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    destination: '',
    budget: '',
    duration: '',
    travelStyle: ''
  });

  const destinations = [
    "Kerala", "Rajasthan", "Goa", "Himachal Pradesh", "Uttarakhand", 
    "Karnataka", "Tamil Nadu", "Maharashtra", "Gujarat", "Andhra Pradesh"
  ];

  const budgetRanges = [
    { label: "₹15,000 - ₹30,000", value: "15000-30000" },
    { label: "₹30,000 - ₹50,000", value: "30000-50000" },
    { label: "₹50,000 - ₹75,000", value: "50000-75000" },
    { label: "₹75,000 - ₹1,00,000", value: "75000-100000" },
    { label: "₹1,00,000 - ₹2,00,000", value: "100000-200000" }
  ];

  const durations = [
    { label: "2-3 Days", value: "2-3" },
    { label: "4-5 Days", value: "4-5" },
    { label: "6-7 Days", value: "6-7" },
    { label: "8-10 Days", value: "8-10" },
    { label: "10+ Days", value: "10+" }
  ];

  const travelStyles = [
    { label: "Adventure", value: "adventure" },
    { label: "Cultural", value: "cultural" },
    { label: "Relaxation", value: "relaxation" },
    { label: "Family", value: "family" },
    { label: "Romantic", value: "romantic" },
    { label: "Solo", value: "solo" }
  ];

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    // Navigate to tour packages with search parameters
    const searchParams = new URLSearchParams();
    Object.entries(searchData)?.forEach(([key, value]) => {
      if (value) searchParams?.append(key, value);
    });
    
    navigate(`/tour-packages-discovery-center?${searchParams?.toString()}`);
  };

  const handleQuickSearch = (destination) => {
    navigate(`/tour-packages-discovery-center?destination=${destination}`);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 mx-4 sm:mx-6 lg:mx-8  z-20">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2">
          Find Your Perfect Journey
        </h2>
        <p className="text-muted-foreground text-lg">
          Discover curated experiences tailored to your preferences
        </p>
      </div>
      {/* Search Form */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Destination */}
        <div className="relative">
          <label className="block text-sm font-medium text-foreground mb-2">
            <Icon name="MapPin" size={16} className="inline mr-2" />
            Destination
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Where to?"
              value={searchData?.destination}
              onChange={(e) => handleInputChange('destination', e?.target?.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
              list="destinations"
            />
            <datalist id="destinations">
              {destinations?.map((dest) => (
                <option key={dest} value={dest} />
              ))}
            </datalist>
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            <Icon name="IndianRupee" size={16} className="inline mr-2" />
            Budget Range
          </label>
          <select
            value={searchData?.budget}
            onChange={(e) => handleInputChange('budget', e?.target?.value)}
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 bg-white"
          >
            <option value="">Select budget</option>
            {budgetRanges?.map((range) => (
              <option key={range?.value} value={range?.value}>
                {range?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            <Icon name="Calendar" size={16} className="inline mr-2" />
            Duration
          </label>
          <select
            value={searchData?.duration}
            onChange={(e) => handleInputChange('duration', e?.target?.value)}
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 bg-white"
          >
            <option value="">Select duration</option>
            {durations?.map((duration) => (
              <option key={duration?.value} value={duration?.value}>
                {duration?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Travel Style */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            <Icon name="Heart" size={16} className="inline mr-2" />
            Travel Style
          </label>
          <select
            value={searchData?.travelStyle}
            onChange={(e) => handleInputChange('travelStyle', e?.target?.value)}
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 bg-white"
          >
            <option value="">Select style</option>
            {travelStyles?.map((style) => (
              <option key={style?.value} value={style?.value}>
                {style?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Search Button */}
      <div className="text-center mb-8">
        <Button
          variant="default"
          size="lg"
          onClick={handleSearch}
          iconName="Search"
          iconPosition="left"
          className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold"
        >
          Search Packages
        </Button>
      </div>
    </div>
  );
};

export default SmartSearchWidget;