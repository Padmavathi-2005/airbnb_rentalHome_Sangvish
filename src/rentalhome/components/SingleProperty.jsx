import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Calendar, Dot, Sparkle, BrushCleaning, HandCoins, MessageSquareMore, Target, MapPin } from "lucide-react";
import { FaAngleDown } from "react-icons/fa";
import WhishBtn from "../ui/WhishBtn";
import LocationDropDown from "./searchbar/LocationDropDown";
import CalendarDropDown from "./searchbar/CalendarDropDown";
import dummyProfile from "../images/dummyProfile.png";
import Map from "./Map";
import { FaN } from "react-icons/fa6";
import star from '../images/ratingstar.png'
import RatingWingLeft from "../ui/RatingWingLeft";
import RatingWingRight from "../ui/RatingWingRight";
import RatingStar from "../ui/RatingStar";
import { useDispatch } from 'react-redux';
import { setNewLocation, setNewcheckIn, setNewcheckOut, setNewArrayData, setNewGuest } from '../../slices/SearchSlice';
import Guests from "./searchbar/Guests";


function Star() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="10px"
      height="10px"
      fill="#000">
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

function SingleProperty({ aminitiescard, latitude, longitude, maxLength, wrapperRef, summary, setCheckIn, setCheckOut, showMore, months, item, checkIn, checkOut, isGuests, setIsGuests, handleGuests, handleOnChange, handleOpenModel, isOpen, mainPhoto, secondaryPhotos }) {
  // console.log('items are', item)
  const similar = item.similar;
  const isSimiliar = similar.length;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let toggleShowMore;

  const newname = item.title;
  // console.log("name is s",newname)

  const aminities = item.result.amenities;

  const allPhotos = [
    {
      url: mainPhoto,
      title: mainPhoto,
    },
    ...secondaryPhotos.map((item, index) => ({
      url: item.photo,
      title: `Photo ${index + 1}`,
    }))
  ];

  const [isImage, setIsImage] = useState(0);


  const handleImgWidth = (id) => {
    setIsImage(id === isImage ? null : id);
  };


  const sampleArray = [1, "data", 2]
  const userDetails = item

  const [newTitle, setNewTitle] = useState('');
  const [newCheckIn, setNewCheckIn] = useState('');
  const [newCheckOut, setNewCheckOut] = useState('');
  const [guestCounts, setGuestCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });

  console.log("guest count", guestCounts.adults)

  const [btnStatus, setBtnStatus] = useState(true)


  console.log("array of item is ", item)

  console.log("booking type is ", item.result.booking_type)
  useEffect(() => {
    dispatch(setNewLocation(newTitle));
    dispatch(setNewcheckIn(newCheckIn));
    dispatch(setNewcheckOut(newCheckOut));
    dispatch(setNewGuest("adult10"));
  }, [newTitle, newCheckIn, newCheckOut, "adult10"]);


  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      setBtnStatus(false);
      console.log('Check-in and Check-out dates are required');
      return;
    }

    dispatch(setNewLocation(item.title));
    dispatch(setNewcheckIn(checkIn));
    dispatch(setNewGuest(guestCounts));
    dispatch(setNewcheckOut(checkOut));
    dispatch(setNewArrayData(userDetails));
    setBtnStatus(true);
    navigate('/booking');
  };
  // const [isGuests, setIsGuests] = useState(false)

  // const handleGuests = () => {
  //   setIsGuests((prev) => !prev);
  // };



  const handleGuestChange = (type, value) => {
    setGuestCounts(prev => ({ ...prev, [type]: value }));
  };

  return (
    <section className="bg-white relative z-10">

      {/* ---------- Property Core Info ---------- */}
      <div className="max-w-7xl mx-auto bg-white pt-20 pb-10 px-4">
        <div className="grid grid-cols-12 items-center justify-between">

          {/* Left Side (Property Title & Reserve) */}
          <div className="col-span-8">
            <h1 className="text-2xl font-semibold mb-1">{item.title}</h1>
            <p>
              <span className="text-2xl font-bold underline decoration-red-500">
                ${item.property_price?.price}
              </span>{" "}
              for 2 nights
            </p>

            <div className="mt-3">
              <button disabled={!checkIn || !checkOut} onClick={handleBooking} className={`${checkIn || checkOut ? "bg-theme cursor-pointer" : "bg-theme-20"} px-[50px] text-md font-semibold py-3 rounded-[50px] text-white `}>
                Reserve
              </button>
            </div>
          </div>

          {/* Right Side (Booking Calendar + Guests) */}
          <div className="col-span-4">
            {/* ---------- Calendar Section ---------- */}
            <div
              className="border border-gray-400 rounded-lg my-3 relative"
              ref={wrapperRef}
            >
              {/* Dates Input */}
              <div className="grid grid-cols-2 gap-2 overflow-hidden">
                {/* Check In */}
                <div className="px-3 py-2 border-r border-gray-500">
                  <p className="text-xs font-medium text-gray-800">CHECK-IN</p>
                  <input
                    type="text"
                    className="outline-none text-sm placeholder-gray-500"
                    value={checkIn}
                    placeholder="Add Dates"
                    name="Checkin"
                    onChange={handleOnChange}
                    onClick={(e) => {
                      e.preventDefault();
                      handleOpenModel();
                    }}
                    readOnly
                  />
                </div>

                {/* Check Out */}
                <div className="px-3 py-2">
                  <p className="text-xs font-medium text-gray-800">CHECKOUT</p>
                  <input
                    type="text"
                    className="outline-none text-sm placeholder-gray-400"
                    value={checkOut}
                    placeholder="Add Dates"
                    name="CheckOut"
                    onChange={handleOnChange}
                    onClick={(e) => {
                      e.preventDefault();
                      handleOpenModel();
                    }}
                    readOnly
                  />
                </div>

              </div>

              {/* Calendar Dropdown */}
              {isOpen && (
                <div className="absolute z-50 left-[-300px] right-0">
                  <CalendarDropDown
                    setCheckIn={setCheckIn}
                    setCheckOut={setCheckOut}
                  />
                </div>
              )}

            </div>

            {/* ---------- Guests Section ---------- */}
            <div
              onClick={(e) => {
                // e.preventDefault();
                handleGuests();
              }}
              className="flex items-center justify-between py-2 px-2 border border-gray-400 rounded-lg my-3">
              <div >
                <span>Guests

                </span>
                <input
                  type="text"
                  className="outline-none text-sm placeholder-gray-400 w-full truncate"
                  value={`${guestCounts.adults} Adults${guestCounts.children > 0 ? `, ${guestCounts.children} Children` : ''}${guestCounts.infants > 0 ? `, ${guestCounts.infants} Infants` : ''}${guestCounts.pets > 0 ? `, ${guestCounts.pets} Pets` : ''}`}
                  placeholder="Add guests"
                  name="Guests"
                  readOnly
                />
              </div>
              <FaAngleDown />
            </div>

            {/* Calendar Dropdown */}

            {isGuests &&
              <div className="absolute z-50 ">
                <Guests guestCounts={guestCounts} onGuestChange={handleGuestChange} />
              </div>
            }

          </div>
        </div>
      </div>

      {/* ---------- Property Photos ---------- */}
      <div className="w-full py-10 h-[600px]">
        <div className="bg-gray-100 py-10 pl-10 rounded-l-[30px] rounded-tr-none rounded-br-none ml-12 h-auto">
          <div className="flex">

            {allPhotos.map((img, id) => (
              <div key={id} className="mr-4">
                {/* {console.log("image ids",id)} */}
                <img
                  onClick={() => handleImgWidth(id)}
                  src={img.url}
                  alt={img.title}
                  className={`h-70 
                      ${allPhotos.length === 1 ? "w-250" : ""} 
                      rounded-xl object-cover cursor-pointer transition-all duration-300  object-cover
                      ${id === isImage ? "w-150" : "w-70"}`}

                />
              </div>
            ))}

          </div>
          {/* ---------- Property Details ---------- */}
          <div className="py-3 w-[80%]">
            <p className="text-2xl font-semibold mb-1">
              Entire rental unit in {item.result.property_address.address_line_1}
            </p>
            <p className="text-lg text-theme-black mb-2 flex items-center">
              {item.bedrooms} beds <Dot /> {item.bathrooms} bathrooms
            </p>

            {/* Rating & Reviews */}
            <div className="flex items-center w-[20%]">
              <div className="mr-4 p-3 shadow-xl rounded-xl bg-white text-center">
                <h2 className="text-2xl font-semibold mb-2">4.8</h2>
                <div className="flex">
                  <Star /><Star /><Star /><Star /><Star />
                </div>
              </div>

              <div className="mr-4 p-3 shadow-xl rounded-xl bg-white text-center">
                <h2 className="text-2xl font-semibold">75</h2>
                <p className="text-sm">Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ---------- host profile ---------- */}
      <div className="max-w-7xl mx-auto bg-white pt-5 pb-5 px-4">
        <div className="flex gap-5 items-center">
          <img className="border-4 shadow-xl border-white w-20 h-20 object-cover rounded-full" src={item.users.profile_src} alt='user' />
          <div>
            <p className="text-lg font-semibold">{item.users.first_name} {item.users.last_name}</p>
            <p className="text-gray-600">{months} months of hosting</p>
          </div>
        </div>
        <div>
        </div>
      </div>

      {/* ---------- Property aminitie ---------- */}
      <div className="b max-w-7xl mx-auto bg-white py-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {aminitiescard.map((aminitie) => (
            <div
              key={aminitie.id}
              className="flex gap-4 px-4 py-5 bg-gray-100 rounded-lg items-center justify-between"
            >

              <aminitie.icon size={40} className="stroke-theme" />

              <div>
                <h3 className="font-semibold mb-2">{aminitie.title}</h3>
                <p className="text-sm text-gray-500">{aminitie.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* ---------- Property Description ---------- */}
      {summary && (
        <div className="b max-w-7xl mx-auto bg-white py-10 px-4">
          <div className="">
            <p>
              {showMore
                ? summary
                : summary.slice(1, maxLength) +
                (summary.length > maxLength ? "..." : "")
              }
            </p>

            {summary.length > maxLength && (
              <button
                className="my-4 px-5 font-semibold py-3 bg-gray-200 rounded-lg"
                onClick={toggleShowMore}
              >
                {showMore ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ---------- reviews ---------- */}
      <div className="b max-w-7xl mx-auto bg-white py-10 px-4">
        <div className="grid grid-cols-3">
          { }

          <div className="max-w-md bg-white shadow-[0_5px_15px_0_rgba(0,0,0,0.15)] rounded-xl p-5 flex flex-col space-y-3 relative">
            <div className="flex justify-between items-center">
              {/* Profile */}
              <div className="flex items-center space-x-3">
                <img
                  src="https://bnbexp.letsdateme.com/public/images/profile/61/profile_1754979921.jpg"
                  alt="profile"
                  className="w-13 h-13 shadow-lg rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">Carl</h3>
                  <p className="text-sm text-gray-500">1 year on Airbnb</p>
                </div>
              </div>

              {/* Rating + Date */}
              <div className="items-center text-center">
                <div className="flex mx-auto">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-600">July 2024</p>
              </div>
            </div>

            {/* Review Text */}
            <p className="text-gray-600 text-sm">
              Lorem Ipsum is simply dummy text of the printing and type industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown...
            </p>
          </div>

        </div>

      </div>


      {/* ---------- Similiar ---------- */}
      {isSimiliar === 0 ? (null) : (
        <div className={`a max-w-7xl mx-auto bg-white`}>
          <div className="pb-20 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
              {similar.map((similar, index) => (
                <div
                  key={index}
                  className="transform transition duration-500 hover:scale-105 hover:shadow-xl rounded-2xl p-3 bg-white  translate-y-10 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
                >
                  <img
                    className="w-full h-48 object-cover rounded-2xl mb-3 transition duration-500 hover:brightness-90"
                    src={similar.cover_photo}
                    alt={similar.name}
                  />
                  <div className="py-2">
                    <p className="font-semibold text-lg">{similar.name}</p>
                    <p className="hidden">{similar.city}</p>
                    <p className="text-gray-600 text-sm">{similar.property_type_name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


      {/* ---------- map ---------- */}
      <div className="max-w-7xl mx-auto bg-white py-2 px-4">
        <div className="pb-10">
          <Map
            latitude={latitude}
            longitude={longitude}
            height={'400px'}

          />
        </div>
      </div>

      {/* ---------- host ---------- */}
      <div className="max-w-7xl mx-auto bg-white py-2 px-4">
        <div>
          <h3 className="text-lg font-semibold">Meet your host</h3>
        </div>

        <div className="bg-white my-5 shadow-[0_5px_15px_0_rgba(0,0,0,0.15)] rounded-2xl p-6  flex flex-col gap-6">
          {/* Profile Info */}
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-4" >
              <div className="flex items-start gap-4">
                <div >
                  <div className="flex items-center gap-4">
                    <img className="border-4 shadow-xl border-white w-20 h-20 object-cover rounded-full" src={item.users.profile_src} alt='user' />
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">{item.users.first_name} {item.users.last_name}</h2>
                      <span className="text-sm text-pink-600 font-medium">{item.users.super_host === 0 ? item.users.user_type : "Super Host"}</span>
                    </div>
                  </div>
                  <div className="px-3 py-4 space-y-3">
                    <p className="text-sm font-semibold text-theme-black  mt-1">My work: 3D artist</p>
                    <p className="text-sm font-semibold text-theme-black ">Speaks English and Tamil</p>
                    <div className="flex items-center gap-6 mt-2 text-sm text-black font-semibold">
                      <div>
                        <p>Reviews</p>
                        <span className="text-xl font-semibold">117</span>
                      </div><span className='h-10 w-[2px] bg-gray-300'></span>
                      <div>
                        <p>Rating</p>
                        <span className="text-xl font-semibold">4.92★</span>
                      </div><span className='h-10 w-[2px] bg-gray-300'></span>
                      <div>
                        <p>Months hosting</p>
                        <span className="text-xl font-semibold">6</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-8 space-y-4">
              {/* Bio */}
              <div className="bg-theme-10 rounded-lg py-3 px-3 text-theme-black text-md font-medium leading-relaxed">
                Hi, I'm Priya! Once a 3D artist crafting on screen, I now pour that same
                creativity into real spaces you can live in. Every home I host is
                designed to feel warm, welcoming, and just a little magical, so your
                stay becomes a memory you'll carry with you.
              </div>

              {/* Details */}
              <div className="text-sm text-theme-black space-y-4">
                <p className="flex items-start gap-3 space-y-2">
                  <span className="font-semibold text-black text-md
                     flex gap-3"><Sparkle fill="black" stroke="none" /> </span>
                  <span>
                    <span className="font-semibold text-black text-md flex gap-3">Priya is a Superhost</span>
                    Superhosts are experienced, highly rated hosts who are committed to
                    providing great stays for guests.
                  </span>
                </p>
                <p className="flex items-start gap-3 space-y-2">
                  <span className="font-semibold text-black text-md
                     flex gap-3"><Sparkle fill="black" stroke="none" /> </span>
                  <span>
                    <span className="font-semibold text-black text-md flex gap-3"> Host details</span>
                    <span>
                      Response rate: <strong>100%</strong> <br />
                      Responds within an hour
                    </span>
                  </span>
                </p>

              </div>
            </div>
          </div>

          {/* Button */}
          <div className="space-y-3">
            <button className="py-2 px-4 bg-gray-300 text-black font-medium rounded-lg hover:bg-gray-800 transition">
              Message Host
            </button>

            {/* Note */}
            <p className="text-xs text-gray-500">
              To help protect your payment, always use Airbnb to send money and
              communicate with hosts.
            </p>
          </div>
        </div>
      </div>

      {/* ---------- ratings section---------- */}
      <div className="max-w-7xl mx-auto bg-white py-20 px-4 space-y-10">
        <div className="mx-auto">
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center">
              <RatingWingLeft />
              <div className="ml-15 mr-7 relative">
                <span className="absolute bottom-2 right-12">
                  <RatingStar />
                </span>
                <span className="text-5xl font-bold">4.3</span>
              </div>
              <RatingWingRight />
            </div>
            <div className="text-center w-[30%]">
              <p className="text-lg text-theme-black font-semibold">Guest Favourite</p>
              <p className="text-gray-400 font-medium">This home is a guest favourite based on ratings,reviews and reliability</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          {/* Overall Rating Box */}
          <div className="border border-gray-300 bg-white rounded-lg shadow-[0px_6.79px_33.95px_0px_#C5C5C540] p-6 w-full max-w-xs flex-shrink-0">
            <h2 className="text-lg font-medium mb-3">Overall Rating</h2>
            <div className="flex items-center mb-1">
              <span className="text-4xl font-bold mr-2">4</span>
              <div className="flex items-center ml-1">
                <span className="text-yellow-500">
                  {'★'.repeat(4)}
                  <span className="text-gray-300">★</span>
                </span>
              </div>
            </div>
            <div className="text-gray-500 text-sm mb-4">Based on 132 ratings</div>
            {/* Ratings Breakdown */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star, i) => {
                const barPercents = [0.65, 0.50, 0.28, 0.00, 0.00];
                return (
                  <div key={star} className="flex items-center">
                    <span className="text-sm w-4">{star}</span>
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gray-900 h-2 rounded-full"
                        style={{ width: `${barPercents[i] * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Sub Ratings - Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1">
            {/* Cleanliness */}
            <div className="border border-gray-300 bg-white rounded-xl shadow-[0px_6.79px_33.95px_0px_#C5C5C540] p-5 flex flex-col justify-between items-start">
              <div className="font-medium">Cleanliness</div>
              <div className="text-xl font-bold mb-2">5.0</div>
              {/* Broom icon */}
              <BrushCleaning className="w-8 h-8 text-gray-700" />
            </div>
            {/* Check-in */}
            <div className="border border-gray-300 bg-white rounded-xl shadow-[0px_6.79px_33.95px_0px_#C5C5C540] p-5 flex flex-col justify-between items-start">
              <div className="font-medium">Check-in</div>
              <div className="text-xl font-bold mb-2">5.0</div>
              {/* Calendar icon */}
              <Calendar className="w-8 h-8 text-gray-700" />
            </div>
            {/* Location */}
            <div className="border border-gray-300 bg-white rounded-xl shadow-[0px_6.79px_33.95px_0px_#C5C5C540] p-5 flex flex-col justify-between items-start">
              <div className="font-medium">Location</div>
              <div className="text-xl font-bold mb-2">5.0</div>
              {/* Map Pin icon */}
              <MapPin className="w-8 h-8 text-gray-700" />
            </div>
            {/* Accuracy */}
            <div className="border border-gray-300 bg-white rounded-xl shadow-[0px_6.79px_33.95px_0px_#C5C5C540] p-5 flex flex-col justify-between items-start">
              <div className="font-medium">Accuracy</div>
              <div className="text-xl font-bold mb-2">5.0</div>
              {/* Check badge icon */}
              <Target className="w-8 h-8 text-gray-700" />
            </div>
            {/* Communication */}
            <div className="border border-gray-300 bg-white rounded-xl shadow-[0px_6.79px_33.95px_0px_#C5C5C540] p-5 flex flex-col justify-between items-start">
              <div className="font-medium">Communication</div>
              <div className="text-xl font-bold mb-2">5.0</div>
              {/* Chat bubbles icon */}
              <MessageSquareMore className="w-8 h-8 text-gray-700" />
            </div>
            {/* Value */}
            <div className="border border-gray-300 bg-white rounded-xl shadow-[0px_6.79px_33.95px_0px_#C5C5C540] p-5 flex flex-col justify-between items-start">
              <div className="font-medium">Value</div>
              <div className="text-xl font-bold mb-2">5.0</div>
              {/* Value/gift icon */}
              <HandCoins className="w-8 h-8 text-gray-700" />
            </div>
          </div>
        </div>

      </div>

    </section>

  );
}

export default SingleProperty;
