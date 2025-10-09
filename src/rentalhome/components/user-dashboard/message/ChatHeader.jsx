import React from 'react';

export const ChatHeader = ({ activeUser }) => {
  if (!activeUser) {
    return (
      <div 
       className='bg-gray-100 p-2 rounded-tr-lg flex items-center gap-4'
      >        Select a conversation
      </div>
    );
  }

  return (
    <div 
     className='bg-gray-100 p-2 rounded-tr-lg flex items-center gap-4'
    >
      <img
      className='w-12 h-12 object-cover rounded-full'
        src={activeUser.avatar}
        alt={activeUser.name}
      />
      <div>
        <div className="font-bold">{activeUser.name}</div>
        <div className="text-gray-600 text-xl" style={{ color: '#666', fontSize: '14px' }}>Online</div>
      </div>
    </div>
  );
};