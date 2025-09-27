import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import api from '../../../utils/api';

// Mock data for when API fails
const mockArticles = [
  {
    _id: 'article-1',
    title: 'Exploring the Majestic Himalayas: A Journey Through Northern India',
    content: 'The Himalayas offer some of the most breathtaking landscapes in the world. From the snow-capped peaks to the lush valleys, this mountain range is a paradise for adventure seekers and nature lovers alike.',
    blogImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Rahul Sharma',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    category: {
      title: 'Adventure'
    },
    readTime: '8 min read',
    publishDate: new Date().toISOString(),
    tags: ['Himalayas', 'Trekking', 'Mountain', 'Adventure', 'Nature']
  },
  {
    _id: 'article-2',
    title: 'The Golden Triangle: Delhi, Agra, and Jaipur',
    content: 'India\'s Golden Triangle is a classic introduction to the country: it showcases the great cities of Delhi, Agra, and Jaipur, and offers a fascinating glimpse into the many faces of India.',
    blogImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Priya Patel',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    category: {
      title: 'Cultural'
    },
    readTime: '6 min read',
    publishDate: new Date(Date.now() - 86400000).toISOString(),
    tags: ['Golden Triangle', 'Heritage', 'Culture', 'History']
  },
  {
    _id: 'article-3',
    title: 'Kerala Backwaters: A Serene Houseboat Experience',
    content: 'The backwaters of Kerala offer a unique and peaceful experience. Gliding through the tranquil network of canals, lakes, and lagoons on a traditional houseboat is an unforgettable journey.',
    blogImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Arun Nair',
      avatar: 'https://randomuser.me/api/portraits/men/62.jpg'
    },
    category: {
      title: 'Relaxation'
    },
    readTime: '5 min read',
    publishDate: new Date(Date.now() - 172800000).toISOString(),
    tags: ['Kerala', 'Backwaters', 'Houseboat', 'Nature', 'Relaxation']
  },
  {
    _id: 'article-4',
    title: 'Goa: Beaches, Cuisine, and Portuguese Heritage',
    content: 'Goa is India\'s pocket-sized paradise. With its stunning beaches, vibrant nightlife, delicious seafood, and Portuguese-influenced architecture, it offers a unique blend of East and West.',
    blogImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Maria D\'Souza',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
    },
    category: {
      title: 'Beach'
    },
    readTime: '7 min read',
    publishDate: new Date(Date.now() - 259200000).toISOString(),
    tags: ['Goa', 'Beaches', 'Cuisine', 'Heritage', 'Nightlife']
  }
];

const ArticleGrid = ({ activeCategory }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://tour-travels-be-h58q.onrender.com/api/blog');
      const result = await response.json();
      
      if (result.success && result.data && Array.isArray(result.data) && result.data.length > 0) {
        setArticles(result.data);
      } else {
        setError('No articles found.');
        setArticles([]);
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to load articles.');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReadMore = (articleId) => {
    navigate(`/blog/${articleId}`);
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    
    // If it's already a full URL, return it
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    return imageUrl;
  };

  const filteredArticles = activeCategory === 'all' 
    ? (articles || [])
    : (articles || [])?.filter(article => 
        (article?.category?.title || article?.category || '')?.toLowerCase()?.replace(/\s+/g, '')?.replace('&', '') === activeCategory?.replace(/\s+/g, '')?.replace('&', '')
      );

  if (loading) {
    return (
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center space-x-2">
              <div className="animate-spin">
                <Icon name="Loader2" size={24} className="text-primary" />
              </div>
              <span className="text-muted-foreground">Loading articles...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // We'll always have articles now (either real or mock)
  if (loading) {
    return (
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center space-x-2">
              <div className="animate-spin">
                <Icon name="Loader2" size={24} className="text-primary" />
              </div>
              <span className="text-muted-foreground">Loading articles...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  // If no articles match the selected category, show a message
  if (filteredArticles.length === 0) {
    return (
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Icon name="Search" size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Articles Found</h3>
            <p className="text-muted-foreground">No articles match your selected category. Try selecting a different category.</p>
          </div>
        </div>
      </section>
    );
  }

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

        {loading ? (
          <div className="text-center py-12">
            <div className="flex justify-center items-center">
              <div className="animate-spin mr-2">
                <Icon name="Loader2" size={24} className="text-primary" />
              </div>
              <span className="text-muted-foreground">Loading articles...</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <Icon name="AlertCircle" size={48} className="mx-auto" />
            </div>
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Icon name="FileText" size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Articles Found</h3>
            <p className="text-muted-foreground">No articles are currently available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(filteredArticles) && filteredArticles.map((article) => (
              <article key={article?._id} className="relative rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300">
                {/* Background Image */}
                <div className="relative h-80">
                  <Image
                    src={getImageUrl(article?.blogImage)}
                    alt={article?.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onLoad={() => console.log('Image loaded successfully:', getImageUrl(article?.blogImage))}
                    onError={() => console.log('Image failed to load:', getImageUrl(article?.blogImage))}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category - Top Left */}
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article?.category?.title || article?.category || 'Travel'}
                  </div>

                  {/* Read Time - Top Right */}
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article?.readTime || '5 min read'}
                  </div>

                  {/* Article Title - Large White Text */}
                  <div className="absolute bottom-20 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {article?.title}
                    </h3>
                    <p className="text-white/90 text-sm">
                      By {article?.author?.name || 'WanderWise Team'}
                    </p>
                  </div>

                  {/* Stats - Bottom Left */}
                  <div className="absolute bottom-6 left-6">
                    <div className="flex items-center space-x-4 text-white">
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={16} />
                        <span className="text-sm">{article?.stats?.views || '1.2K'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Heart" size={16} />
                        <span className="text-sm">{article?.stats?.likes || '45'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Read More Button - Bottom Right */}
                  <div className="absolute bottom-6 right-6">
                    <button 
                      onClick={() => handleReadMore(article._id)}
                      className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        
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