import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Image from '../../components/AppImage';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { hotelAPI } from '../../utils/api';

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHotel = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await hotelAPI.getById(id);
        const mapped = {
          id: data?._id,
          name: data?.title,
          location: data?.location,
          pricePerNight: data?.discountPrice ?? data?.price,
          originalPrice: data?.price,
          discount: data?.discount,
          rating: data?.rating || 4.5,
          starRating: data?.starRating || 4,
          images: [data?.image].filter(Boolean),
          amenities: data?.amenities || [],
          overview: data?.overview,
          policies: data?.policies,
        };
        setHotel(mapped);
      } catch (e) {
        setError(e?.response?.data?.message || 'Failed to load hotel details');
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [id]);

  const onWhatsApp = () => {
    const msg = encodeURIComponent(`Hi! I'm interested in ${hotel?.name}. Please share details.`);
    window.open(`https://wa.me/919725855858?text=${msg}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <Icon name="AlertTriangle" size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">Unable to load hotel</h2>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button variant="outline" onClick={() => window.location.reload()} iconName="RotateCcw" iconPosition="left" iconSize={16}>Retry</Button>
      </div>
    );
  }

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
                {hotel?.originalPrice && (
                  <div className="text-sm text-muted-foreground line-through">₹{hotel?.originalPrice?.toLocaleString()}</div>
                )}
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
            <p className="text-muted-foreground">{hotel?.overview || 'No overview available.'}</p>
          </div>
          <div className="border border-border rounded-2xl p-6 bg-card shadow-brand-soft">
            <h2 className="text-lg font-semibold text-foreground mb-3">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
              {(hotel?.amenities || []).map((a,i)=> (
                <div key={i} className="flex items-center gap-2"><Icon name="Check" size={14} className="text-accent" />{a}</div>
              ))}
            </div>
          </div>
          <div className="border border-border rounded-2xl p-6 bg-card shadow-brand-soft">
            <h2 className="text-lg font-semibold text-foreground mb-3">Policies</h2>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{hotel?.policies || 'No policies provided.'}</p>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <div className="border border-border rounded-2xl p-6 bg-card shadow-brand-soft">
              <div className="text-sm text-muted-foreground">Best available rate</div>
              <div className="text-2xl font-bold text-foreground mb-2">₹{hotel?.pricePerNight?.toLocaleString()}</div>
              {/* Keeping only WhatsApp inquiry, no booking */}
              <Button fullWidth className="bg-[#25D366] hover:bg-[#128C7E] text-white border-0" iconName="MessageCircle" iconPosition="left" onClick={onWhatsApp}>
                Inquire on WhatsApp
              </Button>
            </div>
            <div className="border border-border rounded-2xl p-6 bg-card shadow-brand-soft">
              <h3 className="font-semibold text-foreground mb-3">Why choose us?</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center gap-2"><Icon name="Shield" size={16} className="text-primary" /> Verified properties</li>
                <li className="flex items-center gap-2"><Icon name="IndianRupee" size={16} className="text-primary" /> Best price transparency</li>
                <li className="flex items-center gap-2"><Icon name="MessageCircle" size={16} className="text-primary" /> 24*7 WhatsApp support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HotelDetails;

