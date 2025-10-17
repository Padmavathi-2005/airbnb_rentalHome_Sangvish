// DarkMap.jsx
import React from "react";
import BaseMap from "./BaseMap";
import darkMapStyle from "./mapStyles/darkMapStyle.json";

function DarkMap() {
  const coordinates = [
    { lat: 40.7128, lng: -74.006 }, // New York
  ];

  return (
    <BaseMap
      fitToCoordinates={coordinates}
      mapOptions={{
        styles: darkMapStyle,
        disableDefaultUI: false,
      }}
    />
  );
}

export default DarkMap;
