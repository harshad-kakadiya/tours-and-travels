import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import api from '../../../utils/api';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";

// Mock data for when API fails
const mockArticles = [
    {
        _id: 'article-1',
        title: 'Exploring the Majestic Himalayas: A Journey Through Northern India',
        content: 'The Himalayas offer some of the **most breathtaking landscapes** in the world. From the snow-capped peaks to the lush valleys, this mountain range is a paradise for adventure seekers and nature lovers alike.',
        blogImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: { name: 'Rahul Sharma', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
        category: { title: 'Adventure' },
        readTime: '8 min read',
        publishDate: new Date().toISOString(),
        tags: ['Himalayas', 'Trekking', 'Mountain', 'Adventure', 'Nature']
    },
    {
        _id: 'article-2',
        title: 'Cultural Heritage of Rajasthan: Palaces and Forts',
        content: 'Rajasthan is known for its rich cultural heritage and magnificent architecture. The palaces and forts tell stories of the royal era and the brave Rajput warriors.',
        blogImage: 'https://images.unsplash.com/photo-1532386233008-7c4f2c1e60d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: { name: 'Priya Singh', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
        category: { title: 'Culture' },
        readTime: '6 min read',
        publishDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        tags: ['Rajasthan', 'Culture', 'Heritage', 'Palaces', 'Forts']
    },
    {
        _id: 'article-3',
        title: 'Beach Paradise: Andaman and Nicobar Islands',
        content: 'Crystal clear waters, white sandy beaches, and vibrant marine life make Andaman and Nicobar Islands a perfect tropical getaway for beach lovers.',
        blogImage: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: { name: 'Arun Kumar', avatar: 'https://randomuser.me/api/portraits/men/67.jpg' },
        category: { title: 'Beach' },
        readTime: '5 min read',
        publishDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        tags: ['Andaman', 'Beach', 'Islands', 'Marine Life', 'Tropical']
    }
];

// Helper to truncate Markdown safely
const truncateMarkdown = (text, maxLength = 120) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

const ArticleGrid = ({ activeCategory, searchQuery = '' }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(6);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const navigate = useNavigate();
    const resultsRef = useRef(null);

    useEffect(() => {
        fetchArticles();
    }, []);

    useEffect(() => {
        const shouldScroll = sessionStorage.getItem('shouldScroll');
        if (searchQuery && shouldScroll === 'true' && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                setArticles(mockArticles);
            }
        } catch (err) {
            console.error('Error fetching articles:', err);
            setError('Failed to load articles, showing some sample articles.');
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
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;
        return imageUrl;
    };

    const filteredArticles = (articles || [])
        .filter(article => {
            const categoryMatch = activeCategory === 'all' ||
                (article?.category?.title || article?.category || '')
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .replace('&', '') === activeCategory?.replace(/\s+/g, '')?.replace('&', '');
            const searchMatch = !searchQuery || article.title.toLowerCase().includes(searchQuery.toLowerCase());
            return categoryMatch && searchMatch;
        });

    // Article card component to avoid repetition
    const ArticleCard = ({ article, viewMode }) => {
        const date = article.publishDate ? new Date(article.publishDate) : new Date();
        const formattedDate = {
            day: date.getDate(),
            month: date.toLocaleString('default', { month: 'short' })
        };

        if (viewMode === 'list') {
            return (
                <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="md:w-1/3 relative h-48 md:h-auto">
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
                    <div className="flex flex-col flex-grow p-4 sm:p-5 md:w-2/3">
                        <h3 className="font-bold text-blue-900 text-base uppercase mb-2 line-clamp-2">
                            {article.title}
                        </h3>
                        <div className="text-sm text-gray-600 flex-grow line-clamp-3 mb-3">
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    p: ({ node, ...props }) => <p {...props} className="mb-1" />
                                }}
                            >
                                {truncateMarkdown(article.content, 150)}
                            </ReactMarkdown>
                        </div>
                        <div className="flex justify-between items-center mt-auto">
                            <span className="text-xs text-gray-500">
                                {article.readTime || '5 min read'}
                            </span>
                            <button
                                onClick={() => handleReadMore(article._id)}
                                className="text-blue-700 hover:underline text-sm font-medium"
                            >
                                Read more »
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        // Grid view (default)
        return (
            <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
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
                        <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                p: ({ node, ...props }) => <p {...props} className="mb-1" />
                            }}
                        >
                            {truncateMarkdown(article.content, 120)}
                        </ReactMarkdown>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-xs text-gray-500">
                            {article.readTime || '5 min read'}
                        </span>
                        <button
                            onClick={() => handleReadMore(article._id)}
                            className="text-blue-700 hover:underline text-sm font-medium"
                        >
                            Read more »
                        </button>
                    </div>
                </div>
            </div>
        );
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
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg border transition-colors duration-200 ${
                                viewMode === 'grid'
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'border-border hover:bg-muted/50'
                            }`}
                        >
                            <Icon name="Grid3X3" size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg border transition-colors duration-200 ${
                                viewMode === 'list'
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'border-border hover:bg-muted/50'
                            }`}
                        >
                            <Icon name="List" size={20} />
                        </button>
                    </div>
                </div>

                <div className={`${
                    viewMode === 'grid'
                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'
                        : 'grid grid-cols-1 gap-6 md:gap-8'
                }`}>
                    {filteredArticles.slice(0, visibleCount).map((article) => (
                        <ArticleCard
                            key={article._id}
                            article={article}
                            viewMode={viewMode}
                        />
                    ))}
                </div>

                {visibleCount < filteredArticles.length && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setVisibleCount(prev => prev + 6)}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 mx-auto"
                        >
                            <span>Load More Articles</span>
                            <Icon name="ChevronDown" size={18} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ArticleGrid;