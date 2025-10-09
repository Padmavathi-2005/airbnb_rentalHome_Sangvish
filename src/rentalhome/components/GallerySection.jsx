import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function GallerySection() {
  const properties = useSelector(state => state.propertyList); // get properties from Redux
  const [galleryData, setGalleryData] = useState([]);

  // Map properties into gallery-friendly format
  useEffect(() => {
  if (properties.length > 0) {
    const data = properties
      .slice(0, 5) // ✅ take only the first 5 properties
      .map((p, index) => ({
        id: p.id,
        color: ['orange', 'green', 'blue', 'violet'][index % 4], // cycle colors
        name: p.name,
        packages: p.packages || Math.floor(Math.random() * 50), // fallback
        hotels: p.hotels || Math.floor(Math.random() * 1000),   // fallback
        overlayClr: ['orange', 'green', 'blue', 'violet'][index % 4],
        img: p.cover_photo, // property image
      }));

    setGalleryData(data);
  }
}, [properties]);


  const shadowColors = {
    violet: '#de39ff5b',
    green: '#00c93c62',
    blue: '#1cacff4f',
    orange: '#ffd00070',
  };

  return (
    <section className="bg-blue-50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:py-12 lg:py-20">
        <div className="pb-6">
          <h2 className="text-5xl font-semibold">
            Get Active Outdoors Or Try Something New
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {galleryData.map((item, id) => (
            <div
              key={id}
              className="relative bg-cover bg-center h-80 rounded-xl mt-5 transform hover:-translate-y-5 transition-transform duration-500"
              style={{
                backgroundImage: `url(${item.img})`,
                boxShadow: `0 20px 40px ${shadowColors[item.color]}`
              }}
            >
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  backgroundImage: `linear-gradient(to top, ${shadowColors[item.color]} 0%, transparent 100%)`
                }}
              ></div>

              {/* Bottom info */}
              <div className="bg-opacity-50 w-full absolute bottom-0 p-4 text-white">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm">
                  {item.hotels} Hotels | <span>{item.packages} Packages</span>
                </p>
                <button className="mt-2 px-4 py-2 w-full block bg-[#00000075] backdrop-blur-sm rounded cursor-pointer">
                  Explore Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
