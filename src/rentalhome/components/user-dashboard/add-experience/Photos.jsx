import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import experienceImg from "../../../images/add-experience/add-experience-1.png";
import ImageTextSection from "./ImageTextSection";

export default function Details() {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [preview, setPreview] = useState(null); // {type, src}

  // Load from localStorage (temporary)
  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("uploadedImages") || "[]");
    const storedVideos = JSON.parse(localStorage.getItem("uploadedVideos") || "[]");
    setImages(storedImages);
    setVideos(storedVideos);

    // Clear localStorage when tab or window closes
    const handleUnload = () => {
      localStorage.removeItem("uploadedImages");
      localStorage.removeItem("uploadedVideos");
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    const newImages = [...images, ...urls];
    setImages(newImages);
    localStorage.setItem("uploadedImages", JSON.stringify(newImages));
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    const newVideos = [...videos, ...urls];
    setVideos(newVideos);
    localStorage.setItem("uploadedVideos", JSON.stringify(newVideos));
  };

  const handleDelete = (type, index) => {
    if (type === "image") {
      const newImgs = images.filter((_, i) => i !== index);
      setImages(newImgs);
      localStorage.setItem("uploadedImages", JSON.stringify(newImgs));
    } else {
      const newVids = videos.filter((_, i) => i !== index);
      setVideos(newVids);
      localStorage.setItem("uploadedVideos", JSON.stringify(newVids));
    }
  };

  const handleBack = () => window.location.reload();
  const handleNext = () => window.location.reload();
  const handlePreviewClose = () => setPreview(null);

  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Left Image Section */}
      <ImageTextSection
        imageSrc={experienceImg}
        title="Add Experience Details"
        subtitle=""
        fullHeight={true}
      />

      {/* Right Form Section */}
      <div className="md:w-1/2 w-full p-6 flex flex-col gap-6 bg-gray-50">
        {/* ===== Photos Section ===== */}
        <div className="border rounded-md shadow-sm">
          <div className="bg-gray-100 px-4 py-2 border-b">
            <h2 className="font-semibold text-gray-800">Photos</h2>
          </div>

          <div className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="border p-2 rounded-md"
              />
              <span className="text-sm text-gray-500">
                (Width 1000px and Height 1200px)
              </span>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={img}
                    alt={`uploaded-${idx}`}
                    className="w-28 h-28 object-cover rounded cursor-pointer border"
                    onClick={() => setPreview({ type: "image", src: img })}
                  />
                  <button
                    onClick={() => handleDelete("image", idx)}
                    className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== Videos Section ===== */}
        <div className="border rounded-md shadow-sm">
          <div className="bg-gray-100 px-4 py-2 border-b">
            <h2 className="font-semibold text-gray-800">Videos</h2>
          </div>

          <div className="p-4">
            <input
              type="file"
              multiple
              accept="video/*"
              onChange={handleVideoUpload}
              className="border p-2 rounded-md w-full"
            />

            <div className="flex flex-wrap gap-3 mt-4">
              {videos.map((vid, idx) => (
                <div key={idx} className="relative group">
                  <video
                    src={vid}
                    muted={false} // 🔊 ensure sound
                    controls={false}
                    className="w-28 h-28 object-cover rounded cursor-pointer border"
                    onClick={() => setPreview({ type: "video", src: vid })}
                  />
                  <button
                    onClick={() => handleDelete("video", idx)}
                    className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
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

      {/* ===== Preview Modal ===== */}
      {preview && (
        <div
          className="fixed inset-0 bg-white bg-opacity-60 flex justify-center items-center backdrop-blur-sm z-50"
          onClick={handlePreviewClose}
        >
          <div
            className="relative max-w-3xl max-h-screen"
            onClick={(e) => e.stopPropagation()}
          >
            {preview.type === "image" ? (
              <img
                src={preview.src}
                alt="preview"
                className="max-w-full max-h-screen rounded"
              />
            ) : (
              <video
                src={preview.src}
                controls
                autoPlay
                className="max-w-full max-h-screen rounded"
              />
            )}
            <button
              onClick={handlePreviewClose}
              className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
