import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PopularToursSection = () => {
    const [popularTours, setPopularTours] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const fetchTours = async () => {
            try {
                const res = await fetch('https://tour-travels-be.onrender.com/api/tour');
                const data = await res.json();
                const list = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data?.data : [data].filter(Boolean));
                const mapped = list?.slice(0, 6)?.map((t) => {
                    const durationStr = typeof t?.duration === 'string' ? t?.duration : String(t?.duration || '');
                    const image = Array.isArray(t?.images) && t?.images?.[0] ? t?.images?.[0] : (t?.gallery?.[0]?.image || '');
                    const hasDiscount = Number(t?.discount || 0) > 0;
                    return {
                        id: t?._id || t?.id,
                        title: t?.title,
                        location: t?.location || t?.state?.name || '',
                        duration: durationStr || '',
                        price: `₹${Number(t?.discountedPrice || t?.price || 0).toLocaleString()}`,
                        originalPrice: hasDiscount ? `₹${Number(t?.price || 0).toLocaleString()}` : undefined,
                        image,
                        badge: hasDiscount ? 'Offer' : 'Popular',
                        badgeColor: hasDiscount ? 'bg-emerald-600' : 'bg-green-500'
                    };
                }) || [];
                if (isMounted) setPopularTours(mapped);
            } catch (e) {
                if (isMounted) setPopularTours([]);
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
                        <div
                            className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-4">
                            <Icon name="TrendingUp" size={16}/>
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
                                className="px-6 py-3 text-base font-semibold border-2 hover:bg-primary hover:text-white bg-[#0F172A] text-white hover:border-primary"
                            >
                                View All Tours
                            </Button>
                        </Link>
                    </div>
                </div>

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
                            {/* Background Image */}
                            <div className="relative h-60 xs:h-64 sm:h-72 md:h-80 lg:h-[22rem] xl:h-[24rem] 2xl:h-[26rem]">
                                <Image
                                    src={tour.image}
                                    alt={tour.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                {/* Duration Badge */}
                                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] xs:text-xs sm:text-sm font-medium">
                                    {tour.duration}
                                </div>

                                {/* Status Badge */}
                                <div className={`absolute top-4 right-4 ${tour.badgeColor} text-white px-3 py-1 rounded-full text-[11px] xs:text-xs sm:text-sm font-medium`}>
                                    {tour.badge}
                                </div>

                                {/* Title & Location */}
                                <div className="absolute bottom-20 left-4 right-4">
                                    <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-1 leading-snug line-clamp-2">
                                        {tour.title}
                                    </h3>
                                    <p className="text-white/90 text-xs xs:text-sm sm:text-base line-clamp-1">
                                        {tour.location}
                                    </p>
                                </div>

                                {/* Price */}
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

                                {/* View Details Button */}
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
                            className="px-6 py-3 text-base font-semibold border-2 hover:bg-primary hover:text-white hover:border-primary bg-[#0F172A] text-white"
                        >
                            View All Tours
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PopularToursSection;
