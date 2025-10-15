import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import SearchProperties from "../components/SearchProperties";
import SearchExperiences from "../components/SearchExperiences";
import Map from "../components/Map";
import { fetchProperties, fetchExpProperties } from "../services/NewApi";
import FilterModel from "../ui/FilterModel";
import Model from "../ui/Model";
import RentalNavbar from '../components/RentalNavbar';

const SearchPage = () => {
  const { state } = useLocation();
  const location = state?.location || "";
  const checkIn = state?.checkIn || "";
  const checkOut = state?.checkOut || "";
  const type = state?.type || "property"; // 👈 detect redirect type

  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [expProperties, setExpProperties] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [activePropertyId, setActivePropertyId] = useState(null);
  const [hoveredPropertyId, setHoveredPropertyId] = useState(null);


  const colors = ["#00ACC1", "#9C27B0", "#FFC107", "#E91E63", "#2196F3"];

  // Toggle between list or map view
  const [viewMode, setViewMode] = useState("list");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const payload = {
      location,
      min_price: 0,
      max_price: 21000,
      amenities: [],
      property_type: "",
      book_type: "",
      space_type: "",
      bedrooms: "",
      checkin: checkIn || "08/05/2025",
      checkout: checkOut || "08/05/2025",
      guest: "",
      map_details: "",
      type: "",
      pets: 0,
      checkenable: 0,
      recommended: 0,
      item: 16,
    };

    const fetchData = async () => {
      try {
        const [propertyData, expPropertyData] = await Promise.all([
          fetchProperties(payload),
          fetchExpProperties(payload),
        ]);

        setProperties(propertyData);
        setExpProperties(expPropertyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location, checkIn, checkOut]);

  // Decide what data to show based on type
  const isExperience = type === "experience";
  const currentList = isExperience ? expProperties : properties;

  return (
    <>
      <RentalNavbar />
      <section className="pt-[100px] md:pt-[50px] pb-[100px] px-4">
        <div className="mx-auto max-w-7xl">
          {/* Top buttons */}
          <div className="mb-6 flex justify-end gap-3">
            <div className="flex rounded-full bg-neutral-100 p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${viewMode === "list"
                  ? "bg-theme shadow text-white"
                  : "text-neutral-600 hover:text-neutral-900"
                  }`}
              >
                {isExperience ? "Experiences" : "Properties"}
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${viewMode === "map"
                  ? "bg-theme shadow text-white"
                  : "text-neutral-600 hover:text-neutral-900"
                  }`}
              >
                Map
              </button>
            </div>

            <div className="flex items-center justify-center">
              <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-theme text-white rounded-full hover:bg-gray-100 hover:text-black"
              >
                Filter
              </button>
              <Model isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <FilterModel />
              </Model>
            </div>
          </div>

          {/* View Modes */}
          {viewMode === "list" ? (
            <div>
              {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : isExperience ? (
                <SearchExperiences
                  location={location}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  experiences={currentList} // instead of expProperties
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  mapView={true}
                  activeExperienceId={activePropertyId} // optional sync with map
                  setActiveExperienceId={setActivePropertyId} // optional sync with map
                  hoveredExperienceId={hoveredPropertyId}
                  setHoveredExperienceId={setHoveredPropertyId}
                />

              ) : (
                <SearchProperties
                  location={location}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  properties={currentList}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  activePropertyId={activePropertyId}
                  hoveredPropertyId={hoveredPropertyId}
                  setHoveredPropertyId={setHoveredPropertyId}
                  setActivePropertyId={setActivePropertyId}
                />
              )}
            </div>
          ) : (
            /* Map View */
            <div className="flex flex-col md:flex-row gap-4">
              {/* Property List */}
              <div className="md:w-1/2 overflow-visible md:overflow-y-auto md:max-h-[calc(100vh-180px)] p-2">
                {isExperience ? (
                  <SearchExperiences
                    location={location}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    experiences={currentList} // instead of expProperties
                    setLatitude={setLatitude}
                    setLongitude={setLongitude}
                    mapView={true}
                    activeExperienceId={activePropertyId} // optional sync with map
                    setActiveExperienceId={setActivePropertyId} // optional sync with map
                    hoveredExperienceId={hoveredPropertyId}
                    setHoveredExperienceId={setHoveredPropertyId}
                  />

                ) : (
                  <SearchProperties
                    location={location}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    properties={currentList}
                    setLatitude={setLatitude}
                    setLongitude={setLongitude}
                    mapView={true}
                    activePropertyId={activePropertyId}
                    setActivePropertyId={setActivePropertyId}
                    hoveredPropertyId={hoveredPropertyId}
                    setHoveredPropertyId={setHoveredPropertyId}
                  />
                )}
              </div>

              {/* Map */}

              <div className="md:w-1/2 h-[300px] md:h-[calc(100vh-180px)] rounded-lg overflow-hidden shadow-md">
                <Map
                  properties={currentList}
                  activePropertyId={activePropertyId}
                  onMarkerClick={setActivePropertyId}
                  hoveredPropertyId={hoveredPropertyId}
                  setHoveredPropertyId={setHoveredPropertyId}
                />
              </div>
            </div>
          )}


        </div>
      </section>
    </>
  );

};

export default SearchPage;
