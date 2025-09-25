import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UpcomingToursSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [upcomingTours, setUpcomingTours] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchTours = async () => {
      try {
        const res = await fetch('https://tour-travels-be.onrender.com/api/tour');
        const data = await res.json();
        const list = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data?.data : [data].filter(Boolean));
        const mapped = list?.slice(0, 9)?.map((t) => {
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
        if (isMounted) setUpcomingTours(mapped);
      } catch (e) {
        if (isMounted) setUpcomingTours([]);
      }
    };
    fetchTours();
    return () => { isMounted = false; };
  }, []);


  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(upcomingTours.length / cardsPerSlide) || 1;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const visibleTours = () => {
    const start = currentSlide * cardsPerSlide;
    return upcomingTours.slice(start, start + cardsPerSlide);
  };

  return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
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
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/tour-packages-discovery-center">
                  <Button
                      variant="outline"
                      size="lg"
                      iconName="ArrowRight"
                      iconPosition="right"
                      className="px-6 py-3 text-base font-semibold border-2 bg-[#0F172A] text-white border-[#0F172A] transition-colors duration-300 ease-in-out hover:bg-primary hover:text-white hover:border-primary"
                  >
                      View All
                  </Button>
              </Link>
              <div className="hidden md:flex items-center space-x-2">
                <button
                    onClick={prevSlide}
                    className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label="Previous"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                <button
                    onClick={nextSlide}
                    className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label="Next"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Tours Grid - Simple Card Design with Slider */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleTours().map((tour, index) => (
                <motion.div
                    key={tour.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative rounded-2xl overflow-hidden group cursor-pointer"
                >
                  {/* Background Image */}
                  <div className="relative h-80">
                    <Image
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Duration - Top Left */}
                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {tour.duration}
                    </div>

                    {/* Status Badge - Top Right */}
                    <div className={`absolute top-4 right-4 ${tour.badgeColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {tour.badge}
                    </div>

                    {/* Tour Title - Large White Text */}
                    <div className="absolute bottom-20 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {tour.title}
                      </h3>
                      <p className="text-white/90 text-sm">
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

                    {/* View Details Button - Bottom Right */}
                    <div className="absolute bottom-6 right-6">
                      <Link to={`/tour/${tour.id}`} className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors inline-block">
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
            ))}
          </div>

          {/* Slider Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        currentSlide === idx ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                />
            ))}
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

        </div>
      </section>
  );
};

export default UpcomingToursSlider;