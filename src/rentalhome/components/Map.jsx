import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";


const defaultCenter = {
  lat: 13.0827,
  lng: 80.2707,
};

function Map({ latitude, longitude ,height}) {
  const containerStyle = {
  width: "100%",
  height: `${height}`,
};

  let coordinates = [];

  // Case 1: Both latitude & longitude are arrays
  if (Array.isArray(latitude) && Array.isArray(longitude)) {
    coordinates = latitude.map((lat, index) => ({
      lat: parseFloat(lat),
      lng: parseFloat(longitude[index]),
    }));
  }
  // Case 2: Single value (string or number)
  else if (latitude && longitude) {
    coordinates = [
      {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      },
    ];
  }

  // Center → use first coordinate or default
  const center = coordinates.length > 0 ? coordinates[0] : defaultCenter;

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {/* Render markers */}
        {coordinates.map((coord, index) => (
          <Marker key={index} position={coord} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
