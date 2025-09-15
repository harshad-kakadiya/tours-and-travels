import React from 'react';
import { useParams } from 'react-router-dom';
import Image from '../../components/AppImage';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const mock = [
  { id: 1, name: 'The Grand Palace Resort', pricePerNight: 8500, images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600'], location: 'Goa, India', rating: 4.8, starRating: 5 },
  { id: 2, name: 'Himalayan Retreat Lodge', pricePerNight: 4500, images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600'], location: 'Manali, Himachal', rating: 4.6, starRating: 4 },
  { id: 3, name: 'Royal Heritage Palace', pricePerNight: 12000, images: ['https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1600'], location: 'Udaipur, Rajasthan', rating: 4.9, starRating: 5 },
];

const HotelDetails = () => {
  const { id } = useParams();
  const hotel = mock.find(h => String(h.id) === String(id)) || mock[0];

  const onWhatsApp = () => {
    const msg = encodeURIComponent(`Hi! I'm interested in ${hotel?.name}. Please share availability and best rates.`);
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-0">
        <div className="relative h-[40vh] sm:h-[54vh]">
          <Image src={hotel?.images?.[0]} alt={hotel?.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-6 left-0 right-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-end justify-between">
              <div>
                <h1 className="text-white text-3xl sm:text-4xl font-heading font-bold">{hotel?.name}</h1>
                <div className="flex items-center gap-3 text-white/90 mt-2">
                  <Icon name="MapPin" size={16} />
                  <span>{hotel?.location}</span>
                  <Icon name="Star" size={16} />
                  <span>{hotel?.rating}</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-right shadow-brand-soft">
                <div className="text-sm text-muted-foreground">From</div>
                <div className="text-3xl font-bold text-foreground">₹{hotel?.pricePerNight?.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">per night</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-border rounded-2xl p-6 bg-card shadow-brand-soft">
            <h2 className="text-lg font-semibold text-foreground mb-3">Overview</h2>
            <p className="text-muted-foreground">Premium property with modern amenities and exceptional service. Perfect for couples and families looking for a comfortable stay.</p>
          </div>
          <div className="border border-border rounded-2xl p-6 bg-card shadow-brand-soft">
            <h2 className="text-lg font-semibold text-foreground mb-3">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
              {['Free WiFi','Swimming Pool','Spa','Restaurant','Parking','Gym'].map((a,i)=> (
                <div key={i} className="flex items-center gap-2"><Icon name="Check" size={14} className="text-accent" />{a}</div>
              ))}
            </div>
          </div>
          <div className="border border-border rounded-2xl p-6 bg-card shadow-brand-soft">
            <h2 className="text-lg font-semibold text-foreground mb-3">Policies</h2>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Check-in after 2 PM • Check-out before 11 AM</li>
              <li>ID proof mandatory</li>
              <li>Free cancellation up to 48 hours before check-in</li>
            </ul>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <div className="border border-border rounded-2xl p-6 bg-card shadow-brand-soft">
              <div className="text-sm text-muted-foreground">Best available rate</div>
              <div className="text-2xl font-bold text-foreground mb-2">₹{hotel?.pricePerNight?.toLocaleString()}</div>
              <Button fullWidth className="bg-primary hover:bg-primary/90" iconName="MessageCircle" iconPosition="left" onClick={onWhatsApp}>
                Inquire on WhatsApp
              </Button>
            </div>
            <div className="border border-border rounded-2xl p-6 bg-card shadow-brand-soft">
              <h3 className="font-semibold text-foreground mb-3">Why book with us?</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center gap-2"><Icon name="Shield" size={16} className="text-primary" /> Verified properties</li>
                <li className="flex items-center gap-2"><Icon name="IndianRupee" size={16} className="text-primary" /> Best price guarantee</li>
                <li className="flex items-center gap-2"><Icon name="MessageCircle" size={16} className="text-primary" /> 24/7 WhatsApp support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HotelDetails;

