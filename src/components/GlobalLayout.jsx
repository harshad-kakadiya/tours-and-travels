import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './ui/Header';
import Footer from '../pages/homepage-premium-travel-discovery-hub/components/Footer';

const GlobalLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default GlobalLayout;

