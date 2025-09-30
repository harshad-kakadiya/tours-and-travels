import React, { forwardRef } from "react";

const PdfSchedule = forwardRef(({ tour }, ref) => (
    <div
        ref={ref}
        className="bg-white text-gray-800"
        style={{
            width: '420mm',
            minHeight: '297mm',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            padding: '20mm 30mm'
        }}
    >
        <style>
            {`
                @media print {
                    @page {
                        margin: 20mm 15mm;
                        size: A4 landscape;
                    }
                    
                    .page-break-before {
                        page-break-before: always;
                        padding-top: 10mm;
                    }
                    
                    .page-break-avoid {
                        page-break-inside: avoid;
                        break-inside: avoid;
                    }
                    
                    .page-break-after {
                        page-break-after: always;
                    }
                }
            `}
        </style>

        {/* Website Header */}
        {/* Website Header */}
        <div
            className="page-break-avoid"
            style={{
                backgroundColor: '#0F172A',
                margin: '-20mm -30mm 0 -30mm',
                padding: '20mm 30mm 20mm 30mm'
            }}
        >
            {/* Logo - Centered */}
            <div className="flex justify-center mb-10">
                <div className="flex items-center gap-6">
                    {/* Logo Icon */}
                    <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center shadow-lg">
                        <svg
                            className="w-10 h-10 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>

                    {/* Logo Text */}
                    <div>
                        <h1 className="text-5xl font-extrabold text-white leading-snug">WanderWise</h1>
                        <p className="text-2xl text-teal-300 font-medium">Tours</p>
                    </div>
                </div>
            </div>


            {/* Title and Contact Info */}
            <div className="flex justify-between items-start mb-8">
                {/* Left - Title */}
                <div className="flex-1">
                    <h2 className="text-4xl font-extrabold text-white mb-2">
                        {tour?.title || "Tour Schedule"}
                    </h2>
                    <div className="mb-2 flex gap-2">
                        <p className="text-xl text-gray-400">Email:</p>
                        <p className="text-xl font-semibold text-white">info@wanderwise.com</p>
                    </div>
                </div>

                {/* Right - Contact Details */}
                <div className="text-right text-white">
                    <div className="mb-2 flex gap-2 justify-end">
                        <p className="text-xl text-gray-400">Contact Number:</p>
                        <p className="text-xl font-semibold">+91 98765 43210</p>
                    </div>

                    <div className="flex gap-2 justify-end">
                        <p className="text-xl text-gray-400">Address:</p>
                        <p className="text-xl font-semibold">Ahmedabad, Gujarat, India</p>
                    </div>
                </div>
            </div>

            {/* Date */}
            <div className="pt-4 border-t border-gray-700">
                <p className="text-center text-sm text-gray-400">
                    Generated on {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
                </p>
            </div>
        </div>


        {/* Tour Header Section */}
        {/*<div className="mb-16 page-break-avoid">*/}
        {/*    <div className="mb-8">*/}
        {/*        <h2 className="text-5xl font-bold text-gray-900 mb-2 leading-tight">*/}
        {/*            Every Journey Tells a Story*/}
        {/*        </h2>*/}
        {/*        <h3 className="text-4xl font-bold bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent leading-tight">*/}
        {/*            Let Us Help Write Yours*/}
        {/*        </h3>*/}
        {/*    </div>*/}

        {/*    <div className="flex items-center gap-3 mb-6">*/}
        {/*        <div className="w-1 h-10 bg-gradient-to-b from-teal-500 to-teal-700 rounded-full"></div>*/}
        {/*        <div className="px-4 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-semibold tracking-wide">*/}
        {/*            ITINERARY OVERVIEW*/}
        {/*        </div>*/}
        {/*    </div>*/}

        {/*    <h4 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">*/}
        {/*        {tour?.title || "Tour Schedule"}*/}
        {/*    </h4>*/}

        {/*    <div className="h-0.5 bg-gradient-to-r from-teal-400 via-teal-200 to-transparent mb-6"></div>*/}

        {/*    <div className="flex items-center justify-between">*/}
        {/*        <p className="text-gray-600 text-lg font-medium">*/}
        {/*            {(tour?.itinerary || []).length} days of carefully curated experiences*/}
        {/*        </p>*/}
        {/*        <div className="text-right">*/}
        {/*            <p className="text-sm text-gray-500">Generated on</p>*/}
        {/*            <p className="text-sm font-semibold text-gray-700">*/}
        {/*                {new Date().toLocaleDateString('en-US', {*/}
        {/*                    year: 'numeric',*/}
        {/*                    month: 'long',*/}
        {/*                    day: 'numeric'*/}
        {/*                })}*/}
        {/*            </p>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}

        {/* Itinerary Timeline */}
        <div className="space-y-10 mt-10">
            {(tour?.itinerary || []).map((d, index) => (
                <div
                    key={d.day}
                    className="flex gap-6 relative page-break-avoid items-center"
                    style={{
                        marginBottom: index < (tour?.itinerary || []).length - 1 ? '2.5rem' : '0'
                    }}
                >
                    {/* Day Number Circle with Timeline */}
                    <div className="flex-shrink-0 relative flex flex-col items-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                            <div className="text-center">
                                <span className="text-white font-bold text-2xl block leading-none">
                                    {d.day}
                                </span>
                                <span className="text-teal-100 text-md font-medium">
                                    DAY
                                </span>
                            </div>
                        </div>

                        {/* Connecting Line */}
                        {index < (tour?.itinerary || []).length - 1 && (
                            <div
                                className="bg-gradient-to-b from-teal-300 via-teal-200 to-gray-200"
                                style={{
                                    marginTop: '8px',
                                    width: '2px',
                                    height: '40px'
                                }}
                            ></div>
                        )}
                    </div>

                    {/* Content Card */}
                    <div className="flex-1">
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-7 border border-gray-200 shadow-sm">
                            <div className="border-l-4 border-teal-500 pl-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                                    {d.title}
                                </h2>

                                <p className="text-gray-700 text-xl leading-relaxed mb-5">
                                    {d.desc}
                                </p>

                                {/* Activity Badge */}
                                {/*<div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-50 border border-teal-200 rounded-full">*/}
                                {/*    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>*/}
                                {/*    <span className="text-teal-700 font-semibold text-sm">*/}
                                {/*        Day {d.day} Activities*/}
                                {/*    </span>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Footer Section */}
        <div className="mt-20 pt-8 border-t-2 border-gray-200 page-break-avoid">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center shadow-md">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 text-base">
                            Premium Tour Package
                        </p>
                        <p className="text-gray-500 text-sm">
                            Professionally curated itinerary
                        </p>
                    </div>
                </div>

                <div className="px-5 py-2.5 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-full flex items-center justify-center min-h-[44px]">
    <span className="text-emerald-700 font-bold text-sm tracking-wide text-center">
        ✓ ITINERARY CONFIRMED
    </span>
                </div>

            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-md text-gray-500">
                    This itinerary is subject to change based on weather conditions and local circumstances.
                    All timings are approximate and may vary.
                </p>
            </div>
        </div>
    </div>
));

PdfSchedule.displayName = "PdfSchedule";

export default PdfSchedule;