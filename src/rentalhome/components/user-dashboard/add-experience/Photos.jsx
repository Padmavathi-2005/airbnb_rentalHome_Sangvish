import React, { useState } from "react";
import experienceImg from "../../../images/add-experience/add-experience-1.png";
import ImageTextSection from "./ImageTextSection";

export default function Photos() {
  const [photoFiles, setPhotoFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);

  const handleFileChange = (e, type) => {
    const newFiles = Array.from(e.target.files);
    if (type === "photo") setPhotoFiles((prev) => [...prev, ...newFiles]);
    else setVideoFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDelete = (index, type) => {
    if (type === "photo") setPhotoFiles((prev) => prev.filter((_, i) => i !== index));
    else setVideoFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleView = (file) => {
    const previewableTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "video/mp4",
      "video/webm",
    ];

    if (!previewableTypes.includes(file.type)) {
      alert("Cannot preview this file in browser. Please download it to view.");
      return;
    }

    const fileURL = URL.createObjectURL(file);
    setPreviewFile({ name: file.name, url: fileURL, type: file.type });
  };

  const closePreview = () => {
    if (previewFile?.url) URL.revokeObjectURL(previewFile.url);
    setPreviewFile(null);
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Left column: ImageTextSection */}
      <ImageTextSection
        imageSrc={experienceImg}
        title="Upload Your Media"
        subtitle="Add photos and videos for your profile"
        fullHeight={false} // uses fixed height h-80 md:h-[28rem]
      />

      {/* Right column: Form with 2 scrollable sections */}
      <div className="md:w-1/2 w-full p-6 flex flex-col gap-6 overflow-y-auto h-80 md:h-[28rem] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">

        {/* Photos Upload Section */}
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col flex-1 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2">Upload Photos</h2>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center bg-gray-50 mb-2">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              multiple
              onChange={(e) => handleFileChange(e, "photo")}
              className="hidden"
              id="photoInput"
            />
            <label
              htmlFor="photoInput"
              className="cursor-pointer bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md font-medium shadow-sm"
            >
              Choose Photos
            </label>
            <p className="text-sm text-gray-500 mt-2">
              Accepted types: .jpg, .jpeg, .png
            </p>
          </div>

          {/* Scrollable file list */}
          {photoFiles.length > 0 && (
            <div className="flex flex-col gap-2">
              {photoFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border border-gray-200 p-2 rounded-md bg-gray-100 shadow-sm"
                >
                  <button
                    onClick={() => handleView(file)}
                    className="text-blue-600 hover:underline text-sm truncate w-2/3 text-left"
                  >
                    {file.name}
                  </button>
                  <button
                    onClick={() => handleDelete(index, "photo")}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Videos Upload Section */}
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col flex-1 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2">Upload Videos</h2>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center bg-gray-50 mb-2">
            <input
              type="file"
              accept=".mp4,.webm"
              multiple
              onChange={(e) => handleFileChange(e, "video")}
              className="hidden"
              id="videoInput"
            />
            <label
              htmlFor="videoInput"
              className="cursor-pointer bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md font-medium shadow-sm"
            >
              Choose Videos
            </label>
            <p className="text-sm text-gray-500 mt-2">
              Accepted types: .mp4, .webm
            </p>
          </div>

          {/* Scrollable file list */}
          {videoFiles.length > 0 && (
            <div className="flex flex-col gap-2">
              {videoFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border border-gray-200 p-2 rounded-md bg-gray-100 shadow-sm"
                >
                  <button
                    onClick={() => handleView(file)}
                    className="text-blue-600 hover:underline text-sm truncate w-2/3 text-left"
                  >
                    {file.name}
                  </button>
                  <button
                    onClick={() => handleDelete(index, "video")}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-11/12 md:w-2/3 lg:w-1/2 shadow-lg relative">
            <button
              onClick={closePreview}
              className="absolute top-2 right-3 text-gray-600 text-xl font-bold hover:text-black"
            >
              ×
            </button>

            <h3 className="font-semibold mb-3">{previewFile.name}</h3>

            {previewFile.type.startsWith("image") ? (
              <img
                src={previewFile.url}
                alt={previewFile.name}
                className="max-h-[70vh] mx-auto rounded-md"
              />
            ) : previewFile.type.startsWith("video") ? (
              <video
                src={previewFile.url}
                controls
                className="w-full max-h-[70vh] rounded-md"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-[40vh] text-center">
                <p className="text-gray-700 mb-4">
                  This file type can’t be previewed directly.
                </p>
                <a
                  href={previewFile.url}
                  download={previewFile.name}
                  className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 font-medium"
                >
                  Download File
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
