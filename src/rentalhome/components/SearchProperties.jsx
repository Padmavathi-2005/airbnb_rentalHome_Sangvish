import React, { useEffect } from "react";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import WhishBtn from '../ui/WhishBtn';
import { Link, useNavigate } from 'react-router-dom';

function SearchProperties({ location, checkIn, checkOut, properties,setLatitude,setLongitude}) {
  // Step 1: Filter result and store in a variable
  const filteredProperties = properties.filter((property) =>
    property.property_address.address_line_1
      ?.toLowerCase()
      .includes(location?.toLowerCase())
  );
  const searchCity = filteredProperties.map(cityname=>(
    cityname.property_address.city
  ))

    const searchLatitude = filteredProperties.map(lati=>(lati.property_address.latitude));
    const searchLongitude = filteredProperties.map(long=>(long.property_address.longitude));



    useEffect(()=>{
      setLatitude(searchLatitude)
      setLongitude(searchLongitude)

    },[])
    console.log("property-card-item is",properties)




  return (
    <div className="w-full">
      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
 {filteredProperties.map((property) => (
           <Link key={property.id}  to={`/property/${property.id}/${property.slug}`}
      state={{ property }}>           
           <div             
              className="cursor-pointer bg-white shadow-[0px_6px_35px_0px_rgba(178,178,178,0.25)] border border-gray-200 relative  rounded-3xl overflow-hidden transition"
            >
              {/* -------- Property Image Section -------- */}

              <div className="relative p-2">
                <img
                  src={property.cover_photo}
                  alt={property.name}
                  className="w-full h-40 object-cover rounded-[20px_20px_60px_20px]"
                />                
                <span className="absolute top-4 right-4 bg-white/70 backdrop-blur text-xs font-semibold px-2 py-1 rounded-md shadow">
                  Guest favourite
                </span>              
                
                <span className="absolute left-3 top-4 ">
                {/* <WhishBtn
                propertyId={property.id}
                initialStatus={property.wishlist.status === '1'}
                /> */}
                </span> 
              </div>

              {/* -------- Property Details Section -------- */}
              <div className="py-3 px-3 text-sm font-medium text-gray-600">
                {/* Title & Rating */}
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-semibold truncate">
                    {property.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <AiFillStar className="text-theme" />
                    <span className="text-sm font-medium">
                      {property.avg_rating}
                    </span>
                  </div>
                </div>

                {/* Address */}
                <p className="truncate text-sm text-gray-500 mb-1">
                  {property.property_address.address_line_1}
                </p>

                {/* Beds */}
                <p className="text-sm mb-1">{property.bathrooms} beds</p>

                {/* Price */}
                <p className="text-sm">
                  <span className="font-semibold text-md text-black underline">
                    {property.property_price.price}
                  </span>{" "}
                  {property.property_price.default_code} for 2 nights
                </p>
              </div>
            </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default SearchProperties;
