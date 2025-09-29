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
    const [isLoading, setIsLoading] = useState(true); // NEW: Loading state
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

                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.data)
                        ? data?.data
                        : [data].filter(Boolean);

                const mapped = list
                    ?.slice(0, 9)
                    ?.map((t) => {
                        const durationStr = typeof t?.duration === 'string' ? t?.duration : String(t?.duration || '');
                        const image =
                            Array.isArray(t?.images) && t?.images?.[0]
                                ? t?.images?.[0]
                                : t?.gallery?.[0]?.image || '';
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
                            badgeColor: hasDiscount ? 'bg-emerald-600' : 'bg-green-500',
                        };
                    }) || [];

                if (isMounted) {
                    setUpcomingTours(mapped);
                    setIsLoading(false); // Done loading
                }
            } catch (e) {
                if (isMounted) {
                    setUpcomingTours([]);
                    setIsLoading(false); // Even if error, stop loading
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

                    {!isMobile && (
                        <div className="flex items-center space-x-4">
                            <Link to="/tour-packages-discovery-center">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    iconName="ArrowRight"
                                    iconPosition="right"
                                    className="px-6 py-3 text-base font-semibold border-2 bg-[#0F172A] text-white border-[#0F172A] hover:bg-primary hover:text-white hover:border-primary"
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

                {/* Show loader while loading */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid"></div>
                    </div>
                ) : (
                    <>
                        {/* Swiper Slider */}
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
                                    !isMobile
                                        ? {
                                            prevEl: prevRef.current,
                                            nextEl: nextRef.current,
                                        }
                                        : false
                                }
                                pagination={
                                    isMobile
                                        ? {
                                            clickable: true,
                                            el: '.swiper-pagination',
                                        }
                                        : false
                                }
                                onInit={(swiper) => {
                                    if (!isMobile) {
                                        swiper.params.navigation.prevEl = prevRef.current;
                                        swiper.params.navigation.nextEl = nextRef.current;
                                        swiper.navigation.init();
                                        swiper.navigation.update();
                                    }
                                    if (isMobile) {
                                        swiper.params.pagination.el = '.swiper-pagination';
                                        swiper.pagination.init();
                                        swiper.pagination.update();
                                    }
                                }}
                                className="group"
                            >
                                {upcomingTours.map((tour) => (
                                    <SwiperSlide key={tour.id}>
                                        <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-80">
                                            <Image
                                                src={tour.image}
                                                alt={tour.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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

                            {isMobile && <div className="swiper-pagination mt-6 !relative !bottom-0 text-center" />}
                        </div>

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
                    </>
                )}
            </div>
        </section>
    );
};

export default UpcomingToursSlider;
