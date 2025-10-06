import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const HotelDetailsModal = ({ hotel, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    rooms: '1',
    specialRequests: ''
  });

  if (!isOpen || !hotel) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === hotel?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? hotel?.images?.length - 1 : prev - 1
    );
  };

  const handleInquirySubmit = (e) => {
    e?.preventDefault();
    const message = encodeURIComponent(`Hotel Inquiry - ${hotel?.name}

Name: ${inquiryData?.name}
Email: ${inquiryData?.email}
Phone: ${inquiryData?.phone}
Check-in: ${inquiryData?.checkIn}
Check-out: ${inquiryData?.checkOut}
Guests: ${inquiryData?.guests}
Rooms: ${inquiryData?.rooms}
Special Requests: ${inquiryData?.specialRequests}

Please provide availability and pricing details.`);
    
    window.open(`https://wa.me/919725855858?text=${message}`, '_blank');
    setShowInquiryForm(false);
    onClose();
  };

  const handleInputChange = (field, value) => {
    setInquiryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-brand">
      <div className="bg-background rounded-xl shadow-brand-large max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            {hotel?.name}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors duration-brand-fast"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {!showInquiryForm ? (
            <>
              {/* Image Gallery */}
              <div className="relative h-80">
                <Image
                  src={hotel?.images?.[currentImageIndex]}
                  alt={`${hotel?.name} - View ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {hotel?.images?.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-brand-fast"
                    >
                      <Icon name="ChevronLeft" size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-brand-fast"
                    >
                      <Icon name="ChevronRight" size={20} />
                    </button>
                  </>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {hotel?.images?.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-brand-fast ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Hotel Details */}
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-medium">
                        {hotel?.starRating} Star
                      </div>
                      {hotel?.isVerified && (
                        <div className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-sm font-medium flex items-center space-x-1">
                          <Icon name="Shield" size={14} />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center text-muted-foreground mb-3">
                      <Icon name="MapPin" size={16} className="mr-2" />
                      <span>{hotel?.location}</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)]?.map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={16}
                            className={i < Math.floor(hotel?.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="ml-2 font-medium text-foreground">{hotel?.rating}</span>
                      <span className="ml-1 text-muted-foreground">({hotel?.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">₹{hotel?.pricePerNight?.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">per night</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-3">About This Hotel</h3>
                  <p className="text-muted-foreground leading-relaxed">{hotel?.description}</p>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {hotel?.amenities?.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name={amenity?.icon} size={16} className="text-primary" />
                        <span>{amenity?.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location Map */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-3">Location</h3>
                  <div className="w-full h-64 rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      loading="lazy"
                      title={hotel?.name}
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=${hotel?.coordinates?.lat},${hotel?.coordinates?.lng}&z=14&output=embed`}
                      className="border-0"
                    />
                  </div>
                </div>

                {/* Recent Reviews */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-3">Recent Reviews</h3>
                  <div className="space-y-4">
                    {hotel?.recentReviews?.map((review, index) => (
                      <div key={index} className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                              {review?.guestName?.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-foreground">{review?.guestName}</div>
                              <div className="text-xs text-muted-foreground">{review?.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)]?.map((_, i) => (
                              <Icon
                                key={i}
                                name="Star"
                                size={12}
                                className={i < review?.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review?.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => setShowInquiryForm(true)}
                    iconName="MessageSquare"
                    iconPosition="left"
                    iconSize={16}
                    className="flex-1"
                  >
                    Send Inquiry
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => {
                      const message = encodeURIComponent(`Hi! I'm interested in booking ${hotel?.name} in ${hotel?.location}. Could you help me with availability and pricing?`);
                      window.open(`https://wa.me/919725855858?text=${message}`, '_blank');
                    }}
                    iconName="MessageCircle"
                    iconPosition="left"
                    iconSize={16}
                    className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white border-0"
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>
            </>
          ) : (
            /* Inquiry Form */
            (<div className="p-6">
              <div className="mb-6">
                <h3 className="font-heading font-semibold text-xl text-foreground mb-2">Send Inquiry</h3>
                <p className="text-muted-foreground">Fill in your details and we'll get back to you with availability and pricing.</p>
              </div>
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    type="text"
                    required
                    value={inquiryData?.name}
                    onChange={(e) => handleInputChange('name', e?.target?.value)}
                    placeholder="Enter your full name"
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    value={inquiryData?.email}
                    onChange={(e) => handleInputChange('email', e?.target?.value)}
                    placeholder="Enter your email"
                  />
                </div>

                <Input
                  label="Phone Number"
                  type="tel"
                  required
                  value={inquiryData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  placeholder="Enter your phone number"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Check-in Date"
                    type="date"
                    required
                    value={inquiryData?.checkIn}
                    onChange={(e) => handleInputChange('checkIn', e?.target?.value)}
                  />
                  <Input
                    label="Check-out Date"
                    type="date"
                    required
                    value={inquiryData?.checkOut}
                    onChange={(e) => handleInputChange('checkOut', e?.target?.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Number of Guests"
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={inquiryData?.guests}
                    onChange={(e) => handleInputChange('guests', e?.target?.value)}
                  />
                  <Input
                    label="Number of Rooms"
                    type="number"
                    min="1"
                    max="5"
                    required
                    value={inquiryData?.rooms}
                    onChange={(e) => handleInputChange('rooms', e?.target?.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={inquiryData?.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e?.target?.value)}
                    placeholder="Any special requests or requirements..."
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowInquiryForm(false)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    iconName="Send"
                    iconPosition="left"
                    iconSize={16}
                    className="flex-1"
                  >
                    Send Inquiry
                  </Button>
                </div>
              </form>
            </div>)
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsModal;