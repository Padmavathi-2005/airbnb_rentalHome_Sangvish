import React, { useRef, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const BaseMap = ({
  center,
  marker,
  onMapClick,
  onMarkerDrag,
  mapOptions = {},
  containerStyle = {
    width: "100%",
    height: "250px",
    borderRadius: "12px",
  },
  zoom = 14,
  libraries = ["places"],
}) => {
  const mapRef = useRef(null);

  // ✅ Load Google Maps script safely
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // ✅ Auto-fit marker if needed once map & Google are ready
  useEffect(() => {
    if (isLoaded && mapRef.current && marker && window.google) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(marker);
      mapRef.current.fitBounds(bounds);
    }
  }, [isLoaded, marker]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      onLoad={(mapInstance) => (mapRef.current = mapInstance)}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        styles: mapOptions.styles || [],
        gestureHandling: "greedy", // 🖱 smoother scroll/drag
        ...mapOptions,
      }}
      onClick={(e) => {
        if (onMapClick && window.google) onMapClick(e);
      }}
    >
      {marker && (
        <Marker
          position={marker}
          draggable
          onDragEnd={(e) => {
            if (onMarkerDrag && window.google) onMarkerDrag(e);
          }}
        />
      )}
    </GoogleMap>
  );
};

export default BaseMap;
