import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
    const locationHook = useLocation();
    // Fetch tours from API and map to UI-friendly packages shape
    useEffect(() => {
        let isMounted = true;
        const fetchTours = async () => {
            try {
                const res = await fetch('https://tour-travels-be.onrender.com/api/tour');
                const data = await res.json();
                const list = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data?.data : [data].filter(Boolean));
                const mapped = list?.map((t) => {
                    const durationStr = typeof t?.duration === 'string' ? t?.duration : String(t?.duration || '');
                    const durationNum = parseInt(durationStr?.replace(/[^0-9]/g, ''), 10) || 0;
                    const images = Array.isArray(t?.images) && t?.images?.length > 0 ? t?.images : [t?.gallery?.[0]?.image].filter(Boolean);
                    return {
                        id: t?._id || t?.id,
                        title: t?.title,
                        location: t?.location || t?.state?.name || '',
                        stateName: (t?.state?.name || '')?.toLowerCase(),
                        duration: durationNum,
                        price: Number(t?.discountedPrice || t?.price || 0),
                        originalPrice: t?.discount ? Number(t?.price || 0) : null,
                        theme: t?.theme || '',
                        difficulty: (t?.difficulty || '')?.toLowerCase(),
                        rating: 0,
                        reviewCount: 0,
                        isNew: false,
                        isPopular: Boolean(t?.recommended && t?.recommended?.length > 0),
                        description: t?.description || t?.summary || '',
                        images
                    };
                }) || [];
                if (isMounted) {
                    setPackages(mapped);
                    setFilteredPackages(mapped);
                }
            } catch (e) {
                // On error, keep empty to avoid UI changes
                if (isMounted) {
                    setPackages([]);
                    setFilteredPackages([]);
                }
            }
        };
        fetchTours();
        return () => { isMounted = false; };
    }, []);
    // Initialize state filter from URL query (e.g., ?state=Kerala)
    useEffect(() => {
        const params = new URLSearchParams(locationHook.search);
        const state = params.get('state') || '';
        if (state) {
            setFilters((prev) => ({ ...prev, state }));
            setSearchTerm('');
        }
    }, [locationHook.search]);
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
            const q = filters?.state?.toLowerCase();
            filtered = filtered?.filter(pkg => {
                if (pkg?.stateName) {
                    return pkg?.stateName === q || pkg?.stateName?.includes(q);
                }
                return pkg?.location?.toLowerCase()?.includes(q);
            });
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
                                            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'
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