import React from 'react';
import { SearchBar } from './SearchBar';
import { UserList } from './UserList';

export const MessageSidebar = ({
  users,
  activeUserId,
  onUserSelect,
  searchTerm,
  onSearchChange,
  isLoading
}) => {
  return (
    <div 
    className='w-[360px] rounded-l-xl px-2 py-4 bg-[#F5F5F5]  flex flex-col h-full'
>
      <div className='py-3' >       
        <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      </div>
      
      {isLoading ? (
        <div className='p-5' >Loading users...</div>
      ) : (
        <UserList
          users={users}
          activeUserId={activeUserId}
          onUserSelect={onUserSelect}
          searchTerm={searchTerm}
        />
      )}
    </div>
  );
};