import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContactForm = () => {
    const [formData, setFormData] = useState({
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState('');

    // Token - you can get this from your auth context, localStorage, or environment variables
    const [authToken] = useState(localStorage.getItem('authToken') || 'your-auth-token-here');

    const inquiryTypes = [
        { value: 'tour-package', label: 'Tour Package Inquiry' },
        { value: 'hotel-booking', label: 'Hotel Booking' },
        { value: 'taxi-service', label: 'Taxi Service' },
        { value: 'custom-itinerary', label: 'Custom Itinerary' },
        { value: 'group-booking', label: 'Group Booking' },
        { value: 'support', label: 'General Support' },
        { value: 'feedback', label: 'Feedback & Suggestions' }
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
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleTravelDateChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            travelDates: {
                ...prev.travelDates,
                [field]: value
            }
        }));
    };

    // Function to get token from your preferred source
    const getAuthToken = () => {
        // Choose one of these methods based on your setup:

        // Method 1: From localStorage (recommended)
        return localStorage.getItem('authToken');

        // Method 2: From sessionStorage
        // return sessionStorage.getItem('authToken');

        // Method 3: From context/state
        // return authToken;

        // Method 4: From environment variable
        // return process.env.REACT_APP_API_TOKEN;

        // Method 5: Hardcoded (for testing - remove in production)
        // return 'your-actual-auth-token-here';
    };

    // Function to map budget range values to min and max values
    const getBudgetRange = (budgetValue) => {
        switch (budgetValue) {
            case 'budget':
                return { min: 10000, max: 25000 };
            case 'mid-range':
                return { min: 25000, max: 50000 };
            case 'premium':
                return { min: 50000, max: 100000 };
            case 'luxury':
                return { min: 100000, max: 500000 };
            case 'flexible':
                return { min: 0, max: 0 };
            default:
                return { min: 0, max: 0 };
        }
    };

    // Function to parse group size string to number
    const parseGroupSize = (groupSizeValue) => {
        switch (groupSizeValue) {
            case '1':
                return 1;
            case '2':
                return 2;
            case '3-5':
                return 4; // average of 3-5
            case '6-10':
                return 8; // average of 6-10
            case '10+':
                return 12; // default for 10+
            default:
                return 0;
        }
    };

    // Function to format date for API
    const formatDateForAPI = (dateString) => {
        if (!dateString) return '';
        // If it's already in the correct format, return as is
        if (dateString.includes('T')) return dateString;

        // Otherwise, convert to ISO string
        const date = new Date(dateString);
        return date.toISOString();
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Get authentication token
            const token = getAuthToken();

            if (!token) {
                throw new Error('Authentication token not found. Please log in again.');
            }

            // Prepare the payload for API - matching the exact field names from your API
            const payload = {
                fullname: formData.fullname,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                inquiryType: formData.inquiryType,
                preferredDestination: formData.preferredDestination,
                travelDates: {
                    from: formatDateForAPI(formData.travelDates.from),
                    to: formatDateForAPI(formData.travelDates.to)
                },
                groupSize: parseGroupSize(formData.groupSize),
                budgetRange: formData.budget ? getBudgetRange(formData.budget) : { min: 0, max: 0 },
                yourMessage: formData.yourMessage
            };

            console.log('Submitting payload:', payload); // For debugging

            // API call to submit inquiry with token in header
            const response = await fetch('https://tour-travels-be-h58q.onrender.com/api/Inquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    // Alternative header formats if needed:
                    // 'x-auth-token': token,
                    // 'token': token,
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || `Failed to submit inquiry: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log('API Response:', result); // For debugging

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
            console.error('Error submitting inquiry:', error);
            setIsSubmitting(false);
            setError(error.message || 'Failed to submit inquiry. Please try again.');

            // Auto-hide error after 5 seconds
            setTimeout(() => {
                setError('');
            }, 5000);
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
                                    const message = encodeURIComponent(`Hi! I just submitted an inquiry form. My name is ${formData?.fullname}. Could you please provide an update on my request?`);
                                    window.open(`https://wa.me/919725855858?text=${message}`, '_blank');
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
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center">
                            <Icon name="AlertCircle" size={20} className="mr-2" />
                            {error}
                        </div>
                    )}

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
                                placeholder="+91 97258 55858"
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
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground">
                                        Travel Dates
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <Input
                                            type="date"
                                            placeholder="From Date"
                                            value={formData?.travelDates?.from}
                                            onChange={(e) => handleTravelDateChange('from', e?.target?.value)}
                                        />
                                        <Input
                                            type="date"
                                            placeholder="To Date"
                                            value={formData?.travelDates?.to}
                                            onChange={(e) => handleTravelDateChange('to', e?.target?.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <Select
                                    label="Group Size"
                                    placeholder="Select group size"
                                    options={groupSizes}
                                    value={formData?.groupSize}
                                    onChange={(value) => handleInputChange('groupSize', value)}
                                />
                                <Select
                                    label="Budget Range"
                                    placeholder="Select budget range"
                                    options={budgetRanges}
                                    value={formData?.budget}
                                    onChange={(value) => handleInputChange('budget', value)}
                                />
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
                                disabled={!isFormValid || isSubmitting}
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
                                    window.open(`https://wa.me/919725855858?text=${message}`, '_blank');
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