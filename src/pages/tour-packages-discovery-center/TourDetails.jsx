import React, {useEffect, useMemo, useRef, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Image from '../../components/AppImage';
import axios from "axios";
import PdfSchedule from "../../pdf/pdfSchedule";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {Swiper, SwiperSlide} from "swiper/react";

// Section Component
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

// Modal Component
const Modal = ({ open, onClose, children }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};

const TourDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const pdfRef = useRef();

    // Separate PDF generation function
    const generateAndDownloadPDF = async () => {
        try {
            if (!pdfRef.current) {
                console.error('PDF ref not found');
                return;
            }

            // Force a small delay to ensure the component is fully rendered
            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await html2canvas(pdfRef.current, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: true,
                backgroundColor: '#ffffff'
            });
            
            const imgData = canvas.toDataURL("image/png");

            // Use landscape orientation for better fit
            const pdf = new jsPDF("l", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            // Force download
            pdf.save(`${tour?.title || "tour-schedule"}.pdf`);
            console.log("PDF generated successfully");
            return true;

        } catch (error) {
            console.error('Error generating PDF:', error);
            throw new Error('PDF generation failed');
        }
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                console.error('No auth token found');
                alert('Please login to download schedule');
                setIsSubmitting(false);
                return;
            }

            // Prepare the schedule data with tour information
            const scheduleData = {
                name: data.name,
                contact: data.contact,
                tourId: tour?.id,
                tourTitle: tour?.title,
                selectedDate: selectedDate,
                sharingType: sharing,
                selectedPackage: selectedPackage?.from || 'Default',
                price: priceMap[sharing] || 0,
                duration: tour?.duration,
                location: tour?.location
            };

            console.log('Submitting schedule data:', scheduleData);

            // Make API call
            const response = await axios.post(
                'https://tour-travels-be.onrender.com/api/schedule',
                scheduleData,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('API response:', response.data);

            // Generate and download PDF immediately
            try {
                await generateAndDownloadPDF();
                // Reset form and close modal after successful PDF generation
                reset();
                setIsModalOpen(false);
                alert('Schedule downloaded successfully!');
            } catch (pdfError) {
                console.error('Error generating PDF:', pdfError);
                alert('Schedule saved but PDF download failed. Please try again.');
            } finally {
                setIsSubmitting(false);
            }

        } catch (error) {
            console.error('Error submitting schedule:', error);
            if (error.response) {
                // Server responded with error status
                alert(`Failed to submit schedule: ${error.response.data.message || 'Server error'}`);
            } else if (error.request) {
                // Request made but no response received
                alert('Failed to submit schedule: No response from server');
            } else {
                // Something else happened
                alert('Failed to submit schedule. Please try again.');
            }
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        let isMounted = true;
        const fetchTour = async () => {
            try {
                const res = await fetch('https://tour-travels-be.onrender.com/api/tour');
                const data = await res.json();
                const list = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data?.data : [data].filter(Boolean));
                const found = list?.find((t) => String(t?._id || t?.id) === String(id)) || list?.[0];
                if (!found) {
                    if (isMounted) setTour(null);
                    return;
                }
                const durationStr = typeof found?.duration === 'string' ? found?.duration : String(found?.duration || '');
                const durationNum = parseInt(durationStr?.replace(/[^0-9]/g, ''), 10) || 0;
                const images = Array.isArray(found?.images) && found?.images?.length > 0 ? found?.images : [found?.gallery?.[0]?.image].filter(Boolean);
                const itinerary = Array.isArray(found?.schedule)
                    ? found?.schedule?.map((s, idx) => ({ day: s?.day || idx + 1, title: s?.title, desc: s?.desc }))
                    : undefined;
                const related = list?.filter((t) => (t?._id || t?.id) !== (found?._id || found?.id))?.slice(0, 3)?.map((t) => ({
                    id: t?._id || t?.id,
                    title: t?.title,
                    images: Array.isArray(t?.images) && t?.images?.length > 0 ? t?.images : [t?.gallery?.[0]?.image].filter(Boolean),
                    price: Number(t?.discountedPrice || t?.price || 0)
                }));
                const mapped = {
                    id: found?._id || found?.id,
                    title: found?.title,
                    location: found?.location || found?.state?.name || '',
                    duration: durationNum,
                    price: Number(found?.discountedPrice || found?.price || 0),
                    originalPrice: Number(found?.price || 0),
                    rating: 0,
                    images,
                    packages: Array.isArray(found?.packages) ? found?.packages : [],
                    altitude: found?.altitude,
                    difficulty: found?.difficulty,
                    baseCamp: found?.baseCamp,
                    minimumAge: found?.minimumAge,
                    bestTimeToVisit: found?.bestTimeToVisit,
                    availableDates: found?.availableDates,
                    sharingTypes: found?.sharingTypes,
                    highlights: found?.highlights || found?.placesToBeVisited,
                    itinerary,
                    related
                };
                if (isMounted) setTour(mapped);
            } catch (e) {
                if (isMounted) setTour(null);
            }
        };
        fetchTour();
        return () => { isMounted = false; };
    }, [id]);
    console.log(tour,"0000000000000000000")

    const [selectedDate, setSelectedDate] = useState('');
    const [sharing, setSharing] = useState('two');
    const [selectedPackageId, setSelectedPackageId] = useState('');
    const selectedPackage = useMemo(() => {
        return tour?.packages?.find((p) => String(p?._id || p?.id) === String(selectedPackageId)) || tour?.packages?.[0];
    }, [tour, selectedPackageId]);

    const basePrice = useMemo(() => {
        if (selectedPackage) return Number(selectedPackage?.price || 0);
        return Number(tour?.price || 0);
    }, [tour, selectedPackage]);

    const priceMap = useMemo(() => {
        // Get the first sharingType object from the selected package
        const st = selectedPackage?.sharingTypes?.[0] || null;
        if (st) {
            return {
                two: Number(st?.twoSharing || 0),
                three: Number(st?.threeSharing || 0),
                four: Number(st?.fourSharing || 0)
            };
        }
        return {
            two: basePrice,
            three: 0,
            four: 0
        };
    }, [selectedPackage, basePrice]);

    const handleWhatsAppBooking = () => {
        const message = encodeURIComponent(
            `Hi! I'm interested in the ${tour?.title} on ${selectedDate || 'my preferred date'} for ${sharing} sharing.` +
            `*Group Size:* ${tour?.groupSize || 'Not specified'}\n\n`
        );

        window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="pt-0">
                <div className="relative h-[42vh] sm:h-[56vh] w-full">
                    {tour?.images && tour.images.length > 1 ? (
                        // Swiper slider for multiple images
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{ delay: 5000 }}
                            pagination={{ clickable: true }}
                            className="h-full"
                        >
                            {tour.images.map((img, idx) => (
                                <SwiperSlide key={idx} className="h-full">
                                    <img
                                        src={img}
                                        alt={`${tour.title} - ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        // Single image
                        <img
                            src={tour?.images?.[0]}
                            alt={tour?.title}
                            className="w-full h-full object-cover"
                        />
                    )}

                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />
                    <div className="absolute bottom-6 left-0 right-0">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                            <div>
                                <h1 className="text-white text-3xl sm:text-4xl font-heading font-bold mb-2">{tour?.title}</h1>
                                <div className="flex flex-wrap gap-3 text-white/90">
                                    <div className="flex items-center gap-1"><Icon name="MapPin" size={16}/><span>{tour?.location}</span></div>
                                    <div className="flex items-center gap-1"><Icon name="Calendar" size={16}/><span>{tour?.duration} Days</span></div>
                                    <div className="flex items-center gap-1"><Icon name="Star" size={16}/><span>{tour?.rating || '4.8'}</span></div>
                                </div>
                            </div>
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 text-right shadow-lg">
                                <div className="text-muted-foreground text-sm">Starting from</div>
                                <div className="flex items-center justify-end gap-2">
                                    <span className="text-3xl font-bold text-foreground">₹{(tour?.price || 0).toLocaleString()}</span>
                                    {Number(tour?.originalPrice) > Number(tour?.price) && (
                                        <span className="text-lg text-muted-foreground line-through">₹{Number(tour?.originalPrice || 0).toLocaleString()}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Chips row */}
            <section className="hidden md:block">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-5 gap-3 mt-4">
                    {[{icon: 'Mountain', label: 'Altitude', value: tour?.altitude},
                        {icon: 'Users', label: 'Difficulty', value: tour?.difficulty},
                        {icon: 'MapPin', label: 'Base Camp', value: tour?.baseCamp},
                        {icon: 'UserPlus', label: 'Min Age', value: tour?.minimumAge ? `${tour?.minimumAge}+` : ''},
                        {icon: 'Sun', label: 'Best time', value: tour?.bestTimeToVisit}
                    ].map((i, idx) => (
                        <div key={idx}
                             className="flex items-center gap-3 bg-white/95 rounded-xl border border-border p-3 shadow-sm">
                            <div
                                className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                <Icon name={i.icon} size={18}/>
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
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Package selector */}
                        <Section title="Select Package">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(tour?.packages || []).map((p) => {
                                    const idVal = String(p?._id || p?.id);
                                    const active = String(selectedPackageId) === idVal;
                                    return (
                                        <button
                                            key={idVal}
                                            onClick={() => setSelectedPackageId(idVal)}
                                            className={`border rounded-2xl p-4 flex items-center justify-between text-left transition-all ${active ? 'border-primary bg-primary/5 shadow-sm' : 'border-border bg-card'}`}
                                        >
                                            <div>
                                                <div className="font-semibold text-foreground flex items-center gap-2">
                                                    {active && <span className="w-2 h-2 rounded-full bg-primary"/>}
                                                    {p?.from || 'Package'}
                                                </div>
                                                <div className="text-muted-foreground text-xs">Per person</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="text-xl font-bold text-foreground">₹{Number(p?.discountedPrice || p?.price || 0).toLocaleString()}</span>
                                                {(() => {
                                                    const discounted = Number(p?.discountedPrice || p?.price || 0);
                                                    const hasDiscount = Number(p?.price) > Number(p?.discountedPrice);
                                                    const original = hasDiscount ? Number(p?.price || 0) : null;
                                                    return hasDiscount && original ? (
                                                        <span
                                                            className="text-sm text-muted-foreground line-through">₹{original.toLocaleString()}</span>
                                                    ) : null;
                                                })()}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </Section>

                        {/* Date picker */}
                        <Section title="Select Date">
                            <div className="flex flex-wrap gap-2">
                                {(Array.isArray(tour?.availableDates) ? tour?.availableDates : (tour?.availableDates ? [tour?.availableDates] : [])).map((dRaw) => {
                                    const dateObj = new Date(dRaw);
                                    const d = isNaN(dateObj.getTime()) ? String(dRaw) : dateObj.toLocaleDateString(undefined, {
                                        month: 'short',
                                        day: '2-digit',
                                        year: undefined
                                    });
                                    return (
                                        <button
                                            key={String(dRaw)}
                                            onClick={() => setSelectedDate(d)}
                                            className={`px-3 py-1.5 rounded-md border text-sm shadow-sm ${selectedDate === d ? 'bg-primary text-white border-primary' : 'bg-card border-border hover:border-muted-foreground/30'}`}
                                        >
                                            {d}
                                        </button>
                                    );
                                })}
                            </div>
                        </Section>

                        {/* Sharing type */}
                        <Section title="Select Sharing Type">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {[{key: 'two', label: 'Two Sharing'},
                                    {key: 'three', label: 'Three Sharing'},
                                    {key: 'four', label: 'Four Sharing'}
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

                        {/* Schedule */}
                        <Section title="Schedule">
                            <ol className="space-y-4">
                                {(tour?.itinerary || [
                                    {day: 1, title: 'Arrival at Destination', desc: 'Check-in and local sightseeing.'},
                                    {day: 2, title: 'Adventure Day', desc: 'Desert activities and cultural program.'},
                                    {day: 3, title: 'City Tour', desc: 'Museums, temples and shopping.'},
                                    {day: 4, title: 'Departure', desc: 'Transfer to airport/station.'}
                                ]).map((d) => (
                                    <li key={d.day} className="flex items-start gap-3">
                                        <div
                                            className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs mt-1">{d.day}</div>
                                        <div>
                                            <div className="font-medium text-foreground">Day {d.day}: {d.title}</div>
                                            <p className="text-muted-foreground text-sm">{d.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>

                            {/* Download Button */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90"
                            >
                                Download Schedule
                            </button>
                        </Section>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-24 space-y-4">
                            <div className="border border-border rounded-2xl p-6 bg-card/90 backdrop-blur shadow-md">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-muted-foreground text-sm">Selected price</span>
                                    {(() => {
                                        const discounted = Number(priceMap[sharing] || 0);
                                        const hasDiscount = Number(tour?.originalPrice) > Number(tour?.price);
                                        const ratio = hasDiscount && Number(tour?.price) > 0 ? Number(tour?.originalPrice) / Number(tour?.price) : 1;
                                        const original = hasDiscount ? Math.round(discounted * ratio) : null;
                                        return (
                                            <span className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-foreground">₹{discounted.toLocaleString()}</span>
                                                {hasDiscount && (
                                                    <span
                                                        className="text-base text-muted-foreground line-through">₹{Number(original || 0).toLocaleString()}</span>
                                                )}
                        </span>
                                        );
                                    })()}
                                </div>
                                <ul className="text-sm text-muted-foreground mb-4 space-y-1">
                                    <li className="flex items-center justify-between"><span>Package</span><span
                                        className="text-foreground font-medium">{selectedPackage?.from || 'Select package'}</span>
                                    </li>
                                    <li className="flex items-center justify-between"><span>Date</span><span
                                        className="text-foreground font-medium">{selectedDate || 'Select date'}</span>
                                    </li>
                                    <li className="flex items-center justify-between"><span>Sharing</span><span
                                        className="text-foreground font-medium">{sharing}</span></li>
                                </ul>
                                <Button onClick={handleWhatsAppBooking} fullWidth className="bg-primary hover:bg-primary/90"
                                        iconName="MessageCircle" iconPosition="left">
                                    Book / Inquire on WhatsApp
                                </Button>
                            </div>

                            <Section title="Highlights">
                                <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                                    {(tour?.highlights || []).map((h, i) => (
                                        <li key={i} className="flex items-center gap-2"><Icon name="Check" size={14}
                                                                                              className="text-accent"/>{h}
                                        </li>
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
                                <div className="flex items-center gap-2"><Icon name="Shield" size={14}/><span>Secure & Trusted</span>
                                </div>
                                <div className="flex items-center gap-2"><Icon name="Clock" size={14}/><span>Instant confirmation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related products */}
                <div className="mt-12 container mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-xl font-heading font-semibold mb-4 text-foreground">Related Tours</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(tour?.related || []).map((r) => (
                            <button key={r.id} onClick={() => navigate(`/tour/${r.id}`)}
                                    className="text-left relative rounded-2xl overflow-hidden group">
                                <div className="relative h-56">
                                    <Image src={r.images?.[0] || r.image} alt={r.title}
                                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
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

            {/* Modal */}
            <Modal open={isModalOpen} onClose={() => !isSubmitting && setIsModalOpen(false)}>
                <h2 className="text-lg font-semibold mb-4">Enter your details to download schedule</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Name *</label>
                        <input
                            {...register('name', {required: true})}
                            className="w-full border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Your Full Name"
                            disabled={isSubmitting}
                        />
                        {errors.name && <span className="text-red-500 text-xs">Name is required</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Contact Number *
                        </label>
                        <input
                            {...register('contact', {
                                required: 'Contact number is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Contact number must be exactly 10 digits'
                                }
                            })}
                            className="w-full border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Your Contact Number"
                            disabled={isSubmitting}
                        />
                        {errors.contact && (
                            <span className="text-red-500 text-xs">
      {errors.contact.message}
    </span>
                        )}
                    </div>


                    {/* Display selected tour info for confirmation */}
                    <div className="p-3 bg-gray-50 rounded-lg text-sm border border-border">
                        <p className="font-medium text-foreground">Tour Details:</p>
                        <p><strong>Tour:</strong> {tour?.title}</p>
                        <p><strong>Date:</strong> {selectedDate || 'Not selected'}</p>
                        <p><strong>Sharing:</strong> {sharing} sharing</p>
                        <p><strong>Package:</strong> {selectedPackage?.from || 'Default'}</p>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Processing...
                            </>
                        ) : (
                            'Submit & Download Schedule'
                        )}
                    </button>

                    <p className="text-xs text-muted-foreground text-center">
                        We'll save your details and generate your personalized schedule PDF.
                    </p>
                </form>
            </Modal>

            {/* Hidden PDF element */}
            <div style={{position: "absolute", left: "-9999px", top: 0}}>
                <PdfSchedule ref={pdfRef} tour={tour}/>
            </div>
        </div>
    );
};

export default TourDetails;
