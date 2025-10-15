import React, { useCallback, useRef, useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const MapWithProperties = ({ properties, onMarkerClick, activeId }) => {
    const mapRef = useRef();
    const [hoveredId, setHoveredId] = useState(null);

    // Load API key from env
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const onLoad = useCallback((map) => {
        mapRef.current = map;
        const bounds = new window.google.maps.LatLngBounds();
        properties.forEach((p) => {
            if (p.property_address?.latitude && p.property_address?.longitude) {
                bounds.extend({
                    lat: parseFloat(p.property_address.latitude),
                    lng: parseFloat(p.property_address.longitude),
                });
            }
        });
        map.fitBounds(bounds);
    }, [properties]);

    if (!isLoaded) return <p>Loading map...</p>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            onLoad={onLoad}
            zoom={6}
            options={{
                disableDefaultUI: true,
                styles: [
                    {
                        featureType: "poi",
                        stylers: [{ visibility: "off" }],
                    },
                ],
            }}
        >
            {properties.map((p) => {
                const lat = parseFloat(p.property_address?.latitude);
                const lng = parseFloat(p.property_address?.longitude);
                if (!lat || !lng) return null;

                const isActive = p.id === activeId || p.id === hoveredId;

                return (
                    <MarkerF
                        key={p.id}
                        position={{ lat, lng }}
                        onClick={() => onMarkerClick(p)}
                        icon={{
                            path: "M0,0 a20,10 0 1,0 40,0 a20,10 0 1,0 -40,0",
                            fillColor: isActive ? "#ff385c" : "#ffffff",
                            fillOpacity: 1,
                            strokeWeight: 1.5,
                            strokeColor: "#888",
                            scale: 0.5,
                            labelOrigin: { x: 20, y: 10 },
                        }}
                        label={{
                            text: `$${p.property_price?.price || 0}`,
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: isActive ? "white" : "black",
                        }}
                        onMouseOver={() => setHoveredId(p.id)}
                        onMouseOut={() => setHoveredId(null)}
                    />
                );
            })}
        </GoogleMap>
    );
};

export default MapWithProperties;
