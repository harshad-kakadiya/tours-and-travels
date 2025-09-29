import React, { forwardRef } from "react";

const PdfSchedule = forwardRef(({ tour }, ref) => (
    <div
        ref={ref}
        className="p-8 bg-white text-gray-800 print:p-6"
        style={{
            width: 600,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            minHeight: '100vh'
        }}
    >
        {/* Header */}
        <div className="mb-12 print:mb-8 print:break-inside-avoid">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-gradient-to-b from-teal-500 to-teal-700 rounded-full"></div>
                <div className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">
                    Itinerary Overview
                </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
                {tour?.title || "Tour Schedule"}
            </h1>

            <div className="h-px bg-gradient-to-r from-teal-200 to-transparent mb-4"></div>

            <p className="text-gray-600 text-lg">
                {(tour?.itinerary || []).length} days of carefully curated experiences
            </p>
        </div>

        {/* Itinerary Timeline */}
        <div className="space-y-8 print:space-y-6">
            {(tour?.itinerary || []).map((d, index) => (
                <div
                    key={d.day}
                    className="flex gap-6 relative print:break-inside-avoid print:page-break-inside-avoid"
                    style={{
                        breakInside: 'avoid',
                        pageBreakInside: 'avoid'
                    }}
                >
                    {/* Day Number Circle with Timeline */}
                    <div className="flex-shrink-0 relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center shadow-lg print:shadow-md">
                            <span className="text-white font-bold text-xl">
                                {d.day}
                            </span>
                        </div>

                        {/* Connecting Line */}
                        {index < (tour?.itinerary || []).length - 1 && (
                            <div className="absolute top-14 left-7 w-px h-8 bg-gradient-to-b from-teal-300 to-gray-200"></div>
                        )}
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 pt-2 print:pt-1">
                        <div className="bg-gray-50 rounded-xl p-6 print:p-4 print:bg-transparent print:rounded-none border-l-4 border-teal-500 print:border-l-2">
                            <h2 className="text-2xl font-bold text-gray-900 mb-3 print:text-xl leading-tight">
                                {d.title}
                            </h2>

                            <p className="text-gray-700 text-base leading-relaxed mb-4 print:mb-3">
                                {d.desc}
                            </p>

                            {/* Activity Badge */}
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                                <span className="text-teal-700 font-semibold text-sm">
                                    Day {d.day} Activities
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200 print:mt-12 print:pt-6 print:break-inside-avoid">
            <div className="flex items-center justify-between print:flex-col print:items-start print:gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 text-sm">
                            Premium Tour Package
                        </p>
                        <p className="text-gray-500 text-xs">
                            Generated on {new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                        </p>
                    </div>
                </div>

                <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full print:px-3 print:py-1">
                    <span className="text-emerald-700 font-medium text-sm">
                        ✓ Itinerary Confirmed
                    </span>
                </div>
            </div>
        </div>
    </div>
));

PdfSchedule.displayName = "PdfSchedule";

export default PdfSchedule;