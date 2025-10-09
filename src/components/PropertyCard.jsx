import React, { useState } from 'react'
import { Heart, Star } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';


function PropertyCard({property}) {

const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
    return (
         <Link
      to={`/${property.id}/${property.slug}`}
      state={{ property }}     
    >
        <div className="group cursor-pointer" key={property.id}>
            <div className="relative aspect-square rounded-xl overflow-hidden mb-1">
                <img 
                    src={property.cover_photo} 
                    alt={property.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button 
                    variant="ghost" 
                    size="icon"
                    className="absolute top-3 right-2"
                >
                   <svg    
                        onClick={() => toggleFavorite(property.id)}
                        className={`w-6 h-6 cursor-pointer transition-colors duration-300 ${favorites[property.id] ? 'fill-theme' : 'fill-[rgba(0,0,0,0.5)]'} stroke-white stroke-2`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false">
                        <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
                    </svg>

                </button>
                {property.label_name ? (
                    <span className="absolute top-3 left-3 backdrop-blur bg-white/80 px-2 py-1 rounded-full text-xs font-medium">
                        Guest favourite
                    </span>
                    ):null}
            </div>
            <div className="space-y-1">
                <div className="flex items-center mb-0 justify-between">
                    <h3 className="font-medium text-[12px] text-foreground line-clamp-1 mb-0">{property.name}</h3>
                    
                </div>
                <div className="flex items-center gab-2 text-gray-500">
                    <span className="text-[12px] text-text-gray">${property.property_price.price} for 2 nights</span>
                    <div className="flex items-center mx-2 gap-1">
                        <Star size={13} className="fill-gray-500 stroke-0" />
                        <span className="text-[12px]">{property.avg_rating}</span>
                    </div>                    
                </div>
            </div>
        </div>
        </Link>
        )
}
export default PropertyCard