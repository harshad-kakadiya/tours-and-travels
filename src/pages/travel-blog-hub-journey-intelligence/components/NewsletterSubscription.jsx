import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const benefits = [
    {
      icon: 'Mail',
      title: 'Weekly Travel Digest',
      description: 'Curated articles and destination highlights delivered every Tuesday'
    },
    {
      icon: 'MapPin',
      title: 'Exclusive Destination Guides',
      description: 'Access to detailed guides and insider tips not available on the blog'
    },
    {
      icon: 'Tag',
      title: 'Special Offers',
      description: 'Early access to package deals and exclusive discounts for subscribers'
    },
    {
      icon: 'Users',
      title: 'Community Access',
      description: 'Join our private Facebook group for travel discussions and meetups'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-primary via-primary/95 to-secondary py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Sparkles" size={16} />
            <span>Join 25,000+ Travel Enthusiasts</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Never Miss a Travel Story
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Get the best travel insights, destination guides, and exclusive offers delivered straight to your inbox
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {benefits?.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex-shrink-0">
                  <Icon name={benefit?.icon} size={24} color="white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {benefit?.title}
                  </h3>
                  <p className="text-white/80">
                    {benefit?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-6">
              <Icon name="Mail" size={48} color="white" className="mx-auto mb-4" />
              <h3 className="text-2xl font-heading font-bold text-white mb-2">
                Subscribe Now
              </h3>
              <p className="text-white/80">
                Join our community and start your journey to better travel experiences
              </p>
            </div>
            
            {isSubscribed ? (
              <div className="text-center py-8">
                <div className="bg-accent/20 border border-accent/30 rounded-lg p-6">
                  <Icon name="CheckCircle" size={48} color="white" className="mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Welcome to WanderWise!
                  </h4>
                  <p className="text-white/80">
                    Check your email for a confirmation link and your first travel guide
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e?.target?.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 rounded-lg text-foreground placeholder-muted-foreground bg-white/95 backdrop-blur-sm border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Icon name="Send" size={20} />
                  <span>Subscribe to Newsletter</span>
                </button>
                
                <p className="text-xs text-white/70 text-center">
                  By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
                </p>
              </form>
            )}
            
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center justify-center space-x-6 text-sm text-white/80">
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={16} />
                  <span>No Spam</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={16} />
                  <span>Weekly</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="X" size={16} />
                  <span>Unsubscribe Anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscription;