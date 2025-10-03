import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import api from '../../../utils/api';
import ReactMarkdown from 'react-markdown';

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
        content: "India's Golden Triangle is a classic introduction to the country: it showcases the great cities of Delhi, Agra, and Jaipur, and offers a fascinating glimpse into the many faces of India.",
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
        title: "Goa: Beaches, Cuisine, and Portuguese Heritage",
        content: "Goa is India's pocket-sized paradise. With its stunning beaches, vibrant nightlife, delicious seafood, and Portuguese-influenced architecture, it offers a unique blend of East and West.",
        blogImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: {
            name: "Maria D'Souza",
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

const ArticleGrid = ({ activeCategory, searchQuery = '' }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const resultsRef = useRef(null);

    useEffect(() => {
        fetchArticles();
    }, []);
    
    // Scroll to results only when search is explicitly performed
    useEffect(() => {
        const shouldScroll = sessionStorage.getItem('shouldScroll');
        if (searchQuery && shouldScroll === 'true' && resultsRef.current) {
            resultsRef.current.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start'
            });
            // Reset the flag
            sessionStorage.removeItem('shouldScroll');
        }
    }, [searchQuery]);

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
            setError('Failed to load articles, showing some sample articles.');
            // Fallback to mockArticles
            setArticles(mockArticles);
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

    const filteredArticles = (articles || [])
        .filter(article => {
            // Filter by category if not 'all'
            const categoryMatch = activeCategory === 'all' || 
                (article?.category?.title || article?.category || '')
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .replace('&', '') === activeCategory?.replace(/\s+/g, '')?.replace('&', '');
            
            // Filter by search query if provided
            const searchMatch = !searchQuery || 
                article.title.toLowerCase().includes(searchQuery.toLowerCase());
            
            return categoryMatch && searchMatch;
        });

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

    if (error && articles.length === 0) {
        return (
            <section className="bg-background py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-12">
                        <div className="text-red-500 mb-4">
                            <Icon name="AlertCircle" size={48} className="mx-auto" />
                        </div>
                        <p className="text-muted-foreground">{error}</p>
                    </div>
                </div>
            </section>
        );
    }

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
        <section className="bg-background py-16" ref={resultsRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                            {activeCategory === 'all' ? 'Latest Articles' : `${activeCategory?.charAt(0)?.toUpperCase() + activeCategory?.slice(1)} Articles`}
                        </h2>
                        <p className="text-muted-foreground">
                            {filteredArticles.length} articles found
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredArticles.map((article) => {
                        const date = article.publishDate ? new Date(article.publishDate) : new Date();
                        const formattedDate = {
                            day: date.getDate(),
                            month: date.toLocaleString('default', { month: 'short' })
                        };
                        
                        return (
                            <div
                                key={article._id}
                                className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full">
                                    <img
                                        src={getImageUrl(article.blogImage)}
                                        alt={article.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = 'https://www.holidify.com/images/bgImages/HIMACHAL-PRADESH.jpg';
                                        }}
                                    />
                                    <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white font-bold px-3 py-2 rounded text-center text-xs">
                                        <div className="text-lg">{formattedDate.day}</div>
                                        <div className="text-sm">{formattedDate.month}</div>
                                    </div>
                                </div>
                                <div className="flex flex-col flex-grow p-4 sm:p-5">
                                    <h3 className="font-bold text-blue-900 text-base uppercase mb-2 line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <div className="text-sm text-gray-600 flex-grow line-clamp-3">
                                        <ReactMarkdown>
                                            {article.content?.substring(0, 120) + '...'}
                                        </ReactMarkdown>
                                    </div>
                                    <button
                                        onClick={() => handleReadMore(article._id)}
                                        className="text-blue-700 mt-4 inline-block hover:underline text-sm"
                                    >
                                        Read more »
                                    </button>
                                </div>
                            </div>
                        );
                    })}
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
