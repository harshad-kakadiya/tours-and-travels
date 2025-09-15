import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ArticleGrid = ({ activeCategory }) => {
  const articles = [
    {
      id: 2,
      title: "Rajasthan\'s Desert Safari: Beyond the Tourist Trail",
      excerpt: "Explore authentic desert experiences in Thar, from camel breeding farms to traditional music sessions under starlit skies.",
      author: {
        name: "Arjun Mehta",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      publishedAt: "2025-01-08",
      readTime: "8 min read",
      category: "Adventure",
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: { views: "8.5K", likes: 234 }
    },
    {
      id: 3,
      title: "Kerala Backwaters: A Complete Houseboat Guide",
      excerpt: "Navigate Kerala's serene backwaters with insider tips on choosing houseboats, best routes, and authentic local experiences.",
      author: {
        name: "Meera Nair",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      },
      publishedAt: "2025-01-06",
      readTime: "10 min read",
      category: "Destinations",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: { views: "12.3K", likes: 456 }
    },
    {
      id: 4,
      title: "Street Food Adventures in Old Delhi",
      excerpt: "A foodie's guide to navigating Chandni Chowk's legendary street food scene, from paranthas to jalebis.",
      author: {
        name: "Rohit Kumar",
        avatar: "https://randomuser.me/api/portraits/men/33.jpg"
      },
      publishedAt: "2025-01-04",
      readTime: "6 min read",
      category: "Food & Cuisine",
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: { views: "9.8K", likes: 312 }
    },
    {
      id: 5,
      title: "Budget Backpacking Through Himachal Pradesh",
      excerpt: "Complete guide to exploring Himachal on a shoestring budget, including accommodation, transport, and hidden gems.",
      author: {
        name: "Sneha Gupta",
        avatar: "https://randomuser.me/api/portraits/women/41.jpg"
      },
      publishedAt: "2025-01-02",
      readTime: "15 min read",
      category: "Budget Travel",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: { views: "18.7K", likes: 678 }
    },
    {
      id: 6,
      title: "Goa\'s Hidden Beaches: Beyond the Crowds",
      excerpt: "Discover secluded beaches in South Goa where you can enjoy pristine sands and authentic coastal culture.",
      author: {
        name: "Carlos D\'Silva",
        avatar: "https://randomuser.me/api/portraits/men/52.jpg"
      },
      publishedAt: "2024-12-30",
      readTime: "7 min read",
      category: "Destinations",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: { views: "11.2K", likes: 389 }
    },
    {
      id: 7,
      title: "Temple Architecture of Tamil Nadu",
      excerpt: "Journey through Tamil Nadu's magnificent temples, understanding their architectural significance and cultural importance.",
      author: {
        name: "Dr. Lakshmi Iyer",
        avatar: "https://randomuser.me/api/portraits/women/38.jpg"
      },
      publishedAt: "2024-12-28",
      readTime: "12 min read",
      category: "Culture & Heritage",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: { views: "7.4K", likes: 198 }
    },
    {
      id: 8,
      title: "Photography Tips for Mountain Landscapes",
      excerpt: "Master the art of mountain photography with techniques for capturing dramatic peaks, weather, and golden hour magic.",
      author: {
        name: "Vikram Singh",
        avatar: "https://randomuser.me/api/portraits/men/29.jpg"
      },
      publishedAt: "2024-12-26",
      readTime: "9 min read",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1464822759844-d150baec93c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: { views: "13.6K", likes: 523 }
    },
    {
      id: 9,
      title: "Essential Travel Apps for India",
      excerpt: "Must-have mobile apps for navigating India's transport, language barriers, payments, and local discoveries.",
      author: {
        name: "Anita Sharma",
        avatar: "https://randomuser.me/api/portraits/women/35.jpg"
      },
      publishedAt: "2024-12-24",
      readTime: "5 min read",
      category: "Travel Tips",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: { views: "16.8K", likes: 445 }
    }
  ];

  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles?.filter(article => 
        article?.category?.toLowerCase()?.replace(/\s+/g, '')?.replace('&', '') === activeCategory?.replace(/\s+/g, '')?.replace('&', '')
      );

  return (
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
              {activeCategory === 'all' ? 'Latest Articles' : `${activeCategory?.charAt(0)?.toUpperCase() + activeCategory?.slice(1)} Articles`}
            </h2>
            <p className="text-muted-foreground">
              {filteredArticles?.length} articles found
            </p>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            <button className="p-2 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200">
              <Icon name="Grid3X3" size={20} />
            </button>
            <button className="p-2 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200">
              <Icon name="List" size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles?.map((article) => (
            <article key={article?.id} className="relative rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300">
              {/* Background Image */}
              <div className="relative h-80">
                <Image
                  src={article?.image}
                  alt={article?.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Category - Top Left */}
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {article?.category}
                </div>

                {/* Read Time - Top Right */}
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {article?.readTime}
                </div>

                {/* Article Title - Large White Text */}
                <div className="absolute bottom-20 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {article?.title}
                  </h3>
                  <p className="text-white/90 text-sm">
                    By {article?.author?.name}
                  </p>
                </div>

                {/* Stats - Bottom Left */}
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center space-x-4 text-white">
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={16} />
                      <span className="text-sm">{article?.stats?.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={16} />
                      <span className="text-sm">{article?.stats?.likes}</span>
                    </div>
                  </div>
                </div>

                {/* Read More Button - Bottom Right */}
                <div className="absolute bottom-6 right-6">
                  <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 mx-auto">
            <span>Load More Articles</span>
            <Icon name="ChevronDown" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArticleGrid;