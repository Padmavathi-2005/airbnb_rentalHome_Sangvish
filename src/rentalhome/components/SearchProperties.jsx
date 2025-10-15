import React, { useEffect, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

function SearchProperties({
  location,
  checkIn,
  checkOut,
  properties,
  setLatitude,
  setLongitude,
  mapView = false,
  activePropertyId,
  setActivePropertyId,
  hoveredPropertyId,
  setHoveredPropertyId,
}) {
  const cardRefs = useRef({});

  const filteredProperties = properties.filter((property) =>
    property.property_address.address_line_1
      ?.toLowerCase()
      .includes(location?.toLowerCase())
  );

  const searchLatitude = filteredProperties.map((p) => p.property_address.latitude);
  const searchLongitude = filteredProperties.map((p) => p.property_address.longitude);

  // useEffect(() => {
  //   if (activePropertyId && cardRefs.current[activePropertyId]) {
  //     cardRefs.current[activePropertyId].scrollIntoView({
  //       behavior: "smooth",
  //       block: "nearest", // better for bottom/top
  //     });
  //   }
  // }, [activePropertyId]);
  useEffect(() => {
    if (!activePropertyId) return;
    const card = cardRefs.current[activePropertyId];
    if (!card) return;

    card.scrollIntoView({
      behavior: "smooth",
      block: "nerest",
    });
  }, [activePropertyId]);
  //scroll
  useEffect(() => {
    if (!hoveredPropertyId) return;
    const card = cardRefs.current[hoveredPropertyId];
    if (!card) return;

    const timer = setTimeout(() => {
      card.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 400); // delay in ms (e.g., 200ms = 0.2s)

    return () => clearTimeout(timer);

  }, [hoveredPropertyId]);

  // useEffect(() => {
  //   if (activePropertyId && cardRefs.current[activePropertyId]) {
  //     const card = cardRefs.current[activePropertyId];
  //     card.scrollIntoView({ behavior: "smooth", block: "center" });

  //     // temporary highlight animation
  //     card.style.transition = "box-shadow 0.3s ease";
  //     card.style.boxShadow = "0 0 25px red";
  //     setTimeout(() => {
  //       card.style.boxShadow = "";
  //     }, 1000);
  //   }
  // }, [activePropertyId]);

  useEffect(() => {
    setLatitude(searchLatitude);
    setLongitude(searchLongitude);
  }, []);

  return (
    <div className="w-full px-3 md:px-6 lg:px-8">
      <div
        className={`grid gap-4 sm:gap-5 lg:gap-6 ${mapView
          ? "grid-cols-1 sm:grid-cols-2"
          : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          }`}
      >
        {filteredProperties.map((property, index) => {
          const isActive = activePropertyId === property.id;
          const isHovered = hoveredPropertyId === property.id;

          return (
            <Link
              key={property.id}
              to={`/property/${property.id}/${property.slug}`}
              state={{ property }}
            >
              <div
                ref={(el) => (cardRefs.current[property.id] = el)}
                onMouseEnter={() => setHoveredPropertyId?.(property.id)}
                onMouseLeave={() => setHoveredPropertyId?.(null)}
                onClick={() => setActivePropertyId?.(property.id)}
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
                    src={property.cover_photo}
                    alt={property.name}
                    className={`w-full object-cover rounded-[20px_20px_60px_20px] ${mapView ? "h-44 sm:h-48" : "h-40 md:h-44 lg:h-48"
                      }`}
                  />
                  <span className="absolute top-4 right-4 bg-white/70 backdrop-blur text-xs font-semibold px-2 py-1 rounded-md shadow">
                    Guest favourite
                  </span>
                </div>

                <div className="py-3 px-3 text-sm font-medium text-gray-600">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-semibold truncate">{property.name}</h3>
                    <div className="flex items-center space-x-1">
                      <AiFillStar className="text-theme" />
                      <span className="text-sm font-medium">{property.avg_rating}</span>
                    </div>
                  </div>
                  <p className="truncate text-sm text-gray-500 mb-1">
                    {property.property_address.address_line_1}
                  </p>
                  <p className="text-sm mb-1">{property.bathrooms} beds</p>
                  <p className="text-sm">
                    <span className="font-semibold text-md text-black underline">
                      {property.property_price.price}
                    </span>{" "}
                    {property.property_price.default_code} for 2 nights
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

export default SearchProperties;
