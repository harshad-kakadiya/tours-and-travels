import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PopularDestinationsSection = () => {
    const navigate = useNavigate();
    const [states, setStates] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const fetchStates = async () => {
            try {
                const res = await fetch('https://tour-travels-be.onrender.com/api/state');
                const data = await res.json();
                const list = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data?.data : [data].filter(Boolean));
                const mapped = list?.slice(0, 6)?.map((s) => ({
                    id: s?._id || s?.id,
                    name: s?.name,
                    image: s?.image
                })) || [];
                if (isMounted) setStates(mapped);
            } catch (e) {
                if (isMounted) setStates([]);
            }
        };
        fetchStates();
        return () => { isMounted = false; };
    }, []);

    const handleClick = (stateName) => {
        const params = new URLSearchParams({ state: stateName });
        navigate(`/tour-packages-discovery-center?${params.toString()}`);
    };

    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-4">
                            <Icon name="Map" size={16} />
                            <span className="text-sm font-medium">Top Destinations</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">
                            Popular Destinations
                        </h2>
                        <p className="text-lg text-muted-foreground">Explore tours by state</p>
                    </div>
                    <div className="hidden sm:flex items-center space-x-4">
                        <Link to="/tour-packages-discovery-center">
                            <Button
                                variant="outline"
                                size="lg"
                                iconName="ArrowRight"
                                iconPosition="right"
                                className="px-6 py-3 text-base font-semibold border-2 bg-[#4891C9] text-white border-[#4891C9] "
                            >
                                View All Tours
                            </Button>

                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {states?.map((s, index) => (
                        <motion.button
                            type="button"
                            key={s?.id}
                            onClick={() => handleClick(s?.name)}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="relative rounded-2xl overflow-hidden group cursor-pointer text-left"
                        >
                            <div className="relative h-64">
                                <Image src={s?.image} alt={s?.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="text-white text-xl font-semibold">{s?.name}</div>
                                    <div className="text-white/80 text-sm flex items-center gap-1">
                                        <Icon name="MapPin" size={14} /> Discover tours
                                    </div>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
                <div className="sm:hidden flex justify-center mt-6  items-center space-x-4">
                    <Link to="/tour-packages-discovery-center">
                        <Button
                            variant="outline"
                            size="lg"
                            iconName="ArrowRight"
                            iconPosition="right"
                            className="px-6 py-3 text-base font-semibold border-2 bg-[#4891C9] text-white border-[#4891C9] "
                        >
                            View All Tours
                        </Button>

                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PopularDestinationsSection;