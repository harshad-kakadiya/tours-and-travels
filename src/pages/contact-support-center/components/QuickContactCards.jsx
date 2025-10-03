import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickContactCards = () => {
    const handleWhatsAppClick = () => {
        const message = encodeURIComponent("Hi! I need assistance with my travel plans. Could you please help me?");
        window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
    };

    const handleCallClick = (number) => {
        window.open(`tel:${number}`, '_self');
    };

    const handleEmailClick = (email) => {
        const subject = encodeURIComponent("Travel Assistance Needed");
        const body = encodeURIComponent(
            "Hi WanderWise Team,\n\nI need help with my travel plans. Please get back to me with the necessary details.\n\nThanks!"
        );
        window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_self');
    };

    const contactMethods = [
        {
            id: 1,
            title: "WhatsApp Support",
            description: "Get instant responses to your queries",
            icon: "MessageCircle",
            action: "Chat Now",
            color: "bg-[#25D366]",
            hoverColor: "hover:bg-[#128C7E]",
            textColor: "text-white",
            details: "Available 24/7 • Average response: 2 minutes",
            onClick: handleWhatsAppClick,
        },
        {
            id: 2,
            title: "Call Us Direct",
            description: "Speak with our travel experts",
            icon: "Phone",
            action: "Call Now",
            color: "bg-primary",
            hoverColor: "hover:bg-primary/90",
            textColor: "text-white",
            details: "+91 98765 43210 • Mon-Sun: 9 AM - 9 PM",
            onClick: () => handleCallClick("+919876543210"),
        },
        {
            id: 3,
            title: "Email Support",
            description: "Detailed assistance for complex queries",
            icon: "Mail",
            action: "Send Email",
            color: "bg-secondary",
            hoverColor: "hover:bg-secondary/90",
            textColor: "text-white",
            details: "support@wanderwise.com • Response within 4 hours",
            onClick: () => handleEmailClick("support@wanderwise.com"),
        },
    ];

    return (
        <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                        Choose Your Preferred Contact Method
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Multiple ways to reach us, all designed to provide you with the fastest and most convenient support experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contactMethods.map((method) => (
                        <div
                            key={method.id}
                            className="bg-card rounded-2xl p-6 shadow-brand-soft hover:shadow-brand-medium transition-all duration-brand-normal hover:-translate-y-1 border border-border/50"
                        >
                            <div className="text-center">
                                <div
                                    className={`w-16 h-16 ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-brand-soft`}
                                >
                                    <Icon name={method.icon} size={28} color="white" strokeWidth={2} />
                                </div>

                                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                                    {method.title}
                                </h3>

                                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                    {method.description}
                                </p>

                                <p className="text-xs text-muted-foreground mb-6 bg-muted/50 rounded-lg p-2">
                                    {method.details}
                                </p>

                                <Button
                                    variant="default"
                                    size="sm"
                                    onClick={method.onClick}
                                    fullWidth
                                    className={`${method.color} ${method.hoverColor} ${method.textColor} border-0 thumb-friendly`}
                                >
                                    {method.action}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Indicators */}
                <div className="mt-12 text-center">
                    <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
                        <div className="flex items-center space-x-2">
                            <Icon name="Shield" size={20} color="var(--color-accent)" />
                            <span className="text-sm">Secure Communication</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Icon name="Clock" size={20} color="var(--color-accent)" />
                            <span className="text-sm">Quick Response Time</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Icon name="Users" size={20} color="var(--color-accent)" />
                            <span className="text-sm">Expert Travel Advisors</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Icon name="Award" size={20} color="var(--color-accent)" />
                            <span className="text-sm">5-Star Customer Service</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuickContactCards;
