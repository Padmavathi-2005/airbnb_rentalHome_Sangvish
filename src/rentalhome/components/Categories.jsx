import React, { useEffect, useState } from "react";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchProperties } from "../services/NewApi";
import CategoriesLoader from './skeletonloader/CategoriesLoader'

// --- Helper: remove duplicates by property_type_name ---
const getUniqueTypes = (properties) => {
  const seen = new Set();
  return properties
    .map((item) => ({
      name: item.property_type_name,
      cover_photo: item.cover_photo,
      price: item.price_per_night || 0,
    }))
    .filter((item) => {
      if (seen.has(item.name)) return false;
      seen.add(item.name);
      return true;
    });
};

function Categories() {
  const [properties, setProperties] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [loading, setLoading] = useState(true);

  // --- Responsive visible items ---
  const getVisibleItems = () => {
    if (window.innerWidth < 640) return 1; // Mobile: 1 item
    if (window.innerWidth < 1024) return 2; // Tablet: 2 items
    return 4; // Desktop: 4 items
  };

  const [visibleItems, setVisibleItems] = useState(getVisibleItems());

  // Update visible items on window resize
  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(getVisibleItems());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Fetch properties ---
  useEffect(() => {
    const payload = {
      location: "",
      min_price: 0,
      max_price: 21000,
      amenities: [],
      property_type: "",
      book_type: "",
      space_type: "",
      bedrooms: "",
      checkin: "08/05/2025",
      checkout: "08/05/2025",
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
        const propertyData = await fetchProperties(payload);
        setProperties(propertyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Derived values ---
  const uniqueTypes = getUniqueTypes(properties);

  // Clone last few items at beginning and first few at end
  const displayItems = [
    ...uniqueTypes.slice(-visibleItems),
    ...uniqueTypes,
    ...uniqueTypes.slice(0, visibleItems),
  ];

  // Start at "real" first slide (after clones)
  useEffect(() => {
    if (uniqueTypes.length > 0) setCurrent(visibleItems);
  }, [uniqueTypes.length, visibleItems]);

  // --- Controls ---
  const nextSlide = () => setCurrent((prev) => prev + 1);
  const prevSlide = () => setCurrent((prev) => prev - 1);

  // --- Handle infinite looping ---
  useEffect(() => {
    if (current === 0) {
      // Jumped to cloned start → reset to real end
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(uniqueTypes.length);
      }, 500);
    } else if (current === uniqueTypes.length + visibleItems) {
      // Jumped to cloned end → reset to real start
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(visibleItems);
      }, 500);
    } else {
      setIsTransitioning(true);
    }
  }, [current, uniqueTypes.length, visibleItems]);

  // --- UI ---
  return (
    loading ? (
      <CategoriesLoader />
    ) : (
      <section className="bg-[#F9F4F0]">
        <div className="mx-auto max-w-7xl pt-8 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Header */}
          <div className="py-4 sm:py-5">
            <span className="text-theme italic text-sm sm:text-base">Book your dream stay</span>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold">
                From city vibes to cozy retreats
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" stroke="#fff" />
                </button>
                <button
                  onClick={nextSlide}
                  className="bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" stroke="#fff" />
                </button>
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div
            className={`flex ${
              isTransitioning ? "transition-transform duration-500 ease-in-out" : ""
            }`}
            style={{
              transform: `translateX(-${(current * 100) / visibleItems}%)`,
            }}
          >
            {displayItems.map((categorie, index) => (
              <div
                key={index}
                className={`flex-none w-full sm:w-1/2 lg:w-1/4 flex flex-col items-center text-center p-2 sm:p-4`}
              >
                {/* Image */}
                <img
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full object-cover"
                  src={categorie.cover_photo}
                  alt={categorie.name}
                />

                {/* Info */}
                <div className="mt-[-16px] sm:mt-[-20px]">
                  <div className="flex justify-center">
                    <MapPin className="w-12 h-12 sm:w-14 sm:h-14 p-3 sm:p-4 bg-white rounded-full shadow-xl" />
                  </div>
                  <div className="flex items-center flex-col mt-2 gap-1 text-gray-600">
                    <span className="text-sm sm:text-base font-semibold">{categorie.name}</span>
                    <p className="text-xs sm:text-sm">
                      Starts from{" "}
                      <span className="text-theme text-sm sm:text-base font-semibold">
                        ${categorie.price}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  );
}

export default Categories;