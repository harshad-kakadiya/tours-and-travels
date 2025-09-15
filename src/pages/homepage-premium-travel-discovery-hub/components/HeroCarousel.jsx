import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
      title: "Kerala Backwaters",
      subtitle: "Serene Houseboat Experience",
      description: "Drift through emerald waterways surrounded by swaying palms and traditional villages",
      location: "Alleppey, Kerala",
      price: "₹25,000",
      duration: "4 Days",
      rating: 4.8,
      reviews: 342
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?w=1920&h=1080&fit=crop",
      title: "Rajasthan Royal Heritage",
      subtitle: "Palaces & Desert Safari",
      description: "Experience royal grandeur in magnificent palaces and golden sand dunes",
      location: "Jaipur, Rajasthan",
      price: "₹35,000",
      duration: "6 Days",
      rating: 4.9,
      reviews: 567
    },
    {
      id: 3,
      image: "https://images.pixabay.com/photo/2017/02/17/11/13/himalayas-2074000_1280.jpg?w=1920&h=1080&fit=crop",
      title: "Himalayan Adventure",
      subtitle: "Mountain Trekking & Spirituality",
      description: "Discover inner peace amidst snow-capped peaks and ancient monasteries",
      location: "Manali, Himachal Pradesh",
      price: "₹28,000",
      duration: "5 Days",
      rating: 4.7,
      reviews: 289
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920&h=1080&fit=crop",
      title: "Goa Beach Paradise",
      subtitle: "Sun, Sand & Serenity",
      description: "Relax on pristine beaches with vibrant nightlife and Portuguese heritage",
      location: "North Goa",
      price: "₹22,000",
      duration: "4 Days",
      rating: 4.6,
      reviews: 445
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides?.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides?.length) % heroSlides?.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const handleInquiry = (packageTitle) => {
    const message = encodeURIComponent(`Hi! I'm interested in the ${packageTitle} package. Could you provide more details and help me plan this trip?`);
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="relative h-full w-full">
            <Image
              src={heroSlides?.[currentSlide]?.image}
              alt={heroSlides?.[currentSlide]?.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white"
            >
              {/* Location Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Icon name="MapPin" size={16} color="white" />
                <span className="text-sm font-medium">{heroSlides?.[currentSlide]?.location}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight">
                Every Journey Tells a Story
                <br />
                <span className="text-gradient-brand bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  Let Us Help Write Yours
                </span>
              </h1>

              {/* Package Info */}
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-heading font-semibold mb-2">
                  {heroSlides?.[currentSlide]?.title}
                </h2>
                <p className="text-lg sm:text-xl text-gray-200 mb-4">
                  {heroSlides?.[currentSlide]?.subtitle}
                </p>
                <p className="text-base text-gray-300 max-w-2xl leading-relaxed">
                  {heroSlides?.[currentSlide]?.description}
                </p>
              </div>

              {/* Package Details */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={18} color="white" />
                  <span className="text-lg font-medium">{heroSlides?.[currentSlide]?.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Star" size={18} color="#F59E0B" />
                  <span className="text-lg font-medium">
                    {heroSlides?.[currentSlide]?.rating} ({heroSlides?.[currentSlide]?.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="IndianRupee" size={18} color="white" />
                  <span className="text-2xl font-bold text-secondary">
                    {heroSlides?.[currentSlide]?.price}
                  </span>
                  <span className="text-gray-300">per person</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => handleInquiry(heroSlides?.[currentSlide]?.title)}
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="bg-secondary hover:bg-secondary/90 text-white border-0 px-8 py-4 text-lg font-semibold"
                >
                  Inquire Now
                </Button>
                <Link to="/tour-packages-discovery-center">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold"
                  >
                    Explore All Packages
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 z-10"
        aria-label="Previous slide"
      >
        <Icon name="ChevronLeft" size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 z-10"
        aria-label="Next slide"
      >
        <Icon name="ChevronRight" size={24} />
      </button>
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {heroSlides?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-secondary scale-125' :'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      {/* Auto-play Toggle */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 z-10"
        aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
      </button>
    </div>
  );
};

export default HeroCarousel;