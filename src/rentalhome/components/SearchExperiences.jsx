import React, { useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

function SearchExperiences({ location, checkIn, checkOut, expProperties, setLatitude, setLongitude }) {
    const filteredExperiences = expProperties.filter((exp) =>
        exp.experience_address?.address_line_1
            ?.toLowerCase()
            .includes(location?.toLowerCase())
    );

    const searchLatitude = filteredExperiences.map((exp) => exp.experience_address.latitude);
    const searchLongitude = filteredExperiences.map((exp) => exp.experience_address.longitude);

    useEffect(() => {
        setLatitude(searchLatitude);
        setLongitude(searchLongitude);
    }, []);

    return (
        <div className="w-full px-2 md:px-4 lg:px-6">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {filteredExperiences.map((exp) => (
                    <Link
                        key={exp.id}
                        to={`/experience/${exp.id}/${exp.slug}`}
                        state={{ experience: exp }}
                    >
                        <div className="cursor-pointer bg-white shadow-[0px_6px_35px_0px_rgba(178,178,178,0.25)] border border-gray-200 relative rounded-3xl overflow-hidden transition hover:scale-105 duration-300">
                            {/* -------- Experience Image Section -------- */}
                            <div className="relative p-2">
                                <img
                                    src={exp.cover_photo}
                                    alt={exp.name}
                                    className="w-full h-40 sm:h-44 md:h-48 lg:h-52 object-cover rounded-[20px_20px_60px_20px]"
                                />
                                <span className="absolute top-4 right-4 bg-white/70 backdrop-blur text-xs font-semibold px-2 py-1 rounded-md shadow">
                                    Top Experience
                                </span>
                            </div>

                            {/* -------- Experience Details Section -------- */}
                            <div className="py-3 px-3 text-sm font-medium text-gray-600">
                                {/* Title & Rating */}
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="text-sm font-semibold truncate">{exp.name}</h3>
                                    <div className="flex items-center space-x-1">
                                        <AiFillStar className="text-theme" />
                                        <span className="text-sm font-medium">
                                            {exp.avg_rating}
                                        </span>
                                    </div>
                                </div>

                                {/* Address */}
                                <p className="truncate text-sm text-gray-500 mb-1">
                                    {exp.experience_address.address_line_1}
                                </p>

                                {/* Duration or Category */}
                                <p className="text-sm mb-1">
                                    {exp.duration
                                        ? `${exp.duration} hours`
                                        : exp.category || "Unique Experience"}
                                </p>

                                {/* Price */}
                                <p className="text-sm">
                                    <span className="font-semibold text-md text-black underline">
                                        {exp.experience_price.price}
                                    </span>{" "}
                                    {exp.experience_price.default_code} per person
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default SearchExperiences;
