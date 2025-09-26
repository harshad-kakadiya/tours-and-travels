import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const navigate = useNavigate();

    const [searchData, setSearchData] = useState({
        destination: '',
        budget: '',
        duration: '',
        travelStyle: ''
    });

    const destinations = ["Kerala", "Rajasthan", "Goa", "Himachal Pradesh", "Uttarakhand", "Karnataka", "Tamil Nadu", "Maharashtra", "Gujarat", "Andhra Pradesh"];

    const budgetRanges = [
        {label: "₹15,000 - ₹30,000", value: "15000-30000"},
        {label: "₹30,000 - ₹50,000", value: "30000-50000"},
        {label: "₹50,000 - ₹75,000", value: "50000-75000"},
        {label: "₹75,000 - ₹1,00,000", value: "75000-100000"},
        {label: "₹1,00,000 - ₹2,00,000", value: "100000-200000"}
    ];

    const durations = [
        {label: "2-3 Days", value: "2-3"},
        {label: "4-5 Days", value: "4-5"},
        {label: "6-7 Days", value: "6-7"},
        {label: "8-10 Days", value: "8-10"},
        {label: "10+ Days", value: "10+"}
    ];

    const travelStyles = [
        {label: "Adventure", value: "adventure"},
        {label: "Cultural", value: "cultural"},
        {label: "Relaxation", value: "relaxation"},
        {label: "Family", value: "family"},
        {label: "Romantic", value: "romantic"},
        {label: "Solo", value: "solo"}
    ];

    const handleInputChange = (field, value) => {
        setSearchData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSearch = () => {
        const searchParams = new URLSearchParams();
        Object.entries(searchData).forEach(([key, value]) => {
            if (value) searchParams.append(key, value);
        });
        navigate(`/tour-packages-discovery-center?${searchParams.toString()}`);
    };

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
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, heroSlides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
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
        <div className="relative min-h-[165vh] sm:min-h-[160vh] lg:min-h-[100vh] w-full overflow-hidden bg-gray-900">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{opacity: 0, scale: 1.1}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.95}}
                    transition={{duration: 0.8, ease: "easeInOut"}}
                    className="absolute inset-0"
                >
                    <div className="relative h-full w-full">
                        <Image
                            src={heroSlides[currentSlide]?.image}
                            alt={heroSlides[currentSlide]?.title}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"/>
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"/>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Overlay Content */}
            <div
                className="absolute inset-0 w-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8">
                <div
                    className="w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-8 py-10 sm:py-16 lg:py-24">

                    {/* Slide Text Section */}
                    <div className="text-white max-w-3xl px-1 mt-8">
                        <motion.div
                            key={`content-${currentSlide}`}
                            initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 0.2}}
                        >
                            <div
                                className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                                <Icon name="MapPin" size={16} color="white"/>
                                <span className="text-sm">{heroSlides[currentSlide]?.location}</span>
                            </div>

                            <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-5xl font-bold mb-4 leading-tight">
                                Every Journey Tells a Story
                                <br/>
                                <span
                                    className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                            Let Us Help Write Yours
                          </span>
                            </h1>

                            <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                                {heroSlides[currentSlide]?.title}
                            </h2>
                            <p className="text-base sm:text-lg text-gray-200 mb-4">{heroSlides[currentSlide]?.subtitle}</p>
                            <p className="text-sm sm:text-base text-gray-300 mb-6">{heroSlides[currentSlide]?.description}</p>

                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <div className="flex items-center space-x-2">
                                    <Icon name="Calendar" size={18} color="white"/>
                                    <span>{heroSlides[currentSlide]?.duration}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Icon name="Star" size={18} color="#F59E0B"/>
                                    <span>{heroSlides[currentSlide]?.rating} ({heroSlides[currentSlide]?.reviews} reviews)</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Icon name="IndianRupee" size={18} color="white"/>
                                    <span
                                        className="text-xl font-bold text-secondary">{heroSlides[currentSlide]?.price}</span>
                                    <span className="text-gray-300">per person</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    variant="default"
                                    size="lg"
                                    onClick={() => handleInquiry(heroSlides[currentSlide]?.title)}
                                    iconName="MessageCircle"
                                    iconPosition="left"
                                    className="bg-secondary text-white px-8 py-4"
                                >
                                    Inquire Now
                                </Button>
                                <Link to="/tour-packages-discovery-center">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        iconName="ArrowRight"
                                        iconPosition="right"
                                        className="border-white text-white px-8 py-4"
                                    >
                                        Explore All Packages
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                    <div className="w-full lg:w-[500px] bg-white rounded-2xl p-6 sm:p-8 z-20 shadow-xl">
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Find Your Perfect
                            Journey</h2>
                        <p className="text-muted-foreground text-sm sm:text-base mb-6">
                            Discover curated experiences tailored to your preferences
                        </p>
                        <div className="flex flex-col gap-4 mb-6">
                            {/* Destination */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    <Icon name="MapPin" size={16} className="inline mr-2"/>
                                    Destination
                                </label>
                                <input
                                    type="text"
                                    placeholder="Where to?"
                                    value={searchData.destination}
                                    onChange={(e) => handleInputChange('destination', e.target.value)}
                                    className="w-full px-4 py-3 border border-border rounded-lg"
                                    list="destinations"
                                />
                                <datalist id="destinations">
                                    {destinations.map((dest) => <option key={dest} value={dest}/>)}
                                </datalist>
                            </div>
                            {/* Budget */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    <Icon name="IndianRupee" size={16} className="inline mr-2"/>
                                    Budget Range
                                </label>
                                <select
                                    value={searchData.budget}
                                    onChange={(e) => handleInputChange('budget', e.target.value)}
                                    className="w-full px-4 py-3 border border-border rounded-lg"
                                >
                                    <option value="">Select budget</option>
                                    {budgetRanges.map((range) => (
                                        <option key={range.value} value={range.value}>{range.label}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Duration */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    <Icon name="Calendar" size={16} className="inline mr-2"/>
                                    Duration
                                </label>
                                <select
                                    value={searchData.duration}
                                    onChange={(e) => handleInputChange('duration', e.target.value)}
                                    className="w-full px-4 py-3 border border-border rounded-lg"
                                >
                                    <option value="">Select duration</option>
                                    {durations.map((d) => (
                                        <option key={d.value} value={d.value}>{d.label}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Travel Style */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    <Icon name="Heart" size={16} className="inline mr-2"/>
                                    Travel Style
                                </label>
                                <select
                                    value={searchData.travelStyle}
                                    onChange={(e) => handleInputChange('travelStyle', e.target.value)}
                                    className="w-full px-4 py-3 border border-border rounded-lg"
                                >
                                    <option value="">Select style</option>
                                    {travelStyles.map((style) => (
                                        <option key={style.value} value={style.value}>{style.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="text-center">
                            <Button
                                variant="default"
                                size="lg"
                                onClick={handleSearch}
                                iconName="Search"
                                iconPosition="left"
                                className="bg-[#0F172A] border-[#0F172A] text-white transition-colors duration-300 ease-in-out hover:bg-primary hover:text-white hover:border-primary px-8 py-4 text-lg font-semibold w-full"
                            >
                                Search Packages
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide Controls */}
            {/*<button onClick={prevSlide}*/}
            {/*        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full hidden xxl:flex items-center justify-center text-white z-10 hover:bg-white/30">*/}
            {/*    <Icon name="ChevronLeft" size={24}/>*/}
            {/*</button>*/}
            {/*<button onClick={nextSlide}*/}
            {/*        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full hidden xxl:flex items-center justify-center text-white z-10 hover:bg-white/30">*/}
            {/*    <Icon name="ChevronRight" size={24}/>*/}
            {/*</button>*/}

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-secondary scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                    />
                ))}
            </div>

            {/* Auto Play Toggle */}
            <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white z-10 hover:bg-white/30"
            >
                <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16}/>
            </button>
        </div>
    );
};

export default HeroCarousel;
