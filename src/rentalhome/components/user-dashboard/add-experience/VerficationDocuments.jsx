import React, { useState } from "react";
import experienceImg from "../../../images/add-experience/add-experience-1.png";
import ImageTextSection from "./ImageTextSection";

export default function VerificationDocuments() {
    const [files, setFiles] = useState([]);
    const [previewFile, setPreviewFile] = useState(null);

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setFiles((prev) => [...prev, ...newFiles]);
    };

    const handleDelete = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleView = (file) => {
        const previewableTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "application/pdf",
            "text/plain",
        ];

        if (!previewableTypes.includes(file.type)) {
            alert(
                "Cannot preview this file in browser. Please download it to view."
            );
            return;
        }

        const fileURL = URL.createObjectURL(file);
        setPreviewFile({ name: file.name, url: fileURL, type: file.type });
    };

    const closePreview = () => {
        if (previewFile?.url) URL.revokeObjectURL(previewFile.url);
        setPreviewFile(null);
    };

    const handleBack = () => window.location.reload();
    const handleNext = () => window.location.reload();

    return (
        <div className="flex flex-col md:flex-row w-full">
            {/* Left: ImageTextSection */}
            <ImageTextSection
                imageSrc={experienceImg}
                title="Upload Verification Documents"
                subtitle="Please upload ID or proof documents for verification"
                fullHeight={false} // we will use fixed height
            />

            {/* Right: Form */}
            <div className="md:w-1/2 w-full p-6 flex flex-col gap-6">
                <h2 className="text-lg font-semibold">Verification Documents</h2>

                {/* Upload box */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-gray-50">
                    <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.txt,.pdf,.doc,.docx"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        id="fileInput"
                    />
                    <label
                        htmlFor="fileInput"
                        className="cursor-pointer bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md font-medium shadow-sm"
                    >
                        Choose File
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                        Click to select a file<br />
                        Accepted types: .jpg, .png, .jpeg, .txt, .docx, .pdf
                    </p>
                </div>

                {/* Uploaded file list */}
                {files.length > 0 && (
                    <div className="overflow-y-auto max-h-[10rem]">
                        <h3 className="font-semibold mb-2">Uploaded Files</h3>
                        <div className="flex flex-col gap-3">
                            {files.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center border border-gray-200 p-3 rounded-md bg-gray-100 shadow-sm"
                                >
                                    <button
                                        onClick={() => handleView(file)}
                                        className="text-blue-600 hover:underline text-sm text-left truncate w-2/3"
                                    >
                                        {file.name}
                                    </button>

                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="text-red-600 hover:underline text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Navigation buttons */}
                <div className="flex justify-between mt-auto pt-2">
                    <button
                        onClick={handleBack}
                        className="bg-gray-300 text-black px-6 py-2 rounded-md font-medium hover:bg-gray-400 transition"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        className="bg-pink-600 text-white px-6 py-2 rounded-md font-medium hover:bg-pink-700 transition"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* File preview modal */}
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

                        {previewFile.name.match(/\.(jpg|jpeg|png)$/i) ? (
                            <img
                                src={previewFile.url}
                                alt={previewFile.name}
                                className="max-h-[70vh] mx-auto rounded-md"
                            />
                        ) : previewFile.name.match(/\.(pdf|txt)$/i) ? (
                            <iframe
                                src={previewFile.url}
                                title={previewFile.name}
                                className="w-full h-[70vh] border rounded-md"
                            ></iframe>
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
