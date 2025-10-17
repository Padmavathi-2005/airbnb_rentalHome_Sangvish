import React, { useState } from 'react';
import { X, Wifi, Tv, Car, Calendar, Wind, Coffee, Home, Users, DoorOpen } from 'lucide-react';
import { Droplet, Bolt } from "lucide-react";
import { Building, Hotel, User } from 'lucide-react';
import { getAmenitiesStepData } from '../services/NewApi';
import { getProfileDetails, updateProfile, uploadProfileImage } from '../services/NewApi';


const amenitiesData = {
  Popular: [
    { id: 1, label: "Wifi", icon: <Wifi className="w-5 h-5" /> },
    { id: 2, label: "Washing Machine", icon: <Droplet className="w-5 h-5" /> },
    { id: 3, label: "Hair Dryer", icon: <Bolt className="w-5 h-5" /> },
  ],
  Essentials: [
    { id: 4, label: "Coffee Maker", icon: <Coffee className="w-5 h-5" /> },
    { id: 5, label: "Air Conditioner", icon: <Bolt className="w-5 h-5" /> },
  ],
  Features: [
    { id: 6, label: "Gym", icon: <Droplet className="w-5 h-5" /> },
    { id: 7, label: "Pool", icon: <Droplet className="w-5 h-5" /> },
  ],
  Safety: [
    { id: 8, label: "Fire Extinguisher", icon: <Bolt className="w-5 h-5" /> },
    { id: 9, label: "First Aid Kit", icon: <Droplet className="w-5 h-5" /> },
  ],
};

