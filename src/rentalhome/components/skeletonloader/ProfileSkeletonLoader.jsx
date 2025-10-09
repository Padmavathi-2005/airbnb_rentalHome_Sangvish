import React from "react";

const ProfileSkeletonLoader = () => {
  return (
    <div className="w-3/4 mx-auto bg-white shadow-[0px_6px_20px_0px_#31313121] p-6 rounded-4xl space-y-7">
      {/* Skeleton Header */}
      <div className="mb-4">
        <div className="h-6 w-40 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 w-72 bg-gray-200 rounded"></div>
      </div>

      {/* Skeleton Avatar & Button */}
      <div className="flex items-center mb-8">
        <div>
          <div className="w-24 h-24 bg-gray-300 rounded-full mb-3"></div>
          <div className="w-32 h-7 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Skeleton Form Fields */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {[...Array(8)].map((_, idx) => (
          <div key={idx}>
            <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
            <div className="h-9 w-full bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Skeleton Icons Row */}
      <div className="mb-8">
        <div className="h-4 w-56 bg-gray-200 rounded mb-2"></div>
        <div className="flex gap-6">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="w-16 h-16 bg-gray-300 rounded-md"></div>
          ))}
        </div>
      </div>

      {/* Skeleton Submit Button */}
      <div className="flex justify-center">
        <div className="h-10 w-32 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default ProfileSkeletonLoader;
