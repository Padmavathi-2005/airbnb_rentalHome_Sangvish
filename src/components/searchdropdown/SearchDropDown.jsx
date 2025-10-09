import React, { useEffect, useRef } from 'react';
import Calander from './Calander';
import Location from './Location';
import Guests from './Guests';

function SearchDropDown({ activeDropdown, closeDropdown, onDateSelect,guestCounts, onGuestChange}) {   //  accept onDateSelect
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown, closeDropdown]);

  if (!activeDropdown) return null;

  return (
    <div ref={dropdownRef} className='absolute bg-transparent w-full top-[70px]'>
     <div className={`flex  py-3 ${activeDropdown === 'guests' ? "justify-end" : '' }`}>
        {activeDropdown === 'location' && <Location />}
        {activeDropdown === 'calendar' && <Calander onDateSelect={onDateSelect} />}   {/*  pass callback */}
        {activeDropdown === 'guests' && 
        <Guests guestCounts={guestCounts} onGuestChange={onGuestChange}/>
        }
      </div>
    </div>
  );
}

export default SearchDropDown;
