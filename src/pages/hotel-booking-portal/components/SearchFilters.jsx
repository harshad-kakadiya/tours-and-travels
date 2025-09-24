import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const SearchFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const countries = ['Singapore', 'Thailand', 'Australia', 'Hong Kong', 'India'];
  const cities = ['Goa', 'Mumbai', 'Manali', 'Udaipur', 'Alleppey', 'Ooty'];
  const propertyTypes = ['Homestay', 'Hotel', 'Resort', 'Apartment'];
  const starRatings = [5, 4, 3, 2];

  const toggleArrayValue = (key, value) => {
    const current = filters?.[key] || [];
    const exists = current.includes(value);
    const next = exists ? current.filter(v => v !== value) : [...current, value];
    onFiltersChange({ ...filters, [key]: next });
  };

  return (
    <aside className="bg-card rounded-xl shadow-brand-soft p-4 sticky top-24 lg:w-80 w-full lg:max-h-[calc(100vh-120px)] overflow-auto">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-foreground">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-xs text-muted-foreground hover:text-foreground">Clear</Button>
      </div>

      {/* Country */}
      <div className="border-t border-border pt-4 mt-2">
        <button className="w-full flex items-center justify-between text-left font-medium text-foreground mb-3">
          <span>Country</span>
          <Icon name="ChevronDown" size={16} />
        </button>
        <div className="space-y-2">
          {countries.map((c) => (
            <Checkbox
              key={c}
              label={c}
              checked={(filters?.countries || []).includes(c)}
              onChange={() => toggleArrayValue('countries', c)}
            />
          ))}
        </div>
      </div>

      {/* City */}
      <div className="border-t border-border pt-4 mt-4">
        <button className="w-full flex items-center justify-between text-left font-medium text-foreground mb-3">
          <span>City</span>
          <Icon name="ChevronDown" size={16} />
        </button>
        <div className="space-y-2 max-h-56 overflow-auto pr-1">
          {cities.map((c) => (
            <Checkbox
              key={c}
              label={c}
              checked={(filters?.cities || []).includes(c)}
              onChange={() => toggleArrayValue('cities', c)}
            />
          ))}
        </div>
      </div>

      {/* Property Types */}
      <div className="border-t border-border pt-4 mt-4">
        <button className="w-full flex items-center justify-between text-left font-medium text-foreground mb-3">
          <span>Property Types</span>
          <Icon name="ChevronDown" size={16} />
        </button>
        <div className="space-y-2">
          {propertyTypes.map((t) => (
            <Checkbox
              key={t}
              label={t}
              checked={(filters?.propertyTypes || []).includes(t)}
              onChange={() => toggleArrayValue('propertyTypes', t)}
            />
          ))}
        </div>
      </div>

      {/* Hotel Star Rating */}
      <div className="border-t border-border pt-4 mt-4">
        <button className="w-full flex items-center justify-between text-left font-medium text-foreground mb-3">
          <span>Hotel Star Rating</span>
          <Icon name="ChevronDown" size={16} />
        </button>
        <div className="space-y-2">
          {starRatings.map((r) => (
            <Checkbox
              key={r}
              label={`${r} Star`}
              checked={(filters?.starRatings || []).includes(r)}
              onChange={() => toggleArrayValue('starRatings', r)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SearchFilters;