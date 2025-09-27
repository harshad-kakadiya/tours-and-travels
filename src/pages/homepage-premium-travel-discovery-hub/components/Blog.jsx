import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";

const Blog = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBlogPosts();
    }, []);

    const fetchBlogPosts = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://tour-travels-be-h58q.onrender.com/api/blog');
            const result = await response.json();
            
            if (result.success && result.data && Array.isArray(result.data)) {
                // Get the latest 3 blog posts
                const latestPosts = result.data.slice(0, 3);
                setBlogPosts(latestPosts);
            } else {
                setError('Failed to load blog posts');
                // Fallback to empty array
                setBlogPosts([]);
            }
        } catch (err) {
            console.error('Error fetching blog posts:', err);
            setError('Failed to load blog posts');
            setBlogPosts([]);
        } finally {
            setLoading(false);
        }
    };

    // Format date from ISO string
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return {
            day: date.getDate().toString().padStart(2, '0'),
            month: date.toLocaleString('default', { month: 'short' }).toUpperCase()
        };
    };

    // Get image URL with fallback
    const getImageUrl = (imageUrl) => {
        if (!imageUrl) return 'https://www.holidify.com/images/bgImages/HIMACHAL-PRADESH.jpg';
        
        // If it's already a full URL, return it
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
            return imageUrl;
        }
        
        return imageUrl;
    };

    return (
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-background relative z-0">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop')`,
                }}
            />
            <div className="container xl:px-0 mx-auto px-4 relative z-10">
                <div className="text-center mb-8 sm:mb-10 md:mb-12">
                    <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
                        <Icon name="Award" size={14} className="sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm font-medium">Top Blog Picks</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 sm:mb-4 px-2">
                        Latest Blog
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto px-2">
                        Stay informed with our newest articles, insights, and updates from the world of travel and adventure.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin mr-2">
                            <Icon name="Loader2" size={24} className="text-primary" />
                        </div>
                        <span className="text-muted-foreground">Loading blog posts...</span>
                    </div>
                ) : error ? (
                    <div className="text-center py-10">
                        <Icon name="AlertCircle" size={32} className="text-destructive mx-auto mb-4" />
                        <p className="text-muted-foreground">{error}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {blogPosts.length > 0 ? blogPosts.map((post, idx) => {
                            const dateObj = formatDate(post.createdAt);
                            return (
                                <div
                                    key={idx}
                                    className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full">
                                        <img
                                            src={getImageUrl(post.blogImage)}
                                            alt={post.title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white font-extrabold px-3 sm:px-4 py-2 sm:py-3 rounded text-center leading-tight">
                                            <div className="text-lg sm:text-xl">{dateObj.day}</div>
                                            <div className="text-lg sm:text-xl">{dateObj.month}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-grow p-4 sm:p-5">
                                        <h3 className="font-bold text-blue-900 text-sm sm:text-base md:text-lg uppercase leading-tight mb-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 sm:mt-2 flex-grow leading-relaxed">
                                            {post.content?.substring(0, 120)}...
                                        </p>
                                        <Link
                                            to={`/blog/${post._id}`}
                                            className="text-xs sm:text-sm md:text-base text-blue-700 mt-3 sm:mt-4 inline-block hover:underline transition-all duration-200 hover:text-blue-800"
                                        >
                                            Read more »
                                        </Link>
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className="col-span-3 text-center py-10">
                                <p className="text-muted-foreground">No blog posts available at the moment.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="flex justify-center mt-10 items-center space-x-4">
                <Link to="/travel-blog-hub-journey-intelligence">
                    <Button
                        variant="outline"
                        size="lg"
                        iconName="ArrowRight"
                        iconPosition="right"
                        className="px-6 py-3 text-base font-semibold border-2 bg-[#0F172A] text-white border-[#0F172A] transition-colors duration-300 ease-in-out hover:bg-primary hover:text-white hover:border-primary"
                    >
                        View All Blogs
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default Blog;
