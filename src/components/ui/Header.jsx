import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../../public/assets/images/22d66695-43aa-43a2-9cb6-2d1d7a62872c .png";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const location = useLocation();
    const [a, setA] = useState(null);
    const { user, isAuthenticated, logout } = useAuth();
    const servicesDropdownRef = useRef(null);

    const navigationItems = [
        { name: "Home", path: "/homepage-premium-travel-discovery-hub" },
        { name: "About Us", path: "/about-us" },
        {
            name: "Services",
            path: "#",
            isDropdown: true,
            dropdownItems: [
                { name: "Tour", path: "/tour-packages-discovery-center" },
                { name: "Hotel", path: "/hotel-booking-portal" },
                { name: "Cab", path: "/taxi-booking-system" },
            ],
        },
        { name: "Blog", path: "/travel-blog-hub-journey-intelligence" },
        { name: "Contact Us", path: "/contact-support-center" },
    ];

    useEffect(() => {
        const c = [
            "/",
            "/homepage-premium-travel-discovery-hub",
            "/contact-support-center",
            "/hotel-booking-portal",
            "/travel-blog-hub-journey-intelligence",
        ].includes(location.pathname);
        setA(c);
    }, [location]);

    console.log(a,"0000000000000000")

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
    };

    const isActivePath = (path) => location?.pathname === path;

    return (
        <header
            style={{
                position: a ? "fixed" : "sticky",
                top: 0,
                zIndex: 100,
                width: "100%",
                background: isScrolled ? "#fff" : a ? "transparent" : "#FFF",
                color: isScrolled ? "#000" : "#000",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)",
                boxShadow: isScrolled ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "90px",
                    padding: "0 1.5rem",
                }}
            >
                {/* Logo */}
                <Link
                    to="/homepage-premium-travel-discovery-hub"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        textDecoration: "none",
                    }}
                    onClick={closeMobileMenu}
                >
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            height: "75px",
                            width: "75px",
                            background: "#fff",
                            borderRadius: "50%",
                            objectFit: "cover",
                            boxShadow: "0 0 6px rgba(0,0,0,0.1)",
                        }}
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                    {navigationItems.map((item) =>
                        item.isDropdown ? (
                            <div
                                key={item.name}
                                style={{ position: "relative" }}
                                onMouseEnter={() => setIsServicesOpen(true)}
                                onMouseLeave={() => setIsServicesOpen(false)}
                                ref={servicesDropdownRef}
                            >
                                <button
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: isScrolled ? "#000" : a ? "#FFF" : "#000",
                                        fontSize: "1rem",
                                        cursor: "pointer",
                                        fontWeight: "500",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        transition: "color 0.3s ease",
                                    }}
                                >
                                    {item.name}
                                    <Icon name={isServicesOpen ? "ChevronUp" : "ChevronDown"} size={16} />
                                </button>

                                <div
                                    className={`dropdown-menu ${isServicesOpen ? "open" : ""}`}
                                    style={{
                                        position: "absolute",
                                        top: "120%",
                                        left: "0",
                                        minWidth: "180px",
                                        background: "#fff",
                                        borderRadius: "8px",
                                        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                                        overflow: "hidden",
                                        transformOrigin: "top",
                                        transform: isServicesOpen ? "scaleY(1)" : "scaleY(0)",
                                        opacity: isServicesOpen ? 1 : 0,
                                        transition: "all 0.25s ease",
                                    }}
                                >
                                    {item.dropdownItems.map((dropdown) => (
                                        <Link
                                            key={dropdown.path}
                                            to={dropdown.path}
                                            onClick={() => setIsServicesOpen(false)}
                                            style={{
                                                display: "block",
                                                padding: "12px 18px",
                                                color: isActivePath(dropdown.path) ? "#3b82f6" : "#111827",
                                                fontSize: "0.95rem",
                                                textDecoration: "none",
                                                transition: "all 0.2s ease",
                                            }}
                                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
                                            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                                        >
                                            {dropdown.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={item.path}
                                to={item.path}
                                style={{
                                    color: isScrolled ? "#000" : a ? "#FFF" : "#000",
                                    fontWeight: isActivePath(item.path) ? "600" : "500",
                                    fontSize: "1rem",
                                    textDecoration: "none",
                                    position: "relative",
                                    transition: "color 0.3s ease",
                                }}
                            >
                                {item.name}
                            </Link>
                        )
                    )}
                    
                    {/* Login/Logout Button */}
                    {isAuthenticated ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <span style={{ 
                                color: isScrolled ? "#000" : a ? "#FFF" : "#000",
                                fontSize: "0.9rem" 
                            }}>
                                Hi, {user?.fullName?.split(' ')[0] || 'User'}
                            </span>
                            <button
                                onClick={logout}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.5rem 1rem",
                                    background: "#e11d48",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "0.375rem",
                                    fontSize: "0.875rem",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = "#be123c")}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = "#e11d48")}
                            >
                                <Icon name="LogOut" size={16} />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.5rem 1rem",
                                background: "#3b82f6",
                                color: "#fff",
                                border: "none",
                                borderRadius: "0.375rem",
                                fontSize: "0.875rem",
                                fontWeight: "500",
                                textDecoration: "none",
                                transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#2563eb")}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = "#3b82f6")}
                        >
                            <Icon name="LogIn" size={16} />
                            Login
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    style={{
                        padding: "0.5rem",
                        color: isScrolled ? "#000" : "#fff",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "none",
                    }}
                    className="mobile-menu-btn"
                >
                    <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={26} />
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div
                    className="mobile-nav"
                    style={{
                        background: "#fff",
                        color: "#111827",
                        padding: "1rem 1.5rem",
                        borderTop: "1px solid #e5e7eb",
                        animation: "slideDown 0.3s ease",
                    }}
                >
                    {navigationItems.map((item) =>
                        item.isDropdown ? (
                            <div key={item.path}>
                                <button
                                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        width: "100%",
                                        padding: "1rem 0",
                                        fontSize: "1rem",
                                        fontWeight: "500",
                                        background: "none",
                                        border: "none",
                                        color: "#111827",
                                    }}
                                >
                                    {item.name}
                                    <Icon name={isServicesOpen ? "ChevronUp" : "ChevronDown"} size={16} />
                                </button>
                                <div
                                    style={{
                                        maxHeight: isServicesOpen ? "300px" : "0",
                                        overflow: "hidden",
                                        transition: "max-height 0.3s ease",
                                    }}
                                >
                                    {item.dropdownItems.map((dropdown) => (
                                        <Link
                                            key={dropdown.path}
                                            to={dropdown.path}
                                            onClick={closeMobileMenu}
                                            style={{
                                                display: "block",
                                                padding: "0.75rem 1rem",
                                                color: "#111827",
                                                fontSize: "0.95rem",
                                                textDecoration: "none",
                                            }}
                                        >
                                            {dropdown.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={closeMobileMenu}
                                style={{
                                    display: "block",
                                    padding: "1rem 0",
                                    color: "#111827",
                                    fontSize: "1rem",
                                    textDecoration: "none",
                                }}
                            >
                                {item.name}
                            </Link>
                        )
                    )}
                    
                    {/* Login/Logout Button for Mobile */}
                    <div style={{ 
                        borderTop: "1px solid #e5e7eb", 
                        marginTop: "1rem", 
                        paddingTop: "1rem" 
                    }}>
                        {isAuthenticated ? (
                            <div>
                                <div style={{ 
                                    marginBottom: "0.75rem",
                                    fontSize: "0.9rem",
                                    color: "#4b5563"
                                }}>
                                    Hi, {user?.fullName?.split(' ')[0] || 'User'}
                                </div>
                                <button
                                    onClick={() => {
                                        logout();
                                        closeMobileMenu();
                                    }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        width: "100%",
                                        padding: "0.75rem 1rem",
                                        background: "#e11d48",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "0.375rem",
                                        fontSize: "0.875rem",
                                        fontWeight: "500",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Icon name="LogOut" size={16} />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/auth/login"
                                onClick={closeMobileMenu}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "0.5rem",
                                    width: "100%",
                                    padding: "0.75rem 1rem",
                                    background: "#3b82f6",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "0.375rem",
                                    fontSize: "0.875rem",
                                    fontWeight: "500",
                                    textDecoration: "none",
                                }}
                            >
                                <Icon name="LogIn" size={16} />
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}

            {/* Responsive CSS */}
            <style>
                {`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .mobile-menu-btn { display: block !important; }
          }
          @media (min-width: 769px) {
            .mobile-nav { display: none !important; }
          }
        `}
            </style>
        </header>
    );
};

export default Header;
