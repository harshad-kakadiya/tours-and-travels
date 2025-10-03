import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import api from '../../../utils/api';
import { useAuth } from '../../../contexts/AuthContext';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        inquiryType: '',
        destination: '',
        travelDates: '',
        groupSize: '',
        budgetRange: {
            min: 0,
            max: 0
        },
        yourMessage: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const inquiryTypes = [
        { value: 'Custom Package', label: 'Custom Package' },
        { value: 'Group Tour', label: 'Group Tour' },
        { value: 'Hotel Booking', label: 'Hotel Booking' },
        { value: 'Taxi Service', label: 'Taxi Service' },
        { value: 'Adventure Trip', label: 'Adventure Trip' },
        { value: 'General Support', label: 'General Support' }
    ];

    const destinations = [
        { value: 'rajasthan', label: 'Rajasthan' },
        { value: 'kerala', label: 'Kerala' },
        { value: 'goa', label: 'Goa' },
        { value: 'himachal', label: 'Himachal Pradesh' },
        { value: 'uttarakhand', label: 'Uttarakhand' },
        { value: 'kashmir', label: 'Kashmir' },
        { value: 'karnataka', label: 'Karnataka' },
        { value: 'tamil-nadu', label: 'Tamil Nadu' },
        { value: 'maharashtra', label: 'Maharashtra' },
        { value: 'other', label: 'Other Destination' }
    ];

    const groupSizes = [
        { value: '1', label: 'Solo Traveler' },
        { value: '2', label: 'Couple (2 people)' },
        { value: '3-5', label: 'Small Group (3-5 people)' },
        { value: '6-10', label: 'Medium Group (6-10 people)' },
        { value: '10+', label: 'Large Group (10+ people)' }
    ];

    const budgetRanges = [
        { value: 'budget', label: 'Budget (₹10,000 - ₹25,000)' },
        { value: 'mid-range', label: 'Mid-Range (₹25,000 - ₹50,000)' },
        { value: 'premium', label: 'Premium (₹50,000 - ₹1,00,000)' },
        { value: 'luxury', label: 'Luxury (₹1,00,000+)' },
        { value: 'flexible', label: 'Flexible Budget' }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => {
            // Handle nested objects for travelDates and budgetRange
            if (field.includes('.')) {
                const [parent, child] = field.split('.');
                return {
                    ...prev,
                    [parent]: {
                        ...prev[parent],
                        [child]: value
                    }
                };
            }
            
            return {
                ...prev,
                [field]: value
            };
        });
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        setIsSubmitting(true);

        try {
            // Make API call to the correct endpoint
            const response = await api.post('https://tour-travels-be-h58q.onrender.com/api/inquiry', formData);
            
            // Handle successful submission
            setIsSubmitting(false);
            setShowSuccess(true);

            // Reset form after success
            setTimeout(() => {
                setShowSuccess(false);
                setFormData({
                    fullname: '',
                    email: '',
                    phoneNumber: '',
                    inquiryType: '',
                    preferredDestination: '',
                    travelDates: {
                        from: '',
                        to: ''
                    },
                    groupSize: '',
                    budgetRange: {
                        min: 0,
                        max: 0
                    },
                    yourMessage: ''
                });
            }, 3000);
        } catch (error) {
            console.error('Error submitting contact form:', error);
            setIsSubmitting(false);
            // You could add error handling UI here if needed
        }
    };

    const isFormValid = formData?.fullname && formData?.email && formData?.phoneNumber && formData?.inquiryType && formData?.yourMessage;

    if (showSuccess) {
        return (
            <section className="py-16 bg-muted/30">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-card rounded-2xl shadow-brand-medium p-8 text-center">
                        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Icon name="CheckCircle" size={40} color="var(--color-accent)" strokeWidth={2} />
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                            Thank You for Reaching Out!
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            We've received your inquiry and our travel experts will get back to you within 2 hours. Check your email for confirmation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="default"
                                onClick={() => {
                                    const message = encodeURIComponent(`Hi! I just submitted an inquiry form. My name is ${formData?.name}. Could you please provide an update on my request?`);
                                    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
                                }}
                                iconName="MessageCircle"
                                iconPosition="left"
                                className="bg-[#25D366] hover:bg-[#128C7E] text-white border-0"
                            >
                                Chat on WhatsApp
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setShowSuccess(false)}
                            >
                                Submit Another Inquiry
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-muted/30">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                        Send Us Your Travel Inquiry
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Share your travel dreams with us. Our experts will craft a personalized itinerary just for you.
                    </p>
                </div>

                <div className="bg-card rounded-2xl shadow-brand-medium p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Full Name"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData?.fullname}
                                onChange={(e) => handleInputChange('fullname', e?.target?.value)}
                                required
                            />
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="your.email@example.com"
                                value={formData?.email}
                                onChange={(e) => handleInputChange('email', e?.target?.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Phone Number"
                                type="tel"
                                placeholder="+91 98765 43210"
                                value={formData?.phoneNumber}
                                onChange={(e) => handleInputChange('phoneNumber', e?.target?.value)}
                                required
                            />
                            <Select
                                label="Inquiry Type"
                                placeholder="Select inquiry type"
                                options={inquiryTypes}
                                value={formData?.inquiryType}
                                onChange={(value) => handleInputChange('inquiryType', value)}
                                required
                            />
                        </div>

                        {/* Travel Details */}
                        <div className="border-t border-border/50 pt-6">
                            <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
                                <Icon name="MapPin" size={20} className="mr-2" />
                                Travel Details (Optional)
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Select
                                    label="Preferred Destination"
                                    placeholder="Select destination"
                                    options={destinations}
                                    value={formData?.preferredDestination}
                                    onChange={(value) => handleInputChange('preferredDestination', value)}
                                    searchable
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <Input
                                        label="From Date"
                                        type="date"
                                        value={formData?.travelDates?.from}
                                        onChange={(e) => handleInputChange('travelDates.from', e?.target?.value)}
                                    />
                                    <Input
                                        label="To Date"
                                        type="date"
                                        value={formData?.travelDates?.to}
                                        onChange={(e) => handleInputChange('travelDates.to', e?.target?.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <Select
                                    label="Group Size"
                                    placeholder="Select group size"
                                    options={groupSizes}
                                    value={formData?.groupSize}
                                    onChange={(value) => handleInputChange('groupSize', parseInt(value) || 0)}
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <Input
                                        label="Min Budget (₹)"
                                        type="number"
                                        placeholder="Min"
                                        value={formData?.budgetRange?.min}
                                        onChange={(e) => handleInputChange('budgetRange.min', parseInt(e?.target?.value) || 0)}
                                    />
                                    <Input
                                        label="Max Budget (₹)"
                                        type="number"
                                        placeholder="Max"
                                        value={formData?.budgetRange?.max}
                                        onChange={(e) => handleInputChange('budgetRange.max', parseInt(e?.target?.value) || 0)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="border-t border-border/50 pt-6">
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Your Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-brand-fast"
                                rows={5}
                                placeholder="Tell us about your travel plans, preferences, special requirements, or any questions you have..."
                                value={formData?.yourMessage}
                                onChange={(e) => handleInputChange('yourMessage', e?.target?.value)}
                                required
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                The more details you provide, the better we can assist you.
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <Button
                                type="submit"
                                variant="default"
                                size="lg"
                                loading={isSubmitting}
                                disabled={!isFormValid}
                                iconName="Send"
                                iconPosition="right"
                                className="flex-0 sm:flex-1"
                            >
                                {isSubmitting ? 'Sending Inquiry...' : 'Send Inquiry'}
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={() => {
                                    const message = encodeURIComponent("Hi! I'd like to discuss my travel plans. Can you help me with a personalized itinerary?");
                                    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
                                }}
                                iconName="MessageCircle"
                                iconPosition="left"
                                className="bg-[#25D366] hover:bg-[#128C7E] text-white border-0"
                            >
                                Quick WhatsApp
                            </Button>
                        </div>

                        {/* Form Footer */}
                        <div className="text-center pt-4 border-t border-border/50">
                            <p className="text-sm text-muted-foreground">
                                By submitting this form, you agree to our{' '}
                                <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>{' '}
                                and{' '}
                                <span className="text-primary cursor-pointer hover:underline">Terms of Service</span>.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;