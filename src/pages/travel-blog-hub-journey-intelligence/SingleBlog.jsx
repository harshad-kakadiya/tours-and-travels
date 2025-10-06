import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import Icon from '../../components/AppIcon';

const SingleBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (id) {
            fetchArticle();
        }
    }, [id]);

    const fetchArticle = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`https://tour-travels-be-h58q.onrender.com/api/blog/${id}`);
            const data = await response.json();

            if (data.success && data.data) {
                setArticle(data.data);
                setImageError(false); // reset image error on new article load
            } else {
                setError('Failed to load article. Please try again.');
            }
        } catch (err) {
            console.error('Error fetching article:', err);
            setError('Failed to load article. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBackToBlog = () => {
        navigate('/travel-blog-hub-journey-intelligence');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="flex justify-center items-center py-12">
                        <div className="flex items-center space-x-2">
                            <div className="animate-spin">
                                <Icon name="Loader2" size={24} className="text-primary" />
                            </div>
                            <span className="text-muted-foreground">Loading article...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="min-h-screen bg-background">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center py-12">
                        <div className="text-red-500 mb-4">
                            <Icon name="AlertCircle" size={48} className="mx-auto" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Article Not Found</h3>
                        <p className="text-muted-foreground mb-4">{error || 'The article you are looking for does not exist.'}</p>
                        <button
                            onClick={handleBackToBlog}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                            Back to Blog
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>{article.title} - WanderWise Tours</title>
                <meta name="description" content={article.excerpt || article.content?.substring(0, 160)} />
                <meta name="keywords" content={`travel blog, ${article.category}, India travel, ${article.tags?.join(', ')}`} />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.excerpt || article.content?.substring(0, 160)} />
                <meta property="og:image" content={article.image} />
                <meta property="og:type" content="article" />
                <link rel="canonical" href={`/blog/${article._id}`} />
            </Helmet>

            {/* Back Button */}
            <div className="bg-card border-b border-border">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button
                        onClick={handleBackToBlog}
                        className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Icon name="ArrowLeft" size={16} />
                        <span>Back to Blog</span>
                    </button>
                </div>
            </div>

            {/* Article Header */}
            <div className="bg-card border-b border-border">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <Icon name="BookOpen" size={16} />
                            <span>{article.category?.title || article.category || 'Travel'}</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
                            {article.title}
                        </h1>

                        {/* Show image only if article.image exists and no error */}
                        {article.image && !imageError && (
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    style={{ maxHeight: '400px', width: 'auto', borderRadius: '8px' }}
                                    onError={() => setImageError(true)}
                                />
                            </div>
                        )}

                        {/* Excerpt rendered as Markdown or fallback substring */}
                        {article.excerpt ? (
                            <div className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 prose prose-lg prose-muted">
                                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                    {article.excerpt}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                                {article.content?.substring(0, 200) + '...'}
                            </p>
                        )}

                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                                <img
                                    src={article.author?.avatar || 'https://randomuser.me/api/portraits/women/32.jpg'}
                                    alt={article.author?.name || 'WanderWise Team'}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <span>By {article.author?.name || 'WanderWise Team'}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Icon name="Calendar" size={16} />
                                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Icon name="Clock" size={16} />
                                <span>{article.readTime || '5 min read'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground">
                    {article.content ? (
                        <div className="text-muted-foreground mb-4 leading-relaxed">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                            >
                                {article.content.replace(/\\u003C/g, '<').replace(/\\u003E/g, '>')}
                            </ReactMarkdown>
                        </div>
                    ) : (
                        <p className="text-muted-foreground">No content available</p>
                    )}
                </div>
            </div>

            {/* Article Footer */}
            <div className="bg-card border-t border-border">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                        {/*<div className="flex items-center space-x-4">*/}
                        {/*    <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-muted/50 transition-colors">*/}
                        {/*        <Icon name="Heart" size={16} />*/}
                        {/*        <span>Like</span>*/}
                        {/*    </button>*/}
                        {/*    <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-muted/50 transition-colors">*/}
                        {/*        <Icon name="Share2" size={16} />*/}
                        {/*        <span>Share</span>*/}
                        {/*    </button>*/}
                        {/*    <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-muted/50 transition-colors">*/}
                        {/*        <Icon name="Bookmark" size={16} />*/}
                        {/*        <span>Save</span>*/}
                        {/*    </button>*/}
                        {/*</div>*/}

                        <button
                            onClick={handleBackToBlog}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                            Back to Blog
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBlog;
