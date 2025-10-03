import React, { useEffect, useState } from "react";
import Icon from "../../../components/AppIcon";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import axios from "axios";

const Blog = () => {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get("https://tour-travels-be-h58q.onrender.com/api/blog");

                console.log("API Response:", res.data); // 👈 Debug mate

                // Handle both cases: direct array or inside `data`
                const blogsArray = Array.isArray(res.data) ? res.data : res.data.data;
                setBlogPosts(blogsArray || []);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setBlogPosts([]); // fallback
            }
        };

        fetchBlogs();
    }, []);

    return (
        <section className="py-12 md:py-16 lg:py-20 relative bg-muted overflow-hidden">
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

                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {Array.isArray(blogPosts) && blogPosts.length > 0 ? (
                        blogPosts.map((post, idx) => (
                            <div
                                key={post._id || idx}
                                className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full">
                                    <img
                                        src={
                                            post.blogImage
                                        }
                                        alt={post.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white font-extrabold px-3 sm:px-4 py-2 sm:py-3 rounded text-center leading-tight">
                                        <div className="text-lg sm:text-xl">
                                            {post.createdAt
                                                ? new Date(post.createdAt).getDate()
                                                : "01"}
                                        </div>
                                        <div className="text-lg sm:text-xl">
                                            {post.createdAt
                                                ? new Date(post.createdAt).toLocaleString("default", {
                                                    month: "short",
                                                })
                                                : "Jan"}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col flex-grow p-4 sm:p-5">
                                    <h3 className="font-bold text-blue-900 text-sm sm:text-base md:text-lg uppercase leading-tight mb-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 sm:mt-2 flex-grow leading-relaxed">
                                        {post.content
                                            ?.replace(/<[^>]+>/g, "") // HTML tag remove
                                            .substring(0, 120) + "..."}
                                    </p>
                                    <Link
                                        to={`/blog/${post._id}`}
                                        className="text-xs sm:text-sm md:text-base text-blue-700 mt-3 sm:mt-4 inline-block hover:underline transition-all duration-200 hover:text-blue-800"
                                    >
                                        Read more »
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-3">
                            No blogs found.
                        </p>
                    )}
                </div>

                {/* View All Button */}
                <div className="mt-8 text-center">
                    <Link to="/blog" className="inline-block">
                        <Button
                            variant="outline"
                            size="lg"
                            iconName="ArrowRight"
                            iconPosition="right"
                            className="px-6 py-3 text-base font-semibold border-2 bg-[#4891C9] text-white border-[#4891C9]"
                        >
                            View All Blog Posts
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Blog;
