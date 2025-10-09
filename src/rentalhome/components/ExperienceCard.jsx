import React from 'react'
import {
  StarIcon,
  TagIcon,Heart
}from 'lucide-react' // optional; remove if not using Heroicons



function ExperienceCard({item}) {
  return (
    <article className="group rounded-lg border border-neutral-200/70 bg-white shadow-sm hover:shadow-md cursor-pointer transition overflow-hidden">
    <div className="relative">
          <img
          src={item.cover_photo}
          alt={item.name}
          className="w-full h-45 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {item.badge && (
        <span className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-white ${item.badge.color}`}>
        <TagIcon className="h-3.5 w-3.5" />
        {item.badge.text}
        </span>
        )}
         <button
          aria-label="save"
          className="absolute right-3 top-3 rounded-full  p-1 text-neutral-700   hover:bg-white-300"
        >
         <Heart className="w-6 h-6 cursor-pointer transition-colors duration-300 fill-[rgba(0,0,0,0.5)] stroke-white stroke-1.5" />
        </button>
    </div>

     <div className="space-y-2 p-4">
        <div className="text-xs text-neutral-500">{item.property_address.city} | {item.property_address.state}</div>
        <h3 className="line-clamp-2 text-base font-semibold text-neutral-900">
          {item.name}
        </h3>

        <div className="flex items-center justify-between">
          <Rating value={item.avg_rating} count={item.reviews} />
          <div className="text-right">
            <div className="text-rose-600 font-semibold">
              ${item.property_price.price}
            </div>
            <div className="text-xs text-neutral-500">Per night</div>
          </div>
        </div>
      </div>
        </article>
  )
}

export default ExperienceCard