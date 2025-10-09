import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AvailableDrivers = ({ selectedService, onDriverSelect }) => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch available drivers
    setTimeout(() => {
      const mockDrivers = [
        {
          id: 1,
          name: 'Rajesh Kumar',
          rating: 4.9,
          experience: '8 years',
          vehicle: 'Toyota Innova',
          vehicleNumber: 'DL 01 AB 1234',
          distance: '2.5 km away',
          eta: '8 mins',
          photo: 'https://randomuser.me/api/portraits/men/32.jpg',
          languages: ['Hindi', 'English'],
          specialties: ['City Tours', 'Airport Transfer'],
          totalTrips: 1250,
          verified: true,
          available: true
        },
        {
          id: 2,
          name: 'Suresh Sharma',
          rating: 4.8,
          experience: '6 years',
          vehicle: 'Maruti Swift Dzire',
          vehicleNumber: 'DL 02 CD 5678',
          distance: '3.2 km away',
          eta: '12 mins',
          photo: 'https://randomuser.me/api/portraits/men/45.jpg',
          languages: ['Hindi', 'English', 'Punjabi'],
          specialties: ['Long Distance', 'Night Trips'],
          totalTrips: 890,
          verified: true,
          available: true
        },
        {
          id: 3,
          name: 'Mohammed Ali',
          rating: 4.7,
          experience: '5 years',
          vehicle: 'Hyundai Creta',
          vehicleNumber: 'DL 03 EF 9012',
          distance: '1.8 km away',
          eta: '6 mins',
          photo: 'https://randomuser.me/api/portraits/men/28.jpg',
          languages: ['Hindi', 'English', 'Urdu'],
          specialties: ['Family Trips', 'Shopping Tours'],
          totalTrips: 675,
          verified: true,
          available: true
        },
        {
          id: 4,
          name: 'Amit Singh',
          rating: 4.6,
          experience: '4 years',
          vehicle: 'Tata Nexon',
          vehicleNumber: 'DL 04 GH 3456',
          distance: '4.1 km away',
          eta: '15 mins',
          photo: 'https://randomuser.me/api/portraits/men/35.jpg',
          languages: ['Hindi', 'English'],
          specialties: ['Corporate Trips', 'Events'],
          totalTrips: 520,
          verified: true,
          available: false
        }
      ];
      setDrivers(mockDrivers);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3]?.map((i) => (
          <div key={i} className="bg-card p-4 rounded-lg border border-border animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-muted rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/3"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
                <div className="h-3 bg-muted rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Available Drivers</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span>Live tracking</span>
        </div>
      </div>
      {drivers?.map((driver) => (
        <div
          key={driver?.id}
          className={`bg-card p-4 rounded-lg border transition-all duration-200 ${
            driver?.available
              ? 'border-border hover:border-primary/30 hover:shadow-sm cursor-pointer'
              : 'border-border opacity-60'
          }`}
        >
          <div className="flex items-start space-x-4">
            <div className="relative">
              <Image
                src={driver?.photo}
                alt={driver?.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              {driver?.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="Check" size={12} className="text-white" />
                </div>
              )}
              {!driver?.available && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">Busy</span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-foreground">{driver?.name}</h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-yellow-500 fill-current" />
                      <span>{driver?.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{driver?.experience}</span>
                    <span>•</span>
                    <span>{driver?.totalTrips} trips</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{driver?.distance}</div>
                  <div className="text-xs text-muted-foreground">ETA: {driver?.eta}</div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                  <Icon name="Car" size={14} />
                  <span>{driver?.vehicle}</span>
                  <span>•</span>
                  <span>{driver?.vehicleNumber}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="MessageCircle" size={14} />
                  <span>{driver?.languages?.join(', ')}</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {driver?.specialties?.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Shield" size={12} />
                    <span>Verified</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Phone" size={12} />
                    <span>24*7 Support</span>
                  </div>
                </div>
                
                {driver?.available ? (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onDriverSelect(driver)}
                    iconName="MessageCircle"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Select Driver
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                  >
                    Not Available
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm">
            <p className="text-foreground font-medium mb-1">Safety Features</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• All drivers are background verified</li>
              <li>• Real-time GPS tracking available</li>
              <li>• 24*7 emergency support hotline</li>
              <li>• Trip sharing with family/friends</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableDrivers;