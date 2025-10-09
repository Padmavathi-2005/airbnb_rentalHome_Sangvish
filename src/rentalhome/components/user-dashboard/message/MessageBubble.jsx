import React from 'react';

export const MessageBubble = ({ message, isCurrentUser }) => {
  return (
    <div className={`flex flex-col w-full ${isCurrentUser ? 'items-end' : 'items-start'}`}>
      <div className={`
        max-w-[70%] py-2 px-5 rounded-full
        mb-2 break-words 
        ${isCurrentUser ? 'bg-green-300 text-black self-end' : 'bg-gray-100 text-black self-start'}
      `}>
        {message.text}
      </div>
      <div className={`
        text-xs text-gray-500 mt-1 
        ${isCurrentUser ? 'text-right' : 'text-left'}
      `}>
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};
