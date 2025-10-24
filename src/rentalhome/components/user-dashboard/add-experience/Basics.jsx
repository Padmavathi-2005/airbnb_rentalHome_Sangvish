import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setExperienceNav } from "../../../../slices/AddExperienceSlice";
import { toast, Toaster } from "react-hot-toast";
import { updateBasicsStep } from "../../../services/NewApi"; // your API
import experienceImg from "../../../images/add-experience/add-experience-2.png";
import ImageTextSection from "./ImageTextSection";
import { useAuth } from "../../../../AuthContext";

export default function Basics({ propertyId }) {
  const dispatch = useDispatch();
  const { user } = useAuth(); // get logged-in user id

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [maxPeople, setMaxPeople] = useState(1);
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    dispatch(setExperienceNav("City")); // Go back to City tab
  };

  const handleNext = async () => {
    if (!title.trim()) {
      toast.error("Title is required"); // validate
      return;
    }

    if (!propertyId || !user?.id) {
      toast.error("User or property missing");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title,
        type,
        max_people: maxPeople,
        duration,
        host_id: user.id, // pass user id as host_id
      };

      const response = await updateBasicsStep(propertyId, payload);
      console.log("Basics saved:", response);

      toast.success("Basics saved successfully!");
      dispatch(setExperienceNav("Description")); // move to next tab
    } catch (err) {
      console.error("Failed to save basics:", err);
      toast.error("Failed to save basics.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      <Toaster position="top-right" />

      {/* Image section */}
      <ImageTextSection
        imageSrc={experienceImg}
        title="Add Experience Type and Duration"
        subtitle=""
      />

      {/* Form section */}
      <div className="md:w-1/2 w-full p-6 flex flex-col gap-6">
        {/* Title */}
        <div className="flex flex-col">
          <label className="font-semibold">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter experience title"
            className="border border-gray-300 p-2 rounded-md bg-gray-100"
          />
        </div>

        {/* Type & Max People */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col">
            <label className="font-semibold">Experience Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-gray-300 p-2 rounded-md bg-gray-100"
            >
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
              value={maxPeople}
              onChange={(e) => setMaxPeople(e.target.value)}
              placeholder="Enter count"
              className="border border-gray-300 p-2 rounded-md bg-gray-100"
              min={1}
            />
          </div>
        </div>

        {/* Duration */}
        <div className="flex flex-col">
          <label className="font-semibold">
            Duration (Example: 3 days 2 nights, 5 hours)
          </label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
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
            disabled={loading}
            className="bg-red-600 text-white px-6 py-2 rounded-md font-medium hover:bg-red-700 transition"
          >
            {loading ? "Saving..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
