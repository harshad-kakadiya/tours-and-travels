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
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-background relative z-0">
            {/* Background Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop')`,
                }}
            />

            <div className="container xl:px-0 mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-10 md:mb-12">
                    <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-3">
                        <Icon name="Award" size={16} />
                        <span className="text-sm font-medium">Top Blog Picks</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
                        Latest Blog
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
                        Stay informed with our newest articles, insights, and updates from the world of travel and adventure.
                    </p>
                </div>

                {/* Loader */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <Icon name="Loader2" size={28} className="animate-spin text-primary mr-3" />
                        <span className="text-muted-foreground text-sm">Loading blog posts...</span>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="text-center py-12">
                        <Icon name="AlertCircle" size={40} className="text-destructive mx-auto mb-4" />
                        <p className="text-muted-foreground text-base">{error}</p>
                    </div>
                )}

                {/* Blog Cards */}
                {!loading && !error && blogPosts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {blogPosts.map((post, idx) => {
                            const date = formatDate(post.createdAt);
                            const imgUrl = getImageUrl(post.blogImage);
                            const postTitle = post.title || 'Untitled Blog';
                            const postContent = post.content || '';

                            return (
                                <div
                                    key={post._id || idx}
                                    className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden">
                                        <img
                                            src={imgUrl}
                                            alt={postTitle}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.src = 'https://www.holidify.com/images/bgImages/HIMACHAL-PRADESH.jpg';
                                            }}
                                        />
                                        <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white font-bold px-3 py-2 rounded text-center text-xs">
                                            <div className="text-lg">{date.day}</div>
                                            <div className="text-sm">{date.month}</div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-grow p-4 sm:p-5">
                                        <h3 className="font-bold text-blue-900 text-base uppercase mb-2 line-clamp-2">
                                            {postTitle}
                                        </h3>

                                        <div className="text-sm text-gray-600 flex-grow line-clamp-3">
                                            <ReactMarkdown
                                                rehypePlugins={[rehypeRaw]}
                                                components={{
                                                    p: ({ node, ...props }) => <p {...props} className="mb-1" />
                                                }}
                                            >
                                                {truncateMarkdown(postContent, 120)}
                                            </ReactMarkdown>
                                        </div>

                                        <Link
                                            to={`/blog/${post._id}`}
                                            className="text-blue-700 mt-4 inline-block hover:underline text-sm"
                                        >
                                            Read more »
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* No Posts */}
                {!loading && !error && blogPosts.length === 0 && (
                    <div className="text-center py-12">
                        <Icon name="Info" size={32} className="text-muted-foreground mb-4" />
                        <p className="text-muted-foreground text-sm">No blog posts found at the moment.</p>
                    </div>
                )}

                {/* View All Button */}
                {!loading && !error && blogPosts.length > 0 && (
                    <div className="flex justify-center mt-10">
                        <Link to="/travel-blog-hub-journey-intelligence">
                            <Button
                                variant="outline"
                                size="lg"
                                iconName="ArrowRight"
                                iconPosition="right"
                                className="px-6 py-3 text-base font-semibold border-2 bg-[#4891C9] text-white border-[#4891C9] "
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
