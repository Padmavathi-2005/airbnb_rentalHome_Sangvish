import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StarIcon, TagIcon, Heart } from 'lucide-react';
import { useAuth } from '../../AuthContext';
import { addToWishlist, removeFromWishlist } from '../../Api';
import WhishBtn from '../ui/WhishBtn';

function Rating({ value }) {
  return (
    <div className="flex items-center gap-1 text-sm">
      <StarIcon className="h-4 w-4 text-amber-500" />
      <span className="font-semibold">{value || 'New'}</span>
    </div>
  );
}

function PropertyCard({ item }) {
  // {console.log("whish icon",item?.wishlist?.status)}
  
  return (
    <Link
      to={`/property/${item.id}/${item.slug}`}
      state={{ item }}
      className="group rounded-lg border border-neutral-200/70 bg-white shadow-sm hover:shadow-md cursor-pointer transition overflow-hidden"
    >
      <article>
        <div className="relative">
          <img
            src={item.cover_photo}
            alt={item.name}
            className="w-full h-45 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200';
            }}
          />

          {item.badge && (
            <span
              className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-white ${item.badge.color}`}
            >
              <TagIcon className="h-3.5 w-3.5" />
              {item.badge.text}
            </span>
          )}

          <span className="absolute right-3 top-3 ">
            <WhishBtn
  propertyId={item.id}
  initialStatus={item?.wishlist?.status === '1'}
  onToggle={(status) => handleWishlistToggle(item.id, status)}
/>
          </span> 
        

         
        </div>

        <div className="space-y-2 p-4">
          <div className="text-xs text-neutral-500">
            {item.property_address.city} | {item.property_address.state}
          </div>
          <h3 className="line-clamp-2 text-base font-semibold text-neutral-900">
            {item.name}
          </h3>

          <div className="flex items-center justify-between">
            <Rating value={item.avg_rating} />
            <div className="text-right">
              <div className="text-theme font-semibold">
                ${item.property_price.price}
              </div>
              <div className="text-xs text-neutral-500">Per night</div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PropertyCard;