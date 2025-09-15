import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PackageFilters from './components/PackageFilters';
import SearchBar from './components/SearchBar';
import PackageCard from './components/PackageCard';
import PackageModal from './components/PackageModal';
import ComparisonPanel from './components/ComparisonPanel';

const TourPackagesDiscoveryCenter = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [filters, setFilters] = useState({
    state: '',
    duration: '',
    budget: '',
    theme: '',
    difficulty: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comparisonPackages, setComparisonPackages] = useState([]);
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  const [isComparisonPanelOpen, setIsComparisonPanelOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Mock packages data
  const mockPackages = [
    {
      id: 1,
      title: "Royal Rajasthan Heritage Tour",
      location: "Rajasthan",
      duration: 8,
      price: 45000,
      originalPrice: 52000,
      theme: "cultural",
      difficulty: "easy",
      rating: 4.8,
      reviewCount: 156,
      isNew: false,
      isPopular: true,
      description: `Experience the grandeur of Rajasthan's royal heritage with visits to magnificent palaces, ancient forts, and vibrant markets. This carefully curated journey takes you through the golden triangle of Jaipur, Udaipur, and Jodhpur, showcasing the rich cultural tapestry of the Land of Kings.`,
      images: [
        "https://images.unsplash.com/photo-1599661046827-dacde2a11954?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop"
      ],
      highlights: [
        "Explore the majestic Amber Fort and City Palace in Jaipur",
        "Romantic boat ride on Lake Pichola in Udaipur",
        "Visit the magnificent Mehrangarh Fort in Jodhpur",
        "Experience traditional Rajasthani folk dance and music",
        "Stay in heritage hotels with royal hospitality",
        "Guided tours of local markets and handicraft centers"
      ],
      nextAvailable: "15 Dec 2024",
      itinerary: [
        {
          day: 1,
          title: "Arrival in Jaipur - The Pink City",
          description: "Welcome to Jaipur! Check into your heritage hotel and enjoy a traditional Rajasthani welcome. Evening at leisure to explore local markets.",
          activities: ["Airport pickup", "Hotel check-in", "Welcome dinner", "Local market visit"]
        },
        {
          day: 2,
          title: "Jaipur Sightseeing",
          description: "Full day exploring Jaipur's magnificent forts and palaces including Amber Fort, City Palace, and Hawa Mahal.",
          activities: ["Amber Fort visit", "City Palace tour", "Hawa Mahal photography", "Jantar Mantar observatory"]
        },
        {
          day: 3,
          title: "Jaipur to Jodhpur",
          description: "Drive to Jodhpur, the Blue City. Check into hotel and evening visit to Mehrangarh Fort for sunset views.",
          activities: ["Morning departure", "Scenic drive", "Hotel check-in", "Mehrangarh Fort sunset"]
        }
      ],
      inclusions: [
        "7 nights accommodation in heritage hotels",
        "Daily breakfast and dinner",
        "Private AC vehicle with driver",
        "Professional English-speaking guide",
        "All monument entrance fees",
        "Cultural show tickets",
        "Airport transfers"
      ],
      exclusions: [
        "International/domestic flights",
        "Lunch (except on specified days)",
        "Personal expenses and tips",
        "Travel insurance",
        "Camera fees at monuments",
        "Any items not mentioned in inclusions"
      ],
      reviews: [
        {
          name: "Priya Sharma",
          rating: 5,
          comment: "Absolutely magical experience! The heritage hotels were stunning and our guide was incredibly knowledgeable about Rajasthani history.",
          date: "2 weeks ago"
        },
        {
          name: "Rajesh Kumar",
          rating: 4,
          comment: "Great package with excellent organization. The cultural shows were a highlight. Would recommend to anyone interested in Indian heritage.",
          date: "1 month ago"
        }
      ]
    },
    {
      id: 2,
      title: "Kerala Backwaters & Hill Stations",
      location: "Kerala",
      duration: 6,
      price: 32000,
      originalPrice: null,
      theme: "family",
      difficulty: "easy",
      rating: 4.7,
      reviewCount: 203,
      isNew: true,
      isPopular: false,
      description: `Discover God's Own Country with this perfect blend of serene backwaters, lush hill stations, and pristine beaches. Experience Kerala's natural beauty, Ayurvedic wellness, and rich cultural traditions in this comprehensive tour.`,
      images: [
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
      ],
      highlights: [
        "Houseboat cruise through Alleppey backwaters",
        "Tea plantation tours in Munnar hills",
        "Ayurvedic spa and wellness treatments",
        "Kathakali dance performance in Kochi",
        "Spice plantation visit in Thekkady",
        "Beach relaxation in Kovalam"
      ],
      nextAvailable: "20 Dec 2024",
      itinerary: [
        {
          day: 1,
          title: "Arrival in Kochi",
          description: "Welcome to Kerala! Explore the historic Fort Kochi area with its colonial architecture and Chinese fishing nets.",
          activities: ["Airport pickup", "Fort Kochi tour", "Chinese fishing nets", "Kathakali show"]
        },
        {
          day: 2,
          title: "Kochi to Munnar",
          description: "Drive to the beautiful hill station of Munnar. Visit tea plantations and enjoy the cool mountain air.",
          activities: ["Scenic drive to Munnar", "Tea plantation visit", "Tea museum tour", "Evening at leisure"]
        }
      ],
      inclusions: [
        "5 nights accommodation (including 1 night houseboat)",
        "Daily breakfast and dinner",
        "Private AC vehicle with driver",
        "Houseboat cruise with meals",
        "All sightseeing as per itinerary",
        "Ayurvedic massage session"
      ],
      exclusions: [
        "Flights to/from Kerala",
        "Lunch (except on houseboat)",
        "Personal expenses",
        "Travel insurance",
        "Optional activities"
      ],
      reviews: [
        {
          name: "Anita Desai",
          rating: 5,
          comment: "The houseboat experience was unforgettable! Kerala's natural beauty is breathtaking and the hospitality was excellent.",
          date: "1 week ago"
        }
      ]
    },
    {
      id: 3,
      title: "Himalayan Adventure Trek",
      location: "Himachal Pradesh",
      duration: 10,
      price: 28000,
      originalPrice: 35000,
      theme: "adventure",
      difficulty: "challenging",
      rating: 4.9,
      reviewCount: 89,
      isNew: false,
      isPopular: true,
      description: `Challenge yourself with this thrilling Himalayan adventure through the pristine valleys of Himachal Pradesh. Perfect for adventure enthusiasts seeking breathtaking mountain views, challenging treks, and authentic mountain culture.`,
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1464822759844-d150baec0494?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop"
      ],
      highlights: [
        "Trek to Triund and Indrahar Pass",
        "Camping under starlit Himalayan skies",
        "Visit to McLeod Ganj and Dharamshala",
        "Interaction with local mountain communities",
        "Photography of snow-capped peaks",
        "Adventure activities like rock climbing"
      ],
      nextAvailable: "10 Jan 2025",
      itinerary: [
        {
          day: 1,
          title: "Arrival in Dharamshala",
          description: "Arrive in Dharamshala and acclimatize. Visit McLeod Ganj and explore the local Tibetan culture.",
          activities: ["Airport/station pickup", "McLeod Ganj visit", "Dalai Lama Temple", "Local market exploration"]
        }
      ],
      inclusions: [
        "9 nights accommodation (hotels + camping)",
        "All meals during trek",
        "Professional trek guide and support staff",
        "Trekking equipment and safety gear",
        "All permits and entry fees",
        "First aid and emergency support"
      ],
      exclusions: [
        "Travel to/from Dharamshala",
        "Personal trekking gear",
        "Travel insurance (mandatory)",
        "Emergency evacuation costs",
        "Personal expenses"
      ],
      reviews: [
        {
          name: "Vikram Singh",
          rating: 5,
          comment: "Most challenging and rewarding trek of my life! The views were absolutely spectacular and the guides were very professional.",
          date: "3 weeks ago"
        }
      ]
    },
    {
      id: 4,
      title: "Goa Beach Paradise",
      location: "Goa",
      duration: 4,
      price: 18000,
      originalPrice: null,
      theme: "beach",
      difficulty: "easy",
      rating: 4.5,
      reviewCount: 312,
      isNew: false,
      isPopular: true,
      description: `Relax and unwind in India's premier beach destination. This package combines the best of Goa's pristine beaches, vibrant nightlife, Portuguese heritage, and delicious cuisine for the perfect tropical getaway.`,
      images: [
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
      ],
      highlights: [
        "Relax on pristine beaches of North and South Goa",
        "Water sports and beach activities",
        "Explore Portuguese colonial architecture",
        "Sunset cruise on Mandovi River",
        "Visit to spice plantations",
        "Experience Goan nightlife and cuisine"
      ],
      nextAvailable: "18 Dec 2024",
      itinerary: [
        {
          day: 1,
          title: "Arrival and North Goa Beaches",
          description: "Arrive in Goa and head to your beachside resort. Spend the day relaxing on famous North Goa beaches.",
          activities: ["Airport pickup", "Hotel check-in", "Calangute Beach", "Baga Beach evening"]
        }
      ],
      inclusions: [
        "3 nights beachside accommodation",
        "Daily breakfast",
        "Airport transfers",
        "Sunset river cruise",
        "Spice plantation tour with lunch",
        "All sightseeing as per itinerary"
      ],
      exclusions: [
        "Flights to/from Goa",
        "Lunch and dinner (except specified)",
        "Water sports activities",
        "Personal expenses",
        "Alcoholic beverages"
      ],
      reviews: [
        {
          name: "Meera Patel",
          rating: 4,
          comment: "Perfect beach holiday! The resort was right on the beach and the sunset cruise was magical. Great value for money.",
          date: "5 days ago"
        }
      ]
    },
    {
      id: 5,
      title: "Spiritual Varanasi & Rishikesh",
      location: "Uttar Pradesh & Uttarakhand",
      duration: 7,
      price: 25000,
      originalPrice: 30000,
      theme: "spiritual",
      difficulty: "moderate",
      rating: 4.6,
      reviewCount: 127,
      isNew: false,
      isPopular: false,
      description: `Embark on a transformative spiritual journey through India's most sacred cities. Experience the ancient rituals of Varanasi and find inner peace in the yoga capital of the world, Rishikesh.`,
      images: [
        "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop"
      ],
      highlights: [
        "Witness the sacred Ganga Aarti ceremony",
        "Boat ride on the holy Ganges at sunrise",
        "Yoga and meditation sessions in Rishikesh",
        "Visit to ancient temples and ashrams",
        "Spiritual discourses with learned gurus",
        "Adventure activities like river rafting"
      ],
      nextAvailable: "25 Dec 2024",
      itinerary: [
        {
          day: 1,
          title: "Arrival in Varanasi",
          description: "Arrive in the spiritual capital of India. Evening visit to Dashashwamedh Ghat for the famous Ganga Aarti.",
          activities: ["Airport pickup", "Hotel check-in", "Ganga Aarti ceremony", "Evening boat ride"]
        }
      ],
      inclusions: [
        "6 nights accommodation",
        "Daily breakfast and dinner",
        "Private AC vehicle",
        "Boat rides on Ganges",
        "Yoga sessions in Rishikesh",
        "All temple visits and spiritual activities"
      ],
      exclusions: [
        "Flights to/from destinations",
        "Lunch (except specified)",
        "Personal expenses",
        "Donations at temples",
        "Optional activities"
      ],
      reviews: [
        {
          name: "Suresh Gupta",
          rating: 5,
          comment: "Life-changing spiritual experience! The Ganga Aarti was mesmerizing and the yoga sessions in Rishikesh were deeply peaceful.",
          date: "2 weeks ago"
        }
      ]
    },
    {
      id: 6,
      title: "Kashmir Valley Paradise",
      location: "Jammu & Kashmir",
      duration: 6,
      price: 38000,
      originalPrice: 45000,
      theme: "romantic",
      difficulty: "easy",
      rating: 4.8,
      reviewCount: 94,
      isNew: true,
      isPopular: true,
      description: `Experience the breathtaking beauty of Kashmir, often called 'Paradise on Earth'. This romantic getaway features pristine lakes, snow-capped mountains, beautiful gardens, and the famous houseboats of Dal Lake.`,
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1464822759844-d150baec0494?w=800&h=600&fit=crop"
      ],
      highlights: [
        "Stay in traditional houseboats on Dal Lake",
        "Shikara rides through floating gardens",
        "Visit to Mughal Gardens - Shalimar and Nishat",
        "Gondola ride in Gulmarg",
        "Shopping for Kashmiri handicrafts",
        "Experience local Kashmiri cuisine"
      ],
      nextAvailable: "5 Jan 2025",
      itinerary: [
        {
          day: 1,
          title: "Arrival in Srinagar",
          description: "Welcome to Kashmir! Check into your houseboat on Dal Lake and enjoy a romantic Shikara ride.",
          activities: ["Airport pickup", "Houseboat check-in", "Shikara ride", "Dal Lake sunset"]
        }
      ],
      inclusions: [
        "5 nights accommodation (houseboat + hotel)",
        "Daily breakfast and dinner",
        "Shikara rides on Dal Lake",
        "All sightseeing as per itinerary",
        "Gondola ride in Gulmarg",
        "Airport transfers"
      ],
      exclusions: [
        "Flights to/from Srinagar",
        "Lunch (except specified)",
        "Personal expenses",
        "Travel insurance",
        "Optional activities"
      ],
      reviews: [
        {
          name: "Rohit & Priya",
          rating: 5,
          comment: "Perfect honeymoon destination! The houseboat experience was unique and the natural beauty of Kashmir is unmatched.",
          date: "1 month ago"
        }
      ]
    }
  ];

  useEffect(() => {
    setPackages(mockPackages);
    setFilteredPackages(mockPackages);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...packages];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(pkg =>
        pkg?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        pkg?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        pkg?.theme?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        pkg?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply filters
    if (filters?.state) {
      filtered = filtered?.filter(pkg => 
        pkg?.location?.toLowerCase()?.includes(filters?.state?.toLowerCase())
      );
    }

    if (filters?.duration) {
      const [min, max] = filters?.duration?.split('-')?.map(Number);
      filtered = filtered?.filter(pkg => {
        if (max) {
          return pkg?.duration >= min && pkg?.duration <= max;
        } else {
          return pkg?.duration >= min;
        }
      });
    }

    if (filters?.budget) {
      if (filters?.budget === '75000+') {
        filtered = filtered?.filter(pkg => pkg?.price >= 75000);
      } else {
        const [min, max] = filters?.budget?.split('-')?.map(Number);
        filtered = filtered?.filter(pkg => pkg?.price >= min && pkg?.price <= max);
      }
    }

    if (filters?.theme) {
      filtered = filtered?.filter(pkg => pkg?.theme === filters?.theme);
    }

    if (filters?.difficulty) {
      filtered = filtered?.filter(pkg => pkg?.difficulty === filters?.difficulty);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a?.price - b?.price;
        case 'price-high':
          return b?.price - a?.price;
        case 'rating':
          return b?.rating - a?.rating;
        case 'duration-short':
          return a?.duration - b?.duration;
        case 'duration-long':
          return b?.duration - a?.duration;
        case 'newest':
          return b?.isNew - a?.isNew;
        case 'popular':
          return b?.isPopular - a?.isPopular;
        default:
          return 0;
      }
    });

    setFilteredPackages(filtered);
  }, [packages, searchTerm, filters, sortBy]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      state: '',
      duration: '',
      budget: '',
      theme: '',
      difficulty: ''
    });
    setSearchTerm('');
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const handlePackageInquire = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const handleCompareToggle = (packageId) => {
    if (comparisonPackages?.find(pkg => pkg?.id === packageId)) {
      setComparisonPackages(comparisonPackages?.filter(pkg => pkg?.id !== packageId));
    } else if (comparisonPackages?.length < 3) {
      const packageToAdd = packages?.find(pkg => pkg?.id === packageId);
      setComparisonPackages([...comparisonPackages, packageToAdd]);
    }
  };

  const handleRemoveFromComparison = (packageId) => {
    setComparisonPackages(comparisonPackages?.filter(pkg => pkg?.id !== packageId));
  };

  const handleClearComparison = () => {
    setComparisonPackages([]);
  };

  return (
    <>
      <Helmet>
        <title>Tour Packages Discovery Center - WanderWise Tours</title>
        <meta name="description" content="Discover amazing tour packages across India with WanderWise Tours. Filter by destination, budget, duration, and theme to find your perfect adventure." />
        <meta name="keywords" content="tour packages, travel packages, India tours, vacation packages, holiday packages" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-20 pb-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="px-6 lg:px-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Discover Your Perfect
                <span className="text-gradient-brand"> Adventure</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our curated collection of tour packages designed to create unforgettable memories. 
                From cultural heritage to adventure thrills, find your ideal journey.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { icon: 'MapPin', label: 'Destinations', value: '50+' },
                { icon: 'Users', label: 'Happy Travelers', value: '10,000+' },
                { icon: 'Star', label: 'Average Rating', value: '4.8' },
                { icon: 'Award', label: 'Years Experience', value: '15+' }
              ]?.map((stat, index) => (
                <div key={index} className="bg-card rounded-lg p-6 text-center border border-border">
                  <Icon name={stat?.icon} size={24} className="text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
                  <div className="text-sm text-muted-foreground">{stat?.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Sidebar - Filters */}
              <div className="lg:w-80 flex-shrink-0">
                <PackageFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                />
              </div>

              {/* Main Content Area */}
              <div className="flex-1">
                {/* Search and Sort */}
                <div className="mb-6">
                  <SearchBar
                    onSearch={handleSearch}
                    onSortChange={handleSortChange}
                    sortBy={sortBy}
                    totalResults={filteredPackages?.length}
                  />
                </div>

                {/* View Controls */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Button
                      variant={isComparisonMode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsComparisonMode(!isComparisonMode)}
                      iconName="GitCompare"
                      iconPosition="left"
                    >
                      Compare Mode
                    </Button>
                    
                    {isComparisonMode && (
                      <span className="text-sm text-muted-foreground">
                        Select up to 3 packages to compare
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon name="Grid3X3" size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon name="List" size={16} />
                    </button>
                  </div>
                </div>

                {/* Packages Grid */}
                {filteredPackages?.length > 0 ? (
                  <div className={`grid gap-8 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                      : 'grid-cols-1'
                  }`}>
                    {filteredPackages?.map((pkg) => (
                      <PackageCard
                        key={pkg?.id}
                        package={pkg}
                        onInquire={handlePackageInquire}
                        onCompare={handleCompareToggle}
                        isComparing={isComparisonMode}
                        isSelected={comparisonPackages?.some(p => p?.id === pkg?.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">No packages found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search terms to find more packages.
                    </p>
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      iconName="RotateCcw"
                      iconPosition="left"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}

                {/* Load More Button */}
                {filteredPackages?.length > 0 && (
                  <div className="text-center mt-12">
                    <Button
                      variant="outline"
                      size="lg"
                      iconName="ChevronDown"
                      iconPosition="right"
                    >
                      Load More Packages
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Package Modal */}
        <PackageModal
          package={selectedPackage}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />

        {/* Comparison Panel */}
        <ComparisonPanel
          packages={comparisonPackages}
          onRemove={handleRemoveFromComparison}
          onClear={handleClearComparison}
          isOpen={isComparisonPanelOpen}
          onToggle={() => setIsComparisonPanelOpen(!isComparisonPanelOpen)}
        />

        {/* Footer CTA */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary">
          <div className="px-6 lg:px-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Can't Find Your Perfect Package?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let our travel experts create a customized itinerary just for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  const message = encodeURIComponent("Hi! I'd like to create a custom tour package. Could you help me plan my perfect trip?");
                  window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
                }}
                iconName="MessageCircle"
                iconPosition="left"
                className="bg-white text-primary hover:bg-white/90"
              >
                Chat with Expert
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/contact-support-center'}
                iconName="Phone"
                iconPosition="left"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Call Us Now
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TourPackagesDiscoveryCenter;