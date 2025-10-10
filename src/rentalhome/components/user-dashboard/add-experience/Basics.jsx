import React from "react";
import experienceImg from "../../../images/add-experience/add-experience-1.png";
import ImageTextSection from "./ImageTextSection";

export default function Basics() {
  const handleBack = () => {
    window.location.reload(); // placeholder
  };

  const handleNext = () => {
    window.location.reload(); // placeholder
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Image section */}
      <ImageTextSection
        imageSrc={experienceImg}
        title="Add Experience Type and Duration"
        subtitle=""
      />

      {/* Form section */}
      <div className="md:w-1/2 w-full p-6 flex flex-col gap-6">
        {/* Page Title */}
        

        {/* Row 1 - Title */}
        <div className="flex flex-col">
          <label className="font-semibold">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter experience title"
            className="border border-gray-300 p-2 rounded-md bg-gray-100"
          />
        </div>

        {/* Row 2 - Split: Type & Max People */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col">
            <label className="font-semibold">Experience Type</label>
            <select className="border border-gray-300 p-2 rounded-md bg-gray-100">
              <option value="">Select Type</option>
              <option value="Nightlife">Nightlife</option>
              <option value="Adventure">Adventure</option>
              <option value="Cultural">Cultural</option>
            </select>
          </div>

          <div className="flex-1 flex flex-col">
            <label className="font-semibold">Max People</label>
            <input
              type="number"
              placeholder="Enter count"
              className="border border-gray-300 p-2 rounded-md bg-gray-100"
            />
          </div>
        </div>

        {/* Row 3 - Duration */}
        <div className="flex flex-col">
          <label className="font-semibold">
            Duration (Example: 3 days 2 nights, 5 hours)
          </label>
          <input
            type="text"
            placeholder="Enter duration"
            className="border border-gray-300 p-2 rounded-md bg-gray-100"
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
