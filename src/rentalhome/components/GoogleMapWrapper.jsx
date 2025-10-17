// components/common/GoogleMapWrapper.jsx
import React, { useEffect, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";

export default function GoogleMapWrapper({ children, center, zoom = 13, style }) {
  const [googleReady, setGoogleReady] = useState(false);

  useEffect(() => {
    // Wait until Google Maps script is ready
    if (window.google && window.google.maps) {
      setGoogleReady(true);
    } else {
      const interval = setInterval(() => {
        if (window.google && window.google.maps) {
          setGoogleReady(true);
          clearInterval(interval);
        }
      }, 400);
      return () => clearInterval(interval);
    }
  }, []);

  if (!googleReady)
    return <div className="flex justify-center items-center h-full text-gray-500">Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={style}
      center={center}
      zoom={zoom}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      }}
    >
      {children}
    </GoogleMap>
  );
}