function FilterModel() {
  const [filterType, setFilterType] = useState('any');
  const [minValue, setMinValue] = useState(500);
  const [maxValue, setMaxValue] = useState(5000);
  const [bedrooms, setBedrooms] = useState(0);
  const [beds, setBeds] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [activeTab, setActiveTab] = useState("Popular");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState([1]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedEquipments, setSelectedEqipments] = useState([]);
  const [FeaturesType, setFeaturesType] = useState("any");
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const featureOptions = {
    any: ["Step-free entrance", "Accessible bathroom", "Elevator access", "Wide doorways"],
    room: ["Grab bars in shower", "Roll-in shower", "Lowered bed", "Wide entrance to room"],
    entire: ["Wheelchair accessible", "Step-free property", "Accessible parking", "Accessible kitchen"],
  };

  const toggleFeatures = (idx) => {
    setSelectedFeatures((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const currentFeatures = featureOptions[FeaturesType];
  const amenities = [
    { icon: <Calendar size={18} />, name: 'Free Cancellation' },
    { icon: <Car size={18} />, name: 'Free Parking' },
    { icon: <Tv size={18} />, name: 'TV' },
    { icon: <Wifi size={18} />, name: 'WIFI' },
    { icon: <Wind size={18} />, name: 'Air Conditioning' },
    { icon: <Coffee size={18} />, name: 'Kitchen' },
  ];
  const toggleAmenity1 = (id) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };
  const bookingOptions = [
    { icon: <Home size={18} />, label: 'Instant Book', sublabel: 'Listings you can book without waiting for host approval' },
    { icon: <Users size={18} />, label: 'Self check-in', sublabel: 'Easy access to the property once you arrive' },
    { icon: <DoorOpen size={18} />, label: 'Allows Pets', sublabel: 'Bringing a service animal?' },
  ];

  const propertyTypes = [
    { name: 'House', icon: <Home size={16} /> },
    { name: 'Apartment', icon: <Building size={16} /> },
    { name: 'Guesthouse', icon: <User size={16} /> },
    { name: 'Hotel', icon: <Hotel size={16} /> },
  ];

  const hostLanguages = ['English', 'French', 'Japanese', 'Spanish'];
  const Equipments = ['Ceiling or mobile hoist'];
  const min = 50;
  const max = 10000;
  const step = 50;

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - step);
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + step);
    setMaxValue(value);
  };

  const toggleAmenity = (idx) => {
    setSelectedAmenities(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const toggleBooking = (idx) => {
    setSelectedBooking(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const togglePropertyType = (idx) => {
    setSelectedPropertyTypes(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const toggleLanguage = (idx) => {
    setSelectedLanguages(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };
  const toggleEquipments = (idx) => {
    setSelectedEqipments(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const CounterCard = ({ label, count, setCount }) => {
    return (
      <div className="flex flex-col items-center gap-3 shadow-md rounded-md p-2 border border-gray-200">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <div className="flex items-center gap-3">
          <button
            className="w-5 h-5 flex items-center bg-theme-30 justify-center rounded-full border-2 border-theme-30 text-gray-600 hover:border-gray-400"
            onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
          >
            −
          </button>
          <span className="text-base font-medium w-6 text-center">{count}</span>
          <button
            className="w-5 h-5 flex items-center bg-theme justify-center rounded-full border-2 border-theme text-white hover:border-gray-400"
            onClick={() => setCount((prev) => prev + 1)}
          >
            +
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl h-[90vh] flex flex-col">

      <div className="px-4 sm:px-6 space-y-6 sm:py-6  sm:space-y-8 flex-1">
        <div className="px-4 sm:px-6 pb-3 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold font-bold">Filters</h2>
          </div>
        </div>


        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-base">Recommended for you</p>
            <button className="text-sm text-gray-600 hover:underline">All</button>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 ">
            {amenities.map((item, id) => (
              <button
                key={id}
                onClick={() => toggleAmenity(id)}
                className={`cursor-pointer flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all text-xs sm:text-sm ${selectedAmenities.includes(id)
                  ? 'bg-theme-30'
                  : 'bg-white border border-gray-300 hover:border-gray-400'
                  }`}
              >
                <span className={`p-1 sm:p-1.5 rounded-md bg-white shadow-md
                  }`}>
                  <span className={selectedAmenities.includes(id) ? 'text-theme' : 'text-gray-600'}>
                    {item.icon}
                  </span>
                </span>
                <span className={`font-medium text-gray-700'
                  }`}>
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200"></div>

        {/* Type of place */}
        <div className="space-y-4">
          <p className="font-semibold text-base">Type of place</p>
          <div className="flex flex-col sm:flex-row gap-2 p-1 bg-theme-30 rounded-full">
            <button
              onClick={() => setFilterType('any')}
              className={`flex-1 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-full transition-colors ${filterType === 'any'
                ? 'bg-theme text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Any type
            </button>
            <button
              onClick={() => setFilterType('room')}
              className={`flex-1 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-full transition-colors ${filterType === 'room'
                ? 'bg-theme text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Room
            </button>
            <button
              onClick={() => setFilterType('entire')}
              className={`flex-1 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-full transition-colors ${filterType === 'entire'
                ? 'bg-theme text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Entire home
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200"></div>

        {/* Price Range */}
        <div className="space-y-4">
          <h3 className="font-semibold text-base">Price range</h3>
          {/* <p className="text-sm text-gray-600">Nightly prices before fees and taxes</p> */}

          <div className="relative pt-2 pb-6">
            <div className="relative w-full h-1">
              <div className="absolute top-0 bottom-0 w-full rounded-full bg-gray-300" />
              <div
                className="absolute top-0 bottom-0 rounded-full bg-theme"
                style={{
                  left: `${((minValue - min) / (max - min)) * 100}%`,
                  right: `${100 - ((maxValue - min) / (max - min)) * 100}%`,
                }}
              />
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={minValue}
                onChange={handleMinChange}
                className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-theme [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-theme [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto"
              />
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={maxValue}
                onChange={handleMaxChange}
                className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-theme [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-theme [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Minimum</label>
              <input
                type="number"
                value={minValue}
                onChange={(e) => setMinValue(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div className="flex items-end pb-2 text-gray-400">—</div>
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Maximum</label>
              <input
                type="number"
                value={maxValue}
                onChange={(e) => setMaxValue(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200"></div>

        {/* Rooms & Beds */}
        <div className="space-y-4">
          <h3 className="font-semibold text-base">Rooms and beds</h3>
          <div className="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-8 justify-center">
            <CounterCard label="Bedrooms" count={bedrooms} setCount={setBedrooms} />
            <CounterCard label="Beds" count={beds} setCount={setBeds} />
            <CounterCard label="Bathrooms" count={bathrooms} setCount={setBathrooms} />
          </div>
        </div>

        <div className="border-t border-gray-200"></div>
        {/* amenities */}
        <div className="space-y-4">
          <h2 className="font-semibold text-base">Amenities</h2>

          {/* Tabs */}
          <div className="flex flex-col sm:flex-row gap-2 p-1 bg-theme-30 rounded-full">
            {Object.keys(amenitiesData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-full transition-colors ${activeTab === tab
                  ? "bg-theme text-white"
                  : "text-gray-700"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Amenity items */}
          <div className="flex flex-wrap gap-2 sm:gap-3 shadow-md bg-theme-10 rounded-md p-4">
            {amenitiesData[activeTab].map((amenity) => (
              <button
                key={amenity.id}
                onClick={() => toggleAmenity1(amenity.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full border border-gray-300  transition ${selectedAmenities.includes(amenity.id)
                  ? "bg-white shadow-md"
                  : "bg-theme-10"
                  }`}
              >
                {amenity.icon}
                <span className="text-sm">{amenity.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200"></div>
        {/* Booking options */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-base">Booking options</p>
            <button className="text-sm text-gray-600 hover:underline">All</button>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {bookingOptions.map((option, idx) => (
              <button
                key={idx}
                onClick={() => toggleBooking(idx)}
                className={`cursor-pointer flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all text-xs sm:text-sm ${selectedBooking.includes(idx)
                  ? 'bg-theme-30'
                  : 'bg-white border border-gray-300 hover:border-gray-400'
                  }`}
              >
                <span
                  className={`p-1 sm:p-1.5 rounded-md bg-white shadow-md`}
                >
                  <span
                    className={selectedBooking.includes(idx) ? 'text-theme' : 'text-gray-600'}
                  >
                    {option.icon}
                  </span>
                </span>
                <div>
                  <p className="font-medium text-gray-700 text-sm">{option.label}</p>

                </div>
              </button>
            ))}
          </div>
        </div>


        <div className="border-t border-gray-200"></div>

        {/* Property type */}
        <div className="space-y-4">
          <h3 className="font-semibold text-base">Property type</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {propertyTypes.map((type, idx) => (
              <button
                key={idx}
                onClick={() => togglePropertyType(idx)}
                className={`cursor-pointer flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all text-xs sm:text-sm ${selectedPropertyTypes.includes(idx)
                  ? 'bg-theme-30'
                  : 'bg-white border border-gray-300 hover:border-gray-400'
                  }`}
              >
                <span className="p-1 sm:p-1.5 rounded-md bg-white shadow-md">
                  <span className={selectedPropertyTypes.includes(idx) ? 'text-theme' : 'text-gray-600'}>
                    {type.icon}
                  </span>
                </span>
                <span className="font-medium text-gray-700">{type.name}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200"></div>

        <div className="space-y-4">
          <h3 className="font-semibold text-base">Accessibility Features</h3>

          {/* Top Filter Tabs */}
          <div className="flex flex-col sm:flex-row gap-2 p-1 bg-theme-30 rounded-full">
            {["any", "room", "entire"].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setFilterType(type);
                  setSelectedFeatures([]); // reset selections when changing tab
                }}
                className={`flex-1 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-full transition-colors ${filterType === type
                  ? "bg-theme text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                {type === "any" ? "Any type" : type === "room" ? "Room" : "Entire home"}
              </button>
            ))}
          </div>

          {/* Checkbox List */}
          <div className="grid grid-cols-1 gap-3">
            {currentFeatures.map((feature, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg cursor-pointer transition-all border border-gray-200 hover:border-gray-300"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 accent-[var(--theme-color)] focus:ring-0"
                  checked={selectedFeatures.includes(idx)}
                  onChange={() => toggleFeatures(idx)}
                />
                <span>{feature}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200"></div>

        <div className="space-y-4">
          <h3 className="font-semibold text-base">Adaptive Equipment</h3>
          <div className="grid grid-cols-2 gap-3">
            {Equipments.map((lang, idx) => (
              <label
                key={idx}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg cursor-pointer transition-all`}
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 focus:ring-0 accent-[var(--theme-color)]"
                  checked={selectedEquipments.includes(idx)}
                  onChange={() => toggleEquipments(idx)}
                />
                <span>{lang}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200"></div>

        {/* Host language */}
        <div className="space-y-4">
          <h3 className="font-semibold text-base">Host language</h3>
          <div className="grid grid-cols-4 gap-3">
            {hostLanguages.map((lang, idx) => (
              <label
                key={idx}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg cursor-pointer transition-all`}
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 focus:ring-0 accent-[var(--theme-color)]"
                  checked={selectedLanguages.includes(idx)}
                  onChange={() => toggleLanguage(idx)}
                />
                <span>{lang}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 sm:px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            <button className="text-xs sm:text-sm font-medium underline">Clear all</button>
            <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800">
              Show results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterModel;