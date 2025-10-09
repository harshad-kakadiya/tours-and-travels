import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const SearchFilters = ({
                           filters,
                           onFiltersChange,
                           onClearFilters,
                           citiesApiUrl = 'https://tour-travels-be-h58q.onrender.com/api/hotel-room' // Updated API URL
                       }) => {
    const countries = ['India'];
    const [openSections, setOpenSections] = useState({
        country: true,
        city: true
    });
    const [citySearch, setCitySearch] = useState('');
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch cities from API
    useEffect(() => {
        const fetchCities = async () => {
            try {
                setLoading(true);
                const response = await fetch(citiesApiUrl);

                if (!response.ok) {
                    throw new Error('Failed to fetch cities');
                }

                const data = await response.json();

                // Extract city names from API response - adjust based on your API structure
                let cityNames = [];

                if (data.data && Array.isArray(data.data)) {
                    // If API returns { data: [...] }
                    cityNames = data.data.map(item =>
                        item.location || item.city || item.name || ''
                    ).filter(city => city && city.trim() !== '');
                } else if (Array.isArray(data)) {
                    // If API returns direct array
                    cityNames = data.map(item =>
                        item.location || item.city || item.name || ''
                    ).filter(city => city && city.trim() !== '');
                }

                // Remove duplicate cities
                const uniqueCities = [...new Set(cityNames)];
                setCities(uniqueCities);
            } catch (error) {
                console.error('Error fetching cities from API:', error);
                setCities([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCities();
    }, [citiesApiUrl]);

    const toggleArrayValue = (key, value) => {
        const current = filters?.[key] || [];
        const exists = current.includes(value);
        const next = exists ? current.filter(v => v !== value) : [...current, value];
        onFiltersChange({ ...filters, [key]: next });
    };

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Filter cities based on search
    const filteredCities = cities.filter(city =>
        city.toLowerCase().includes(citySearch.toLowerCase())
    );

    return (
        <aside className="bg-card rounded-xl shadow-brand-soft p-4 sticky top-24 lg:w-80 w-full lg:max-h-[calc(100vh-120px)] overflow-auto">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">Filters</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearFilters}
                    className="text-xs text-muted-foreground hover:text-foreground"
                >
                    Clear
                </Button>
            </div>

            {/* Country - Collapsible */}
            <div className="border-t border-border pt-4 mt-2">
                <button
                    className="w-full flex items-center justify-between text-left font-medium text-foreground mb-3"
                    onClick={() => toggleSection('country')}
                >
                    <span>Country</span>
                    <Icon
                        name="ChevronDown"
                        size={16}
                        className={`transform transition-transform ${openSections.country ? 'rotate-0' : '-rotate-90'}`}
                    />
                </button>
                {openSections.country && (
                    <div className="space-y-2">
                        {countries.map((c) => (
                            <Checkbox
                                key={c}
                                label={c}
                                checked={(filters?.countries || []).includes(c)}
                                onChange={() => toggleArrayValue('countries', c)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* City - Dynamic & Collapsible with Search */}
            {loading ? (
                <div className="border-t border-border pt-4 mt-4">
                    <button
                        className="w-full flex items-center justify-between text-left font-medium text-foreground mb-3"
                        onClick={() => toggleSection('city')}
                    >
                        <span>City</span>
                        <Icon
                            name="ChevronDown"
                            size={16}
                            className={`transform transition-transform ${openSections.city ? 'rotate-0' : '-rotate-90'}`}
                        />
                    </button>
                    {openSections.city && (
                        <div className="text-center text-muted-foreground py-2 text-sm">
                            <Icon name="Loader" size={16} className="animate-spin inline mr-2" />
                            Loading cities...
                        </div>
                    )}
                </div>
            ) : cities.length > 0 ? (
                <div className="border-t border-border pt-4 mt-4">
                    <button
                        className="w-full flex items-center justify-between text-left font-medium text-foreground mb-3"
                        onClick={() => toggleSection('city')}
                    >
                        <span>City ({cities.length})</span>
                        <Icon
                            name="ChevronDown"
                            size={16}
                            className={`transform transition-transform ${openSections.city ? 'rotate-0' : '-rotate-90'}`}
                        />
                    </button>
                    {openSections.city && (
                        <div className="space-y-3">
                            {/* Search Input for Cities */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search cities..."
                                    value={citySearch}
                                    onChange={(e) => setCitySearch(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                {citySearch && (
                                    <button
                                        onClick={() => setCitySearch('')}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        <Icon name="X" size={16} />
                                    </button>
                                )}
                            </div>

                            {/* Cities List */}
                            <div className="space-y-2 max-h-56 overflow-auto pr-1">
                                {filteredCities.length > 0 ? (
                                    filteredCities.map((city) => (
                                        <Checkbox
                                            key={city}
                                            label={city}
                                            checked={(filters?.cities || []).includes(city)}
                                            onChange={() => toggleArrayValue('cities', city)}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center text-muted-foreground py-2 text-sm">
                                        No cities found
                                    </div>
                                )}
                            </div>

                            {/* Search Results Info */}
                            {citySearch && (
                                <div className="text-xs text-muted-foreground text-center">
                                    Showing {filteredCities.length} of {cities.length} cities
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className="border-t border-border pt-4 mt-4">
                    <button
                        className="w-full flex items-center justify-between text-left font-medium text-foreground mb-3"
                        onClick={() => toggleSection('city')}
                    >
                        <span>City</span>
                        <Icon
                            name="ChevronDown"
                            size={16}
                            className={`transform transition-transform ${openSections.city ? 'rotate-0' : '-rotate-90'}`}
                        />
                    </button>
                    {openSections.city && (
                        <div className="text-center text-muted-foreground py-2 text-sm">
                            No cities available
                        </div>
                    )}
                </div>
            )}
        </aside>
    );
};

export default SearchFilters;