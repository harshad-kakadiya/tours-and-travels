import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PackageModal = ({ package: pkg, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    travelDate: '',
    travelers: '',
    message: ''
  });

  if (!isOpen || !pkg) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'itinerary', label: 'Itinerary', icon: 'Route' },
    { id: 'inclusions', label: 'Inclusions', icon: 'CheckCircle' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'inquiry', label: 'Inquiry', icon: 'MessageSquare' }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'challenging': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === pkg?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? pkg?.images?.length - 1 : prev - 1
    );
  };

  const handleInputChange = (e) => {
    setInquiryForm({
      ...inquiryForm,
      [e?.target?.name]: e?.target?.value
    });
  };

  const handleInquirySubmit = (e) => {
    e?.preventDefault();
    const message = encodeURIComponent(`Hi! I'm interested in "${pkg?.title}" package.\n\nDetails:\nName: ${inquiryForm?.name}\nEmail: ${inquiryForm?.email}\nPhone: ${inquiryForm?.phone}\nTravel Date: ${inquiryForm?.travelDate}\nTravelers: ${inquiryForm?.travelers}\nMessage: ${inquiryForm?.message}`);
    window.open(`https://wa.me/919725855858?text=${message}`, '_blank');
  };

  const downloadBrochure = () => {
    // Mock PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${pkg?.title?.replace(/\s+/g, '-')}-brochure.pdf`;
    link?.click();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative h-full flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">{pkg?.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row h-[calc(90vh-80px)]">
            {/* Left Panel - Image Gallery */}
            <div className="lg:w-1/2 relative">
              <div className="relative h-64 lg:h-full">
                <Image
                  src={pkg?.images?.[currentImageIndex]}
                  alt={pkg?.title}
                  className="w-full h-full object-cover"
                />
                
                {pkg?.images?.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    >
                      <Icon name="ChevronLeft" size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    >
                      <Icon name="ChevronRight" size={20} />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {currentImageIndex + 1} / {pkg?.images?.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="p-2 bg-muted/50 overflow-x-auto">
                <div className="flex gap-2">
                  {pkg?.images?.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${pkg?.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Content */}
            <div className="lg:w-1/2 flex flex-col">
              {/* Tabs */}
              <div className="border-b border-border">
                <div className="flex overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      {tab?.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Icon name="MapPin" size={16} className="text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{pkg?.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Calendar" size={16} className="text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{pkg?.duration} Days</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(pkg?.difficulty)}`}>
                          {pkg?.difficulty}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{pkg?.description}</p>
                      
                      {/* Pricing */}
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-2xl font-bold text-foreground">₹{pkg?.price?.toLocaleString()}</span>
                          {pkg?.originalPrice && (
                            <span className="text-muted-foreground line-through">
                              ₹{pkg?.originalPrice?.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">Per person (inclusive of taxes)</p>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Package Highlights</h3>
                      <ul className="space-y-2">
                        {pkg?.highlights?.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Icon name="Check" size={16} className="text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'itinerary' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Day-wise Itinerary</h3>
                    {pkg?.itinerary?.map((day, index) => (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                            {day?.day}
                          </div>
                          <h4 className="font-semibold text-foreground">{day?.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground ml-11">{day?.description}</p>
                        {day?.activities && (
                          <ul className="mt-2 ml-11 space-y-1">
                            {day?.activities?.map((activity, actIndex) => (
                              <li key={actIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Icon name="Clock" size={12} />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'inclusions' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-green-700">What's Included</h3>
                      <ul className="space-y-2">
                        {pkg?.inclusions?.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Icon name="Check" size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-red-700">What's Not Included</h3>
                      <ul className="space-y-2">
                        {pkg?.exclusions?.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Icon name="X" size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-foreground">{pkg?.rating}</div>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)]?.map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={16}
                              className={i < Math.floor(pkg?.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">{pkg?.reviewCount} reviews</div>
                      </div>
                    </div>
                    
                    {pkg?.reviews?.map((review, index) => (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                            <Icon name="User" size={16} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-foreground">{review?.name}</span>
                              <div className="flex items-center gap-1">
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
                            <p className="text-sm text-muted-foreground mb-2">{review?.comment}</p>
                            <span className="text-xs text-muted-foreground">{review?.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'inquiry' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Send Inquiry</h3>
                    <form onSubmit={handleInquirySubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Full Name"
                          name="name"
                          value={inquiryForm?.name}
                          onChange={handleInputChange}
                          required
                        />
                        <Input
                          label="Email"
                          type="email"
                          name="email"
                          value={inquiryForm?.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Phone Number"
                          type="tel"
                          name="phone"
                          value={inquiryForm?.phone}
                          onChange={handleInputChange}
                          required
                        />
                        <Input
                          label="Preferred Travel Date"
                          type="date"
                          name="travelDate"
                          value={inquiryForm?.travelDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <Input
                        label="Number of Travelers"
                        type="number"
                        name="travelers"
                        value={inquiryForm?.travelers}
                        onChange={handleInputChange}
                        min="1"
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Additional Message
                        </label>
                        <textarea
                          name="message"
                          value={inquiryForm?.message}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Any specific requirements or questions..."
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        variant="default"
                        iconName="Send"
                        iconPosition="left"
                        fullWidth
                      >
                        Send Inquiry via WhatsApp
                      </Button>
                    </form>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={downloadBrochure}
                    iconName="Download"
                    iconPosition="left"
                    className="flex-1"
                  >
                    Download PDF
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => {
                      const message = encodeURIComponent(`Hi! I'm interested in the "${pkg?.title}" package. Could you provide more details?`);
                      window.open(`https://wa.me/919725855858?text=${message}`, '_blank');
                    }}
                    iconName="MessageCircle"
                    iconPosition="left"
                    className="flex-1 bg-[#25D366] hover:bg-[#128C7E] border-0"
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageModal;