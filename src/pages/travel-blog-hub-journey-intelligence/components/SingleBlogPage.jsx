import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

const SingleBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://tour-travels-be-h58q.onrender.com/api/blog/${id}`);
      const result = await response.json();
      
      if (result.success && result.data) {
        setArticle(result.data);
      } else {
        setError('Article not found');
      }
    } catch (err) {
      console.error('Error fetching article:', err);
      setError('Failed to load article');
    } finally {
      setLoading(false);
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

  // Function to decode HTML entities
  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  // Function to convert HTML to Markdown-compatible format
  const prepareContent = (content) => {
    if (!content) return '';
    
    // Decode HTML entities
    const decodedContent = decodeHtml(content);
    
    // Replace escaped angle brackets with actual ones (important for image tags)
    return decodedContent.replace(/\\u003C/g, '<').replace(/\\u003E/g, '>');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin">
            <Icon name="Loader2" size={24} className="text-primary" />
          </div>
          <span className="text-muted-foreground">Loading article...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Icon name="AlertTriangle" size={48} className="text-destructive mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Article Not Found</h1>
        <p className="text-muted-foreground mb-6 text-center max-w-md">{error}</p>
        <button 
          onClick={() => navigate('/travel-blog-hub-journey-intelligence')}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors duration-200"
        >
          Return to Blog
        </button>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{article.title} | WanderWise Tours Blog</title>
        <meta name="description" content={article.content?.substring(0, 160)} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.content?.substring(0, 160)} />
        <meta property="og:type" content="article" />
        {article.blogImage && <meta property="og:image" content={getImageUrl(article.blogImage)} />}
      </Helmet>

      {/* Article Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto w-full p-6 md:p-12">
          <div className="flex items-center space-x-2 mb-4">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              {article.category?.title || 'Travel'}
            </span>
            <span className="text-muted-foreground text-sm">
              {new Date(article.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="text-muted-foreground text-sm">
              {article.readTime || '5'} min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Display the blog image if available */}
        {article.blogImage && (
          <div className="mb-8">
            <img 
              src={getImageUrl(article.blogImage)} 
              alt={article.title} 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground">
          {article.content ? (
            <div className="text-muted-foreground leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                components={{
                  img: ({src, alt, ...props}) => (
                    <img 
                      src={src} 
                      alt={alt || ''} 
                      className="max-w-full h-auto rounded-lg my-4" 
                      {...props} 
                    />
                  )
                }}
              >
                {prepareContent(article.content)}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-muted-foreground">No content available</p>
          )}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-border">
            <h3 className="text-lg font-medium mb-4">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span key={index} className="bg-muted px-3 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 pt-6 border-t border-border flex justify-between">
          <button 
            onClick={() => navigate('/travel-blog-hub-journey-intelligence')}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="ArrowLeft" size={16} />
            <span>Back to Blog</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;