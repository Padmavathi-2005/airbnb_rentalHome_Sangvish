import { useState } from "react";

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-50"
      >
        <span>Become a host</span>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul className="py-2 text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <span className="font-medium">Help Centre</span>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <span className="font-medium">Become a host</span>
              <p className="text-xs text-gray-500">
                It’s easy to start hosting and earn extra income.
              </p>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Find a co-host
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Log in or sign up
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
