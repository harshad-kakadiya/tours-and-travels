import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqCategories = [
    {
      id: 'booking',
      title: 'Booking & Reservations',
      icon: 'Calendar',
      faqs: [
        {
          id: 1,
          question: "How do I book a tour package with WanderWise?",
          answer: `You can book a tour package in multiple ways:\n• Fill out our inquiry form on the website\n• Contact us via WhatsApp at +91 97258 55858\n• Call our booking hotline directly\n• Visit our office in Connaught Place, New Delhi\n\nOur travel experts will help you customize the perfect itinerary based on your preferences and budget.`
        },
        {
          id: 2,
          question: "What payment methods do you accept?",
          answer: `We accept various payment methods for your convenience:\n• Credit/Debit Cards (Visa, MasterCard, RuPay)\n• UPI payments (PhonePe, Google Pay, Paytm)\n• Net Banking from all major banks\n• Cash payments at our office\n• EMI options available for packages above ₹50,000\n\nAll online payments are secured with 256-bit SSL encryption.`
        },
        {
          id: 3,
          question: "Can I modify or cancel my booking?",
          answer: `Yes, you can modify or cancel your booking:\n\n• Free cancellation up to 15 days before travel\n• 50% refund for cancellations 7-14 days before travel\n• 25% refund for cancellations 3-6 days before travel\n• No refund for cancellations within 48 hours\n\nModifications are subject to availability and may incur additional charges. Contact our support team for assistance.`
        }
      ]
    },
    {
      id: 'travel',
      title: 'Travel & Documentation',
      icon: 'Passport',
      faqs: [
        {
          id: 4,
          question: "What documents do I need for domestic travel?",
          answer: `For domestic travel within India, you need:\n• Valid government-issued photo ID (Aadhar Card, Passport, Driving License, or Voter ID)\n• For air travel: ID proof is mandatory\n• For train travel: ID proof required for reserved tickets\n• For hotel check-ins: Original ID proof required\n\nWe recommend carrying both physical and digital copies of your documents.`
        },
        {
          id: 5,
          question: "Do you provide travel insurance?",
          answer: `Yes, we offer comprehensive travel insurance options:\n• Medical emergency coverage up to ₹5 lakhs\n• Trip cancellation and interruption coverage\n• Lost baggage and personal effects protection\n• 24/7 emergency assistance\n\nTravel insurance is optional but highly recommended. Our team will help you choose the right coverage based on your travel plans.`
        },
        {
          id: 6,
          question: "What should I pack for my trip?",
          answer: `Packing depends on your destination and season:\n\n• Check weather forecasts before packing\n• Comfortable walking shoes are essential\n• Carry layers for temperature variations\n• Don't forget chargers and power banks\n• Pack any personal medications\n\nWe provide detailed packing checklists specific to your destination and season when you book with us.`
        }
      ]
    },
    {
      id: 'support',title: 'Support & Assistance',icon: 'Headphones',
      faqs: [
        {
          id: 7,
          question: "How can I reach customer support during my trip?",
          answer: `We provide 24/7 support during your trip:\n• Emergency helpline: +91 97258 55858\n• WhatsApp support: +91 97258 55858\n• Email: emergency@wanderwise.com\n• Local coordinator contact details provided\n\nOur support team can assist with any issues, changes, or emergencies during your travel.`
        },
        {
          id: 8,
          question: "What if I face issues with hotels or services?",
          answer: `If you face any issues during your trip:\n• Contact our 24/7 helpline immediately\n• Document the issue with photos if possible\n• Our local coordinators will resolve issues on-site\n• We guarantee alternative arrangements if needed\n\nYour satisfaction is our priority, and we'll ensure any problems are resolved quickly.`
        },
        {
          id: 9,
          question: "How do I provide feedback about my experience?",
          answer: `We value your feedback and encourage you to share:\n• Fill out our post-trip feedback form\n• Leave reviews on our website and social media\n• Email us at feedback@wanderwise.com\n• Call our feedback hotline\n\nYour feedback helps us improve our services and assists other travelers in making informed decisions.`
        }
      ]
    }
  ];

  const toggleFAQ = (faqId) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find quick answers to common questions about our services, booking process, and travel policies.
          </p>
        </div>

        <div className="space-y-8">
          {faqCategories?.map((category) => (
            <div key={category?.id} className="bg-card rounded-2xl shadow-brand-soft border border-border/50 overflow-hidden">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 px-6 py-4 border-b border-border/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon name={category?.icon} size={20} color="var(--color-primary)" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground">
                    {category?.title}
                  </h3>
                </div>
              </div>

              {/* FAQs */}
              <div className="divide-y divide-border/50">
                {category?.faqs?.map((faq) => (
                  <div key={faq?.id} className="p-6">
                    <button
                      onClick={() => toggleFAQ(faq?.id)}
                      className="w-full flex items-center justify-between text-left group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2 -m-2"
                    >
                      <h4 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-brand-fast pr-4">
                        {faq?.question}
                      </h4>
                      <div className={`flex-shrink-0 transition-transform duration-brand-normal ${
                        openFAQ === faq?.id ? 'rotate-180' : ''
                      }`}>
                        <Icon 
                          name="ChevronDown" 
                          size={20} 
                          color="var(--color-muted-foreground)" 
                          strokeWidth={2}
                        />
                      </div>
                    </button>

                    <div className={`mt-4 transition-all duration-brand-normal overflow-hidden ${
                      openFAQ === faq?.id 
                        ? 'max-h-96 opacity-100' :'max-h-0 opacity-0'
                    }`}>
                      <div className="text-muted-foreground leading-relaxed whitespace-pre-line bg-muted/30 rounded-lg p-4">
                        {faq?.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 text-center">
          <div className="bg-card rounded-2xl shadow-brand-soft border border-border/50 p-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="HelpCircle" size={32} color="var(--color-primary)" strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Can't find what you're looking for? Our travel experts are here to help you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const message = encodeURIComponent("Hi! I have some questions that aren't covered in your FAQ. Could you please help me?");
                  window.open(`https://wa.me/919725855858?text=${message}`, '_blank');
                }}
                className="inline-flex items-center justify-center px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg font-medium transition-colors duration-brand-fast thumb-friendly"
              >
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Chat on WhatsApp
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;