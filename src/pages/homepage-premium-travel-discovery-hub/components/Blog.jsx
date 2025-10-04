import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";

const Blog = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const blogPosts = [
        {
            date: "23",
            month: "MAR",
            image: "https://www.holidify.com/images/bgImages/HIMACHAL-PRADESH.jpg",
            title: "JAISALMER - THE GOLDEN CITY",
            description: `Jaisalmer a culturally rich place, known as "The Golden City", town carved from yellowish sandstones. The city is located at the Rajasthan, India.`,
            link: "/blog/jaisalmer",
        },
        {
            date: "23",
            month: "MAR",
            image: "https://www.holidify.com/images/bgImages/HIMACHAL-PRADESH.jpg",
            title: "BEST TREKKING PLACES OF HIMACHAL PRADESH",
            description: `Himachal Pradesh is a state in the northern sector of India. Situated in the Western Himalayas, bordered by the Tibetan plateau.`,
            link: "/blog/himachal-trekking",
        },
        {
            date: "23",
            month: "MAR",
            image: "https://www.holidify.com/images/bgImages/HIMACHAL-PRADESH.jpg",
            title: "CHADAR TREK - THE WINTER TRAIL",
            description: `"Chadar Trek" states the frozen path over the flowing water. Don't you feel exciting as you are going to do this adventure?`,
            link: "/blog/chadar-trek",
        },
    ];
    
    return (
        <section className="py-16 bg-muted/30 relative">
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
                    {blogPosts.map((post, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white font-extrabold px-3 sm:px-4 py-2 sm:py-3 rounded text-center leading-tight">
                                    <div className="text-lg sm:text-xl">{post.date}</div>
                                    <div className="text-lg sm:text-xl">{post.month}</div>
                                </div>
                            </div>
                            <div className="flex flex-col flex-grow p-4 sm:p-5">
                                <h3 className="font-bold text-blue-900 text-sm sm:text-base md:text-lg uppercase leading-tight mb-2">
                                    {post.title}
                                </h3>
                                <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 sm:mt-2 flex-grow leading-relaxed">
                                    {post.description}
                                </p>
                                <Link
                                    to={post.link}
                                    className="text-xs sm:text-sm md:text-base text-blue-700 mt-3 sm:mt-4 inline-block hover:underline transition-all duration-200 hover:text-blue-800"
                                >
                                    Read more »
                                </Link>
                            </div>
                        </div>
                    ))}
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
