import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Dot, Heart, Share } from "lucide-react"; // icons (unused currently)
import WhishBtn from "../ui/WhishBtn";
import LocationDropDown from "./searchbar/LocationDropDown";
import CalendarDropDown from "./searchbar/CalendarDropDown";
import dummyProfile from "../images/dummyProfile.png";
import { FaAngleDown } from "react-icons/fa";


// ⭐ Star Icon component
function Star() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="10px"
      height="10px"
      fill="#000"
    >
      <path
        fillRule="evenodd"
        d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 
           1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 
           1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 
           7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 
           0 0 0-1.82 0z"
      />
    </svg>
  );
}

function SingleProperty() {
  const { id } = useParams();
  const location = useLocation();
  const wrapperRef = useRef(null);

  // State variables
  const [item, setItem] = useState(location.state?.item || null);
  const [loading, setLoading] = useState(!location.state?.item);
  const [dropDown, setDropDown] = useState("");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [showMore, setShowMore] = useState(false);

  // Fetch property data if not available in state
  useEffect(() => {
    if (!item) {
      async function fetchProperty() {
        try {
          const res = await fetch(`/api/properties/${id}`);
          if (!res.ok) throw new Error("Property not found");
          const data = await res.json();
          setItem(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
      fetchProperty();
    }
  }, [id, item]);

  // Calendar open/close logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "Checkin") setCheckIn(value);
    if (name === "CheckOut") setCheckOut(value);

    setIsOpen(true); // keep calendar open when date is updated
  };

  const handleOpenCalendar = () => setIsOpen(true);

  // Loading / Not found state
  if (loading) return <div>Loading...</div>;
  if (!item) return <div>Property not found</div>;

  // Photos logic
  const photos = item.property_photos || [];
  const mainPhoto = photos[0];
  const secondaryPhotos = photos.slice(1, 5);
  const noOfPhotos = photos.length;

  const grid =
    noOfPhotos === 1
      ? ""
      : noOfPhotos === 2
      ? "grid-cols-2 grid-rows-1 gap-2"
      : noOfPhotos === 3
      ? "grid-cols-3 grid-rows-2 gap-2"
      : noOfPhotos === 4
      ? "grid-cols-4 gap-2"
      : noOfPhotos === 5
      ? "grid-cols-3 grid-rows-2 gap-2"
      : "";

  // Summary (truncated with "Show More")
  const summary = item.property_description?.summary || "";
  const maxLength = 150;
  const toggleShowMore = () => setShowMore((prev) => !prev);

  console.log("items are",item)

  return (
    <>
    <section  className="bg-white hidden relative z-10">
      <div  className="max-w-7xl mx-auto bg-white rounded-xl overflow-hidden pt-10 px-4">

        <div className="pt-6 flex items-center justify-between">
          <h1 className="text-3xl font-semibold mb-4">{item.name}</h1>
          <div className="flex items-center justify-between">
            <span className="flex items-center mr-3"><Share className="mr-2"/> Share</span>
            <span className="flex items-center ">
              <WhishBtn
                propertyId={item.id}
                initialStatus={item?.wishlist?.status === '1'}
              />
              Save</span>
            </div>
          </div>
          <div className={`grid ${grid}`}>
            {mainPhoto && (
              <div className={`rounded  ${noOfPhotos === 2 ? "row-span-2 col-span-1" : noOfPhotos === 3 ? "row-span-2 col-span-2" :('')} -lg overflow-hidden`}>
                <img
                  src={`https://bnbexp.letsdateme.com/public/images/property/${item.id}/${mainPhoto.photo}`}
                  alt={item.name}
                  className={`object-cover w-full h-75`}
                />
              </div>
              )}
            {secondaryPhotos.map((photo, idx) => (
              <div key={photo.id} className="rounded-lg overflow-hidden">
                <img
                  src={`https://bnbexp.letsdateme.com/public/images/property/${item.id}/${photo.photo}`}
                  alt={`${item.name} - ${photo.id}`}              
                  className={`object-cover w-full h-36 ${noOfPhotos ==2 ? "h-75" : "" }`}
                />
              </div>
              ))}
          </div>
          <div className="py-4">
            <p className="text-2xl font-semibold mb-1">{`Entire rental unit in ${item.property_address.city}, ${item.property_address.state}`}</p>
            <p className="text-lg text-gray-700 mb-2 flex justofy-between items-center">
              {item.bedrooms} beds  <Dot /> {item.bathrooms} bathrooms
            </p>            
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex items-stretch justify-start flex-wrap ">
          <div className="w-[55%] relative">
            <div className="border  border-gray-200 rounded-xl items-center flex justify-between py-4 px-4">
              <div className="flex text-center items-center">
                <span>
                  <svg className="rtl-img" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 18 35" fill="none">
                    <path d="M13.5 34C15.8333 33.1667 19.5 30.6 15.5 27M15.5 27C12.7 31.4001 7.33333 28.8334 5 27C6.98555 24.5181 8.86843 23.6617 10.5 23.6877M15.5 27C14.6205 25.5342 12.8127 23.7245 10.5 23.6877M10.5 23.6877C11 21.2918 9.8 16.7 1 17.5C1.16667 20.1251 3.3 25.0378 10.5 23.6877ZM9 18C10 15.1667 10 9.3 2 8.5C2 9 0 18 9 18ZM9 11.5C11.5 9.5 14 6 8 1C5.5 3.16667 2.2 8.3 9 11.5Z" stroke="black"></path>
                  </svg>
                </span>
                <span className="font-semibold text-lg/5  w-[50%]">Guest Favourite</span>
                <span>
                  <svg className="rtl-img" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 18 35" fill="none">
                    <path d="M4.77975 34C2.44642 33.1667 -1.22025 30.6 2.77975 27M2.77975 27C5.57975 31.4001 10.9464 28.8334 13.2798 27C11.2942 24.5181 9.41133 23.6617 7.77975 23.6877M2.77975 27C3.65927 25.5342 5.46705 23.7245 7.77975 23.6877M7.77975 23.6877C7.27975 21.2918 8.47975 16.7 17.2798 17.5C17.1131 20.1251 14.9798 25.0378 7.77975 23.6877ZM9.27975 18C8.27975 15.1667 8.27975 9.3 16.2798 8.5C16.2798 9 18.2798 18 9.27975 18ZM9.27975 11.5C6.77975 9.5 4.27975 6 10.2798 1C12.7798 3.16667 16.0798 8.3 9.27975 11.5Z" stroke="black"></path>
                  </svg>
                </span>
              </div>
              <span className="bg-gray-200 h-8 w-[1px] lg:hidden "></span>
              <div className="w-[40%] hidden xl:block">
                <p className="font-semibold">One of the most loved homes on Airbnb, according to guests</p>
              </div>
              <div className=" text-center">
                <span className="text-xl lg:text-2xl font-semibold">4.99</span>
                <div className="flex py-1">
                  <Star/><Star/><Star/><Star/><Star/>
                </div>
              </div>
              <span className="bg-gray-200 h-8 w-[1px] "></span>
              <div className=" text-center">
                <span className="text-xl lg:text-2xl font-semibold">4.99</span>
                <p className="text-sm font-normal">Reviews</p>
              </div>
            </div>

            <div className="my-5 py-3">
             <div className="flex  items-center py-4 border-b border-t border-gray-200">
               <img src={dummyProfile} className="w-12 h-12"/>
               <span className="mx-3">
                <h3 className="text-lg font-semibold">{item.users.last_name}</h3>
                <p className="text-gray-500">Hosting Year</p>
               </span>
             </div>
            </div>

          <div className="my-5 py-3">
            <p>
            {showMore ? summary : summary.slice(0, maxLength) + (summary.length > maxLength ? "..." : "")}
            </p>
            {summary.length > maxLength && (
            <button className="my-4 px-5 font-semibold py-3 bg-gray-200 rounded-lg" onClick={toggleShowMore}>
            {showMore ? "Show Less" : "Show More"}
            </button>
            )}
          </div>

          </div>
          <div className="w-[45%] " ref={wrapperRef}>
            <div className="max-w-md sticky ml-[15%] space-y-4">
              <div className="sticky top-[0] z-1 w-full inline-block pr-px">
                <div className="rounded-xl mb-3 shadow-lg bg-white flex items-center gap-2 bg-pink-50 px-3 py-2 rounded-lg">
                  <span className="text-pink-500">💝</span>
                  <span className="text-sm font-medium text-gray-700">
                    Prices include all fees
                  </span>
                </div>
                <div className="rounded-xl  shadow-lg p-3 bg-white">

                <div className='py-3'>
                  <p className="text-gray-500">                  
                    <span className="text-black font-bold text-lg mr-1">${item.property_price.price}</span>
                    <span className="text-gray-500 font-medium">for 2 nights</span>
                  </p>
                </div>

                {/* <div className="border border-gray-300 rounded-lg my-3">
                  <div>
                      <div className="grid grid-cols-2 gap-2 border-b border-gray-300 overflow-hidden">
                      <div className="px-3 py-2 border-r border-gray-300">
                        <p className="text-xs font-medium text-gray-500">CHECK-IN</p>
                         <input
                        className="outline-none text-sm placeholder-gray-400" 
                        value={checkIn}
                        placeholder='Add Dates'
                        name="Checkin"
                        onChange={handleOnChange}   
                        onClick={handleOpenCalender}                               
                        />
                      </div>
                      <div className="px-3 py-2">
                        <p className="text-xs font-medium text-gray-500">CHECKOUT</p>
                        <input
                        className="outline-none text-sm placeholder-gray-400" 
                        value={checkOut}
                        placeholder='Add Dates'
                        name="CheckOut"
                        onChange={handleOnChange} 
                        onClick={handleOpenCalender}   
                                        
                        />
                      </div>                      
                    </div>
                      {isopen ?(
                        <div >
                        <div className="absolute z-99 right-0 left-[-85%]">
                        <CalendarDropDown  setCheckIn={setCheckIn} 
                        setCheckOut={setCheckOut}/>
                        </div>
                        </div>
                      ):(null)}
                    
                  </div>
                    <div className="w-full  px-3 py-3 text-sm">
                      <p>Guests</p>
                    </div>
                </div> */}

                
                <button className="w-full bg-pink-600 hover:bg-pink-700 text-white my-2 py-2 rounded-lg font-medium">
                  Reserve
                </button>

                <p className="text-center text-xs text-gray-500">
                  You won't be charged yet
                </p>

                <div className="text-center">
                  <button className="text-xs text-gray-500 underline">
                    Report this listing
                  </button>
                </div>
                 </div>
              </div>
            </div>

          </div>
          
         

        </div>
      </section>






















    </>
  );
}

export default SingleProperty;
