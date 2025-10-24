import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setExperienceNav } from "../../../../slices/AddExperienceSlice";
import { useAuth } from "../../../../AuthContext";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { createExperience } from "../../../services/NewApi";
import { LoadScript } from "@react-google-maps/api";
import { MapPin } from "lucide-react";

const libraries = ["places"];
const getCityName = (description) => description.split(",")[0];

export default function ExperienceCity() {
  const dispatch = useDispatch();
  const { user } = useAuth(); // get authenticated user
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [selected, setSelected] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || !apiLoaded || selected) {
      setResults([]);
      return;
    }

    const autocompleteService = new window.google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(
      { input: query, types: ["(cities)"] },
      (predictions, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setResults(predictions);
          setDropdownVisible(true);
        } else {
          setResults([]);
          setDropdownVisible(false);
        }
      }
    );
  }, [query, apiLoaded, selected]);

  const handleSelect = (place) => {
    const cityName = getCityName(place.description);
    setQuery(cityName);
    setResults([]);
    setSelected(true);
    setDropdownVisible(false);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".autocomplete-container")) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleNext = async (e) => {
    e.preventDefault();
    if (!query || !user?.id) return;

    const payload = {
      map_address: query,
      host_id: user.id, // ✅ use authenticated user ID
    };

    console.log("Payload being sent to backend:", payload);

    setLoading(true);
    try {
      const response = await createExperience(payload);
      console.log("Backend response:", response);
      toast.success("Experience saved successfully!");

      // Move to "Basics" tab using Redux
      dispatch(setExperienceNav("Basics"));
    } catch (error) {
      toast.error("Failed to save experience. Try again.");
      console.error("API Error:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:w-1/2 w-full flex items-center justify-center p-6 bg-white">
      <Toaster position="top-right" />
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
        onLoad={() => setApiLoaded(true)}
        onError={() => setApiLoaded(false)}
      >
        <form
          className="w-full max-w-md space-y-6 relative autocomplete-container"
          onSubmit={handleNext}
        >
          <div>
            <label className="block font-semibold mb-2">City</label>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(false);
                }}
                placeholder="Type a city..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-theme bg-gray-50"
              />

              {query && results.length > 0 && dropdownVisible && (
                <ul className="absolute top-full left-0 w-full mt-1 border border-gray-200 rounded-lg bg-white shadow-lg z-10 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {results.slice(0, 4).map((place, index) => {
                    const city = getCityName(place.description);
                    const rest = place.description.replace(city, "");
                    return (
                      <li
                        key={place.place_id}
                        onClick={() => handleSelect(place)}
                        className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-600 ${index < 3 ? "border-b border-gray-200" : ""
                          }`}
                      >
                        <MapPin className="mr-2 text-gray-400 w-4 h-4" />
                        <span className="font-bold text-black">{city}</span>
                        <span className="ml-1 text-gray-500">{rest}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className={`px-8 py-2 rounded-full bg-theme text-white font-semibold shadow-md focus:ring-2 focus:ring-pink-200 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={!query || loading}
            >
              {loading ? "Saving..." : "Next"}
            </motion.button>
          </div>
        </form>
      </LoadScript>
    </div>
  );
}