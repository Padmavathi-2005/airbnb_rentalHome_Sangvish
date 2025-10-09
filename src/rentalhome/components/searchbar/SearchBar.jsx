import { MapPin, ChevronDown, CalendarDays, Search, Users } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import SearchDropDown from './SearchDropDown';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [dropDown, setDropDown] = useState('');
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });

  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "Location") setLocation(value);
    else if (name === "Checkin") setCheckIn(value);
    else if (name === "CheckOut") setCheckOut(value);
  };

  const handleGuestChange = (type, delta) => {
    setGuests(prev => ({ ...prev, [type]: Math.max(0, prev[type] + delta) }));
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
    navigate("/search", { state: { location, checkIn, checkOut, guests } });
  };

  return (
    <div ref={wrapperRef} className='relative'>
      <div className='bg-white md:relative lg:absolute rounded-xl md:rounded-full shadow-lg'>
        <form onSubmit={handleSearch} className='block md:flex lg:flex justify-between items-center'>
          
          {/* Location */}
          <div className='flex items-center justify-around gap-3 py-4 px-2'>
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
                onClick={() => setDropDown('Location')}
              />
            </div>
          </div>

          <div className="h-6 w-0.5 hidden sm:block bg-gray-300"></div>

          {/* CheckIn */}
          <div className='flex items-center justify-around gap-3 py-4 px-2'>
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
                onClick={() => setDropDown('date')}
              />
            </div>
          </div>

          <div className="h-6 w-0.5 hidden sm:block bg-gray-300"></div>

          {/* CheckOut */}
          <div className='flex items-center justify-around gap-3 py-4 px-2'>
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
                onClick={() => setDropDown('date')}
              />
            </div>
          </div>

          <div className="h-6 w-0.5 hidden sm:block bg-gray-300"></div>

         {/* Guests */}
<div className='flex items-center justify-around gap-3 py-4 px-2 relative'>
  {/* Icon + Input */}
  <div 
    onClick={() => setDropDown('guests')} 
    className="flex items-center gap-3 cursor-pointer"
  >
    {/* Icon */}
   <Users className='w-5 stroke-theme' /> 
    <div>
      <label className='flex items-center text-theme text-sm justify-between'>
        Guests <ChevronDown className="mx-2 w-5 stroke-theme" />
      </label>
      <div className='text-sm text-gray-500'>
        {guests.adults + guests.children + guests.infants + guests.pets} guests
      </div>
    </div>
  </div>

  {/* Guests Dropdown */}
  {dropDown === 'guests' && (
    <div className='absolute top-full mt-2 right-0 bg-white shadow-lg rounded-xl p-4 z-50 w-72'>
      {['adults', 'children', 'infants', 'pets'].map(type => (
        <div key={type} className='flex justify-between items-center py-2'>
          <div>
            <p className='font-semibold capitalize'>{type}</p>
            <p className='text-xs text-gray-400'>
              {type === 'adults' ? 'Age 13 or above' :
               type === 'children' ? 'Ages 2-12' :
               type === 'infants' ? 'Under 2' :
               'Bringing a service animal?'}
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <button type='button' onClick={() => handleGuestChange(type, -1)} className='w-6 h-6 border rounded-full text-gray-700'>-</button>
            <span>{guests[type]}</span>
            <button type='button' onClick={() => handleGuestChange(type, 1)} className='w-6 h-6 border rounded-full text-gray-700'>+</button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


          {/* Search Button */}
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
