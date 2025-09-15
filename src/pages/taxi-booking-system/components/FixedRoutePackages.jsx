import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FixedRoutePackages = ({ onBookingClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('city-tours');

  const categories = [
    { id: 'city-tours', name: 'City Tours', icon: 'Building2' },
    { id: 'airport-transfers', name: 'Airport Transfers', icon: 'Plane' },
    { id: 'inter-city', name: 'Inter-city', icon: 'MapPin' }
  ];

  const packages = {
    'city-tours': [
      {
        id: 1,
        title: 'Delhi Heritage Tour',
        duration: '8 Hours',
        distance: '120 KM',
        price: 2500,
        originalPrice: 3000,
        image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400',
        highlights: ['Red Fort', 'India Gate', 'Lotus Temple', 'Qutub Minar'],
        includes: ['AC Vehicle', 'Driver', 'Fuel', 'Parking'],
        vehicleType: 'Sedan',
        rating: 4.8,
        bookings: 156
      },
      {
        id: 2,
        title: 'Mumbai City Explorer',
        duration: '6 Hours',
        distance: '80 KM',
        price: 2200,
        originalPrice: 2800,
        image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400',
        highlights: ['Gateway of India', 'Marine Drive', 'Colaba', 'Bandra-Worli Sea Link'],
        includes: ['AC Vehicle', 'Driver', 'Fuel', 'Toll Charges'],
        vehicleType: 'Hatchback',
        rating: 4.7,
        bookings: 203
      }
    ],
    'airport-transfers': [
      {
        id: 3,
        title: 'Delhi Airport to City Center',
        duration: '1.5 Hours',
        distance: '25 KM',
        price: 800,
        originalPrice: 1000,
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400',
        highlights: ['Direct Route', 'Meet & Greet', 'Luggage Assistance'],
        includes: ['AC Vehicle', 'Driver', 'Fuel', 'Toll Charges'],
        vehicleType: 'Sedan',
        rating: 4.9,
        bookings: 89
      },
      {
        id: 4,
        title: 'Mumbai Airport Transfer',
        duration: '2 Hours',
        distance: '35 KM',
        price: 1200,
        originalPrice: 1500,
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
        highlights: ['24/7 Service', 'Flight Tracking', 'Professional Driver'],
        includes: ['AC Vehicle', 'Driver', 'Fuel', 'Parking'],
        vehicleType: 'SUV',
        rating: 4.8,
        bookings: 134
      }
    ],
    'inter-city': [
      {
        id: 5,
        title: 'Delhi to Agra Day Trip',
        duration: '12 Hours',
        distance: '420 KM',
        price: 4500,
        originalPrice: 5500,
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400',
        highlights: ['Taj Mahal Visit', 'Agra Fort', 'Local Guide', 'Lunch Break'],
        includes: ['AC Vehicle', 'Driver', 'Fuel', 'Toll Charges', 'Parking'],
        vehicleType: 'SUV',
        rating: 4.9,
        bookings: 78
      },
      {
        id: 6,
        title: 'Mumbai to Lonavala',
        duration: '10 Hours',
        distance: '180 KM',
        price: 3200,
        originalPrice: 4000,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        highlights: ['Hill Station', 'Scenic Route', 'Photography Stops'],
        includes: ['AC Vehicle', 'Driver', 'Fuel', 'Toll Charges'],
        vehicleType: 'Sedan',
        rating: 4.6,
        bookings: 92
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedCategory === category?.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.name}</span>
          </button>
        ))}
      </div>
      {/* Packages Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {packages?.[selectedCategory]?.map((pkg) => (
          <div key={pkg?.id} className="relative rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300">
            {/* Background Image */}
            <div className="relative h-80">
              <Image
                src={pkg?.image}
                alt={pkg?.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Duration - Top Left */}
              <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                {pkg?.duration}
              </div>

              {/* Discount Badge - Top Right */}
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {Math.round(((pkg?.originalPrice - pkg?.price) / pkg?.originalPrice) * 100)}% OFF
              </div>

              {/* Package Title - Large White Text */}
              <div className="absolute bottom-20 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {pkg?.title}
                </h3>
                <p className="text-white/90 text-sm">
                  {pkg?.distance} • {pkg?.vehicleType}
                </p>
              </div>

              {/* Pricing - Bottom Left */}
              <div className="absolute bottom-6 left-6">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-white">
                    ₹{pkg?.price}
                  </span>
                  <span className="text-lg text-white/70 line-through">
                    ₹{pkg?.originalPrice}
                  </span>
                </div>
              </div>

              {/* Book Now Button - Bottom Right */}
              <div className="absolute bottom-6 right-6">
                <button 
                  onClick={() => onBookingClick('fixed-route', pkg)}
                  className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FixedRoutePackages;