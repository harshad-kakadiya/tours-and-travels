import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ComparisonPanel = ({ packages, onRemove, onClear, isOpen, onToggle }) => {
  if (packages?.length === 0) return null;

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <Button
          onClick={onToggle}
          variant="default"
          size="lg"
          iconName="GitCompare"
          iconPosition="left"
          className="shadow-lg"
        >
          Compare ({packages?.length})
        </Button>
      </div>
      {/* Comparison Panel */}
      <div className={`fixed inset-x-0 bottom-0 lg:relative lg:inset-auto bg-background border-t lg:border border-border shadow-lg lg:rounded-lg transition-transform duration-300 z-30 ${
        isOpen ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'
      }`}>
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Compare Packages ({packages?.length}/3)
            </h3>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                iconName="Trash2"
                iconPosition="left"
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
              <button
                onClick={onToggle}
                className="lg:hidden p-2 hover:bg-muted rounded-full"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>

          {/* Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {packages?.map((pkg) => (
              <div key={pkg?.id} className="bg-card border border-border rounded-lg p-3 relative">
                {/* Remove Button */}
                <button
                  onClick={() => onRemove(pkg?.id)}
                  className="absolute top-2 right-2 p-1 bg-background border border-border rounded-full hover:bg-muted transition-colors"
                >
                  <Icon name="X" size={14} />
                </button>

                {/* Package Image */}
                <div className="h-24 rounded-md overflow-hidden mb-3">
                  <Image
                    src={pkg?.images?.[0]}
                    alt={pkg?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Package Info */}
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground text-sm line-clamp-2">
                    {pkg?.title}
                  </h4>
                  
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{pkg?.duration} Days</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Price:</span>
                      <span className="font-medium text-foreground">₹{pkg?.price?.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Rating:</span>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                        <span className="font-medium">{pkg?.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Theme:</span>
                      <span className="font-medium capitalize">{pkg?.theme}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Difficulty:</span>
                      <span className="font-medium capitalize">{pkg?.difficulty}</span>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs font-medium text-foreground mb-1">Top Highlights:</p>
                    <ul className="space-y-1">
                      {pkg?.highlights?.slice(0, 2)?.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-1 text-xs text-muted-foreground">
                          <Icon name="Check" size={10} className="text-accent flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Generate comparison report
                  const report = packages?.map(pkg => 
                    `${pkg?.title}\nPrice: ₹${pkg?.price?.toLocaleString()}\nDuration: ${pkg?.duration} days\nRating: ${pkg?.rating}/5\n`
                  )?.join('\n---\n');
                  
                  const message = encodeURIComponent(`Hi! I'd like to compare these packages:\n\n${report}\n\nCould you help me choose the best option?`);
                  window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
                }}
                iconName="MessageCircle"
                iconPosition="left"
                className="flex-1"
              >
                Get Comparison Help
              </Button>
              
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  // Download comparison PDF
                  const link = document.createElement('a');
                  link.href = '#';
                  link.download = 'package-comparison.pdf';
                  link?.click();
                }}
                iconName="Download"
                iconPosition="left"
                className="flex-1"
              >
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComparisonPanel;