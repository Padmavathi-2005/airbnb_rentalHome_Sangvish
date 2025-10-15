import React, { useState } from 'react';
import SearchDropDown from './searchdropdown/SearchDropDown';

const SearchBar = () => {
  const [formData, setFormData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '',
  });

  const handleDateSelection = (start, end) => {
    setFormData((prev) => ({
      ...prev,
      checkIn: start ? start.toDateString() : '',
      checkOut: end ? end.toDateString() : ''
    }));
  };

  const [activeDropdown, setActiveDropdown] = useState(null); // 'location' | 'calendar' | 'guests' | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search Data:', formData);
  };

  // guest fields
  const [guestCounts, setGuestCounts] = useState({
    adult: 0, children: 0, infants: 0, pets: 0
  })

  const handleGuestChange = (type, value) => {
    setGuestCounts((prev) => ({
      ...prev,
      [type]: value,
    }));

    // Update guests field in formData (for input field)
    const totalGuests = type === 'adult' || type === 'children'
      ? (type === 'adult' ? value : guestCounts.adult) + (type === 'children' ? value : guestCounts.children)
      : guestCounts.adult + guestCounts.children;

    const guestsText = totalGuests > 0 ? `${totalGuests} guests` : 'Add guests';
    const infantsText = guestCounts.infants > 0 ? `, ${guestCounts.infants} infant` : '';
    const petsText = guestCounts.pets > 0 ? `, ${guestCounts.pets} pet` : '';

    setFormData((prev) => ({
      ...prev,
      guests: guestsText + infantsText + petsText,
    }));
  };


  const [searchText, setSearchText] = useState(false)

  // Handlers to Open Specific Dropdowns
  const handleOpenLocationDropdown = () => setActiveDropdown('location');
  const handleOpenCalendarDropdown = () => setActiveDropdown('calendar');
  const handleOpenGuestsDropdown = () => setActiveDropdown('guests');


  return (
    <>
      <div className="shadow-[0_4px_10px_rgba(0,0,0,0.1)] z-50 search-bar items-center flex absolute left-1/2 -translate-x-1/2 transform text-sm bg-white border border-[#ddd] rounded-[100px] w-fit">
        <form onSubmit={handleSubmit} className="flex items-center gap-2" role="search" aria-label="Search Form">
          <SearchInput
            label="Where"
            name="destination"
            placeholder="Search destination"
            value={formData.destination}
            onChange={handleChange}
            onFocus={handleOpenLocationDropdown}
          />
          <div className='w-[1px] bg-[#ddd] h-[30px]'></div>
          <SearchInput
            label="Check in"
            name="checkIn"
            placeholder="Add Dates"
            value={formData.checkIn}
            onChange={handleChange}
            onFocus={handleOpenCalendarDropdown}
          />
          <div className='w-[1px] bg-[#ddd] h-[30px]'></div>
          <SearchInput
            label="Check out"
            name="checkOut"
            placeholder="Add Dates"
            value={formData.checkOut}
            onChange={handleChange}
            onFocus={handleOpenCalendarDropdown}
          />
          <div className='w-[1px] bg-[#ddd] h-[30px]'></div>
          <SearchInput
            label="Who"
            name="guests"
            placeholder="Add guests"
            value={formData.guests}
            onChange={handleChange}
            onFocus={handleOpenGuestsDropdown}

          />
          <div className='absolute right-0  p-2'>
            <button type="submit" className='bg-theme p-[15px] rounded-[100px]'>
              <div className='flex jutify-between items-center'>
                <svg className="block w-4 h-4 stroke-white stroke-[4] overflow-visible" fill='none' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false">
                  <path d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
                </svg>
                {searchText ? (<span className='ml-2 font-semibold text-white'>Search</span>) : (null)}
              </div>
            </button>

          </div>
        </form>
        <SearchDropDown
          activeDropdown={activeDropdown}
          closeDropdown={() => setActiveDropdown(null)}
          onDateSelect={handleDateSelection}
          guestCounts={guestCounts}
          onGuestChange={handleGuestChange}
        />
      </div>

    </>
  );
};

const SearchInput = ({ label, name, placeholder, value, onChange, onFocus }) => (
  <div className="search-input-block flex flex-col">
    <label htmlFor={name} className="text-xs font-semibold">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      className="outline-none text-sm placeholder-gray-400"
    />
  </div>
);

export default SearchBar;
