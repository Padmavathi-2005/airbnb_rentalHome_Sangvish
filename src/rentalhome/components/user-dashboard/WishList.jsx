import React from 'react'
import UserMenu from './UserMenu'
import RentalNavbar from '../RentalNavbar'
import { useSelector, useDispatch } from "react-redux";
import { Link} from 'react-router-dom';
import { AiFillStar} from "react-icons/ai";
import WhishBtn from '../../ui/WhishBtn';
import { addToWishlist, removeFromWishlist } from '../../../Api';
import { Trash, Trash2 } from 'lucide-react';

function WishList() {
  const propertyStore = useSelector(state => state.propertyList);

  // console.log("property" , propertyStore)
  const wishlistItems = propertyStore.filter(
    (item) => item.wishlist?.status === "1"
  );

  console.log("Wishlist items:", wishlistItems);


const handleRemove = async (property) => {
    try {
      const response = await removeFromWishlist(property.wishlist.id, property.wishlist.userid);
      if (response.status) {
        console.log("Removed:", property.id);

        // Update Redux store so UI reflects immediately
        const updatedList = propertyStore.map((p) =>
          p.id === property.id
            ? { ...p, wishlist: { ...p.wishlist, status: "0" } }
            : p
        );

        dispatch(setspacePropertyList(updatedList));
      } else {
        console.error("Failed to remove from wishlist:", response.message);
      }
    } catch (error) {
      console.error("Error removing wishlist item:", error);
    }
  };

  return (
        <>
        <RentalNavbar/>
        <UserMenu/>
        <section className='bg-gray-50'>

          
         <div className='py-10 mx-auto  max-w-7xl space-y-4'>
          <div>
            <h1 className='font-semibold text-xl'>My Wishlist</h1>
          </div>        
          <div className='grid grid-cols-1 md:grid-cols-5 gap-6'>
            {wishlistItems.map((property) => (
           <Link key={property.id}  
             to={`/property/${property.id}/${property.slug}`}
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
                <span className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
                 <Trash2
                  onClick={() => handleRemove(property)}
                  className="text-red-400 w-4 h-4"
                />
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
        </section> 
        
        </>
  )
}

export default WishList