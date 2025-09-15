import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Image from '../../components/AppImage';

// Minimal mock resolver for demo. In a real app, fetch by id from the API.
import mockData from './mockPackages.data.json';

const Section = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card/80 backdrop-blur shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-muted/40 to-background hover:from-muted/60 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="font-semibold text-foreground">{title}</span>
        </div>
        <Icon name={open ? 'ChevronUp' : 'ChevronDown'} size={18} className="text-muted-foreground" />
      </button>
      {open && <div className="p-5">{children}</div>}
    </div>
  );
};

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const tour = useMemo(() => {
    const parsed = Array.isArray(mockData) ? mockData : [];
    return parsed.find((p) => String(p.id) === String(id)) || parsed[0];
  }, [id]);

  const [selectedDate, setSelectedDate] = useState('');
  const [sharing, setSharing] = useState('two');
  const [selectedPkg, setSelectedPkg] = useState('Standard');

  const basePrice = useMemo(() => {
    if (selectedPkg === 'Premium') return Math.round((tour?.price || 0) * 1.2);
    return tour?.price || 0;
  }, [tour, selectedPkg]);

  const priceMap = useMemo(() => ({
    two: basePrice,
    three: Math.round(basePrice * 0.9),
    four: Math.round(basePrice * 0.85)
  }), [basePrice]);

  const handleBook = () => {
    // For now, take user to contact with prefilled message
    const message = encodeURIComponent(
      `Hi! I'm interested in the ${tour?.title} on ${selectedDate || 'my preferred date'} for ${sharing} sharing.`
    );
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="pt-0">
        <div className="relative h-[42vh] sm:h-[56vh] w-full">
          <Image
            src={tour?.images?.[0] || tour?.image}
            alt={tour?.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />
          <div className="absolute bottom-6 left-0 right-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
              <h1 className="text-white text-3xl sm:text-4xl font-heading font-bold mb-2">{tour?.title}</h1>
              <div className="flex flex-wrap gap-3 text-white/90">
                <div className="flex items-center gap-1"><Icon name="MapPin" size={16} /><span>{tour?.location}</span></div>
                <div className="flex items-center gap-1"><Icon name="Calendar" size={16} /><span>{tour?.duration} Days</span></div>
                <div className="flex items-center gap-1"><Icon name="Star" size={16} /><span>{tour?.rating || '4.8'}</span></div>
              </div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 text-right shadow-lg">
              <div className="text-muted-foreground text-sm">Starting from</div>
              <div className="text-3xl font-bold text-foreground">₹{(tour?.price || 0).toLocaleString()}</div>
            </div>
            </div>
          </div>
          {/* Info chips moved below to avoid overlay */}
        </div>
      </section>
      {/* Chips row below hero */}
      <section className="hidden md:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-5 gap-3 mt-4">
          {[
            {icon:'Mountain', label:'Altitude', value:'1500 ft'},
            {icon:'Users', label:'Difficulty', value:'Easy'},
            {icon:'MapPin', label:'Base Camp', value:'Jaisalmer'},
            {icon:'UserPlus', label:'Min Age', value:'5+'},
            {icon:'Sun', label:'Best time', value:'Oct - Feb'}
          ].map((i,idx) => (
            <div key={idx} className="flex items-center gap-3 bg-white/95 rounded-xl border border-border p-3 shadow-sm">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Icon name={i.icon} size={18} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{i.label}</div>
                <div className="text-sm font-medium text-foreground">{i.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="pt-16 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Booking Widget */}
          <div className="lg:col-span-2 space-y-6">
            {/* Package selector demo */}
            <Section title="Select Package">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Standard', price: tour?.price },
                  { label: 'Premium', price: Math.round((tour?.price || 0) * 1.2) }
                ].map((v) => {
                  const active = selectedPkg === v.label;
                  return (
                    <button
                      key={v.label}
                      onClick={() => setSelectedPkg(v.label)}
                      className={`border rounded-2xl p-4 flex items-center justify-between text-left transition-all ${active ? 'border-primary bg-primary/5 shadow-sm' : 'border-border bg-card'}`}
                    >
                      <div>
                        <div className="font-semibold text-foreground flex items-center gap-2">
                          {active && <span className="w-2 h-2 rounded-full bg-primary" />}
                          {v.label}
                        </div>
                        <div className="text-muted-foreground text-xs">Per person</div>
                      </div>
                      <div className="text-xl font-bold text-foreground">₹{(v.price || 0).toLocaleString()}</div>
                    </button>
                  );
                })}
              </div>
            </Section>

            {/* Date picker demo */}
            <Section title="Select Date">
              <div className="flex flex-wrap gap-2">
                {['Oct 12','Oct 18','Oct 22','Nov 02','Nov 10','Nov 18','Dec 01'].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDate(d)}
                    className={`px-3 py-1.5 rounded-md border text-sm shadow-sm ${selectedDate === d ? 'bg-primary text-white border-primary' : 'bg-card border-border hover:border-muted-foreground/30'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </Section>

            {/* Sharing type */}
            <Section title="Select Sharing Type">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { key: 'two', label: 'Two Sharing' },
                  { key: 'three', label: 'Three Sharing' },
                  { key: 'four', label: 'Four Sharing' }
                ].map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSharing(s.key)}
                    className={`px-3 py-2 rounded-lg border text-sm text-left shadow-sm ${sharing === s.key ? 'bg-primary text-white border-primary' : 'bg-card border-border hover:border-muted-foreground/30'}`}
                  >
                    <div className="font-semibold">{s.label}</div>
                    <div className="text-xs opacity-80">₹{priceMap[s.key]?.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </Section>

            {/* Itinerary / Schedule */}
            <Section title="Schedule">
              <ol className="space-y-4">
                {(tour?.itinerary || [
                  { day: 1, title: 'Arrival at Destination', desc: 'Check-in and local sightseeing.' },
                  { day: 2, title: 'Adventure Day', desc: 'Desert activities and cultural program.' },
                  { day: 3, title: 'City Tour', desc: 'Museums, temples and shopping.' },
                  { day: 4, title: 'Departure', desc: 'Transfer to airport/station.' }
                ]).map((d) => (
                  <li key={d.day} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs mt-1">{d.day}</div>
                    <div>
                      <div className="font-medium text-foreground">Day {d.day}: {d.title}</div>
                      <p className="text-muted-foreground text-sm">{d.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Section>
          </div>

          {/* Right: Sticky booking card */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="border border-border rounded-2xl p-6 bg-card/90 backdrop-blur shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground text-sm">Selected price</span>
                  <span className="text-2xl font-bold text-foreground">₹{priceMap[sharing]?.toLocaleString()}</span>
                </div>
                <ul className="text-sm text-muted-foreground mb-4 space-y-1">
                  <li className="flex items-center justify-between"><span>Package</span><span className="text-foreground font-medium">{selectedPkg}</span></li>
                  <li className="flex items-center justify-between"><span>Date</span><span className="text-foreground font-medium">{selectedDate || 'Select date'}</span></li>
                  <li className="flex items-center justify-between"><span>Sharing</span><span className="text-foreground font-medium">{sharing}</span></li>
                </ul>
                <Button onClick={handleBook} fullWidth className="bg-primary hover:bg-primary/90" iconName="MessageCircle" iconPosition="left">
                  Book / Inquire on WhatsApp
                </Button>
              </div>

              <Section title="Highlights">
                <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  {(tour?.highlights || ['Camel Safari','Camp Stay','Cultural Program','Dinner & Breakfast','Sunset View','City Tour']).map((h, i) => (
                    <li key={i} className="flex items-center gap-2"><Icon name="Check" size={14} className="text-accent" />{h}</li>
                  ))}
                </ul>
              </Section>

              <Section title="Good to know" defaultOpen={false}>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Best time to visit: Oct-Feb</li>
                  <li>Altitude: 1500 ft (approx.)</li>
                  <li>Minimum age: 5+</li>
                </ul>
              </Section>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                <div className="flex items-center gap-2"><Icon name="Shield" size={14} /><span>Secure & Trusted</span></div>
                <div className="flex items-center gap-2"><Icon name="Clock" size={14} /><span>Instant confirmation</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        <div className="mt-12 container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-heading font-semibold mb-4 text-foreground">Related Tours</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(tour?.related || mockData?.slice(0,3)).map((r) => (
              <button key={r.id} onClick={() => navigate(`/tour/${r.id}`)} className="text-left relative rounded-2xl overflow-hidden group">
                <div className="relative h-56">
                  <Image src={r.images?.[0] || r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white text-lg font-semibold">{r.title}</div>
                    <div className="text-white/80 text-sm">₹{(r.price || 0).toLocaleString()}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default TourDetails;

