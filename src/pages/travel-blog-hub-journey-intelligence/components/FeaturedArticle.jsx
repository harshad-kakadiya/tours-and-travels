import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const FeaturedArticle = () => {
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLatestArticle();
  }, []);

  const fetchLatestArticle = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://tour-travels-be-h58q.onrender.com/api/blog');
      const data = await response.json();

      if (data.success && data.data && data.data.length > 0) {
        setFeaturedArticle(data.data[0]);
      } else {
        setError('No featured articles found.');
      }
    } catch (err) {
      console.error('Error fetching featured article:', err);
      setError('Failed to load featured article.');
    } finally {
      setLoading(false);
    }
  };

  const handleReadMore = () => {
    if (featuredArticle) {
      navigate(`/blog/${featuredArticle._id}`);
    }
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';

    // If it's already a full URL, return it
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }

    return imageUrl;
  };

  // Function to truncate markdown content while preserving plain text
  const truncateMarkdown = (markdown, maxLength) => {
    if (!markdown) return '';

    // Remove markdown syntax to get plain text
    const plainText = markdown
        .replace(/[#*`\[\]()!]/g, '') // Remove basic markdown syntax
        .replace(/\n/g, ' ') // Replace newlines with spaces
        .replace(/\s+/g, ' ') // Collapse multiple spaces
        .trim();

    // Truncate to max length
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
        <section className="bg-background py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center py-12">
              <div className="flex items-center space-x-2">
                <div className="animate-spin">
                  <Icon name="Loader2" size={24} className="text-primary" />
                </div>
                <span className="text-muted-foreground">Loading featured article...</span>
              </div>
            </div>
          </div>
        </section>
    );
  }

  if (error) {
    return (
        <section className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">
                <Icon name="AlertCircle" size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Error</h3>
              <p className="text-muted-foreground">{error}</p>
            </div>
          </div>
        </section>
    );
  }

  if (!featuredArticle) {
    return null;
  }

  return (
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="bg-card rounded-2xl shadow-brand-medium overflow-hidden hover:shadow-brand-large transition-shadow duration-300">
            <div className="lg:flex">
              <div className="lg:w-1/2">
                <div className="relative h-64 lg:h-full overflow-hidden">
                  <Image
                      src={getImageUrl(featuredArticle.blogImage)}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {featuredArticle.category?.title || 'Travel'}
                  </span>
                  </div>
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    {featuredArticle.tags?.slice(0, 2)?.map((tag, index) => (
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
                        src={featuredArticle?.author?.avatar || 'https://randomuser.me/api/portraits/women/32.jpg'}
                        alt={featuredArticle?.author?.name || 'WanderWise Team'}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-foreground">{featuredArticle?.author?.name || 'WanderWise Team'}</p>
                      <p className="text-sm text-muted-foreground">{featuredArticle?.author?.role || 'Travel Expert'}</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4 leading-tight">
                  {featuredArticle?.title}
                </h3>

                <div className="text-sm text-gray-600 flex-grow line-clamp-3">
                  <ReactMarkdown
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        p: ({ node, ...props }) => <p {...props} className="mb-1" />
                      }}
                  >
                    {truncateMarkdown(featuredArticle.content, 120)}
                  </ReactMarkdown>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={16} />
                      <span>{new Date(featuredArticle?.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={16} />
                      <span>{featuredArticle?.readTime || '5 min read'}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={16} />
                      <span>{featuredArticle?.stats?.views || '1.2K'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={16} />
                      <span>{featuredArticle?.stats?.likes || '45'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                      onClick={handleReadMore}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
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