import React from "react";

export default function ImageTextSection({
  imageSrc,
  title,
  subtitle,
  fullHeight = false, // 👈 default false
}) {
  return (
    <div className="relative md:w-1/2 w-full p-4 flex">
      <div
        className={`relative rounded-xl shadow-md overflow-hidden w-full ${
          fullHeight ? "flex-1" : "h-80 md:h-[28rem]" // 👈 smaller default size
        }`}
      >
        <img
          src={imageSrc}
          alt={title || "Image"}
          className="object-cover w-full h-full"
        />

        {(title || subtitle) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center bg-black/20">
            {title && (
              <h2 className="text-xl md:text-3xl pb-2 font-bold text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm md:text-lg text-white">{subtitle}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
