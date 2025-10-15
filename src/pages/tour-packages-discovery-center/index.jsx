import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchBar from './components/SearchBar';
import PackageCard from './components/PackageCard';
import PackageModal from './components/PackageModal';
import ComparisonPanel from './components/ComparisonPanel';
import WhatsAppFloatingButton from "../homepage-premium-travel-discovery-hub/components/WhatsAppFloatingButton";
import CallFloatingButton from "../homepage-premium-travel-discovery-hub/components/CallFloatingButton";

const TourPackagesDiscoveryCenter = () => {
    const [packages, setPackages] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);
    const [filters, setFilters] = useState({
        state: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('relevance');
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comparisonPackages, setComparisonPackages] = useState([]);
    const [isComparisonMode, setIsComparisonMode] = useState(false);
    const [isComparisonPanelOpen, setIsComparisonPanelOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const locationHook = useLocation();

    useEffect(() => {
        let isMounted = true;
        const fetchTours = async () => {
            setLoading(true);
            try {
                const res = await fetch('https://tour-travels-be.onrender.com/api/tour');
                const data = await res.json();

                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.data)
                        ? data.data
                        : [data].filter(Boolean);

                const mapped = list?.map((t) => {
                    const durationStr = typeof t?.duration === 'string' ? t.duration : String(t.duration || '');
                    const durationNum = parseInt(durationStr.replace(/[^0-9]/g, ''), 10) || 0;
                    const images = Array.isArray(t?.images) && t.images.length > 0 ? t.images : [t?.gallery?.[0]?.image].filter(Boolean);
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
                        isPopular: Boolean(t?.recommended && t.recommended.length > 0),
                        description: t?.description || t?.summary || '',
                        images
                    };
                }) || [];

                if (isMounted) {
                    setPackages(mapped);
                    setFilteredPackages(mapped);
                    setError(null);
                }
            } catch (e) {
                if (isMounted) {
                    setError('Failed to load packages. Please try again later.');
                    setPackages([]);
                    setFilteredPackages([]);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchTours();
        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(locationHook.search);
        const state = params.get('state') || '';
        const search = params.get('search') || '';
        
        if (state) {
            setFilters((prev) => ({ ...prev, state }));
            setSearchTerm('');
        }
        
        if (search) {
            setSearchTerm(search);
        }
    }, [locationHook.search]);

    useEffect(() => {
        let filtered = [...packages];

        if (searchTerm) {
            filtered = filtered.filter(pkg =>
                pkg.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pkg.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pkg.theme?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pkg.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filters?.state) {
            const q = filters.state.toLowerCase();
            filtered = filtered.filter(pkg => pkg.stateName === q || pkg.stateName?.includes(q) || pkg.location?.toLowerCase()?.includes(q));
        }


        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low': return a.price - b.price;
                case 'price-high': return b.price - a.price;
                case 'rating': return b.rating - a.rating;
                case 'duration-short': return a.duration - b.duration;
                case 'duration-long': return b.duration - a.duration;
                case 'newest': return b.isNew - a.isNew;
                case 'popular': return b.isPopular - a.isPopular;
                default: return 0;
            }
        });

        setFilteredPackages(filtered);
    }, [packages, searchTerm, filters, sortBy]);

    const handleFiltersChange = (newFilters) => setFilters(newFilters);
    const handleClearFilters = () => {
        setFilters({ state: '' });
        setSearchTerm('');
    };
    const handleSearch = (term) => setSearchTerm(term);
    const handleSortChange = (newSort) => setSortBy(newSort);
    const handlePackageInquire = (pkg) => {
        setSelectedPackage(pkg);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPackage(null);
    };
    const handleCompareToggle = (packageId) => {
        if (comparisonPackages.find(pkg => pkg.id === packageId)) {
            setComparisonPackages(comparisonPackages.filter(pkg => pkg.id !== packageId));
        } else if (comparisonPackages.length < 3) {
            const pkg = packages.find(p => p.id === packageId);
            setComparisonPackages([...comparisonPackages, pkg]);
        }
    };
    const handleRemoveFromComparison = (packageId) => {
        setComparisonPackages(comparisonPackages.filter(pkg => pkg.id !== packageId));
    };
    const handleClearComparison = () => setComparisonPackages([]);

    return (
        <>
            <Helmet>
                <title>Tour Packages Discovery Center - WanderWise Tours</title>
                <meta name="description" content="Discover amazing tour packages across India with WanderWise Tours..." />
            </Helmet>
            <div className="min-h-screen bg-background">
                {/*<Header />*/}

                {/* Hero */}
                <section className="pt-20 pb-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                    <div className="px-6 lg:px-12 text-center">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                            Discover Your Perfect <span className="text-gradient-brand">Adventure</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Explore our curated collection of tour packages designed to create unforgettable memories.
                        </p>
                    </div>
                </section>

                {/* Main */}
                <section className="py-8">
                    <div className="px-6 lg:px-12">
                        <div className="flex flex-col gap-8">
                            {/* Search/Sort with integrated Destination State filter */}
                            <SearchBar
                                onSearch={handleSearch}
                                onSortChange={handleSortChange}
                                sortBy={sortBy}
                                totalResults={filteredPackages.length}
                                filters={filters}
                                onFiltersChange={handleFiltersChange}
                            />

                            {/* Content */}
                            <div className="flex-1">

                                {/* View/Compare Toggle */}
                                <div className="flex items-center justify-between mb-6 mt-4">
                                    <Button
                                        variant={isComparisonMode ? 'default' : 'outline'}
                                        onClick={() => setIsComparisonMode(!isComparisonMode)}
                                        iconName="GitCompare"
                                        size="sm"
                                    >
                                        Compare Mode
                                    </Button>
                                    <div>
                                        <button
                                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-muted'}`}
                                            onClick={() => setViewMode('grid')}
                                        >
                                            <Icon name="Grid3X3" size={16} />
                                        </button>
                                        <button
                                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-muted'}`}
                                            onClick={() => setViewMode('list')}
                                        >
                                            <Icon name="List" size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Loader */}
                                {loading && (
                                    <div className="flex flex-col items-center justify-center py-20">
                                        <Icon name="Loader2" size={36} className="animate-spin text-primary mb-4" />
                                        <p className="text-muted-foreground text-sm">Loading packages...</p>
                                    </div>
                                )}

                                {/* Error */}
                                {!loading && error && (
                                    <div className="text-center py-12">
                                        <Icon name="AlertCircle" size={48} className="text-red-500 mb-4" />
                                        <p className="text-lg text-muted-foreground">{error}</p>
                                    </div>
                                )}

                                {/* Packages */}
                                {!loading && !error && filteredPackages.length > 0 && (
                                    <div className={`grid gap-8 ${
                                        viewMode === 'grid'
                                            ? 'grid-cols-1 md:grid-cols-2 2xl:grid-cols-3'
                                            : 'grid-cols-1'
                                    }`}>
                                        {filteredPackages.map(pkg => (
                                            <PackageCard
                                                key={pkg.id}
                                                package={pkg}
                                                onInquire={handlePackageInquire}
                                                onCompare={handleCompareToggle}
                                                isComparing={isComparisonMode}
                                                isSelected={comparisonPackages.some(p => p.id === pkg.id)}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* No Results */}
                                {!loading && !error && filteredPackages.length === 0 && (
                                    <div className="text-center py-12">
                                        <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-foreground mb-2">No packages found</h3>
                                        <Button variant="outline" onClick={handleClearFilters} iconName="RotateCcw">
                                            Clear All Filters
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <PackageModal package={selectedPackage} isOpen={isModalOpen} onClose={handleCloseModal} />

                <ComparisonPanel
                    packages={comparisonPackages}
                    onRemove={handleRemoveFromComparison}
                    onClear={handleClearComparison}
                    isOpen={isComparisonPanelOpen}
                    onToggle={() => setIsComparisonPanelOpen(!isComparisonPanelOpen)}
                />
            </div>
            <WhatsAppFloatingButton />
            <CallFloatingButton/>
        </>
    );
};

export default TourPackagesDiscoveryCenter;
