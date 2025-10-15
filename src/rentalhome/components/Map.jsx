import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api";

const mapContainerStyle = { width: "100%", height: "100%" };

function Map({ properties = [], onMarkerClick, hoveredPropertyId, setHoveredPropertyId = () => { }, activePropertyId, setActivePropertyId = () => { }, }) {
  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const mapRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
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

  useEffect(() => {
    if (isLoaded && map && coordinates.length) {
      if (!mapRef.current.boundsSet) {
        const bounds = new window.google.maps.LatLngBounds();
        coordinates.forEach((c) => bounds.extend(c));
        map.fitBounds(bounds);
        mapRef.current.boundsSet = true; // mark that bounds are set
      }
    }
  }, [isLoaded, map, coordinates]);


  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      onLoad={(mapInstance) => {
        setMap(mapInstance);
        mapRef.current = mapInstance;
      }}
    >
      {coordinates.map((coord, index) => {
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
                mapRef.current?.panTo({ lat: coord.lat, lng: coord.lng });
              }}
              onMouseEnter={() => setHoveredPropertyId?.(coord.id)}
              onMouseLeave={() => setHoveredPropertyId?.(null)}
              className="transition-all transform cursor-pointer flex justify-center items-center"
              style={{
                transform: isActive || isHovered ? "scale(1.05)" : "scale(1)", // subtle zoom
                zIndex: isActive || isHovered ? 20 : 10,
              }}
            >
              <div
                className={`px-4 py-[6px] rounded-full text-sm font-medium shadow-md ${isActive || isHovered ? "bg-theme-50 text-white" : "bg-white"
                  }`}
                style={{
                  minWidth: "90px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  boxShadow: isActive || isHovered
                    ? "0 2px 8px rgba(0,0,0,0.1)" // subtle gray shadow
                    : "0 1px 4px rgba(0,0,0,0.05)",
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
