import React from "react";

function PropertyCardSkeleton() {
  return (
    <div className="group rounded-lg border border-neutral-200/70 bg-white shadow-sm cursor-pointer overflow-hidden animate-pulse">
      <article>
        <div className="relative">
          {/* Image skeleton */}
          <div className="w-full h-[180px] bg-gray-300 rounded-t-lg" />
          
          {/* Badge skeleton */}
          <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 bg-gray-400" style={{ width: "60px", height: "20px" }} />
          
          {/* Wishlist button skeleton */}
          <div className="absolute right-3 top-3 w-6 h-6 bg-gray-400 rounded-full" />
        </div>

        <div className="space-y-2 p-4">
          {/* City & state */}
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
          {/* Property name */}
          <div className="w-full h-6 bg-gray-300 rounded"></div>
          <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
          {/* Rating and price */}
          <div className="flex justify-between items-center mt-2">
            <div className="w-14 h-4 bg-gray-300 rounded"></div>
            <div className="text-right space-y-1">
              <div className="w-12 h-5 bg-gray-300 rounded mx-auto" />
              <div className="w-16 h-3 bg-gray-300 rounded mx-auto" />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default PropertyCardSkeleton;
