import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Button from '../../components/ui/Button';
import HotelCard from './components/HotelCard';
import SearchFilters from './components/SearchFilters';
import HotelDetailsModal from './components/HotelDetailsModal';
import FeaturedHotels from './components/FeaturedHotels';
import QuickBookingWidget from './components/QuickBookingWidget';

const HotelBookingPortal = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    priceRange: null,
    starRatings: [],
    amenities: []
  });
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 6;

  // Mock hotel data
  const mockHotels = [
    {
      id: 1,
      name: "The Grand Palace Resort",
      location: "Goa, India",
      starRating: 5,
      rating: 4.8,
      reviewCount: 342,
      pricePerNight: 8500,
      originalPrice: 12000,
      discount: 30,
      isVerified: true,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
      ],
      amenities: [
        { name: "Free WiFi", icon: "Wifi" },
        { name: "Swimming Pool", icon: "Waves" },
        { name: "Spa & Wellness", icon: "Flower2" },
        { name: "Restaurant", icon: "UtensilsCrossed" },
        { name: "Free Parking", icon: "Car" },
        { name: "Air Conditioning", icon: "Snowflake" },
        { name: "Fitness Center", icon: "Dumbbell" },
        { name: "Room Service", icon: "Bell" }
      ],
      description: `Experience luxury at its finest at The Grand Palace Resort, where traditional Goan hospitality meets modern elegance. Nestled along the pristine beaches of North Goa, this 5-star resort offers breathtaking ocean views, world-class amenities, and exceptional service that creates unforgettable memories.`,
      coordinates: { lat: 15.2993, lng: 74.1240 },
      specialOffer: "Complimentary breakfast & airport transfer",
      recentReviews: [
        {
          guestName: "Priya Sharma",
          rating: 5,
          date: "2 days ago",
          comment: "Absolutely stunning resort! The staff was incredibly helpful and the beachfront location is perfect. The spa treatments were divine."
        },
        {
          guestName: "Rajesh Kumar",
          rating: 5,
          date: "1 week ago",
          comment: "Best vacation ever! The rooms are spacious, food is excellent, and the infinity pool overlooking the ocean is breathtaking."
        }
      ]
    },
    {
      id: 2,
      name: "Himalayan Retreat Lodge",
      location: "Manali, Himachal Pradesh",
      starRating: 4,
      rating: 4.6,
      reviewCount: 198,
      pricePerNight: 4500,
      originalPrice: 6000,
      discount: 25,
      isVerified: true,
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
      ],
      amenities: [
        { name: "Free WiFi", icon: "Wifi" },
        { name: "Mountain View", icon: "Mountain" },
        { name: "Restaurant", icon: "UtensilsCrossed" },
        { name: "Free Parking", icon: "Car" },
        { name: "Fireplace", icon: "Flame" },
        { name: "Garden", icon: "Trees" }
      ],
      description: `Escape to the serene mountains at Himalayan Retreat Lodge, where cozy comfort meets stunning natural beauty. Located in the heart of Manali, this charming lodge offers panoramic mountain views, warm hospitality, and easy access to adventure activities.`,
      coordinates: { lat: 32.2432, lng: 77.1892 },
      specialOffer: "Free bonfire & local sightseeing",
      recentReviews: [
        {
          guestName: "Anita Verma",
          rating: 5,
          date: "3 days ago",
          comment: "Perfect mountain getaway! The views are spectacular and the staff arranged amazing local tours. Highly recommended for nature lovers."
        }
      ]
    },
    {
      id: 3,
      name: "Royal Heritage Palace",
      location: "Udaipur, Rajasthan",
      starRating: 5,
      rating: 4.9,
      reviewCount: 456,
      pricePerNight: 12000,
      isVerified: true,
      images: [
        "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
      ],
      amenities: [
        { name: "Free WiFi", icon: "Wifi" },
        { name: "Swimming Pool", icon: "Waves" },
        { name: "Spa & Wellness", icon: "Flower2" },
        { name: "Restaurant", icon: "UtensilsCrossed" },
        { name: "Valet Parking", icon: "Car" },
        { name: "Butler Service", icon: "Bell" },
        { name: "Lake View", icon: "Waves" },
        { name: "Cultural Shows", icon: "Music" }
      ],
      description: `Step into royalty at the Royal Heritage Palace, a magnificent lakeside palace hotel that epitomizes the grandeur of Rajasthan. With its intricate architecture, luxurious suites, and impeccable service, experience the lifestyle of maharajas.`,
      coordinates: { lat: 24.5854, lng: 73.7125 },
      recentReviews: [
        {
          guestName: "Vikram Singh",
          rating: 5,
          date: "1 day ago",
          comment: "Living like royalty! The palace is breathtaking, service is impeccable, and the sunset views from the terrace are unforgettable."
        }
      ]
    },
    {
      id: 4,
      name: "Backwater Bliss Resort",
      location: "Alleppey, Kerala",
      starRating: 4,
      rating: 4.7,
      reviewCount: 289,
      pricePerNight: 6500,
      isVerified: true,
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800"
      ],
      amenities: [
        { name: "Free WiFi", icon: "Wifi" },
        { name: "Backwater View", icon: "Waves" },
        { name: "Ayurvedic Spa", icon: "Flower2" },
        { name: "Restaurant", icon: "UtensilsCrossed" },
        { name: "Boat Rides", icon: "Ship" },
        { name: "Yoga Classes", icon: "Heart" }
      ],
      description: `Immerse yourself in Kerala's natural beauty at Backwater Bliss Resort, where tranquil backwaters meet traditional hospitality. Experience authentic Kerala culture, Ayurvedic treatments, and serene boat rides through coconut groves.`,
      coordinates: { lat: 9.4981, lng: 76.3388 },
      recentReviews: [
        {
          guestName: "Meera Nair",
          rating: 5,
          date: "4 days ago",
          comment: "Absolutely peaceful and rejuvenating! The backwater views are stunning and the Ayurvedic spa treatments were incredible."
        }
      ]
    },
    {
      id: 5,
      name: "Urban Luxury Suites",
      location: "Mumbai, Maharashtra",
      starRating: 5,
      rating: 4.5,
      reviewCount: 567,
      pricePerNight: 9500,
      isVerified: true,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800"
      ],
      amenities: [
        { name: "Free WiFi", icon: "Wifi" },
        { name: "City View", icon: "Building2" },
        { name: "Fitness Center", icon: "Dumbbell" },
        { name: "Restaurant", icon: "UtensilsCrossed" },
        { name: "Business Center", icon: "Briefcase" },
        { name: "Concierge", icon: "Bell" }
      ],
      description: `Experience Mumbai's vibrant energy from the comfort of Urban Luxury Suites, where contemporary elegance meets metropolitan convenience. Located in the heart of the financial capital, perfect for business and leisure travelers.`,
      coordinates: { lat: 19.0760, lng: 72.8777 },
      recentReviews: [
        {
          guestName: "Arjun Patel",
          rating: 4,
          date: "2 days ago",
          comment: "Great location in the heart of Mumbai. Modern amenities and excellent service. Perfect for business trips."
        }
      ]
    },
    {
      id: 6,
      name: "Garden Paradise Resort",
      location: "Ooty, Tamil Nadu",
      starRating: 3,
      rating: 4.3,
      reviewCount: 156,
      pricePerNight: 3500,
      isVerified: true,
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
      ],
      amenities: [
        { name: "Free WiFi", icon: "Wifi" },
        { name: "Garden View", icon: "Trees" },
        { name: "Restaurant", icon: "UtensilsCrossed" },
        { name: "Free Parking", icon: "Car" },
        { name: "Children's Play Area", icon: "Baby" }
      ],
      description: `Nestled in the Nilgiri Hills, Garden Paradise Resort offers a perfect family retreat surrounded by lush gardens and cool mountain air. Enjoy the charm of Ooty with comfortable accommodations and warm hospitality.`,
      coordinates: { lat: 11.4064, lng: 76.6932 },
      recentReviews: [
        {
          guestName: "Sunita Reddy",
          rating: 4,
          date: "1 week ago",
          comment: "Lovely family-friendly resort with beautiful gardens. Kids enjoyed the play area and the weather was perfect."
        }
      ]
    }
  ];

  const featuredHotels = mockHotels?.filter(hotel => hotel?.discount)?.slice(0, 2);

  useEffect(() => {
    let filtered = [...mockHotels];

    // Filter by location
    if (filters?.location) {
      filtered = filtered?.filter(hotel =>
        hotel?.name?.toLowerCase()?.includes(filters?.location?.toLowerCase()) ||
        hotel?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase())
      );
    }

    // Filter by price range
    if (filters?.priceRange) {
      filtered = filtered?.filter(hotel =>
        hotel?.pricePerNight >= filters?.priceRange?.min &&
        hotel?.pricePerNight <= filters?.priceRange?.max
      );
    }

    // Filter by star ratings
    if (filters?.starRatings?.length > 0) {
      filtered = filtered?.filter(hotel =>
        filters?.starRatings?.includes(hotel?.starRating)
      );
    }

    // Filter by amenities
    if (filters?.amenities?.length > 0) {
      filtered = filtered?.filter(hotel =>
        filters?.amenities?.every(amenityId =>
          hotel?.amenities?.some(amenity =>
            amenity?.name?.toLowerCase()?.includes(amenityId) ||
            amenityId === 'wifi' && amenity?.name?.toLowerCase()?.includes('wifi') ||
            amenityId === 'pool' && amenity?.name?.toLowerCase()?.includes('pool') ||
            amenityId === 'spa' && amenity?.name?.toLowerCase()?.includes('spa') ||
            amenityId === 'gym' && amenity?.name?.toLowerCase()?.includes('fitness') ||
            amenityId === 'restaurant' && amenity?.name?.toLowerCase()?.includes('restaurant') ||
            amenityId === 'parking' && amenity?.name?.toLowerCase()?.includes('parking') ||
            amenityId === 'ac' && amenity?.name?.toLowerCase()?.includes('air conditioning') ||
            amenityId === 'breakfast' && amenity?.name?.toLowerCase()?.includes('breakfast')
          )
        )
      );
    }

    setFilteredHotels(filtered);
    setCurrentPage(1);
  }, [filters]);

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

  // Pagination
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
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
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

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-green-300" />
                <span>Verified Properties</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={16} className="text-yellow-300" />
                <span>Authentic Reviews</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MessageCircle" size={16} className="text-blue-300" />
                <span>Instant Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="IndianRupee" size={16} className="text-green-300" />
                <span>Best Price Guarantee</span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Booking Widget */}
          <QuickBookingWidget 
            onSearch={({ destination, checkIn, checkOut, guests, rooms }) => {
              const newFilters = { ...filters };
              newFilters.location = destination;
              // Optionally we could incorporate date/guests/rooms into filtering logic later
              setFilters(newFilters);
            }}
          />

          {/* Featured Hotels */}
          <FeaturedHotels 
            hotels={featuredHotels}
            onViewDetails={handleViewDetails}
          />

          {/* Search Filters */}
          <SearchFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />

          {/* Hotels Section */}
          <section id="hotels-section">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                  Available Hotels
                </h2>
                <p className="text-muted-foreground">
                  {filteredHotels?.length} properties found
                </p>
              </div>
              
              {/* WhatsApp Support */}
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

            {/* Hotels Grid */}
            {currentHotels?.length > 0 ? (
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

                {/* Pagination */}
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
                      {[...Array(totalPages)]?.map((_, index) => {
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
                  title: "24/7 WhatsApp Support",
                  description: "Instant assistance through WhatsApp for bookings, changes, and queries"
                },
                {
                  icon: "Star",
                  title: "Authentic Reviews",
                  description: "Real reviews from verified guests to help you make informed decisions"
                }
              ]?.map((feature, index) => (
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

        {/* Hotel Details Modal removed in favor of dedicated page */}

        {/* Floating WhatsApp Button */}
        <button
          onClick={handleWhatsAppSupport}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-brand-large flex items-center justify-center transition-all duration-brand-normal hover:scale-110 z-40"
          aria-label="WhatsApp Support"
        >
          <Icon name="MessageCircle" size={24} />
        </button>

      </div>
    </>
  );
};

export default HotelBookingPortal;