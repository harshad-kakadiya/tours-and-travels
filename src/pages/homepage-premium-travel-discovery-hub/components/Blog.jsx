import React from "react";
import Icon from "../../../components/AppIcon";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button"; // Verify this path

const Blog = () => {
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
                        View All Tours
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default Blog;
