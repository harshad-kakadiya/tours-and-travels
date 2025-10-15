import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SearchBar = ({ onSearch, onSortChange, sortBy, totalResults, filters, onFiltersChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
    const [stateOptions, setStateOptions] = useState([
        { value: '', label: 'All States' }
    ]);

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await fetch('https://tour-travels-be.onrender.com/api/state');
                const data = await response.json();
                
                if (Array.isArray(data) && data.length > 0) {
                    const states = data.map(state => ({
                        value: state.name.toLowerCase(),
                        label: state.name.charAt(0).toUpperCase() + state.name.slice(1)
                    }));
                    
                    setStateOptions([
                        { value: '', label: 'All States' },
                        ...states
                    ]);
                }
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        };

        fetchStates();
    }, []);

    const handleFilterChange = (key, value) => {
        onFiltersChange({
            ...filters,
            [key]: value
        });
    };

    const sortOptions = [
        { value: 'relevance', label: 'Most Relevant' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'rating', label: 'Highest Rated' },
        { value: 'duration-short', label: 'Duration: Short to Long' },
        { value: 'duration-long', label: 'Duration: Long to Short' },
        { value: 'newest', label: 'Newest First' },
        { value: 'popular', label: 'Most Popular' }
    ];

    const handleSearch = (e) => {
        e?.preventDefault();
        onSearch(searchTerm);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <div className="bg-card rounded-lg border border-border shadow-sm p-4">
            {/* Main Search */}
            <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row gap-3 sm:gap-2 mb-4 w-full"
            >
                {/* Search Input with Icon & Clear */}
                <div className="relative flex-1">
                    <Icon
                        name="Search"
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e?.target?.value)}
                        placeholder="Search packages by destination, theme, or keywords..."
                        className="w-full pl-10 pr-10 py-2.5 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={handleClearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                        >
                            <Icon name="X" size={16} className="text-muted-foreground" />
                        </button>
                    )}
                </div>

                {/* Search Button */}
                <Button
                    type="submit"
                    variant="default"
                    iconName="Search"
                    iconPosition="left"
                    className="w-full sm:w-auto"
                >
                    Search
                </Button>
            </form>

            {/* Destination State Filter */}


            {/* Results + Sort Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
                {/* Results Count */}
                <div className="text-sm text-muted-foreground">
                    {totalResults > 0 ? (
                        <>
                            Showing <span className="font-medium text-foreground">{totalResults}</span> packages
                            {searchTerm && (
                                <>
                                    {" "}for "<span className="font-medium text-foreground">{searchTerm}</span>"
                                </>
                            )}
                        </>
                    ) : (
                        "No packages found"
                    )}
                </div>

                {/* Sort + Advanced Search */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-1 w-full sm:w-auto mb-4">
                        {/* Label */}
                        <label className="whitespace-nowrap font-medium text-gray-700">Destination State :</label>

                        {/* Dropdown */}
                        <Select
                            className="w-64" // Increase width as needed
                            options={stateOptions}
                            value={filters?.state || ''}
                            onChange={(value) => handleFilterChange('state', value)}
                            placeholder="Select state"
                        />
                    </div>


                    {/* Advanced Search Toggle */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                        iconName={isAdvancedOpen ? "ChevronUp" : "Settings"}
                        iconPosition="left"
                        className="text-muted-foreground hover:text-foreground w-full sm:w-auto justify-center"
                    >
                        Advanced
                    </Button>
                </div>

            </div>

            {/* Advanced Search Options */}
            {isAdvancedOpen && (
                <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Quick Filters */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Quick Filters
                            </label>
                            <div className="space-y-2">
                                {[
                                    { label: 'Weekend Getaways', value: 'weekend' },
                                    { label: 'Honeymoon Specials', value: 'honeymoon' },
                                    { label: 'Adventure Tours', value: 'adventure' },
                                    { label: 'Family Packages', value: 'family' }
                                ]?.map((filter) => (
                                    <label key={filter?.value} className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            className="rounded border-border text-primary focus:ring-primary"
                                        />
                                        <span className="text-muted-foreground">{filter?.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Price Range (₹)
                            </label>
                            <div className="space-y-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="100000"
                                    className="w-full"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>₹0</span>
                                    <span>₹1,00,000+</span>
                                </div>
                            </div>
                        </div>

                        {/* Group Size */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Group Size
                            </label>
                            <select className="w-full text-sm border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                                <option value="">Any Size</option>
                                <option value="solo">Solo Travel</option>
                                <option value="couple">Couple (2 people)</option>
                                <option value="small">Small Group (3-6)</option>
                                <option value="large">Large Group (7+)</option>
                            </select>
                        </div>

                        {/* Season */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Best Season
                            </label>
                            <select className="w-full text-sm border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                                <option value="">Any Season</option>
                                <option value="summer">Summer (Mar-Jun)</option>
                                <option value="monsoon">Monsoon (Jul-Sep)</option>
                                <option value="winter">Winter (Oct-Feb)</option>
                            </select>
                        </div>
                    </div>

                    {/* Advanced Actions */}
                    <div className="flex justify-end gap-2 mt-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsAdvancedOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            iconName="RotateCcw"
                            iconPosition="left"
                        >
                            Reset Filters
                        </Button>
                        <Button
                            variant="default"
                            size="sm"
                            iconName="Search"
                            iconPosition="left"
                        >
                            Apply Filters
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;