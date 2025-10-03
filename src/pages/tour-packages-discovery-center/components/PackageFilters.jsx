import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PackageFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [stateOptions, setStateOptions] = useState([
    { value: '', label: 'All States' }
  ]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch('https://tour-travels-be.onrender.com/api/state');
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          const states = data.map(state => ({
            value: state.name.toLowerCase(),
            label: state.name.charAt(0).toUpperCase() + state.name.slice(1)
          }));
          
          setStateOptions([
            { value: '', label: 'All States' },
            ...states
          ]);
        }
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);

  const durationOptions = [
    { value: '', label: 'Any Duration' },
    { value: '2-4', label: '2-4 Days' },
    { value: '5-7', label: '5-7 Days' },
    { value: '8-10', label: '8-10 Days' },
    { value: '11-15', label: '11-15 Days' }
  ];

  const budgetOptions = [
    { value: '', label: 'Any Budget' },
    { value: '0-15000', label: 'Under ₹15,000' },
    { value: '15000-30000', label: '₹15,000 - ₹30,000' },
    { value: '30000-50000', label: '₹30,000 - ₹50,000' },
    { value: '50000-75000', label: '₹50,000 - ₹75,000' },
    { value: '75000+', label: 'Above ₹75,000' }
  ];

  const themeOptions = [
    { value: '', label: 'All Themes' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'spiritual', label: 'Spiritual' },
    { value: 'family', label: 'Family' },
    { value: 'romantic', label: 'Romantic' },
    { value: 'wildlife', label: 'Wildlife' },
    { value: 'beach', label: 'Beach' },
    { value: 'mountain', label: 'Mountain' }
  ];

  const difficultyOptions = [
    { value: '', label: 'Any Difficulty' },
    { value: 'easy', label: 'Easy' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'challenging', label: 'Challenging' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "Filter"}
          iconPosition="left"
          fullWidth
          className="justify-between p-4 h-auto"
        >
          <span className="flex items-center gap-2">
            Filters
            {hasActiveFilters && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </span>
        </Button>
      </div>
      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Filter Packages</h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                iconName="X"
                iconPosition="left"
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {/* State Filter */}
            <div>
              <Select
                label="Destination State"
                options={stateOptions}
                value={filters?.state}
                onChange={(value) => handleFilterChange('state', value)}
                placeholder="Select state"
              />
            </div>

            {/* Duration Filter */}
            <div>
              <Select
                label="Trip Duration"
                options={durationOptions}
                value={filters?.duration}
                onChange={(value) => handleFilterChange('duration', value)}
                placeholder="Select duration"
              />
            </div>

            {/* Budget Filter */}
            <div>
              <Select
                label="Budget Range"
                options={budgetOptions}
                value={filters?.budget}
                onChange={(value) => handleFilterChange('budget', value)}
                placeholder="Select budget"
              />
            </div>

            {/* Theme Filter */}
            {/*<div>*/}
            {/*  <Select*/}
            {/*    label="Travel Theme"*/}
            {/*    options={themeOptions}*/}
            {/*    value={filters?.theme}*/}
            {/*    onChange={(value) => handleFilterChange('theme', value)}*/}
            {/*    placeholder="Select theme"*/}
            {/*  />*/}
            {/*</div>*/}

            {/* Difficulty Filter */}
            <div>
              <Select
                label="Difficulty Level"
                options={difficultyOptions}
                value={filters?.difficulty}
                onChange={(value) => handleFilterChange('difficulty', value)}
                placeholder="Select difficulty"
              />
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="mt-6 pt-4 border-t border-border">
              <h4 className="text-sm font-medium text-foreground mb-2">Active Filters:</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(filters)?.map(([key, value]) => {
                  if (!value) return null;
                  
                  let displayValue = value;
                  const option = [...stateOptions, ...durationOptions, ...budgetOptions, ...themeOptions, ...difficultyOptions]?.find(opt => opt?.value === value);
                  if (option) displayValue = option?.label;

                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                    >
                      {displayValue}
                      <button
                        onClick={() => handleFilterChange(key, '')}
                        className="hover:bg-primary/20 rounded-full p-0.5"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageFilters;