import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeaturedArticle = () => {
  const featuredArticle = {
    id: 1,
    title: "Hidden Temples of Hampi: A Photographer\'s Paradise",
    excerpt: `Discover the mystical ruins of Hampi, where ancient stones whisper tales of the Vijayanagara Empire. This comprehensive guide reveals the best photography spots, hidden temples unknown to most tourists, and the perfect golden hour locations that will transform your travel photography.\n\nFrom the iconic Stone Chariot to secret sunrise viewpoints, learn how to capture Hampi's ethereal beauty while respecting its sacred heritage.`,
    author: {
      name: "Priya Sharma",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      role: "Travel Photographer & Heritage Expert"
    },
    publishedAt: "2025-01-10",
    readTime: "12 min read",
    category: "Photography",
    tags: ["Hampi", "Photography", "Heritage", "Karnataka"],
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    stats: {
      views: "15.2K",
      likes: 342,
      comments: 28,
      shares: 156
    }
  };

  return (
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Star" size={16} />
            <span>Featured Article</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Editor's Pick
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our most comprehensive guide this month, handpicked for its exceptional insights and stunning visuals
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-brand-medium overflow-hidden hover:shadow-brand-large transition-shadow duration-300">
          <div className="lg:flex">
            <div className="lg:w-1/2">
              <div className="relative h-64 lg:h-full overflow-hidden">
                <Image
                  src={featuredArticle?.image}
                  alt={featuredArticle?.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {featuredArticle?.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  {featuredArticle?.tags?.slice(0, 2)?.map((tag, index) => (
                    <span key={index} className="bg-black/50 text-white px-2 py-1 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 p-8 lg:p-12">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Image
                    src={featuredArticle?.author?.avatar}
                    alt={featuredArticle?.author?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground">{featuredArticle?.author?.name}</p>
                    <p className="text-sm text-muted-foreground">{featuredArticle?.author?.role}</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4 leading-tight">
                {featuredArticle?.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {featuredArticle?.excerpt?.split('\n')?.[0]}
              </p>
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={16} />
                    <span>Jan 10, 2025</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={16} />
                    <span>{featuredArticle?.readTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={16} />
                    <span>{featuredArticle?.stats?.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={16} />
                    <span>{featuredArticle?.stats?.likes}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Icon name="BookOpen" size={18} />
                  <span>Read Full Article</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-6 py-3 border border-border hover:bg-muted/50 rounded-lg font-medium transition-colors duration-200">
                  <Icon name="Bookmark" size={18} />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticle;