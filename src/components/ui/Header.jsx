import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import {useAuth} from '../../contexts/AuthContext';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const {user, isAuthenticated, logout} = useAuth();

    const navigationItems = [
        {name: 'Home', path: '/homepage-premium-travel-discovery-hub', icon: 'Home'},
        {name: 'About Us', path: '/about-us', icon: 'Info'},
        {name: 'Tour Packages', path: '/tour-packages-discovery-center', icon: 'MapPin'},
        {name: 'Hotels', path: '/hotel-booking-portal', icon: 'Building2'},
        {name: 'Taxi', path: '/taxi-booking-system', icon: 'Car'},
        {name: 'Travel Blog', path: '/travel-blog-hub-journey-intelligence', icon: 'BookOpen'},
        {name: 'Contact', path: '/contact-support-center', icon: 'Phone'}
    ];

    const secondaryItems = [
        // { name: 'Contact', path: '/contact-support-center', icon: 'Phone' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const isActivePath = (path) => {
        return location?.pathname === path;
    };

    const handleWhatsAppClick = () => {
        const message = encodeURIComponent("Hi! I'm interested in exploring travel packages with WanderWise Tours. Could you help me plan my next adventure?");
        window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-header transition-all duration-brand-normal bg-white shadow-brand-soft border-b border-border`}
        >
            <div className="w-full">
                <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link
                        to="/homepage-premium-travel-discovery-hub"
                        className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-brand-fast"
                        onClick={closeMobileMenu}
                    >
                        <div className="relative">
                            <div
                                className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-brand-soft">
                                <Icon name="Compass" size={24} color="white" strokeWidth={2.5}/>
                            </div>
                            <div
                                className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                                <Icon name="Sparkles" size={10} color="white" strokeWidth={3}/>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-heading font-bold text-foreground">
                                WanderWise
                            </h1>
                            <p className="text-xs text-muted-foreground -mt-1">Tours</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden xl:flex items-center space-x-1">
                        {navigationItems?.map((item) => (
                            <Link
                                key={item?.path}
                                to={item?.path}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-brand-md text-sm font-medium transition-all duration-brand-fast hover:bg-muted/50 ${
                                    isActivePath(item?.path)
                                        ? 'text-primary bg-primary/5 border border-primary/20' : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {/*<Icon name={item?.icon} size={16} />*/}
                                <span>{item?.name}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden xl:flex items-center space-x-3">
                        {/*<Link*/}
                        {/*  to="/contact-support-center"*/}
                        {/*  className={`flex items-center space-x-2 px-3 py-2 rounded-brand-md text-sm font-medium transition-all duration-brand-fast hover:bg-muted/50 ${*/}
                        {/*    isActivePath('/contact-support-center')*/}
                        {/*      ? 'text-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'*/}
                        {/*  }`}*/}
                        {/*>*/}
                        {/*  /!*<Icon name="Phone" size={16} />*!/*/}
                        {/*  <span>Contact</span>*/}
                        {/*</Link>*/}

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-3">
                                <Link
                                    to="/dashboard"
                                    className="flex items-center space-x-2 px-3 py-2 rounded-brand-md text-sm font-medium text-foreground hover:bg-muted/50 transition-all duration-brand-fast"
                                >
                                    {/*<Icon name="User" size={16} />*/}
                                    <span>Welcome, {user?.name}</span>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={logout}
                                    iconName="LogOut"
                                    iconPosition="left"
                                    iconSize={16}
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link to="/login">
                                    <Button
                                        variant="default"
                                        size="sm"
                                        iconName="LogIn"
                                        iconPosition="left"
                                        iconSize={16}
                                    >
                                        Login
                                    </Button>
                                </Link>
                            </div>
                        )}

                        <Button
                            variant="default"
                            size="sm"
                            onClick={handleWhatsAppClick}
                            iconName="MessageCircle"
                            iconPosition="left"
                            iconSize={16}
                            className="bg-[#25D366] hover:bg-[#128C7E] text-white border-0"
                        >
                            WhatsApp
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="xl:hidden p-2 rounded-brand-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-brand-fast thumb-friendly"
                        aria-label="Toggle mobile menu"
                    >
                        <Icon
                            name={isMobileMenuOpen ? "X" : "Menu"}
                            size={24}
                            strokeWidth={2}
                        />
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`xl:hidden transition-all duration-brand-normal overflow-hidden ${
                        isMobileMenuOpen
                            ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="px-4 py-4 bg-card/50 backdrop-blur-sm border-t border-border/50">
                        <nav className="space-y-2">
                            {navigationItems?.map((item) => (
                                <Link
                                    key={item?.path}
                                    to={item?.path}
                                    onClick={closeMobileMenu}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-brand-md text-sm font-medium transition-all duration-brand-fast thumb-friendly ${
                                        isActivePath(item?.path)
                                            ? 'text-primary bg-primary/10 border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                    }`}
                                >
                                    <Icon name={item?.icon} size={18}/>
                                    <span>{item?.name}</span>
                                </Link>
                            ))}

                            {secondaryItems?.map((item) => (
                                <Link
                                    key={item?.path}
                                    to={item?.path}
                                    onClick={closeMobileMenu}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-brand-md text-sm font-medium transition-all duration-brand-fast thumb-friendly ${
                                        isActivePath(item?.path)
                                            ? 'text-primary bg-primary/10 border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                    }`}
                                >
                                    <Icon name={item?.icon} size={18}/>
                                    <span>{item?.name}</span>
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-4 pt-4 border-t border-border/50 space-y-3">
                            {isAuthenticated ? (
                                <div className="space-y-2">
                                    <Link
                                        to="/dashboard"
                                        onClick={closeMobileMenu}
                                        className="flex items-center space-x-2 px-4 py-2 rounded-brand-md text-sm font-medium text-foreground bg-muted/20 hover:bg-muted/30 transition-all duration-brand-fast"
                                    >
                                        <Icon name="User" size={18}/>
                                        <span>Welcome, {user?.name}</span>
                                    </Link>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            logout();
                                            closeMobileMenu();
                                        }}
                                        iconName="LogOut"
                                        iconPosition="left"
                                        iconSize={16}
                                        fullWidth
                                        className="thumb-friendly"
                                    >
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Link to="/login" onClick={closeMobileMenu}>
                                        <Button
                                            variant="default"
                                            size="sm"
                                            iconName="LogIn"
                                            iconPosition="left"
                                            iconSize={16}
                                            fullWidth
                                            className="thumb-friendly"
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                </div>
                            )}

                            <Button
                                variant="default"
                                size="sm"
                                onClick={() => {
                                    handleWhatsAppClick();
                                    closeMobileMenu();
                                }}
                                iconName="MessageCircle"
                                iconPosition="left"
                                iconSize={16}
                                fullWidth
                                className="bg-[#25D366] hover:bg-[#128C7E] text-white border-0 thumb-friendly"
                            >
                                Chat on WhatsApp
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;