import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { AuthProvider, useAuth } from "contexts/AuthContext";
import ProtectedRoute from "components/ProtectedRoute";
import GlobalLayout from "components/GlobalLayout";
import NotFound from "pages/NotFound";
import TaxiBookingSystem from './pages/taxi-booking-system';
import TravelBlogHub from './pages/travel-blog-hub-journey-intelligence';
import SingleBlog from './pages/travel-blog-hub-journey-intelligence/SingleBlog';
import ContactSupportCenter from './pages/contact-support-center';
import TourPackagesDiscoveryCenter from './pages/tour-packages-discovery-center';
import HomepagePremiumTravelDiscoveryHub from './pages/homepage-premium-travel-discovery-hub';
import HotelBookingPortal from './pages/hotel-booking-portal';
import HotelDetails from './pages/hotel-booking-portal/HotelDetails.jsx';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import TourDetails from './pages/tour-packages-discovery-center/TourDetails.jsx';
import AboutUs from './pages/about-us';
// Component to redirect authenticated users away from auth pages
const AuthRedirect = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/homepage-premium-travel-discovery-hub" replace />;
  }
  
  return children;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <ScrollToTop />
          <RouterRoutes>
            <Route element={<GlobalLayout />}>
              {/* Public Routes */}
              <Route path="/" element={<HomepagePremiumTravelDiscoveryHub />} />
              <Route path="/homepage-premium-travel-discovery-hub" element={<HomepagePremiumTravelDiscoveryHub />} />
              <Route path="/contact-support-center" element={<ContactSupportCenter />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/travel-blog-hub-journey-intelligence" element={<TravelBlogHub />} />
              <Route path="/blog/:id" element={<SingleBlog />} />

              {/* Auth Routes - Commented out as requested */}
              {/* <Route path="/login" element={
                <AuthRedirect>
                  <LoginPage />
                </AuthRedirect>
              } />
              <Route path="/register" element={
                <AuthRedirect>
                  <RegisterPage />
                </AuthRedirect>
              } /> */}

              {/* Protected Routes - Require Authentication */}
              <Route path="/tour/:id" element={
                // <ProtectedRoute>
                  <TourDetails />
                // </ProtectedRoute>
              } />
              <Route path="/tour-packages-discovery-center" element={
                // <ProtectedRoute>
                  <TourPackagesDiscoveryCenter />
                // </ProtectedRoute>
              } />
              <Route path="/hotel-booking-portal" element={
                // <ProtectedRoute>
                  <HotelBookingPortal />
                // </ProtectedRoute>
              } />
              <Route path="/hotel/:id" element={
                // <ProtectedRoute>
                  <HotelDetails />
                // </ProtectedRoute>
              } />
              <Route path="/taxi-booking-system" element={
                // <ProtectedRoute>
                  <TaxiBookingSystem />
                // </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </RouterRoutes>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
