import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TravelTools = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const [budgetInputs, setBudgetInputs] = useState({
    destination: '',
    duration: '',
    travelers: '',
    accommodation: 'mid-range'
  });

  const tools = [
    {
      id: 'calculator',
      name: 'Budget Calculator',
      icon: 'Calculator',
      description: 'Plan your travel budget with our smart calculator'
    },
    {
      id: 'checklist',
      name: 'Packing Checklist',
      icon: 'CheckSquare',
      description: 'Never forget essentials with our comprehensive checklist'
    },
    {
      id: 'planner',
      name: 'Itinerary Planner',
      icon: 'Calendar',
      description: 'Create detailed day-by-day travel plans'
    }
  ];

  const destinations = [
    'Goa', 'Kerala', 'Rajasthan', 'Himachal Pradesh', 'Uttarakhand', 'Karnataka', 'Tamil Nadu', 'Maharashtra'
  ];

  const handleInputChange = (field, value) => {
    setBudgetInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateBudget = () => {
    const { duration, travelers, accommodation } = budgetInputs;
    if (!duration || !travelers) return 0;
    
    const baseRates = {
      'budget': 1500,
      'mid-range': 3000,
      'luxury': 6000
    };
    
    return baseRates?.[accommodation] * parseInt(duration) * parseInt(travelers);
  };

  const renderBudgetCalculator = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Destination
          </label>
          <select
            value={budgetInputs?.destination}
            onChange={(e) => handleInputChange('destination', e?.target?.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Select destination</option>
            {destinations?.map(dest => (
              <option key={dest} value={dest}>{dest}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Duration (Days)
          </label>
          <input
            type="number"
            value={budgetInputs?.duration}
            onChange={(e) => handleInputChange('duration', e?.target?.value)}
            placeholder="Enter number of days"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Number of Travelers
          </label>
          <input
            type="number"
            value={budgetInputs?.travelers}
            onChange={(e) => handleInputChange('travelers', e?.target?.value)}
            placeholder="Enter number of people"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Accommodation Type
          </label>
          <select
            value={budgetInputs?.accommodation}
            onChange={(e) => handleInputChange('accommodation', e?.target?.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="budget">Budget (₹1,500/day)</option>
            <option value="mid-range">Mid-range (₹3,000/day)</option>
            <option value="luxury">Luxury (₹6,000/day)</option>
          </select>
        </div>
      </div>
      
      {budgetInputs?.duration && budgetInputs?.travelers && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Estimated Budget
            </h4>
            <div className="text-3xl font-bold text-primary mb-2">
              ₹{calculateBudget()?.toLocaleString('en-IN')}
            </div>
            <p className="text-sm text-muted-foreground">
              For {budgetInputs?.travelers} travelers, {budgetInputs?.duration} days
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderPackingChecklist = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Shirt" size={18} />
            <span>Clothing Essentials</span>
          </h4>
          <div className="space-y-3">
            {['Comfortable walking shoes', 'Weather-appropriate clothing', 'Undergarments', 'Sleepwear', 'Swimwear (if needed)']?.map((item, index) => (
              <label key={index} className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-sm text-foreground">{item}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Briefcase" size={18} />
            <span>Travel Documents</span>
          </h4>
          <div className="space-y-3">
            {['Valid ID/Passport', 'Travel tickets', 'Hotel confirmations', 'Travel insurance', 'Emergency contacts']?.map((item, index) => (
              <label key={index} className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-sm text-foreground">{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderItineraryPlanner = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h4 className="text-lg font-semibold text-foreground mb-2">
          Interactive Itinerary Planner
        </h4>
        <p className="text-muted-foreground mb-6">
          Create detailed day-by-day plans for your perfect trip
        </p>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors duration-200">
          Start Planning
        </button>
      </div>
    </div>
  );

  return (
    <section className="bg-muted/30 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Travel Planning Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Make your travel planning easier with our comprehensive suite of tools and calculators
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-brand-medium overflow-hidden">
          <div className="border-b border-border">
            <div className="flex overflow-x-auto">
              {tools?.map((tool) => (
                <button
                  key={tool?.id}
                  onClick={() => setActiveTab(tool?.id)}
                  className={`flex items-center space-x-3 px-6 py-4 font-medium transition-colors duration-200 whitespace-nowrap ${
                    activeTab === tool?.id
                      ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={tool?.icon} size={20} />
                  <div className="text-left">
                    <div>{tool?.name}</div>
                    <div className="text-xs opacity-75">{tool?.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-8">
            {activeTab === 'calculator' && renderBudgetCalculator()}
            {activeTab === 'checklist' && renderPackingChecklist()}
            {activeTab === 'planner' && renderItineraryPlanner()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelTools;