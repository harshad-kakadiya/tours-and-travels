import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UpcomingToursSlider = () => {
    const [upcomingTours, setUpcomingTours] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        let isMounted = true;

        const fetchTours = async () => {
            try {
                const res = await fetch('https://tour-travels-be.onrender.com/api/tour');
                const data = await res.json();

                console.log('API Response:', data); // Debug log

                // Extract the upcoming tours from the API response
                // Assuming the API returns an object with 'popular' and 'upcoming' arrays
                let upcomingList = [];

                if (data && data.upcoming && Array.isArray(data.upcoming)) {
                    // If API returns separate upcoming array
                    upcomingList = data.upcoming;
                } else if (Array.isArray(data)) {
                    // If API returns a single array, filter upcoming tours
                    // You might need to adjust this filter based on your actual data structure
                    upcomingList = data.filter(tour =>
                        tour.type === 'upcoming' ||
                        tour.category === 'upcoming' ||
                        // Add other conditions to identify upcoming tours
                        true // Temporary - show all tours for testing
                    );
                } else if (data && data.data && Array.isArray(data.data)) {
                    // If API returns { data: [] } structure
                    upcomingList = data.data.filter(tour =>
                        tour.type === 'upcoming' ||
                        tour.category === 'upcoming' ||
                        true // Temporary - show all tours for testing
                    );
                }

                console.log('Upcoming List:', upcomingList); // Debug log

                const mapped = upcomingList
                    ?.slice(0, 9)
                    ?.map((t) => {
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
                                : '/default-tour-image.jpg'; // Add a default image

                        return {
                            id: t?._id || t?.id,
                            title: t?.title || 'Untitled Tour',
                            location: location,
                            duration: t?.duration || '',
                            price: `₹${Number(discountedPrice || originalPrice || 0).toLocaleString()}`,
                            originalPrice: originalPrice ? `₹${Number(originalPrice).toLocaleString()}` : undefined,
                            image: image,
                            badge: hasDiscount ? `Save ${t.discount}%` : 'Upcoming',
                            badgeColor: hasDiscount ? 'bg-emerald-600' : 'bg-blue-500',
                            discount: t?.discount || 0,
                            difficulty: t?.difficulty || '',
                            altitude: t?.altitude || '',
                            bestTimeToVisit: t?.bestTimeToVisit || '',
                        };
                    })
                    ?.filter(tour => tour.price !== '₹0' && tour.price !== '₹NaN') || [];

                console.log('Mapped Tours:', mapped); // Debug log

                if (isMounted) {
                    setUpcomingTours(mapped);
                    setIsLoading(false);
                }
            } catch (e) {
                console.error('Error fetching tours:', e);
                if (isMounted) {
                    setUpcomingTours([]);
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
        <section className="py-16 bg-background relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                            <Icon name="Calendar" size={16} />
                            <span className="text-sm font-medium">Upcoming Tours</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
                            Upcoming Tours
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Discover our upcoming tour packages with exclusive early bird offers
                        </p>
                    </div>

                    {!isMobile && upcomingTours.length > 0 && (
                        <div className="flex items-center space-x-4">
                            <Link to="/tour-packages-discovery-center">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    iconName="ArrowRight"
                                    iconPosition="right"
                                    className="px-6 py-3 text-base font-semibold border-2 bg-[#4891C9] text-white border-[#4891C9]"
                                >
                                    View All
                                </Button>
                            </Link>

                            <button
                                ref={prevRef}
                                className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                                aria-label="Previous"
                            >
                                <Icon name="ChevronLeft" size={20} />
                            </button>
                            <button
                                ref={nextRef}
                                className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                                aria-label="Next"
                            >
                                <Icon name="ChevronRight" size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid"></div>
                    </div>
                ) : upcomingTours.length > 0 ? (
                    <>
                        <div className="relative">
                            <Swiper
                                modules={[Navigation, Pagination]}
                                slidesPerView={1}
                                spaceBetween={24}
                                breakpoints={{
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                }}
                                navigation={
                                    !isMobile && upcomingTours.length > 0
                                        ? {
                                            prevEl: prevRef.current,
                                            nextEl: nextRef.current,
                                        }
                                        : false
                                }
                                pagination={
                                    isMobile && upcomingTours.length > 0
                                        ? {
                                            clickable: true,
                                            el: '.swiper-pagination',
                                        }
                                        : false
                                }
                                onInit={(swiper) => {
                                    if (!isMobile && upcomingTours.length > 0) {
                                        swiper.params.navigation.prevEl = prevRef.current;
                                        swiper.params.navigation.nextEl = nextRef.current;
                                        swiper.navigation.init();
                                        swiper.navigation.update();
                                    }
                                    if (isMobile && upcomingTours.length > 0) {
                                        swiper.params.pagination.el = '.swiper-pagination';
                                        swiper.pagination.init();
                                        swiper.pagination.update();
                                    }
                                }}
                                className="group"
                            >
                                {upcomingTours.map((tour, index) => (
                                    <SwiperSlide key={tour.id}>
                                        <div
                                            className="relative rounded-2xl overflow-hidden group cursor-pointer h-80"
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                        >
                                            <Image
                                                src={tour.image}
                                                alt={tour.title}
                                                className={`w-full h-full object-cover transition-transform duration-500 ${
                                                    hoveredIndex === index ? 'scale-110' : 'scale-100'
                                                }`}
                                                fallback={<div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">No Image Available</div>}
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                            <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                                                {tour.duration}
                                            </div>

                                            <div className={`absolute top-4 right-4 ${tour.badgeColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                                                {tour.badge}
                                            </div>

                                            <div className="absolute bottom-20 left-6 right-6">
                                                <h3 className="text-2xl font-bold text-white mb-1">{tour.title}</h3>
                                                <p className="text-white/90 text-sm">{tour.location}</p>
                                            </div>

                                            <div className="absolute bottom-4 left-6">
                                                {tour.originalPrice && (
                                                    <span className="text-sm text-white/70 line-through block">{tour.originalPrice}</span>
                                                )}
                                                <span className="text-2xl font-bold text-white">{tour.price}</span>
                                            </div>

                                            <div className="absolute bottom-4 right-6">
                                                <Link
                                                    to={`/tour/${tour.id}`}
                                                    className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {isMobile && upcomingTours.length > 0 && (
                                <div className="swiper-pagination mt-6 !relative !bottom-0 text-center" />
                            )}
                        </div>

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
                            <Icon name="Calendar" size={48} className="text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Upcoming Tours</h3>
                            <p className="text-gray-500 mb-4">Check back later for new upcoming tour packages.</p>
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

export default UpcomingToursSlider;