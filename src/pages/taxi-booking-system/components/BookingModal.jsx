import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const BookingModal = ({ isOpen, onClose, bookingData, selectedDriver }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    passengers: '1',
    specialRequests: '',
    emergencyContact: '',
    agreeTerms: false,
    whatsappUpdates: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    // Simulate booking API call
    setTimeout(() => {
      setBookingConfirmed(true);
      setIsSubmitting(false);
    }, 2000);
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(`Hi! I've booked a taxi through WanderWise Tours. Booking ID: WW${Date.now()?.toString()?.slice(-6)}. Please confirm my ride details.`);
    window.open(`https://wa.me/919725855858?text=${message}`, '_blank');
  };

  if (bookingConfirmed) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-background rounded-xl max-w-md w-full p-6 animate-fade-in">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Booking Confirmed!</h3>
            <p className="text-muted-foreground mb-4">
              Your taxi has been booked successfully. You'll receive confirmation details shortly.
            </p>
            
            <div className="bg-card p-4 rounded-lg mb-6 text-left">
              <h4 className="font-medium text-foreground mb-2">Booking Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking ID:</span>
                  <span className="text-foreground font-medium">WW{Date.now()?.toString()?.slice(-6)}</span>
                </div>
                {selectedDriver && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Driver:</span>
                    <span className="text-foreground">{selectedDriver?.name}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contact:</span>
                  <span className="text-foreground">{formData?.phone}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="default"
                fullWidth
                onClick={handleWhatsAppContact}
                iconName="MessageCircle"
                iconPosition="left"
                iconSize={16}
                className="bg-[#25D366] hover:bg-[#128C7E] text-white border-0"
              >
                Contact on WhatsApp
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Complete Your Booking</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Booking Summary */}
          <div className="bg-card p-4 rounded-lg mb-6">
            <h4 className="font-medium text-foreground mb-3">Booking Summary</h4>
            <div className="space-y-2 text-sm">
              {bookingData?.type === 'fixed-route' ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Package:</span>
                    <span className="text-foreground">{bookingData?.data?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="text-foreground">{bookingData?.data?.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vehicle:</span>
                    <span className="text-foreground">{bookingData?.data?.vehicleType}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-foreground">Total Amount:</span>
                    <span className="text-primary">₹{bookingData?.data?.price}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">From:</span>
                    <span className="text-foreground">{bookingData?.data?.pickup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">To:</span>
                    <span className="text-foreground">{bookingData?.data?.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trip Type:</span>
                    <span className="text-foreground capitalize">{bookingData?.data?.tripType?.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Distance:</span>
                    <span className="text-foreground">{bookingData?.data?.calculation?.distance} km</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-foreground">Total Amount:</span>
                    <span className="text-primary">₹{bookingData?.data?.calculation?.total}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Selected Driver */}
          {selectedDriver && (
            <div className="bg-card p-4 rounded-lg mb-6">
              <h4 className="font-medium text-foreground mb-3">Selected Driver</h4>
              <div className="flex items-center space-x-3">
                <img
                  src={selectedDriver?.photo}
                  alt={selectedDriver?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-foreground">{selectedDriver?.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {selectedDriver?.vehicle} • {selectedDriver?.vehicleNumber}
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
                    <span className="text-muted-foreground">{selectedDriver?.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={formData?.fullName}
                onChange={(e) => handleInputChange('fullName', e?.target?.value)}
                required
              />
              
              <Input
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                required
              />
              
              <Input
                label="Number of Passengers"
                type="number"
                min="1"
                max="8"
                value={formData?.passengers}
                onChange={(e) => handleInputChange('passengers', e?.target?.value)}
                required
              />
            </div>

            <Input
              label="Emergency Contact"
              type="tel"
              placeholder="Emergency contact number"
              value={formData?.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
              description="For safety purposes"
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Special Requests
              </label>
              <textarea
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows="3"
                placeholder="Any special requirements or requests..."
                value={formData?.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e?.target?.value)}
              />
            </div>

            <div className="space-y-3">
              <Checkbox
                label="I agree to the Terms & Conditions and Privacy Policy"
                checked={formData?.agreeTerms}
                onChange={(e) => handleInputChange('agreeTerms', e?.target?.checked)}
                required
              />
              
              <Checkbox
                label="Send booking updates via WhatsApp"
                checked={formData?.whatsappUpdates}
                onChange={(e) => handleInputChange('whatsappUpdates', e?.target?.checked)}
                description="Get real-time updates about your booking"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                fullWidth
                loading={isSubmitting}
                disabled={!formData?.agreeTerms}
                iconName="CreditCard"
                iconPosition="left"
                iconSize={16}
              >
                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;