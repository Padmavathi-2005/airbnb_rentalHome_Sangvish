import React from "react";

function SinglepageSkeleton() {
  return (
    <div className="animate-pulse max-w-7xl mx-auto bg-white pt-20 pb-10 px-4">
      {/* Header */}
      <div className="h-10 bg-gray-200 w-1/3 mb-6 rounded"></div>

      {/* Title and price */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 bg-gray-200 w-2/4 rounded"></div>
        <div className="h-6 bg-gray-200 w-20 rounded"></div>
      </div>
      <div className="h-10 bg-gray-200 w-28 mb-6 rounded"></div>

      {/* Image Carousel */}
      <div className="flex space-x-4 overflow-hidden mb-6">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <div key={i} className="h-48 w-64 bg-gray-200 rounded-xl"></div>
          ))}
      </div>

      {/* Property details */}
      <div className="h-5 bg-gray-200 w-3/4 mb-3 rounded"></div>
      <div className="h-5 bg-gray-200 w-1/4 mb-6 rounded"></div>

      {/* Host Info */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
        <div>
          <div className="h-4 bg-gray-200 w-32 mb-2 rounded"></div>
          <div className="h-4 bg-gray-200 w-20 rounded"></div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {Array(3)
          .fill("")
          .map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
          ))}
      </div>

      {/* Map */}
      <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>

      {/* Footer links */}
      <div className="grid grid-cols-4 gap-6">
        {Array(12)
          .fill("")
          .map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 w-20 rounded"></div>
          ))}
      </div>
    </div>
  );
}

export default SinglepageSkeleton;
