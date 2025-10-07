import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PopularToursSection = () => {
    const [popularTours, setPopularTours] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchTours = async () => {
            try {
                // Fetch popular tours from the API
                const res = await fetch('https://tour-travels-be.onrender.com/api/tour/highlights');
                const data = await res.json();

                console.log('API Response:', data); // Debug log

                // Extract popular tours from the API response
                let popularList = [];

                if (data && data.popular && Array.isArray(data.popular)) {
                    // If API returns separate popular array
                    popularList = data.popular;
                } else if (Array.isArray(data)) {
                    // If API returns a single array with all tours
                    popularList = data.filter(tour =>
                        tour.type === 'popular' ||
                        tour.category === 'popular' ||
                        // If no specific field, use all tours for now
                        true
                    );
                } else if (data && data.data && Array.isArray(data.data)) {
                    // If API returns { data: [] } structure
                    popularList = data.data.filter(tour =>
                        tour.type === 'popular' ||
                        tour.category === 'popular' ||
                        true
                    );
                }

                console.log('Popular Tours List:', popularList); // Debug log

                const mapped = popularList?.slice(0, 6)?.map((t) => {
                    // Extract the lowest price from packages
                    const lowestPrice = t?.packages?.reduce((min, pkg) => {
                        const packagePrice = Math.min(
                            pkg?.price || Infinity,
                            pkg?.sharingTypes?.[0]?.twoSharing || Infinity,
                            pkg?.sharingTypes?.[0]?.threeSharing || Infinity,
                            pkg?.sharingTypes?.[0]?.fourSharing || Infinity
                        );
                        return Math.min(min, packagePrice);
                    }, Infinity);

                    const hasDiscount = Number(t?.discount || 0) > 0;
                    const discountedPrice = hasDiscount ? t?.discountedPrice : lowestPrice;
                    const originalPrice = hasDiscount ? lowestPrice : undefined;

                    // Get location from state or location field
                    const location = t?.state?.name || t?.location || '';

                    // Get image from images array or gallery
                    const image = Array.isArray(t?.images) && t?.images?.[0]
                        ? t?.images?.[0]
                        : Array.isArray(t?.gallery) && t?.gallery?.[0]?.image
                            ? t?.gallery?.[0]?.image
                            : '/default-tour-image.jpg';

                    return {
                        id: t?._id || t?.id,
                        title: t?.title || 'Untitled Tour',
                        location: location,
                        duration: t?.duration || '',
                        price: `₹${Number(discountedPrice || originalPrice || 0).toLocaleString()}`,
                        originalPrice: originalPrice ? `₹${Number(originalPrice).toLocaleString()}` : undefined,
                        image,
                        badge: hasDiscount ? `Save ${t.discount}%` : 'Popular',
                        badgeColor: hasDiscount ? 'bg-emerald-600' : 'bg-green-500',
                        discount: t?.discount || 0,
                    };
                })?.filter(tour => tour.price !== '₹0' && tour.price !== '₹NaN') || [];

                console.log('Mapped Popular Tours:', mapped); // Debug log

                if (isMounted) {
                    setPopularTours(mapped);
                    setIsLoading(false);
                }
            } catch (e) {
                console.error('Error fetching popular tours:', e);
                if (isMounted) {
                    setPopularTours([]);
                    setIsLoading(false);
                }
            }
        };

        fetchTours();
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
                    <div>
                        <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-4">
                            <Icon name="TrendingUp" size={16} />
                            <span className="text-sm font-medium">Most Popular</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                            Popular Tours
                        </h2>
                        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
                            Our most loved and highly rated tour packages chosen by thousands of travelers
                        </p>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/tour-packages-discovery-center">
                            <Button
                                variant="outline"
                                size="lg"
                                iconName="ArrowRight"
                                iconPosition="right"
                                className="px-6 py-3 text-base font-semibold border-2 bg-[#4891C9] text-white border-[#4891C9]"
                            >
                                View All Tours
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Loader */}
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[300px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid"></div>
                    </div>
                ) : popularTours.length > 0 ? (
                    <>
                        {/* Tours Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {popularTours.map((tour, index) => (
                                <motion.div
                                    key={tour.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md"
                                >
                                    <div className="relative h-60 xs:h-64 sm:h-72 md:h-80 lg:h-[22rem] xl:h-[24rem] 2xl:h-[26rem]">
                                        <Image
                                            src={tour.image}
                                            alt={tour.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            fallback={<div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">No Image Available</div>}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] xs:text-xs sm:text-sm font-medium">
                                            {tour.duration}
                                        </div>

                                        <div className={`absolute top-4 right-4 ${tour.badgeColor} text-white px-3 py-1 rounded-full text-[11px] xs:text-xs sm:text-sm font-medium`}>
                                            {tour.badge}
                                        </div>

                                        <div className="absolute bottom-20 left-4 right-4">
                                            <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-1 leading-snug line-clamp-2">
                                                {tour.title}
                                            </h3>
                                            <p className="text-white/90 text-xs xs:text-sm sm:text-base line-clamp-1">
                                                {tour.location}
                                            </p>
                                        </div>

                                        <div className="absolute bottom-3 left-4">
                                            {tour.originalPrice && (
                                                <span className="text-sm sm:text-base text-white/70 line-through">
                                                    {tour.originalPrice}
                                                </span>
                                            )}
                                            <div className="flex flex-col items-start space-y-1">
                                                <span className="text-xl xs:text-2xl sm:text-2xl lg:text-3xl font-bold text-white">
                                                    {tour.price}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-6 right-4">
                                            <Link
                                                to={`/tour/${tour.id}`}
                                                className="bg-white text-black px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors text-xs xs:text-sm sm:text-base"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Mobile CTA Button */}
                        <div className="md:hidden flex justify-center mt-8">
                            <Link to="/tour-packages-discovery-center">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    iconName="ArrowRight"
                                    iconPosition="right"
                                    className="px-6 py-3 text-base font-semibold border-2 bg-[#4891C9] text-white border-[#4891C9]"
                                >
                                    View All Tours
                                </Button>
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="bg-gray-100 rounded-lg p-8 max-w-md mx-auto">
                            <Icon name="TrendingUp" size={48} className="text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Popular Tours</h3>
                            <p className="text-gray-500 mb-4">Check back later for popular tour packages.</p>
                            <Link to="/tour-packages-discovery-center">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="px-6 py-3 text-base font-semibold border-2 bg-[#4891C9] text-white border-[#4891C9]"
                                >
                                    Browse All Tours
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PopularToursSection;