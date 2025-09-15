import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ onCategoryChange, activeCategory }) => {
  const categories = [
    { id: 'all', name: 'All Articles', icon: 'Grid3X3', count: 156 },
    { id: 'destinations', name: 'Destinations', icon: 'MapPin', count: 45 },
    { id: 'culture', name: 'Culture & Heritage', icon: 'Crown', count: 28 },
    { id: 'adventure', name: 'Adventure', icon: 'Mountain', count: 32 },
    { id: 'food', name: 'Food & Cuisine', icon: 'ChefHat', count: 24 },
    { id: 'budget', name: 'Budget Travel', icon: 'Wallet', count: 18 },
    { id: 'photography', name: 'Photography', icon: 'Camera', count: 15 },
    { id: 'tips', name: 'Travel Tips', icon: 'Lightbulb', count: 22 }
  ];

  return (
    <section className="bg-card/50 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
              Explore by Category
            </h2>
            <p className="text-muted-foreground">
              Find the perfect travel inspiration for your next adventure
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Filter" size={16} />
              <span>Filter by:</span>
            </div>
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>Latest First</option>
              <option>Most Popular</option>
              <option>Most Viewed</option>
            </select>
          </div>
        </div>
        
        <div className="mt-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2 min-w-max">
            {categories?.map((category) => (
              <button
                key={category?.id}
                onClick={() => onCategoryChange(category?.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                  activeCategory === category?.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-background hover:bg-muted/50 text-muted-foreground hover:text-foreground border border-border/50'
                }`}
              >
                <Icon 
                  name={category?.icon} 
                  size={18} 
                  color={activeCategory === category?.id ? 'currentColor' : 'currentColor'}
                />
                <span>{category?.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeCategory === category?.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {category?.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;