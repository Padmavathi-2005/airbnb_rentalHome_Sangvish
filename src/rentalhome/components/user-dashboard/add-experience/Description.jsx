import React, { useState } from "react";
import experienceImg from "../../../images/add-experience/add-experience-1.png";
import ImageTextSection from "./ImageTextSection";

export default function TypeDuration() {
  const handleBack = () => {
    window.location.reload(); // placeholder
  };
  const [selectedLang, setSelectedLang] = useState("en");
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
      {/* Form section */}
{/* Form section */}
<div className="md:w-1/2 w-full p-6 flex flex-col gap-6">
  {/* Description with language tabs */}
  <div className="flex flex-col gap-3">
    <label className="text-lg font-semibold">Description</label>

    <div className="flex gap-2">
      {["en", "ar", "fr", "pt", "es"].map((lang) => (
        <button
          key={lang}
          onClick={() => setSelectedLang(lang)}
          className={`px-3 py-1 rounded-md border border-gray-300 font-medium text-sm transition
            ${
              selectedLang === lang
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
        >
          {lang}
        </button>
      ))}
    </div>
  </div>

  {/* Listing Name */}
  <div className="flex flex-col">
    <label className="font-semibold">Listing Name</label>
    <input
      type="text"
      placeholder="Enter listing name"
      className="border border-gray-300 p-2 rounded-md bg-gray-100"
    />
  </div>

  {/* Summary */}
  <div className="flex flex-col">
    <label className="font-semibold">Summary</label>
    <textarea
      placeholder="Enter summary"
      className="border border-gray-300 p-2 rounded-md bg-gray-100 h-32 resize-none"
    ></textarea>
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
