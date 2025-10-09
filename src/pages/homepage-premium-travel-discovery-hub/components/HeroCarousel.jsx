import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import img from '../../../../public/assets/images/istockphoto-1169602395-612x612.jpg';

const HeroCarousel = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/tour-packages-discovery-center?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const serviceOptions = [
        {
            id: 'tours',
            name: 'Tours',
            icon: 'MapPin',
            path: '/tour-packages-discovery-center'
        },
        {
            id: 'Cabs',
            name: 'Cabs',
            icon: 'Ship',
            path: '/taxi-booking-system'
        },
        {
            id: 'hotels',
            name: 'Hotels',
            icon: 'Building2',
            path: '/hotel-booking-portal'
        }
    ];

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            // minHeight: '600px',
            // maxHeight: '800px',
            overflow: 'hidden'
        }}>
            {/* Background Image - Fixed implementation */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 1
                }}
            />

            {/* Overlay for better text readability */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    zIndex: 2
                }}
            />

            {/* Hero Content */}
            <div style={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 2rem',
                textAlign: 'center',
                zIndex: 10
            }}>
                <motion.h1
                    style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 'bold',
                        color: 'white',
                        marginBottom: '2rem',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                    }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    PLAN YOUR TRAVEL NOW!
                </motion.h1>

                {/* Search Bar - Improved styling */}
                <motion.div
                    style={{
                        width: '100%',
                        maxWidth: '48rem',
                        margin: '0 auto 4rem auto'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}>
                        <input
                            type="text"
                            placeholder="Search over a million tour and travels, sight seeings, hotels and more"
                            style={{
                                flex: 1,
                                padding: '0.75rem 1.5rem',
                                border: 'none',
                                borderTopLeftRadius: '9999px',
                                borderBottomLeftRadius: '9999px',
                                color: '#1f2937',
                                outline: 'none',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                fontSize: '1rem'
                            }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                padding: '0.75rem 1.5rem',
                                border: 'none',
                                borderTopRightRadius: '9999px',
                                borderBottomRightRadius: '9999px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
                        >
                            <Icon name="Search" size={20} />
                        </button>
                    </form>
                </motion.div>

                {/* Service Options - Improved styling and hover effects */}
                <motion.div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '2rem',
                        maxWidth: '600px'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {serviceOptions.map((service) => (
                        <Link
                            key={service.id}
                            to={service.path}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textDecoration: 'none'
                            }}
                        >
                            <motion.div
                                style={{
                                    width: '5rem',
                                    height: '5rem',
                                    borderRadius: '50%',
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05)',
                                    marginBottom: '0.75rem',
                                    transition: 'all 0.3s ease'
                                }}
                                whileHover={{
                                    scale: 1.1,
                                }}
                            >
                                <Icon
                                    name={service.icon}
                                    size={24}
                                    style={{
                                        color: '#3b82f6',
                                        transition: 'color 0.3s ease'
                                    }}
                                />
                            </motion.div>
                            <span style={{
                                color: 'white',
                                fontWeight: 500,
                                fontSize: '0.875rem',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                            }}>
                                {service.name}
                            </span>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default HeroCarousel;