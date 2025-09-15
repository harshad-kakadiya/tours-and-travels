import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SupportTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: `The WanderWise support team went above and beyond when our flight got cancelled during our Rajasthan trip. They immediately arranged alternative transportation and even upgraded our hotel. Their 24/7 WhatsApp support was a lifesaver!`,
      supportType: "Emergency Assistance",
      responseTime: "Within 15 minutes"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Bangalore, Karnataka",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: `I had so many questions about the Kerala backwater tour, and their team patiently answered every single one. The detailed itinerary they provided helped me prepare perfectly. Excellent customer service from start to finish.`,
      supportType: "Pre-Trip Consultation",
      responseTime: "Same day response"
    },
    {
      id: 3,
      name: "Anjali Patel",
      location: "Ahmedabad, Gujarat",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: `When I needed to modify my Himachal Pradesh trip dates due to a family emergency, the WanderWise team handled everything smoothly. No hidden charges, no hassles. They truly care about their customers.`,
      supportType: "Booking Modification",
      responseTime: "Within 2 hours"
    },
    {
      id: 4,
      name: "Vikram Singh",
      location: "Delhi, NCR",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: `The local coordinator in Goa was fantastic! When we had issues with our hotel room, one call to WanderWise and they resolved it within an hour. Their ground support network is impressive.`,
      supportType: "On-Trip Support",
      responseTime: "Immediate resolution"
    },
    {
      id: 5,
      name: "Meera Reddy",
      location: "Hyderabad, Telangana",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: `As a solo female traveler, I was nervous about my Kashmir trip. The WanderWise team provided constant support and regular check-ins. I felt safe and well-cared for throughout my journey.`,
      supportType: "Solo Travel Support",
      responseTime: "Regular check-ins"
    },
    {
      id: 6,
      name: "Arjun Mehta",
      location: "Pune, Maharashtra",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: `Planning a group trip for 15 people seemed overwhelming, but WanderWise made it effortless. Their team coordinated everything perfectly and was available whenever we needed assistance. Highly recommended!`,
      supportType: "Group Booking Support",
      responseTime: "Dedicated coordinator"
    }
  ];

  const supportStats = [
    {
      icon: "Clock",
      value: "< 2 min",
      label: "Average Response Time",
      color: "text-primary"
    },
    {
      icon: "Users",
      value: "50,000+",
      label: "Happy Customers",
      color: "text-secondary"
    },
    {
      icon: "Star",
      value: "4.9/5",
      label: "Customer Rating",
      color: "text-accent"
    },
    {
      icon: "Shield",
      value: "24/7",
      label: "Support Available",
      color: "text-primary"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        color={index < rating ? "#F59E0B" : "#E5E7EB"}
        strokeWidth={0}
        className={index < rating ? "fill-current" : ""}
      />
    ));
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            What Our Customers Say About Our Support
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from travelers who received exceptional support from our dedicated customer service team.
          </p>
        </div>

        {/* Support Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {supportStats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-card rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-brand-soft border border-border/50">
                <Icon name={stat?.icon} size={28} color={`var(--color-${stat?.color?.replace('text-', '')})`} strokeWidth={2} />
              </div>
              <div className={`text-2xl md:text-3xl font-heading font-bold ${stat?.color} mb-1`}>
                {stat?.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial) => (
            <div
              key={testimonial?.id}
              className="bg-card rounded-2xl p-6 shadow-brand-soft hover:shadow-brand-medium transition-all duration-brand-normal border border-border/50 hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="CheckCircle" size={14} color="white" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-semibold text-foreground">
                    {testimonial?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial?.location}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial?.rating)}
              </div>

              {/* Review */}
              <blockquote className="text-muted-foreground leading-relaxed mb-4 text-sm">
                "{testimonial?.review}"
              </blockquote>

              {/* Support Details */}
              <div className="border-t border-border/50 pt-4">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <Icon name="Tag" size={12} color="var(--color-primary)" />
                    <span className="text-primary font-medium">
                      {testimonial?.supportType}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
                    <span className="text-muted-foreground">
                      {testimonial?.responseTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
              Experience Our Award-Winning Support
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied travelers who trust WanderWise for exceptional customer service and support throughout their journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const message = encodeURIComponent("Hi! I'd like to experience your customer support. Can you help me plan my next trip?");
                  window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
                }}
                className="inline-flex items-center justify-center px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg font-medium transition-colors duration-brand-fast thumb-friendly"
              >
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Start Planning Your Trip
              </button>
              <button
                onClick={() => window.open('tel:+919876543210', '_self')}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors duration-brand-fast thumb-friendly"
              >
                <Icon name="Phone" size={20} className="mr-2" />
                Speak with an Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportTestimonials;