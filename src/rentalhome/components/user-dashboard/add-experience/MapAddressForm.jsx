import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import {
  MapPin,
  Globe,
  Home,
  Building2,
  Landmark,
  Mail,
} from "lucide-react";
import FormInput from "./FormInput";
import ImageTextSection from "./ImageTextSection";
import experienceImg from "../../../images/add-experience/add-experience-1.png";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "250px",
  borderRadius: "12px",
};

export default function MapAddressPage() {
  const [formData, setFormData] = useState({
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [mapCenter, setMapCenter] = useState({ lat: 9.9252, lng: 78.1198 });
  const [markerPosition, setMarkerPosition] = useState(mapCenter);
  const [typingTimeout, setTypingTimeout] = useState(null);

 const { isLoaded } = useJsApiLoader({
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  libraries,
});


  const geocodeLatLng = useCallback(async (lat, lng) => {
    if (!window.google) return;
    const geocoder = new window.google.maps.Geocoder();
    try {
      const { results } = await geocoder.geocode({ location: { lat, lng } });
      if (results && results[0]) {
        const addressComponents = results[0].address_components;
        const get = (type) =>
          addressComponents.find((c) => c.types.includes(type))?.long_name || "";
        const streetNumber = get("street_number");
        const route = get("route");

        setFormData({
          country: get("country"),
          address1:
            [streetNumber, route].filter(Boolean).join(", ") ||
            results[0].formatted_address,
          address2: "",
          city: get("locality") || get("administrative_area_level_2"),
          state: get("administrative_area_level_1"),
          postalCode: get("postal_code"),
        });
      }
    } catch (error) {
      console.error("Geocode error:", error);
    }
  }, []);

  const geocodeAddress = useCallback(
    (address) => {
      if (!window.google) return;
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const loc = results[0].geometry.location;
          setMapCenter({ lat: loc.lat(), lng: loc.lng() });
          setMarkerPosition({ lat: loc.lat(), lng: loc.lng() });
        }
      });
    },
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(() => {
        const { country, address1, city, state, postalCode } = {
          ...formData,
          [name]: value,
        };
        const fullAddress = [address1, city, state, postalCode, country]
          .filter(Boolean)
          .join(", ");
        if (fullAddress) geocodeAddress(fullAddress);
      }, 800)
    );
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });
    setMapCenter({ lat, lng });
    geocodeLatLng(lat, lng);
  };

  const handleBack = () => window.location.reload();
  const handleNext = () => window.location.reload();

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Image Section */}
      <ImageTextSection
        imageSrc={experienceImg}
        title="Add Experience Location"
        subtitle=""
        fullHeight={false}
      />

      {/* Form Section */}
      <div className="md:w-1/2 w-full p-6 flex flex-col gap-6 h-80 md:h-[28rem] overflow-y-auto">

        <label className="text-lg font-semibold">Location Details</label>

        {/* Row 1: Country + Address1 + Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <FormInput
            label="Country"
            icon={Globe}
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter country"
          />

          <FormInput
            label="Address Line 1"
            icon={Home}
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            placeholder="Street name or number"
          />
</div>
          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={14}
              onClick={handleMapClick}
            >
              <Marker
                position={markerPosition}
                draggable
                onDragEnd={handleMapClick}
              />
            </GoogleMap>
            <p className="text-xs text-gray-500 mt-1 text-center">
              Move the pin to adjust your location
            </p>
          </div>
        

        {/* Row 2: Address2 + City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Address Line 2"
            icon={Building2}
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            placeholder="Apartment, suite, etc."
          />
          <FormInput
            label="City / Town / District"
            icon={MapPin}
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
          />
        </div>

        {/* Row 3: State + Postal Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="State / Province / Region"
            icon={Landmark}
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
          />
          <FormInput
            label="Zip / Postal Code"
            icon={Mail}
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Enter postal code"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            className="bg-gray-300 text-black px-6 py-2 rounded-md font-medium hover:bg-gray-400 transition"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-red-600 text-white px-6 py-2 rounded-md font-medium hover:bg-red-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}  