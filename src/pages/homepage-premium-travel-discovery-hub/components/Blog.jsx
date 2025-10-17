import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

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
            setError(null);
            const response = await fetch('https://tour-travels-be-h58q.onrender.com/api/blog');
            const result = await response.json();

            if (result.success && Array.isArray(result.data)) {
                setBlogPosts(result.data.slice(0, 3)); // Show only 3 latest posts
            } else {
                setError("Blog data not found");
            }
        } catch (err) {
            console.error("Error fetching blogs:", err);
            setError("Failed to load blog posts");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return {
            day: date.getDate().toString().padStart(2, '0'),
            month: date.toLocaleString('default', { month: 'short' }).toUpperCase()
        };
    };

    const getImageUrl = (imageUrl) => {
        if (!imageUrl) return 'https://www.holidify.com/images/bgImages/HIMACHAL-PRADESH.jpg';
        return imageUrl.startsWith('http') ? imageUrl : imageUrl;
    };

    const truncateMarkdown = (markdown, maxLength) => {
        if (!markdown) return '';
        const plainText = markdown
            .replace(/[#*`\[\]()!]/g, '')
            .replace(/\n/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        return plainText.length <= maxLength ? plainText : plainText.substring(0, maxLength) + '...';
    };

    return (
        <section className="py-10 lg:py-16 bg-background relative z-0">
            {/* Background Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop')`,
                }}
            />

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                {/* Header - Optimized for laptop */}
                <div className="text-center mb-12 lg:mb-16">
                    <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full mb-4">
                        <Icon name="Award" size={14} />
                        <span className="text-sm font-medium">Top Blog Picks</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-foreground mb-4">
                        Latest Blog
                    </h2>
                    <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
                        Stay informed with our newest articles, insights, and updates from the world of travel and adventure.
                    </p>
                </div>

                {/* Loader */}
                {loading && (
                    <div className="flex justify-center items-center py-16">
                        <Icon name="Loader2" size={24} className="animate-spin text-primary mr-3" />
                        <span className="text-muted-foreground text-base">Loading blog posts...</span>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="text-center py-12">
                        <Icon name="AlertCircle" size={32} className="text-destructive mx-auto mb-4" />
                        <p className="text-muted-foreground text-base">{error}</p>
                    </div>
                )}

                {/* Blog Cards - Perfect for laptop screens */}
                {!loading && !error && blogPosts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                        {blogPosts.map((post, idx) => {
                            const date = formatDate(post.createdAt);
                            const imgUrl = getImageUrl(post.blogImage);
                            const postTitle = post.title || 'Untitled Blog';
                            const postContent = post.content || '';

                            return (
                                <div
                                    key={post._id || idx}
                                    className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl border border-gray-200 h-full"
                                >
                                    {/* Image Container - Perfect laptop size */}
                                    <div className="relative h-52 lg:h-56 xl:h-60 w-full overflow-hidden">
                                        <img
                                            src={imgUrl}
                                            alt={postTitle}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.src = 'https://www.holidify.com/images/bgImages/HIMACHAL-PRADESH.jpg';
                                            }}
                                        />
                                        {/* Date Badge */}
                                        <div className="absolute top-4 left-4 bg-white text-gray-800 font-bold px-3 py-2 rounded-lg text-center shadow-md">
                                            <div className="text-lg leading-none font-semibold">{date.day}</div>
                                            <div className="text-xs leading-tight mt-1 font-medium">{date.month}</div>
                                        </div>
                                    </div>

                                    {/* Content - Well balanced for laptop */}
                                    <div className="flex flex-col flex-grow p-5 lg:p-6 w-full">
                                        <h3 className="font-bold text-gray-900 text-lg lg:text-xl mb-3 line-clamp-2 leading-tight">
                                            {postTitle}
                                        </h3>

                                        <div className="text-sm text-gray-600 flex-grow line-clamp-3 mb-4 leading-relaxed">
                                            <ReactMarkdown
                                                rehypePlugins={[rehypeRaw]}
                                                components={{
                                                    p: ({ node, ...props }) => <p {...props} className="mb-1" />
                                                }}
                                            >
                                                {truncateMarkdown(postContent, 120)}
                                            </ReactMarkdown>
                                        </div>

                                        {/* Read More Link */}
                                        <div className="mt-auto pt-3 border-t border-gray-100">
                                            <Link
                                                to={`/blog/${post._id}`}
                                                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
                                            >
                                                Read more
                                                <Icon name="ArrowRight" size={14} className="ml-1 mt-0.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* No Posts */}
                {!loading && !error && blogPosts.length === 0 && (
                    <div className="text-center py-12">
                        <Icon name="Info" size={28} className="text-muted-foreground mb-3" />
                        <p className="text-muted-foreground text-base">No blog posts found at the moment.</p>
                    </div>
                )}

                {/* View All Button */}
                {!loading && !error && blogPosts.length > 0 && (
                    <div className="flex justify-center mt-12 lg:mt-16">
                        <Link to="/travel-blog-hub-journey-intelligence">
                            <Button
                                variant="outline"
                                size="lg"
                                iconName="ArrowRight"
                                iconPosition="right"
                                className="px-8 py-3 lg:px-10 lg:py-4 text-base lg:text-lg font-semibold border-2 bg-[#4891C9] text-white border-[#4891C9] hover:bg-[#3a7ab0] hover:border-[#3a7ab0] transition-colors duration-200 shadow-md hover:shadow-lg"
                            >
                                View All Blogs
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Blog;