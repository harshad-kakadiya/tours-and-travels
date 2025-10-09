import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../../public/assets/images/22d66695-43aa-43a2-9cb6-2d1d7a62872c .png';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const location = useLocation();
    const [a,setA] = useState(null);
    const { user, isAuthenticated, logout } = useAuth();
    const servicesDropdownRef = useRef(null);

    console.log(a , 'sghfffffffffffffffffffffffffffffffffffffffj')

    const navigationItems = [
        { name: 'Home', path: '/homepage-premium-travel-discovery-hub' },
        { name: 'About Us', path: '/about-us' },
        {
            name: 'Services',
            path: '#',
            isDropdown: true,
            dropdownItems: [
                { name: 'Tour', path: '/tour-packages-discovery-center' },
                { name: 'Hotel', path: '/hotel-booking-portal' },
                { name: 'Taxi', path: '/taxi-booking-system' },
            ],
        },
        { name: 'Blog', path: '/travel-blog-hub-journey-intelligence' },
        { name: 'Contact Us', path: '/contact-support-center' },
    ];
    console.log(location.pathname,"000000000000000000");
    useEffect(() => {
        // const b = location.pathname.split("/")[1] === "product";
        const c = ['/homepage-premium-travel-discovery-hub', '/contact-support-center' , '/hotel-booking-portal' ,'/travel-blog-hub-journey-intelligence'].includes(location.pathname);
        setA(c);
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
    };

    const isActivePath = (path) => location?.pathname === path;

    const isActiveService = () => {
        const servicesPaths = [
            '/taxi',
            '/hotel-booking-portal',
            '/tour-packages-discovery-center',
        ];
        return servicesPaths.includes(location?.pathname);
    };

    return (
        <header
            style={{
                position: 'fixed',
                zIndex: 100,
                width: '100%',
                background: isScrolled ? '#fff' : 'transparent',
                color: isScrolled ? '#000' : '#000',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
            }}
        >
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '100px',
                    padding: '0 2rem',
                }}
            >
                {/* Logo */}
                <Link
                    to="/homepage-premium-travel-discovery-hub"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        textDecoration: 'none',
                    }}
                    onClick={closeMobileMenu}
                >
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            height: '85px',
                            width: '85px',
                            background: '#fff',
                            borderRadius: '50%',
                            objectFit: 'cover',
                        }}
                    />
                    <span
                        style={{
                            fontWeight: '700',
                            fontSize: '20px',
                            color: '#fff',
                            letterSpacing: '0.5px',
                        }}
                    >

          </span>
                </Link>

                {/* Desktop Navigation */}
                <nav
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2rem',
                    }}
                    className="desktop-nav"
                >
                    {navigationItems.map((item) =>
                        item.isDropdown ? (
                            <div
                                key={item.name}
                                style={{ position: 'relative' }}
                                onMouseEnter={() => setIsServicesOpen(true)}
                                onMouseLeave={() => setIsServicesOpen(false)}
                                ref={servicesDropdownRef}
                            >
                                <button
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: isScrolled ? '#000' : '#fff',
                                        fontSize: '1rem',
                                        cursor: 'pointer',
                                        fontWeight: '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                    }}
                                >
                                    {item.name}
                                    <Icon
                                        name={isServicesOpen ? 'ChevronUp' : 'ChevronDown'}
                                        size={16}
                                    />
                                </button>

                                {isServicesOpen && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '120%',
                                            left: '0',
                                            minWidth: '160px',
                                            background: '#fff',

                                            borderRadius: '8px',
                                            boxShadow:
                                                '0 8px 20px rgba(0,0,0,0.15)',
                                            overflow: 'hidden',
                                            animation: 'fadeIn 0.2s ease-in-out',
                                        }}
                                    >
                                        {item.dropdownItems.map((dropdown) => (
                                            <Link
                                                key={dropdown.path}
                                                to={dropdown.path}
                                                onClick={() => setIsServicesOpen(false)}
                                                style={{
                                                    display: 'block',
                                                    padding: '10px 16px',
                                                    color: isActivePath(dropdown.path)
                                                        ? '#3b82f6'
                                                        : '#111827',
                                                    fontSize: '0.95rem',
                                                    textDecoration: 'none',
                                                    transition: 'all 0.2s ease',
                                                }}
                                                onMouseEnter={(e) =>
                                                    (e.target.style.backgroundColor = '#f9fafb')
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.target.style.backgroundColor = 'transparent')
                                                }
                                            >
                                                {dropdown.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                key={item.path}
                                to={item.path}
                                style={{
                                    color: isScrolled ? '#000' : '#fff',
                                    fontWeight: isActivePath(item.path) ? '600' : '500',
                                    fontSize: '1rem',
                                    textDecoration: 'none',
                                    position: 'relative',
                                    transition: 'color 0.3s',
                                }}
                                onMouseEnter={(e) => (e.target.style.color = '#f3f4f6')}
                                onMouseLeave={(e) => (e.target.style.color = '#fff')}
                            >
                                {item.name}
                            </Link>
                        )
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    style={{
                        padding: '0.5rem',
                        color: '#fff',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'none',
                    }}
                    className="mobile-menu-btn"
                >
                    <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div
                    style={{
                        background: '#fff',
                        color: '#111827',
                        padding: '1rem 2rem',
                        borderTop: '1px solid #e5e7eb',
                    }}
                >
                    {navigationItems.map((item) =>
                        item.isDropdown ? (
                            <div key={item.path}>
                                <button
                                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                        padding: '1rem 0',
                                        fontSize: '1rem',
                                        fontWeight: '500',
                                        background: 'none',
                                        border: 'none',
                                        color: '#111827',
                                    }}
                                >
                                    {item.name}
                                    <Icon
                                        name={isServicesOpen ? 'ChevronUp' : 'ChevronDown'}
                                        size={16}
                                    />
                                </button>
                                {isServicesOpen && (
                                    <div>
                                        {item.dropdownItems.map((dropdown) => (
                                            <Link
                                                key={dropdown.path}
                                                to={dropdown.path}
                                                onClick={closeMobileMenu}
                                                style={{
                                                    display: 'block',
                                                    padding: '0.75rem 1rem',
                                                    color: '#111827',
                                                    fontSize: '0.95rem',
                                                    textDecoration: 'none',
                                                }}
                                            >
                                                {dropdown.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={closeMobileMenu}
                                style={{
                                    display: 'block',
                                    padding: '1rem 0',
                                    color: '#111827',
                                    fontSize: '1rem',
                                    textDecoration: 'none',
                                }}
                            >
                                {item.name}
                            </Link>
                        )
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
