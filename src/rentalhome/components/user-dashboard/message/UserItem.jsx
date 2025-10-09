import React from 'react';

export const UserItem = ({ user, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-xl cursor-pointer mb-5 border ${isActive ? "border-blue-400 bg-[#f0f8ff]" : "bg-white border-gray-400"}`}
     
    >
      <div className="flex items-center gap-3">
        <img
          src={user.avatar}
          alt={user.name}         
          className='object-cover w-10 h-10 rounded-full'
        />
        <div className="flex-1" >
          <div className="font-semibold" >{user.name}</div>
          <div className="text-gray-500 text-sm">
            {user.lastMessage.substring(0, 50)}...
          </div>
        </div>
      </div>
    </div>
  );
};