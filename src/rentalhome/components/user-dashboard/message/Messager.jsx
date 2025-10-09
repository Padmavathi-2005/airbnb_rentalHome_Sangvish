import React, { useState, useEffect } from 'react';
import { MessageSidebar } from './MessageSidebar';
import { ChatWindow } from './ChatWindow';
import { BookingInfoPanel } from './BookingInfoPanel';
import { fetchUsers, fetchMessages, sendMessage } from '../../../services/NewApi';

export const Messager = () => {
  const [users, setUsers] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // Load users on component mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoadingUsers(true);
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Failed to load users:', error);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    loadUsers();
  }, []);

  // Load messages when active user changes
  useEffect(() => {
    if (activeUserId) {
      const loadMessages = async () => {
        try {
          setIsLoadingMessages(true);
          const fetchedMessages = await fetchMessages(activeUserId);
          // Convert timestamp strings to Date objects if needed
          const messagesWithDates = fetchedMessages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          setMessages(messagesWithDates);
        } catch (error) {
          console.error('Failed to load messages:', error);
          setMessages([]);
        } finally {
          setIsLoadingMessages(false);
        }
      };

      loadMessages();
    } else {
      setMessages([]);
    }
  }, [activeUserId]);

  const handleUserSelect = (userId) => {
    setActiveUserId(userId);
  };

  const handleSendMessage = async (messageText) => {
    if (!activeUserId) return;

    const optimisticMessage = {
      id: `temp-${Date.now()}`,
      senderId: 'current_user',
      text: messageText,
      timestamp: new Date(),
    };

    // Optimistic update
    setMessages(prev => [...prev, optimisticMessage]);
    setIsSendingMessage(true);

    try {
      const sentMessage = await sendMessage(activeUserId, messageText);
      
      // Replace optimistic message with real message
      setMessages(prev => 
        prev.map(msg => 
          msg.id === optimisticMessage.id 
            ? { ...sentMessage, timestamp: new Date(sentMessage.timestamp) }
            : msg
        )
      );
    } catch (error) {
      console.error('Failed to send message:', error);
      // Remove optimistic message on error
      setMessages(prev => 
        prev.filter(msg => msg.id !== optimisticMessage.id)
      );
    } finally {
      setIsSendingMessage(false);
    }
  };

  const activeUser = users.find(user => user.id === activeUserId) || null;

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>     
    
      <MessageSidebar
        users={users}
        activeUserId={activeUserId}
        onUserSelect={handleUserSelect}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isLoading={isLoadingUsers}
      />
      
      <ChatWindow
        activeUser={activeUser}
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoadingMessages={isLoadingMessages}
        isSendingMessage={isSendingMessage}
      />    
      
      <BookingInfoPanel activeUserId={activeUserId} />
    </div>
  );
};