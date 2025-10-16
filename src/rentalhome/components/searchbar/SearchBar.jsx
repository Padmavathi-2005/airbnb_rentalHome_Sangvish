import { MapPin, ChevronDown, CalendarDays, Search, Users } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import SearchDropDown from './SearchDropDown';
import { useNavigate } from 'react-router-dom';
import Guests from './Guests';

function SearchBar() {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [dropDown, setDropDown] = useState('');
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 });

  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "Location") setLocation(value);
    else if (name === "Checkin") setCheckIn(value);
    else if (name === "CheckOut") setCheckOut(value);
  };

  const handleGuestChange = (type, newValue) => {
    // Ensure we only set numeric, non-negative values
    const safeValue = Math.max(0, Number(newValue) || 0);

    // Enforce at least 1 adult
    if (type === 'adults') {
      setGuests(prev => ({ ...prev, adults: Math.max(1, safeValue) }));
    } else {
      setGuests(prev => ({ ...prev, [type]: safeValue }));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropDown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchData = {
      location: location || null,
      checkIn: checkIn || null,
      checkOut: checkOut || null,
      guests: {
        adults: guests.adults || 1,
        children: guests.children || 0,
        infants: guests.infants || 0,
        pets: guests.pets || 0
      }
    };
    navigate("/search", { state: searchData });
  };

  return (
    <div ref={wrapperRef} className='relative'>
      <div className='bg-white md:relative lg:absolute rounded-xl md:rounded-full shadow-lg'>
        <form onSubmit={handleSearch} className='block md:flex lg:flex justify-between items-center'>

          {/* Location */}
          <div
            className="flex items-center justify-around gap-3 py-4 px-2 cursor-pointer hover:bg-gray-50 rounded-full transition"
            onClick={() => setDropDown('Location')}
          >
            <MapPin className='w-5 stroke-theme' />
            <div>
              <label className='flex items-center text-theme text-sm justify-between'>
                Location <ChevronDown className="mx-2 w-5 stroke-theme" />
              </label>
              <input
                className="outline-none text-sm placeholder-gray-400"
                value={location}
                placeholder='Location'
                name="Location"
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="h-6 w-0.5 hidden sm:block bg-gray-300"></div>

          {/* CheckIn */}
          <div
            className="flex items-center justify-around gap-3 py-4 px-2 cursor-pointer hover:bg-gray-50 rounded-full transition"
            onClick={() => setDropDown('date')}
          >
            <CalendarDays className='w-5 stroke-theme' />
            <div>
              <label className='flex items-center text-theme text-sm justify-between'>
                CheckIn <ChevronDown className="mx-2 w-5 stroke-theme" />
              </label>
              <input
                className="outline-none text-sm placeholder-gray-400"
                value={checkIn}
                placeholder='Add Dates'
                name="Checkin"
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="h-6 w-0.5 hidden sm:block bg-gray-300"></div>

          {/* CheckOut */}
          <div
            className="flex items-center justify-around gap-3 py-4 px-2 cursor-pointer hover:bg-gray-50 rounded-full transition"
            onClick={() => setDropDown('date')}
          >
            <CalendarDays className='w-5 stroke-theme' />
            <div>
              <label className='flex items-center text-theme text-sm justify-between'>
                CheckOut <ChevronDown className="mx-2 w-5 stroke-theme" />
              </label>
              <input
                className="outline-none text-sm placeholder-gray-400"
                value={checkOut}
                placeholder='Add Dates'
                name="CheckOut"
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="h-6 w-0.5 hidden sm:block bg-gray-300"></div>

          <div
            className="flex items-center justify-around gap-3 py-4 px-2 cursor-pointer hover:bg-gray-50 rounded-full transition"
            onClick={() => setDropDown(dropDown === "guests" ? null : "guests")}
          >
            <Users className="w-5 stroke-theme" />
            <div>
              <label className="flex items-center text-theme text-sm justify-between">
                Guests <ChevronDown className="mx-2 w-5 stroke-theme" />
              </label>
              <div className="text-sm text-gray-500 truncate min-w-[120px]">
                {guests.children > 0 || guests.infants > 0 || guests.pets > 0
                  ? `${guests.adults} Adults ...`
                  : `${guests.adults} Adults`}
              </div>
            </div>

            {dropDown === "guests" && (
              <div
                className="absolute top-[110%] right-0 z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <Guests
                  guestCounts={guests}
                  onGuestChange={handleGuestChange}
                  className="w-96 sm:w-[550px]"
                />
              </div>
            )}



          </div>

          <div className='px-3 pb-3 md:pb-0'>
            <button type="submit" className='bg-theme flex md-block justify-between w-full rounded-full p-4'>
              <span className='text-white mx-2 md:hidden'>Search</span><Search className='stroke-white' />
            </button>
          </div>
        </form>

        <SearchDropDown
          DropDown={dropDown}
          setCheckIn={setCheckIn}
          setCheckOut={setCheckOut}
          setLocation={setLocation}
        />
      </div>
    </div>
  );
}

export default SearchBar;
