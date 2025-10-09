import React from "react";

const CategoriesLoader = () => (
  <section className="bg-[#F9F4F0]">
    <div className="mx-auto max-w-7xl pt-[100px] pb-[40px] px-4 relative overflow-hidden">
      {/* Header */}
      <div className="py-5">
        <span className="text-theme italic h-4 w-40 bg-gray-200 rounded animate-pulse inline-block mb-2"></span>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="h-10 w-96 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="flex gap-2">
            <div className="bg-gray-200 rounded-full w-10 h-10 animate-pulse" />
            <div className="bg-gray-200 rounded-full w-10 h-10 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Carousel skeleton */}
      <div className="flex">
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={index}
            className="min-w-[25%] flex flex-col items-center text-center p-4"
          >
            {/* Image skeleton */}
            <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full bg-gray-200 animate-pulse " />

            {/* Info skeleton */}
            <div className="flex flex-col items-center">
             
              <div className="flex items-center flex-col mt-5 gap-1 text-gray-600 w-full">
                {/* Title */}
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-1"></div>
                {/* Price */}
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesLoader;
