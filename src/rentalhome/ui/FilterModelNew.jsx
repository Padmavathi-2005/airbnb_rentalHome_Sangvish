import React, { useState } from 'react';
import FilterSection from './filter-models/FilterSelection';
import ChipSelector from './filter-models/ChipSelector';
import CheckboxGrid from './filter-models/CheckboxGrid';
import RangeSlider from './filter-models/RangeSilder';
import ToggleButtonGroup from './filter-models/ToggleButtonGroup';
import { Wifi, Tv, Car, Coffee } from 'lucide-react';
import { X, Calendar, Wind, Home, Users, DoorOpen } from 'lucide-react';
import { Droplet, Bolt } from "lucide-react";
import { Building, Hotel, User } from 'lucide-react';

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
    const [values, setValues] = useState([500, 5000]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [minValue, setMinValue] = useState(500);
    const [maxValue, setMaxValue] = useState(5000);
    const [bedrooms, setBedrooms] = useState(0);
    const [beds, setBeds] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [activeTab, setActiveTab] = useState("Popular");
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
        { icon: <Wifi size={18} />, name: 'WIFI' },
        { icon: <Tv size={18} />, name: 'TV' },
        { icon: <Car size={18} />, name: 'Free Parking' },
        { icon: <Coffee size={18} />, name: 'Kitchen' },
    ];

    return (
        <div className="w-full max-w-2xl h-[90vh] flex flex-col">
            <div className="px-4 sm:px-6 space-y-6 sm:py-6 sm:space-y-8 flex-1">

                <FilterSection title="Type of Place">
                    <ToggleButtonGroup
                        options={["any", "room", "entire"]}
                        selected={filterType}
                        onChange={setFilterType}
                    />
                </FilterSection>

                <FilterSection title="Price Range">
                    <RangeSlider min={50} max={10000} step={50} values={values} onChange={setValues} />
                </FilterSection>

                <FilterSection title="Amenities">
                    <ChipSelector
                        items={amenities}
                        selected={selectedAmenities}
                        onToggle={(idx) =>
                            setSelectedAmenities((prev) =>
                                prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
                            )
                        }
                    />
                </FilterSection>

            </div>
        </div>
    );
}

export default FilterModel;
