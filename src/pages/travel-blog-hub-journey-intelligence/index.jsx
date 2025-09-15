import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BlogHero from './components/BlogHero';
import CategoryFilter from './components/CategoryFilter';
import FeaturedArticle from './components/FeaturedArticle';
import ArticleGrid from './components/ArticleGrid';
import TravelTools from './components/TravelTools';
import PopularDestinations from './components/PopularDestinations';
import TravelTipsSection from './components/TravelTipsSection';
import NewsletterSubscription from './components/NewsletterSubscription';

const TravelBlogHub = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Travel Blog Hub - Journey Intelligence | WanderWise Tours</title>
        <meta name="description" content="Discover India's hidden gems through expert travel guides, cultural insights, and practical travel intelligence. Your trusted source for authentic travel experiences and destination inspiration." />
        <meta name="keywords" content="travel blog, India travel guides, destination guides, travel tips, cultural insights, travel planning, WanderWise Tours" />
        <meta property="og:title" content="Travel Blog Hub - Journey Intelligence | WanderWise Tours" />
        <meta property="og:description" content="Discover India's hidden gems through expert travel guides, cultural insights, and practical travel intelligence." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/travel-blog-hub-journey-intelligence" />
        <link rel="canonical" href="/travel-blog-hub-journey-intelligence" />
      </Helmet>
      <Header />
      <main className="pt-16">
        <BlogHero />
        <CategoryFilter 
          onCategoryChange={handleCategoryChange}
          activeCategory={activeCategory}
        />
        <FeaturedArticle />
        <ArticleGrid activeCategory={activeCategory} />
        <PopularDestinations />
        <TravelTools />
        <TravelTipsSection />
        <NewsletterSubscription />
      </main>
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-heading font-bold mb-4">
              WanderWise Tours
            </h3>
            <p className="text-background/80 mb-6 max-w-2xl mx-auto">
              Your trusted companion for discovering India's incredible destinations through authentic stories, expert insights, and comprehensive travel intelligence.
            </p>
            <div className="border-t border-background/20 pt-6">
              <p className="text-background/60 text-sm">
                © {new Date()?.getFullYear()} WanderWise Tours. All rights reserved. | Crafted with passion for travelers, by travelers.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TravelBlogHub;