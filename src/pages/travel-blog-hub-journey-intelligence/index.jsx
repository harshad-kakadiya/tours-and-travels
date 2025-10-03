import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
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
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    // Add a flag to indicate search was performed
    if (query) {
      sessionStorage.setItem('shouldScroll', 'true');
    }
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
      <BlogHero onSearch={handleSearch} />
      <CategoryFilter 
        onCategoryChange={handleCategoryChange}
        activeCategory={activeCategory}
      />
      <FeaturedArticle />
      <ArticleGrid activeCategory={activeCategory} searchQuery={searchQuery} />
      {/*<PopularDestinations />*/}
      <TravelTools />
      <TravelTipsSection />
      <NewsletterSubscription />
    </div>
  );
};

export default TravelBlogHub;