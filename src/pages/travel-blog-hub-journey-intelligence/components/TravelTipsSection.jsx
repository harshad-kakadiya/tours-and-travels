import React from 'react';
import Icon from '../../../components/AppIcon';
import {Link} from "react-router-dom";

const TravelTipsSection = () => {
    const quickTips = [
        {
            id: 1,
            category: 'Budget',
            icon: 'Wallet',
            title: 'Travel Off-Season',
            tip: 'Save 30-50% on accommodation and flights by traveling during shoulder seasons',
            color: 'text-emerald-600'
        },
        {
            id: 2,
            category: 'Safety',
            icon: 'Shield',
            title: 'Share Your Itinerary',
            tip: 'Always inform someone about your travel plans and check-in regularly',
            color: 'text-blue-600'
        },
        {
            id: 3,
            category: 'Packing',
            icon: 'Briefcase',
            title: 'Pack Light',
            tip: 'Bring only essentials and leave room for souvenirs. Roll clothes to save space',
            color: 'text-purple-600'
        },
        {
            id: 4,
            category: 'Health',
            icon: 'Heart',
            title: 'Stay Hydrated',
            tip: 'Carry a reusable water bottle and drink plenty of fluids, especially in hot climates',
            color: 'text-red-600'
        },
        {
            id: 5,
            category: 'Culture',
            icon: 'Users',
            title: 'Learn Basic Phrases',
            tip: 'Know simple greetings and phrases in the local language to connect with locals',
            color: 'text-orange-600'
        },
        {
            id: 6,
            category: 'Technology',
            icon: 'Smartphone',
            title: 'Download Offline Maps',
            tip: 'Save maps offline to navigate without internet and avoid roaming charges',
            color: 'text-indigo-600'
        }
    ];

    const featuredGuides = [
        {
            id: 1,
            title: 'First-Time India Travel Guide',
            description: 'Everything you need to know for your first trip to India',
            readTime: '15 min read',
            icon: 'Plane'
        },
        {
            id: 2,
            title: 'Monsoon Travel Safety Tips',
            description: 'How to travel safely during India\'s monsoon season',
            readTime: '8 min read',
            icon: 'CloudRain'
        },
        {
            id: 3,
            title: 'Solo Female Travel in India',
            description: 'Comprehensive safety guide for women traveling alone',
            readTime: '12 min read',
            icon: 'User'
        }
    ];

    return (
        <section className="bg-muted/30 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                        Quick Travel Tips
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Essential advice from our travel experts to make your journey smoother and more enjoyable
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {quickTips?.map((tip) => (
                        <div key={tip?.id} className="bg-card rounded-xl p-6 shadow-brand-soft hover:shadow-brand-medium transition-all duration-300 border border-border/50">
                            <div className="flex items-start space-x-4">
                                <div className={`p-3 rounded-lg bg-muted/50 ${tip?.color}`}>
                                    <Icon name={tip?.icon} size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {tip?.category}
                    </span>
                                    </div>
                                    <h3 className="font-semibold text-foreground mb-2">
                                        {tip?.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {tip?.tip}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-card rounded-2xl shadow-brand-medium overflow-hidden">
                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 px-8 py-6 border-b border-border/50">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                                    Featured Travel Guides
                                </h3>
                                <p className="text-muted-foreground">
                                    In-depth guides for specific travel scenarios and destinations
                                </p>
                            </div>
                            <Icon name="BookOpen" size={48} className="text-primary/20" />
                        </div>
                    </div>

                    <div className="p-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {featuredGuides?.map((guide) => (
                                <div key={guide?.id} className="group cursor-pointer">
                                    <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                                        <div className="bg-primary/10 text-primary p-3 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                                            <Icon name={guide?.icon} size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                                                {guide?.title}
                                            </h4>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                {guide?.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {guide?.readTime}
                        </span>
                                                <Icon name="ArrowRight" size={16} className="text-primary group-hover:translate-x-1 transition-transform duration-200" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl text-white">
                        <Icon name="Lightbulb" size={48} className="mx-auto mb-4 opacity-80" />
                        <h3 className="text-2xl font-heading font-bold mb-4">
                            Have a Travel Question?
                        </h3>
                        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                            Our travel experts are here to help! Ask us anything about destinations, planning, or travel tips.
                        </p>
                        <div className="flex justify-center">
                            <Link
                                to="/contact-support-center"
                                className="inline-flex items-center space-x-2 bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-full font-semibold transition-colors duration-200 shadow-sm"
                            >
                                <Icon name="MessageCircle" size={18} />
                                <span>Ask Our Experts</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TravelTipsSection;