import React, { useState } from 'react'
import { Heart, Star } from "lucide-react";

function ExperienceCard({expProperty}) {

const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
    return (
        <div className="group cursor-pointer" key={expProperty.id}>
            <div className="relative aspect-square rounded-xl overflow-hidden mb-1">
                <img 
                    src={expProperty.cover_photo} 
                    alt={expProperty.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button 
                    variant="ghost" 
                    size="icon"
                    className="absolute top-3 right-2"
                >
                   <svg    
                        onClick={() => toggleFavorite(expProperty.id)}
                        className={`w-6 h-6 cursor-pointer transition-colors duration-300 ${favorites[expProperty.id] ? 'fill-theme' : 'fill-[rgba(0,0,0,0.5)]'} stroke-white stroke-2`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false">
                        <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
                    </svg>

                </button>
                {expProperty.label_name ? (
                    <span className="absolute top-3 left-3 backdrop-blur bg-white/80 px-2 py-1 rounded-full text-xs font-medium">
                        Guest favourite
                    </span>
                    ):null}
            </div>
            <div className="space-y-1">
                <div className="flex items-center mb-0 justify-between">
                    <h3 className="font-medium text-[12px] text-foreground line-clamp-1 mb-0">{expProperty.name}</h3>
                    
                </div>
                <div className="flex items-center gab-3 text-gray-500">
                    <span className="text-[12px] text-text-gray">${expProperty.property_price.price} per Hour</span>
                    <div className="flex items-center mx-2 gap-1">
                        <Star size={13} className="fill-gray-500 stroke-0" />
                        <span className="text-[12px] ">{expProperty.avg_rating}</span>
                    </div>                    
                </div>
            </div>
        </div>
        )
}

export default ExperienceCard