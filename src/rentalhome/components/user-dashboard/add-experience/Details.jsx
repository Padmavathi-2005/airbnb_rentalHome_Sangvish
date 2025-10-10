import React, { useState } from "react";
import experienceImg from "../../../images/add-experience/add-experience-1.png";
import ImageTextSection from "./ImageTextSection";

export default function Details() {
  const [selectedLang, setSelectedLang] = useState("en");

  const handleBack = () => {
    window.location.reload(); // placeholder
  };

  const handleNext = () => {
    window.location.reload(); // placeholder
  };

  const fields = [
    "About Place",
    "Place is great for",
    "Guest Access",
    "Interaction with Guests",
    "Other Things to Note",
    "Overview",
    "Getting Around",
  ];

  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Image Section */}
      <ImageTextSection
        imageSrc={experienceImg}
        title="Add Experience Details"
        subtitle=""
        fullHeight={true}
      />

      {/* Form Section */}
      <div className="md:w-1/2 w-full p-6 flex flex-col gap-6">
        {/* Details with language tabs */}
        <div className="flex flex-col gap-3">
          <label className="text-lg font-semibold">Details</label>
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

        {/* Textarea Fields */}
        {fields.map((field) => (
          <div key={field} className="flex flex-col">
            <label className="font-semibold">{field}</label>
            <textarea
              placeholder={`Enter ${field.toLowerCase()}`}
              className="border border-gray-300 p-2 rounded-md bg-gray-100 h-32 resize-none"
            ></textarea>
          </div>
        ))}

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
