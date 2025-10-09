import React from 'react';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

export const ChatWindow = ({
  activeUser,
  messages,
  onSendMessage,
  isLoadingMessages,
  isSendingMessage
}) => {
  return (
    <div className="rounded-r-lg border border-gray-300 flex-1 flex flex-col h-full">
      <ChatHeader activeUser={activeUser} />
      
      <MessageList 
        messages={messages} 
        isLoading={isLoadingMessages}
      />
      
      {activeUser && (
        <MessageInput 
          onSendMessage={onSendMessage}
          disabled={isSendingMessage}
        />
      )}
    </div>
  );
};