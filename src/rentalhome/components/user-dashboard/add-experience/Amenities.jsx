import React, { useState } from "react";
import experienceImg from "../../../images/add-experience/add-experience-1.png";
import ImageTextSection from "./ImageTextSection";
import CheckboxGroup from "./CheckboxGroup";

export default function Amenities() {
  const [selectedLang, setSelectedLang] = useState("en");

  // State for checkboxes
  const [selectedInclusion, setSelectedInclusion] = useState([]);
  const [selectedExclusion, setSelectedExclusion] = useState([]);

  const inclusionItems = [
    "Departure tax",
    "Entry or admission fee",
    "Entry tax",
    "Landing & facility fees",
    "National park entrance fee",
    "Parking fees",
    "Tip or gratuity",
  ];

  const exclusionItems = ["Food & drinks", "Bus fare", "Fuel surcharge", "Wifi"];

  const handleBack = () => window.location.reload();
  const handleNext = () => {
    console.log("Selected Inclusions:", selectedInclusion);
    console.log("Selected Exclusions:", selectedExclusion);
    window.location.reload();
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      <ImageTextSection
        imageSrc={experienceImg}
        title="Add Experience Details"
        subtitle=""
        fullHeight={false}
      />

      <div className="md:w-1/2 w-full p-6 flex flex-col gap-6">

        <CheckboxGroup
  title="Inclusion"
  items={inclusionItems}
  selectedItems={selectedInclusion}
  setSelectedItems={setSelectedInclusion}
/>

<CheckboxGroup
  title="Exclusion"
  items={exclusionItems}
  selectedItems={selectedExclusion}
  setSelectedItems={setSelectedExclusion}
/>

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
