import React from 'react';

const aboutData = {
    header: {
        title: "About Us",
        subtitle: "Discover the story behind India's premier travel experience provider.",
    },
    story: [
        "Founded in 2010, our travel agency has been dedicated to providing exceptional travel experiences across India and beyond. What started as a small team of passionate travelers has grown into a comprehensive travel service provider with a focus on authentic experiences, responsible tourism, and customer satisfaction.",
        "Our mission is to connect travelers with the heart and soul of each destination, creating memories that last a lifetime. We believe that travel has the power to transform lives, broaden perspectives, and create meaningful connections between people and places.",
        "Whether you're looking for a luxury getaway, an adventure-packed expedition, or a cultural immersion, our team of experienced travel consultants is here to craft the perfect journey for you.",
    ],
    vision: "To be the most trusted travel partner for travelers seeking authentic and transformative experiences in India and around the world. We envision a world where travel breaks down barriers, promotes cultural understanding, and contributes positively to local communities.",
    values: [
        {
            name: "Authenticity",
            description: "We create genuine travel experiences that connect you with the true essence of each destination.",
        },
        {
            name: "Responsibility",
            description: "We are committed to sustainable tourism practices that respect local cultures and environments.",
        },
        {
            name: "Excellence",
            description: "We strive for the highest standards in every aspect of our service.",
        },
        {
            name: "Innovation",
            description: "We continuously seek new ways to enhance your travel experience.",
        },
    ],
    features: [
        {
            title: "Personalized Service",
            description: "We take the time to understand your travel preferences and create customized itineraries that match your interests, budget, and pace.",
            icon: (
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            title: "Local Expertise",
            description: "Our team of local experts provides insider knowledge and access to hidden gems that you won't find in guidebooks.",
            icon: (
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
            ),
        },
        {
            title: "24/7 Support",
            description: "Travel with peace of mind knowing our dedicated support team is available around the clock to assist you with any concerns.",
            icon: (
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
    ],
};

const AboutUs = () => {
    return (
        <div className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{aboutData.header.title}</h2>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">{aboutData.header.subtitle}</p>
                </div>

                {/* Story Section */}
                <div className="mt-16">
                    <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
                        <div className="lg:col-span-3">
                            <div className="prose prose-indigo prose-lg text-gray-500 mx-auto">
                                {aboutData.story.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vision and Values */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
                        <p className="text-gray-600">{aboutData.vision}</p>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
                        <ul className="text-gray-600 space-y-2">
                            {aboutData.values.map(({ name, description }, index) => (
                                <li key={index}>
                                    <span className="font-medium">{name}:</span> {description}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* What Sets Us Apart */}
                <div className="mt-16">
                    <h3 className="text-2xl font-extrabold text-gray-900 text-center mb-8">What Sets Us Apart</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {aboutData.features.map(({ title, description, icon }, index) => (
                            <div
                                key={index}
                                className={"bg-white p-6 rounded-lg shadow-sm border border-gray-300"}
                            >
                                <div className="text-indigo-600 mb-4">{icon}</div>
                                <h4 className="text-lg font-medium text-gray-900">{title}</h4>
                                <p className="mt-2 text-gray-600">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
