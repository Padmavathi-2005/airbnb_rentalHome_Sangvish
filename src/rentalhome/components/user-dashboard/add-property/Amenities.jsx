import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { addProperty } from "../../../../slices/AddPropertySlice";

const commonAmenities = [
  "Essentials",
  "Tv",
  "Cable TV",
  "Air Conditioning",
  "Heating",
  "Kitchen",
  "Internet",
  "Gym",
  "Elevator in Building",
  "Indoor Fireplace",
  "Buzzer/Wireless Intercom",
  "Elevator in Building",
  "Shampoo",
  "Wireless Internet",
  "Hot Tub",
  "Washer",
  "Pool",
  "Dryer",
  "Breakfast",
  "Free Parking on Premises",
  "Family/Kid Friendly",
  "Smoking Allowed",
  "Suitable for Events",
  "Pets Allowed",
  "Pets live on this property",
  "Wheelchair Accessible",
];

const safetyAmenities = [
  "Smoke Detector",
  "Carbon Monoxide Detector",
  "Pets Allowed",
  "Safety Card",
  "Fire Extinguisher",
];

export default function Amenities({ setNav }) {
  const [aminitiesCommon, setAminitiesCommon] = useState([]);
  const [aminitiessafety, setAminitiessafety] = useState([]);
  const overAll = [
    { commonAmenities: aminitiesCommon },
    { safetyAmenities: aminitiessafety },
  ];
  const dispatch = useDispatch();
  const propertyStore = useSelector((state) => state.addProperty);
  // console.log("datas from aminities",propertyStore );
  console.log("aminites from aminities", aminitiesCommon);

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
                onChange={(e) => setAminitiesCommon(e.target.value)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span>{item}</span>
            </motion.label>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  function SafetyAmenityGrid({ items }) {
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
              />
              <span>{item}</span>
            </motion.label>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto min-h-screen py-5 flex flex-col md:flex-row md:items-center gap-4 bg-white">
      {/* Image section */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="md:w-2/5 w-full h-full flex items-center justify-center rounded-2xl overflow-hidden shadow-sm "
      >
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="Listing preview"
          className="object-cover h-[680px] rounded-2xl"
        />
      </motion.div>
      {/* Form section */}
      <div>
        <div className="bg-white rounded-2xl mx-auto p-6">
          <div className="font-bold text-lg mb-2">Common Amenities</div>
          <AmenityGrid items={commonAmenities} />
          <div className="border-t border-gray-200 my-6" />
          <div className="font-bold text-lg mb-2">Safety Amenities</div>
          <SafetyAmenityGrid items={safetyAmenities} />
        </div>
        <div className="flex justify-between gap-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="border border-gray-400 px-6 py-2 rounded-full bg-white font-semibold transition"
            type="button"
          >
            Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            className="px-7 py-2 rounded-full bg-theme text-white font-semibold shadow-md focus:ring-2 focus:ring-pink-200 transition"
            type="submit"
            // onClick={setNav("Amenities")}
          >
            Next
          </motion.button>
        </div>
      </div>
    </div>
  );
}
