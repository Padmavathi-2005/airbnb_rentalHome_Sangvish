// PropertyMap.jsx
import React, { useState } from "react";
import { OverlayView } from "@react-google-maps/api";
import BaseMap from "./BaseMap";

function PropertyMap({
  properties = [],
  hoveredPropertyId,
  setHoveredPropertyId = () => {},
  activePropertyId,
  setActivePropertyId = () => {},
}) {
  const [activeMarker, setActiveMarker] = useState(null);

  const coordinates = properties
    .map((p) => {
      const addr = p.property_address || p.experience_address;
      if (addr?.latitude && addr?.longitude) {
        return {
          lat: parseFloat(addr.latitude),
          lng: parseFloat(addr.longitude),
          id: p.id,
          price: p.property_price?.price || p.experience_price?.price || "—",
          currency:
            p.property_price?.default_code ||
            p.experience_price?.default_code ||
            "USD",
        };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <BaseMap
      fitToCoordinates={coordinates}
      mapOptions={{
        styles: [
          // You can import custom JSON styles here
          {
            featureType: "poi",
            stylers: [{ visibility: "off" }],
          },
        ],
        disableDefaultUI: true,
      }}
    >
      {coordinates.map((coord) => {
        const isActive = activeMarker === coord.id;
        const isHovered = hoveredPropertyId === coord.id;

        return (
          <OverlayView
            key={coord.id}
            position={{ lat: coord.lat, lng: coord.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              onClick={() => {
                setActiveMarker(coord.id);
                setActivePropertyId?.(coord.id);
              }}
              onMouseEnter={() => setHoveredPropertyId?.(coord.id)}
              onMouseLeave={() => setHoveredPropertyId?.(null)}
              className="transition-all transform cursor-pointer flex justify-center items-center"
              style={{
                transform: isActive || isHovered ? "scale(1.05)" : "scale(1)",
                zIndex: isActive || isHovered ? 20 : 10,
              }}
            >
              <div
                className={`px-4 py-[6px] rounded-full text-sm font-medium shadow-md ${
                  isActive || isHovered
                    ? "bg-theme-50 text-white"
                    : "bg-white"
                }`}
              >
                {coord.currency} {coord.price}
              </div>
            </div>
          </OverlayView>
        );
      })}
    </BaseMap>
  );
}

export default PropertyMap;
