import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Button from '../../components/ui/Button';
import HotelCard from './components/HotelCard';
import SearchFilters from './components/SearchFilters';
import { hotelAPI } from '../../utils/api';
import CallFloatingButton from "../homepage-premium-travel-discovery-hub/components/CallFloatingButton";

const HotelBookingPortal = () => {
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        location: '',
        priceRange: null,
        starRatings: [],
        amenities: [],
        countries: [],
        propertyTypes: [],
        cities: []
    });
    const [allHotels, setAllHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const hotelsPerPage = 6;

    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            setError('');
            try {
                const list = await hotelAPI.list();
                const mapped = list?.map((item) => ({
                    id: item?._id,
                    name: item?.title,
                    location: item?.location,
                    starRating: item?.starRating || 4,
                    rating: item?.rating || 4.5,
                    reviewCount: item?.reviewCount || 0,
                    pricePerNight: item?.discountPrice ?? item?.price,
                    originalPrice: item?.price,
                    discount: item?.discount,
                    isVerified: true,
                    images: [item?.image].filter(Boolean),
                    amenities: (item?.amenities || []).map(a => ({ name: a })),
                    description: item?.overview || '',
                    propertyType: item?.propertyType || 'Hotel',
                })) || [];
                setAllHotels(mapped);
                setFilteredHotels(mapped);
            } catch (e) {
                setError(e?.response?.data?.message || 'Failed to load hotels');
            } finally {
                setLoading(false);
            }
        };
        fetchHotels();
    }, []);

    useEffect(() => {
        let filtered = [...allHotels];

        if (filters?.location) {
            filtered = filtered?.filter(hotel =>
                hotel?.name?.toLowerCase()?.includes(filters?.location?.toLowerCase()) ||
                hotel?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase())
            );
        }

        if (filters?.priceRange) {
            filtered = filtered?.filter(hotel =>
                hotel?.pricePerNight >= filters?.priceRange?.min &&
                hotel?.pricePerNight <= filters?.priceRange?.max
            );
        }

        if (filters?.starRatings?.length > 0) {
            filtered = filtered?.filter(hotel =>
                filters?.starRatings?.includes(hotel?.starRating)
            );
        }

        if (filters?.amenities?.length > 0) {
            filtered = filtered?.filter(hotel =>
                filters?.amenities?.every(amenityId =>
                    hotel?.amenities?.some(amenity =>
                        amenity?.name?.toLowerCase()?.includes(amenityId) ||
                        (amenityId === 'wifi' && amenity?.name?.toLowerCase()?.includes('wifi')) ||
                        (amenityId === 'pool' && amenity?.name?.toLowerCase()?.includes('pool')) ||
                        (amenityId === 'spa' && amenity?.name?.toLowerCase()?.includes('spa')) ||
                        (amenityId === 'gym' && amenity?.name?.toLowerCase()?.includes('fitness')) ||
                        (amenityId === 'restaurant' && amenity?.name?.toLowerCase()?.includes('restaurant')) ||
                        (amenityId === 'parking' && amenity?.name?.toLowerCase()?.includes('parking')) ||
                        (amenityId === 'ac' && amenity?.name?.toLowerCase()?.includes('air conditioning')) ||
                        (amenityId === 'breakfast' && amenity?.name?.toLowerCase()?.includes('breakfast'))
                    )
                )
            );
        }

        if (filters?.countries?.length > 0) {
            filtered = filtered?.filter(hotel =>
                filters?.countries?.some(country => hotel?.location?.toLowerCase()?.includes(country?.toLowerCase()))
            );
        }

        if (filters?.cities?.length > 0) {
            filtered = filtered?.filter(hotel =>
                filters?.cities?.some(city => hotel?.location?.toLowerCase()?.includes(city?.toLowerCase()))
            );
        }

        if (filters?.propertyTypes?.length > 0) {
            filtered = filtered?.filter(hotel =>
                filters?.propertyTypes?.includes(hotel?.propertyType)
            );
        }

        setFilteredHotels(filtered);
        setCurrentPage(1);
    }, [filters, allHotels]);

    const handleViewDetails = (hotel) => {
        window.location.href = `/hotel/${hotel?.id}`;
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedHotel(null);
    };

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({
            location: '',
            priceRange: null,
            starRatings: [],
            amenities: []
        });
    };

    const indexOfLastHotel = currentPage * hotelsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
    const currentHotels = filteredHotels?.slice(indexOfFirstHotel, indexOfLastHotel);
    const totalPages = Math.ceil(filteredHotels?.length / hotelsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleWhatsAppSupport = () => {
        const message = encodeURIComponent("Hi! I need help with hotel bookings. Could you assist me in finding the perfect accommodation?");
        window.open(`https://wa.me/919725855858?text=${message}`, '_blank');
    };

    return (
        <>
            <Helmet>
                <title>Hotel Booking Portal - WanderWise Tours | Premium Accommodations Across India</title>
                <meta name="description" content="Discover and book verified hotels across India with WanderWise Tours. From luxury resorts to budget-friendly stays, find your perfect accommodation with transparent pricing and instant WhatsApp booking." />
                <meta name="keywords" content="hotel booking, accommodation, India hotels, resort booking, travel stay, verified hotels, WanderWise Tours" />
                <meta property="og:title" content="Hotel Booking Portal - WanderWise Tours" />
                <meta property="og:description" content="Book verified hotels across India with transparent pricing and instant support" />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="min-h-screen bg-background">

                {/* Hero Section */}
                <section className="relative pt-20 pb-12 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0">
                        <Image
                            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920"
                            alt="Luxury Hotel"
                            className="w-full h-full object-cover opacity-20"
                        />
                    </div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center space-x-2 mb-4">
                                <Icon name="Building2" size={32} className="text-yellow-300" />
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold">
                                    Hotel Booking Portal
                                </h1>
                            </div>
                            <p className="text-xl sm:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
                                Discover verified accommodations across India with transparent pricing, authentic reviews, and instant booking support
                            </p>
                        </div>
                    </div>
                </section>

                <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
                    <section id="hotels-section" className="grid grid-cols-1 lg:grid-cols-[20rem,1fr] gap-6">
                        <div>
                            <SearchFilters
                                filters={filters}
                                onFiltersChange={handleFiltersChange}
                                onClearFilters={handleClearFilters}
                            />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                                        Available Hotels
                                    </h2>
                                    <p className="text-muted-foreground">
                                        {loading ? 'Loading...' : `${filteredHotels?.length} properties found`}
                                    </p>
                                </div>

                                <Button
                                    variant="outline"
                                    onClick={handleWhatsAppSupport}
                                    iconName="MessageCircle"
                                    iconPosition="left"
                                    iconSize={16}
                                    className="hidden sm:flex border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
                                >
                                    Need Help?
                                </Button>
                            </div>

                            {/* Loader / Error / Hotels Grid */}
                            {loading ? (
                                <div className="flex justify-center items-center py-16">
                                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : error ? (
                                <div className="text-center py-12">
                                    <Icon name="AlertTriangle" size={48} className="text-red-500 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-foreground mb-2">Failed to load hotels</h3>
                                    <p className="text-muted-foreground mb-4">{error}</p>
                                    <Button variant="outline" onClick={() => window.location.reload()} iconName="RotateCcw" iconPosition="left" iconSize={16}>
                                        Retry
                                    </Button>
                                </div>
                            ) : currentHotels?.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                                        {currentHotels?.map((hotel) => (
                                            <HotelCard
                                                key={hotel?.id}
                                                hotel={hotel}
                                                onViewDetails={handleViewDetails}
                                                onInquire={handleWhatsAppSupport}
                                            />
                                        ))}
                                    </div>

                                    {totalPages > 1 && (
                                        <div className="flex items-center justify-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                iconName="ChevronLeft"
                                                iconPosition="left"
                                                iconSize={16}
                                            >
                                                Previous
                                            </Button>
                                            <div className="flex space-x-1">
                                                {[...Array(totalPages)].map((_, index) => {
                                                    const pageNumber = index + 1;
                                                    return (
                                                        <button
                                                            key={pageNumber}
                                                            onClick={() => handlePageChange(pageNumber)}
                                                            className={`w-10 h-10 rounded-md text-sm font-medium transition-all duration-brand-fast ${
                                                                currentPage === pageNumber
                                                                    ? 'bg-primary text-primary-foreground'
                                                                    : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                                                            }`}
                                                        >
                                                            {pageNumber}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                iconName="ChevronRight"
                                                iconPosition="right"
                                                iconSize={16}
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-foreground mb-2">No hotels found</h3>
                                    <p className="text-muted-foreground mb-4">Try adjusting your filters or search criteria</p>
                                    <Button
                                        variant="outline"
                                        onClick={handleClearFilters}
                                        iconName="RotateCcw"
                                        iconPosition="left"
                                        iconSize={16}
                                    >
                                        Clear Filters
                                    </Button>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Why Choose Us */}
                    <section className="mt-16 py-12 bg-muted/30 rounded-xl">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                                Why Choose WanderWise Hotels?
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                We ensure every stay is memorable with our verified partners and exceptional service
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    icon: "Shield",
                                    title: "Verified Properties",
                                    description: "All hotels are personally verified by our team for quality and authenticity"
                                },
                                {
                                    icon: "IndianRupee",
                                    title: "Best Price Guarantee",
                                    description: "We match any lower price you find elsewhere for the same hotel and dates"
                                },
                                {
                                    icon: "MessageCircle",
                                    title: "24*7 WhatsApp Support",
                                    description: "Instant assistance through WhatsApp for bookings, changes, and queries"
                                },
                                {
                                    icon: "Star",
                                    title: "Authentic Reviews",
                                    description: "Real reviews from verified guests to help you make informed decisions"
                                }
                            ].map((feature, index) => (
                                <div key={index} className="text-center p-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <Icon name={feature?.icon} size={24} className="text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-foreground mb-2">{feature?.title}</h3>
                                    <p className="text-sm text-muted-foreground">{feature?.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Floating WhatsApp Button */}
                <button
                    onClick={handleWhatsAppSupport}
                    className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-brand-large flex items-center justify-center transition-all duration-brand-normal hover:scale-110 z-40"
                    aria-label="WhatsApp Support"
                >
                    <Icon name="MessageCircle" size={24} />
                </button>
                <CallFloatingButton/>
            </div>
        </>
    );
};

export default HotelBookingPortal;
