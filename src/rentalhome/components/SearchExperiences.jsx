import React, { useEffect, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

function SearchExperiences({
    location,
    checkIn,
    checkOut,
    experiences = [],
    setLatitude,
    setLongitude,
    mapView = false,
    activeExperienceId,
    setActiveExperienceId,
    hoveredExperienceId,
    setHoveredExperienceId,
}) {
    const cardRefs = useRef({});

    // Filter experiences safely using property_address
    const filteredExperiences = experiences.filter((exp) => {
        const address = exp.property_address?.address_line_1 || exp.name || "";
        return address.toLowerCase().includes(location?.toLowerCase());
    });

    // Map coordinates for map
    const searchLatitude = filteredExperiences.map((e) => e.property_address?.latitude || 0);
    const searchLongitude = filteredExperiences.map((e) => e.property_address?.longitude || 0);

    // Scroll to active experience
    useEffect(() => {
        if (!activeExperienceId) return;
        const card = cardRefs.current[activeExperienceId];
        if (!card) return;

        card.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }, [activeExperienceId]);

    // Scroll to hovered experience with slight delay
    useEffect(() => {
        if (!hoveredExperienceId) return;
        const card = cardRefs.current[hoveredExperienceId];
        if (!card) return;

        const timer = setTimeout(() => {
            card.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }, 400);

        return () => clearTimeout(timer);
    }, [hoveredExperienceId]);

    // Update map coordinates
    useEffect(() => {
        setLatitude(searchLatitude);
        setLongitude(searchLongitude);
    }, []);

    return (
        <div className="w-full px-3 md:px-6 lg:px-8">
            <div
                className={`grid gap-4 sm:gap-5 lg:gap-6 ${mapView ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                    }`}
            >
                {filteredExperiences.map((exp) => {
                    const isActive = activeExperienceId === exp.id;
                    const isHovered = hoveredExperienceId === exp.id;

                    return (
                        <Link
                            key={exp.id}
                            to={`/experience/${exp.id}/${exp.property_slug || exp.slug}`}
                            state={{ experience: exp }}
                        >
                            <div
                                ref={(el) => (cardRefs.current[exp.id] = el)}
                                onMouseEnter={() => setHoveredExperienceId?.(exp.id)}
                                onMouseLeave={() => setHoveredExperienceId?.(null)}
                                onClick={() => setActiveExperienceId?.(exp.id)}
                                className="cursor-pointer transition-all duration-300 rounded-3xl overflow-hidden bg-white"
                                style={{
                                    boxShadow: isActive || isHovered
                                        ? "0 2px 8px rgba(0,0,0,0.1)"
                                        : "0 1px 4px rgba(0,0,0,0.05)",
                                    transform: isActive || isHovered ? "scale(1.02)" : "scale(1)",
                                }}
                            >
                                <div className="relative p-2">
                                    <img
                                        src={exp.cover_photo}
                                        alt={exp.name || "Experience"}
                                        className={`w-full object-cover rounded-[20px_20px_60px_20px] ${mapView ? "h-44 sm:h-48" : "h-40 md:h-44 lg:h-48"
                                            }`}
                                    />
                                    <span className="absolute top-4 right-4 bg-white/70 backdrop-blur text-xs font-semibold px-2 py-1 rounded-md shadow">
                                        Popular Experience
                                    </span>
                                </div>

                                <div className="py-3 px-3 text-sm font-medium text-gray-600">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="text-sm font-semibold truncate">{exp.name || "Untitled"}</h3>
                                        <div className="flex items-center space-x-1">
                                            <AiFillStar className="text-theme" />
                                            <span className="text-sm font-medium">{exp.avg_rating ?? 0}</span>
                                        </div>
                                    </div>
                                    <p className="truncate text-sm text-gray-500 mb-1">
                                        {exp.property_address?.address_line_1 || "Location not specified"}
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-semibold text-md text-black underline">
                                            {exp.property_price?.price ?? 0}
                                        </span>{" "}
                                        {exp.property_price?.currency_code || "USD"} for 2 guests
                                    </p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default SearchExperiences;
