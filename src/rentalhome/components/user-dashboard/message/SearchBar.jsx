import { Search } from 'lucide-react';
import React from 'react';

export const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className='flex bg-white py-2 border border-gray-300 px-3 rounded-full gap-2 items-center'>
      <Search className='text-gray-500'/>
      <input
      className='focus:outline-none'
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};