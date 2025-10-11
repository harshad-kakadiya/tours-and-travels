import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import api from '../../../utils/api';

const OneWayAndRoundTrip = ({ onBookingClick }) => {
    const [activeTab, setActiveTab] = useState('oneway');
    const [oneWayCabs, setOneWayCabs] = useState([]);
    const [roundTripCabs, setRoundTripCabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form state for One Way booking
    const [selectedCar, setSelectedCar] = useState(null);
    const [formData, setFormData] = useState({
        pickup: '',
        drop: '',
        date: '',
        time: '',
        features: []
    });

    useEffect(() => {
        fetchCabs();
    }, []);

    const fetchCabs = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch data from the provided API
            const response = await api.get('https://tour-travels-be-h58q.onrender.com/api/taxi-tour');

            // Extract data from the response based on the provided payload format
            let taxiData = [];
            if (response.data && Array.isArray(response.data)) {
                taxiData = response.data;
            } else if (response.data && response.data.data) {
                // If the API returns data in the format shown in the payload
                taxiData = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
            }

            // Filter data for one way and round trip cabs
            const oneWayCabs = taxiData.filter(cab => cab.routeType === 'oneway');
            const roundTripCabs = taxiData.filter(cab => cab.routeType === 'roundtrip');

            setOneWayCabs(oneWayCabs);
            setRoundTripCabs(roundTripCabs);

        } catch (err) {
            console.error('Error fetching cabs:', err);

            // Fallback to sample data if API fails
            const sampleOneWayCabs = [
                {
                    _id: '68e73e749685d6df4a8873e2',
                    routeType: 'oneway',
                    seater: 'sedan',
                    carName: 'Sedan',
                    image: 'https://res.cloudinary.com/degalvlji/image/upload/v1759985267/cabs/ug67htisq734ycomgxah.jpg',
                    features: ['AC', 'Music System', 'Comfortable Seating']
                },
                {
                    _id: '68e73e749685d6df4a8873e3',
                    routeType: 'oneway',
                    seater: 'suv',
                    carName: 'SUV',
                    image: 'https://res.cloudinary.com/degalvlji/image/upload/v1759985267/cabs/ug67htisq734ycomgxah.jpg',
                    features: ['AC', 'Music System', 'Spacious Luggage', '4x4 Drive']
                },
                {
                    _id: '68e73e749685d6df4a8873e4',
                    routeType: 'oneway',
                    seater: 'tempo_traveller',
                    carName: 'Tempo Traveller',
                    image: 'https://res.cloudinary.com/degalvlji/image/upload/v1759985267/cabs/ug67htisq734ycomgxah.jpg',
                    features: ['AC', 'Music System', 'Large Group Seating', 'Ample Luggage Space']
                }
            ];

            const sampleRoundTripCabs = [
                {
                    _id: '68e73eae9685d6df4a8873e4',
                    routeType: 'roundtrip',
                    seater: 'sedan',
                    carName: 'Sedan',
                    image: 'https://res.cloudinary.com/degalvlji/image/upload/v1759985325/cabs/anua6mn4p5gdmmkhxrxg.jpg',
                    pricePerKm: 12
                },
                {
                    _id: '68e73eae9685d6df4a8873e5',
                    routeType: 'roundtrip',
                    seater: 'suv',
                    carName: 'SUV',
                    image: 'https://res.cloudinary.com/degalvlji/image/upload/v1759985325/cabs/anua6mn4p5gdmmkhxrxg.jpg',
                    pricePerKm: 15
                },
                {
                    _id: '68e73eae9685d6df4a8873e6',
                    routeType: 'roundtrip',
                    seater: 'tempo_traveller',
                    carName: 'Tempo Traveller',
                    image: 'https://res.cloudinary.com/degalvlji/image/upload/v1759985325/cabs/anua6mn4p5gdmmkhxrxg.jpg',
                    pricePerKm: 20
                }
            ];

            setOneWayCabs(sampleOneWayCabs);
            setRoundTripCabs(sampleRoundTripCabs);
            setError('Unable to fetch data from API. Using sample data instead.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCarSelect = (car) => {
        setSelectedCar(car);
    };

    // Handle WhatsApp Inquiry
    const handleWhatsAppInquiry = () => {
        if (!selectedCar) {
            alert('Please select a car first');
            return;
        }

        // Validate form fields
        if (!formData.pickup || !formData.drop || !formData.date || !formData.time) {
            alert('Please fill in all required fields');
            return;
        }

        // Format date for better readability
        const formattedDate = new Date(formData.date).toLocaleDateString();

        const message = encodeURIComponent(
            `Hi! I'm interested in booking a One Way taxi.\n` +
            `Car Name: ${selectedCar.carName}\n` +
            `Seater: ${selectedCar.seater.replace('_', ' ')}\n` +
            `From: ${formData.pickup}\n` +
            `To: ${formData.drop}\n` +
            `Date: ${formattedDate}\n` +
            `Time: ${formData.time}\n` +
            `Please provide more details and booking assistance.`
        );

        window.open(`https://wa.me/919876543210?text=${message}`, '_blank');

        // Pass booking details to parent component if callback exists
        if (onBookingClick) {
            onBookingClick({
                type: 'oneway',
                car: selectedCar,
                ...formData
            });
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex justify-center items-center py-12">
                    <div className="flex items-center space-x-2">
                        <div className="animate-spin">
                            <Icon name="Loader2" size={24} className="text-primary" />
                        </div>
                        <span className="text-muted-foreground">Loading cabs...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Service</h2>
                <p className="text-gray-600 mb-6">Select the type of taxi service you need</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                        type="button"
                        className={`px-6 py-3 text-sm font-medium border ${
                            activeTab === 'oneway'
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        } rounded-l-lg focus:z-10 focus:outline-none`}
                        onClick={() => setActiveTab('oneway')}
                    >
                        <div className="flex items-center gap-2">
                            <Icon name="ArrowRight" size={16} />
                            <span>One Way</span>
                        </div>
                    </button>
                    <button
                        type="button"
                        className={`px-6 py-3 text-sm font-medium border ${
                            activeTab === 'roundtrip'
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        } rounded-r-lg focus:z-10 focus:outline-none`}
                        onClick={() => setActiveTab('roundtrip')}
                    >
                        <div className="flex items-center gap-2">
                            <Icon name="RefreshCw" size={16} />
                            <span>Round Trip</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* One Way Tab Content */}
            {activeTab === 'oneway' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">One Way Booking</h3>

                    {/* Car Selection Dropdown */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Car Name
                        </label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            onChange={(e) => {
                                const selectedCarId = e.target.value;
                                const car = oneWayCabs.find(car => car._id === selectedCarId);
                                if (car) {
                                    // Force a new object to trigger re-render
                                    handleCarSelect({...car});
                                }
                            }}
                            value={selectedCar ? selectedCar._id : ''}
                        >
                            <option value="">Select a car</option>
                            {oneWayCabs.map((car) => (
                                <option key={car._id} value={car._id}>
                                    {car.carName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Display selected car details */}
                    {selectedCar && (
                        <div className="mx-auto max-w-md mb-6 bg-white rounded-lg overflow-hidden shadow">
                            {/* Green header with route */}
                            {/*<div className="bg-emerald-500 text-white p-3 text-center">*/}
                            {/*    <p className="flex items-center justify-center gap-2 font-medium">*/}
                            {/*        Ahmedabad <Icon name="ArrowRight" size={16} /> Vadodara*/}
                            {/*    </p>*/}
                            {/*</div>*/}
                            
                            {/*/!* Trip type *!/*/}
                            {/*<div className="text-center py-3 text-gray-600">*/}
                            {/*    <p>Oneway Trip</p>*/}
                            {/*</div>*/}
                            
                            {/*/!* Price *!/*/}
                            {/*<div className="text-center pb-3">*/}
                            {/*    <p className="text-3xl font-bold text-gray-800">from ₹ 1899</p>*/}
                            {/*</div>*/}
                            
                            {/* Car image */}
                            <div className="px-4 pb-3 h-[300px]">
                                <Image
                                    src={selectedCar.image}
                                    alt={selectedCar.carName}
                                    className="w-full h-full object-cover"
                                    key={selectedCar._id} // Add key to force re-render when car changes
                                />
                            </div>
                            
                            {/* Car name */}
                            <div className="text-center pb-2">
                                <h4 className="font-medium text-gray-800 text-lg">{selectedCar.carName}</h4>
                            </div>
                            
                            {/* Seater type */}
                            <div className="text-center pb-3">
                                <p className="text-gray-600 capitalize">
                                    {selectedCar.seater.replace('_', ' ')} Seater
                                </p>
                            </div>
                            
                            {/* Book now button */}
                            {/*<div className="px-4 pb-4">*/}
                            {/*    <Button */}
                            {/*        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3"*/}
                            {/*        onClick={() => handleWhatsAppInquiry()}*/}
                            {/*    >*/}
                            {/*        Book Now*/}
                            {/*    </Button>*/}
                            {/*</div>*/}
                        </div>
                    )}

                    {/* Booking Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Pickup Location
                            </label>
                            <input
                                type="text"
                                name="pickup"
                                value={formData.pickup}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Enter pickup location"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Drop Location
                            </label>
                            <input
                                type="text"
                                name="drop"
                                value={formData.drop}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Enter drop location"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Time
                            </label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                        
                        {/* Features Field */}
                        {selectedCar && selectedCar.features && (
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Features
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {selectedCar.features.map((feature, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={handleWhatsAppInquiry}
                            className="bg-[#1C76BD]  text-white font-medium py-3 px-6 rounded-md inline-flex items-center gap-2 transition-colors"
                            disabled={!selectedCar}
                        >
                            <Icon name="MessageCircle" size={20} />
                            WhatsApp Inquiry
                        </button>
                    </div>
                </div>
            )}

            {/* Round Trip Tab Content */}
            {activeTab === 'roundtrip' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Round Trip Packages</h3>

                    {/* Car Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {roundTripCabs.length > 0 ? (
                            roundTripCabs.map((car) => (
                                <div key={car._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                    {/* Car Name */}
                                    <div className="p-4 bg-gray-50">
                                        <h4 className="font-medium text-gray-800 text-lg">{car.carName}</h4>
                                    </div>

                                    {/* Car Image */}
                                    <div className="h-48 overflow-hidden">
                                        <Image
                                            src={car.image}
                                            alt={car.carName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Car Details */}
                                    <div className="p-4">
                                        <p className="text-gray-600 capitalize mb-2">
                                            <span className="font-bold">Seater:</span> {car.seater.replace('_', ' ')}
                                        </p>
                                        <p className="text-gray-600 mb-4">
                                            <span className="font-bold">Price Per Km:</span> ₹{car.pricePerKm}
                                        </p>

                                        {/* WhatsApp Button */}
                                        <button
                                            onClick={() => {
                                                const message = encodeURIComponent(
                                                    `Hi! I'm interested in booking a Round Trip taxi.\n` +
                                                    `Car Name: ${car.carName}\n` +
                                                    `Seater: ${car.seater.replace('_', ' ')}\n` +
                                                    `Please provide more details and booking assistance.`
                                                );
                                                window.open(`https://wa.me/919876543210?text=${message}`, '_blank');

                                                // Pass booking details to parent component if callback exists
                                                if (onBookingClick) {
                                                    onBookingClick({
                                                        type: 'roundtrip',
                                                        car: car
                                                    });
                                                }
                                            }}
                                            className="w-full bg-[#1C76BD]  text-white font-medium py-2 px-4 rounded-md inline-flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <Icon name="MessageCircle" size={18} />
                                            WhatsApp Inquiry
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-8">
                                <p className="text-gray-500">No round trip cabs available at the moment.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {error && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <Icon name="AlertTriangle" size={24} className="text-yellow-400" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                                {error}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OneWayAndRoundTrip;