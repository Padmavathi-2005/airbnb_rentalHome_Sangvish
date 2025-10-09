import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { addProperty } from "../../../../slices/AddPropertySlice";

const commonAmenities = [
  "Essentials", "Tv", "Cable TV", "Air Conditioning", "Heating", "Kitchen",
  "Internet", "Gym", "Elevator in Building", "Indoor Fireplace",
  "Buzzer/Wireless Intercom", "Shampoo", "Wireless Internet", "Hot Tub",
  "Washer", "Pool", "Dryer", "Breakfast", "Free Parking on Premises",
  "Family/Kid Friendly", "Smoking Allowed", "Suitable for Events",
  "Pets Allowed", "Pets live on this property", "Wheelchair Accessible"
];

export default function Amenities({ setNav }) {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const dispatch = useDispatch();
  const propertyStore = useSelector(state => state.addProperty);

  // Toggle a single amenity in the selectedAmenities array
  const handleToggleAmenity = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  // Render the grid of checkboxes
  function AmenityGrid({ items }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3 mt-4">
        <AnimatePresence>
          {items.map((item, idx) => (
            <motion.label
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, delay: idx * 0.025 }}
              className="flex items-center gap-2 cursor-pointer text-gray-800"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={selectedAmenities.includes(item)}
                onChange={() => handleToggleAmenity(item)}
              />
              <span>{item}</span>
            </motion.label>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  // Handle submitting the selected amenities
  const handleAmenitiesSubmit = (e) => {
    e.preventDefault();
    // Dispatch the selected amenities array
    dispatch(addProperty({ commonAmenities: selectedAmenities }));
    // Optional: navigate to next step or give feedback
    setNav(prev => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto min-h-screen py-5 flex flex-col md:flex-row md:items-center gap-4 bg-white">
      <form onSubmit={handleAmenitiesSubmit} className="w-full">
        <div className="bg-white rounded-2xl mx-auto p-6">
          <div className="font-bold text-lg mb-2">Common Amenities</div>
          <AmenityGrid items={commonAmenities} />
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
