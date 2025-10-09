import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OfficeLocation = () => {
  const officeDetails = {
    address: "WanderWise Tours Pvt. Ltd.\n3rd Floor, Travel Hub Complex\nConnaught Place, New Delhi - 110001\nIndia",
    coordinates: "28.6139,77.2090", // New Delhi coordinates
    phone: "+91 97258 55858",
    email: "info@wanderwise.com",
    hours: "Monday - Sunday: 9:00 AM - 9:00 PM"
  };

  const handleDirectionsClick = () => {
    const address = encodeURIComponent("Travel Hub Complex, Connaught Place, New Delhi");
    window.open(`https://www.google.com/maps/search/${address}`, '_blank');
  };

  const handleCallClick = () => {
    window.open(`tel:${officeDetails?.phone}`, '_self');
  };

  const handleEmailClick = () => {
    window.open(`mailto:${officeDetails?.email}`, '_self');
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Visit Our Office
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Drop by our office for personalized travel consultation and face-to-face assistance with your travel plans.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Office Information */}
          <div className="space-y-8">
            {/* Address Card */}
            <div className="bg-card rounded-2xl p-6 shadow-brand-soft border border-border/50">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" size={24} color="var(--color-primary)" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Office Address
                  </h3>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {officeDetails?.address}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDirectionsClick}
                    iconName="Navigation"
                    iconPosition="left"
                    className="mt-4"
                  >
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="bg-card rounded-2xl p-6 shadow-brand-soft border border-border/50">
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="Phone" size={24} color="var(--color-secondary)" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Call Us
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {officeDetails?.phone}
                  </p>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleCallClick}
                    iconName="Phone"
                    iconPosition="left"
                    fullWidth
                    className="bg-secondary hover:bg-secondary/90"
                  >
                    Call Now
                  </Button>
                </div>
              </div>

              {/* Email */}
              <div className="bg-card rounded-2xl p-6 shadow-brand-soft border border-border/50">
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="Mail" size={24} color="var(--color-accent)" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Email Us
                  </h3>
                  <p className="text-muted-foreground mb-4 break-all">
                    {officeDetails?.email}
                  </p>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleEmailClick}
                    iconName="Mail"
                    iconPosition="left"
                    fullWidth
                    className="bg-accent hover:bg-accent/90"
                  >
                    Send Email
                  </Button>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-card rounded-2xl p-6 shadow-brand-soft border border-border/50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" size={24} color="var(--color-primary)" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Office Hours
                  </h3>
                  <p className="text-muted-foreground">
                    {officeDetails?.hours}
                  </p>
                  <p className="text-sm text-accent mt-1">
                    • Emergency support available 24*7
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Services */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                What You Can Do at Our Office
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Users" size={16} color="var(--color-primary)" />
                  <span className="text-sm text-muted-foreground">Personal Consultation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="FileText" size={16} color="var(--color-primary)" />
                  <span className="text-sm text-muted-foreground">Document Assistance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="CreditCard" size={16} color="var(--color-primary)" />
                  <span className="text-sm text-muted-foreground">Payment Processing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Map" size={16} color="var(--color-primary)" />
                  <span className="text-sm text-muted-foreground">Itinerary Planning</span>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-card rounded-2xl overflow-hidden shadow-brand-medium border border-border/50">
              <div className="h-96 lg:h-[500px] relative">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="WanderWise Tours Office Location"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${officeDetails?.coordinates}&z=16&output=embed`}
                  className="border-0"
                />
                
                {/* Map Overlay */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-brand-soft">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-sm font-medium text-foreground">WanderWise Tours</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-heading font-semibold text-foreground">
                      Connaught Place, New Delhi
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Central Delhi • Easy Metro Access
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDirectionsClick}
                    iconName="ExternalLink"
                    iconPosition="right"
                  >
                    Open in Maps
                  </Button>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Car" size={14} />
                      <span>Parking Available</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Train" size={14} />
                      <span>Rajiv Chowk Metro</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficeLocation;