import React, { useState } from 'react';
import UserMenu from './UserMenu';
import RentalNavbar from '../RentalNavbar';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { AiFillStar } from "react-icons/ai";
import { Trash2 } from 'lucide-react';
import { removeFromWishlist } from '../../../Api';
import { setspacePropertyList } from '../../../slices/PropertiesSlice';
import { useAuth } from '../../../AuthContext'; // ✅ import here

function WishList() {
  const propertyStore = useSelector(state => state.propertyList);
  const { user } = useAuth(); // ✅ use actual logged-in user
  const dispatch = useDispatch();
  const [removingIds, setRemovingIds] = useState([]);

  const wishlistItems = propertyStore.filter(
    (item) => item.wishlist?.status === "1"
  );

  const handleRemove = async (property) => {
    if (!user?.id) {
      console.warn("User not found but already logged in context should handle this.");
      return; // just stop, don’t redirect
    }

    // Add to removing animation list
    setRemovingIds((prev) => [...prev, property.id]);

    // Optimistic update
    const updatedList = propertyStore.map((p) =>
      p.id === property.id
        ? { ...p, wishlist: { ...p.wishlist, status: "0" } }
        : p
    );
    dispatch(setspacePropertyList(updatedList));

    try {
      const response = await removeFromWishlist(property.wishlist.id, user.id);
      if (!response.status) {
        console.error("Failed to remove from wishlist:", response.message);
      }
    } catch (error) {
      console.error("Error removing wishlist item:", error);
    } finally {
      // remove from animation list after done
      setTimeout(() => {
        setRemovingIds((prev) => prev.filter((id) => id !== property.id));
      }, 400); // wait till animation finishes
    }
  };

  return (
    <>
      <RentalNavbar />
      <UserMenu />
      <section className="bg-gray-50 min-h-[80vh] flex flex-col items-center">
        <div className="py-10 mx-auto max-w-7xl w-full space-y-4">
          <h1 className="font-semibold text-xl">My Wishlist</h1>

          {/* --- If no items --- */}
          {wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-2xl shadow-md p-10 mt-10">
              <p className="text-gray-600 text-lg mb-4">No items added yet</p>
              <button
                onClick={() => (window.location.href = '/')}
                className="px-4 py-2 bg-theme text-white rounded-lg shadow hover:bg-theme/90 transition"
              >
                Go Home
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 transition-all duration-300">
              {wishlistItems.map((property) => (
                <Link
                  key={property.id}
                  to={`/property/${property.id}/${property.slug}`}
                  state={{ property }}
                >
                  <div
                    className={`cursor-pointer bg-white shadow-[0px_6px_35px_0px_rgba(178,178,178,0.25)] border border-gray-200 relative rounded-3xl overflow-hidden transition-all duration-300 ease-in-out transform ${
                      removingIds.includes(property.id)
                        ? "opacity-0 scale-90 pointer-events-none"
                        : "opacity-100 scale-100"
                    }`}
                  >
                    {/* -------- Property Image Section -------- */}
                    <div className="relative p-2">
                      <img
                        src={property.cover_photo}
                        alt={property.name}
                        className="w-full h-40 object-cover rounded-[20px_20px_60px_20px]"
                      />
                      <span
                        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition-transform"
                        onClick={(e) => {
                          e.preventDefault(); // prevent link navigation
                          handleRemove(property);
                        }}
                      >
                        <Trash2 className="text-red-400 w-4 h-4" />
                      </span>
                    </div>

                    {/* -------- Property Details Section -------- */}
                    <div className="py-3 px-3 text-sm font-medium text-gray-600">
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

                      <p className="truncate text-sm text-gray-500 mb-1">
                        {property.property_address.address_line_1}
                      </p>

                      <p className="text-sm mb-1">{property.bathrooms} beds</p>

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
          )}
        </div>
      </section>
    </>
  );
}

export default WishList;

// import React, { useState } from 'react';
// import UserMenu from './UserMenu';
// import RentalNavbar from '../RentalNavbar';
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate } from 'react-router-dom';
// import { AiFillStar } from "react-icons/ai";
// import { Trash2 } from 'lucide-react';
// import { removeFromWishlist } from '../../../Api';
// import { setspacePropertyList } from '../../../slices/PropertiesSlice';

// function WishList() {
//   const propertyStore = useSelector(state => state.propertyList);
//   const user = useSelector(state => state.userProfile);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [removingIds, setRemovingIds] = useState([]);

//   const wishlistItems = propertyStore.filter(
//     (item) => item.wishlist?.status === "1"
//   );

//   const handleRemove = async (property) => {
//     if (!user?.id) {
//       navigate("/login");
//       return;
//     }

//     // Add to removing animation list
//     setRemovingIds((prev) => [...prev, property.id]);

//     // Optimistic update
//     const updatedList = propertyStore.map((p) =>
//       p.id === property.id
//         ? { ...p, wishlist: { ...p.wishlist, status: "0" } }
//         : p
//     );
//     dispatch(setspacePropertyList(updatedList));

//     try {
//       const response = await removeFromWishlist(property.wishlist.id, user.id);
//       if (!response.status) {
//         console.error("Failed to remove from wishlist:", response.message);
//       }
//     } catch (error) {
//       console.error("Error removing wishlist item:", error);
//     } finally {
//       // remove from animation list after done
//       setTimeout(() => {
//         setRemovingIds((prev) => prev.filter((id) => id !== property.id));
//       }, 400); // wait till animation finishes
//     }
//   };

//   return (
//     <>
//       <RentalNavbar />
//       <UserMenu />
//       <section className="bg-gray-50 min-h-[80vh] flex flex-col items-center">
//         <div className="py-10 mx-auto max-w-7xl w-full space-y-4">
//           <h1 className="font-semibold text-xl">My Wishlist</h1>

//           {/* --- If no items --- */}
//           {wishlistItems.length === 0 ? (
//             <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-2xl shadow-md p-10 mt-10">
//               <p className="text-gray-600 text-lg mb-4">No items added yet</p>
//               <button
//                 onClick={() => navigate('/')}
//                 className="px-4 py-2 bg-theme text-white rounded-lg shadow hover:bg-theme/90 transition"
//               >
//                 Go Home
//               </button>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-5 gap-6 transition-all duration-300">
//               {wishlistItems.map((property) => (
//                 <Link
//                   key={property.id}
//                   to={`/property/${property.id}/${property.slug}`}
//                   state={{ property }}
//                 >
//                   <div
//                     className={`cursor-pointer bg-white shadow-[0px_6px_35px_0px_rgba(178,178,178,0.25)] border border-gray-200 relative rounded-3xl overflow-hidden transition-all duration-300 ease-in-out transform ${
//                       removingIds.includes(property.id)
//                         ? "opacity-0 scale-90 pointer-events-none"
//                         : "opacity-100 scale-100"
//                     }`}
//                   >
//                     {/* -------- Property Image Section -------- */}
//                     <div className="relative p-2">
//                       <img
//                         src={property.cover_photo}
//                         alt={property.name}
//                         className="w-full h-40 object-cover rounded-[20px_20px_60px_20px]"
//                       />
//                       <span
//                         className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition-transform"
//                         onClick={(e) => {
//                           e.preventDefault(); // prevent link navigation
//                           handleRemove(property);
//                         }}
//                       >
//                         <Trash2 className="text-red-400 w-4 h-4" />
//                       </span>
//                     </div>

//                     {/* -------- Property Details Section -------- */}
//                     <div className="py-3 px-3 text-sm font-medium text-gray-600">
//                       <div className="flex justify-between items-center mb-1">
//                         <h3 className="text-sm font-semibold truncate">
//                           {property.name}
//                         </h3>
//                         <div className="flex items-center space-x-1">
//                           <AiFillStar className="text-theme" />
//                           <span className="text-sm font-medium">
//                             {property.avg_rating}
//                           </span>
//                         </div>
//                       </div>

//                       <p className="truncate text-sm text-gray-500 mb-1">
//                         {property.property_address.address_line_1}
//                       </p>

//                       <p className="text-sm mb-1">{property.bathrooms} beds</p>

//                       <p className="text-sm">
//                         <span className="font-semibold text-md text-black underline">
//                           {property.property_price.price}
//                         </span>{" "}
//                         {property.property_price.default_code} for 2 nights
//                       </p>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// }

// export default WishList;
