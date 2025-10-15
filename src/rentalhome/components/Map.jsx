import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api";

const defaultCenter = { lat: 13.0827, lng: 80.2707 };
const mapContainerStyle = { width: "100%", height: "100%" };

function Map({ properties = [], onMarkerClick, hoveredPropertyId, setHoveredPropertyId = () => {}}) {
  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const mapRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const colors = ["#00ACC1", "#9C27B0", "#FFC107", "#E91E63", "#2196F3"];
  const coordinates = properties
    .map((p) => {
      const addr = p.property_address || p.experience_address;
      if (addr?.latitude && addr?.longitude) {
        return {
          lat: parseFloat(addr.latitude),
          lng: parseFloat(addr.longitude),
          id: p.id,
          price:
            p.property_price?.price || p.experience_price?.price || "—",
          currency:
            p.property_price?.default_code ||
            p.experience_price?.default_code ||
            "USD",
        };
      }
      return null;
    })
    .filter(Boolean);

  const markerShadows = [
    { bg: "from-[#00ACC1] to-[#26C6DA]", shadow: "rgba(0,172,193,0.4)" },
    { bg: "from-[#9C27B0] to-[#BA68C8]", shadow: "rgba(156,39,176,0.4)" },
    { bg: "from-[#FFC107] to-[#FFD54F]", shadow: "rgba(255,193,7,0.4)" },
    { bg: "from-[#E91E63] to-[#F06292]", shadow: "rgba(233,30,99,0.4)" },
    { bg: "from-[#2196F3] to-[#64B5F6]", shadow: "rgba(33,150,243,0.4)" },
  ];
  const center = coordinates.length > 0 ? coordinates[0] : defaultCenter;

  useEffect(() => {
    if (isLoaded && map && coordinates.length) {
      const bounds = new window.google.maps.LatLngBounds();
      coordinates.forEach((c) => bounds.extend(c));
      map.fitBounds(bounds);
    }
  }, [isLoaded, map, coordinates]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={13}
      onLoad={(mapInstance) => {
        setMap(mapInstance);
        mapRef.current = mapInstance;
      }}
    >
      {coordinates.map((coord, index) => {
        const isActive = activeMarker === coord.id;
        const isHovered = hoveredPropertyId === coord.id;

        const hoverColor = colors[index % colors.length];
        const markerBg = isActive ? "red" : isHovered ? hoverColor : "white";

        return (
          <OverlayView
            key={coord.id}
            position={{ lat: coord.lat, lng: coord.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              onClick={() => setActiveMarker(coord.id)}
              onMouseEnter={() => setHoveredPropertyId?.(coord.id)}
              onMouseLeave={() => setHoveredPropertyId?.(null)}
              className={`transition-all transform cursor-pointer flex justify-center items-center`}
              style={{
                transform: isActive || isHovered ? "scale(1.1)" : "scale(1)",
                zIndex: isActive || isHovered ? 20 : 10,
              }}
            >
              <div
                className="px-4 py-[6px] rounded-full text-sm font-medium shadow-md"
                style={{
                  minWidth: "90px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  backgroundColor: markerBg,
                  boxShadow: isActive
                    ? "0 0 15px red"
                    : isHovered
                      ? `0 0 15px ${hoverColor}`
                      : "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                {coord.currency} {coord.price}
              </div>
            </div>
          </OverlayView>
        );
      })}


    </GoogleMap>
  );
}

export default Map;
