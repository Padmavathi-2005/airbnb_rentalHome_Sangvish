import React from "react";

export default function ConfirmModal({ isOpen, onClose, onConfirm, message, title = "Confirm Action" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-around">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
