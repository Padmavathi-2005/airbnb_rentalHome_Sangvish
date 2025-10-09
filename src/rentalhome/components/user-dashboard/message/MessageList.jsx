import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';

export const MessageList = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (isLoading) {
    return (
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        Loading messages...
      </div>
    );
  }

  return (
    <div style={{ 
      flex: 1, 
      padding: '16px', 
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      {messages.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          color: '#666',
          marginTop: '20px'
        }}>
          No messages yet. Start a conversation!
        </div>
      ) : (
        messages.map(message => (
          <MessageBubble
            key={message.id}
            message={message}
            isCurrentUser={message.senderId === 'current_user'}
          />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};