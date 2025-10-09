import { Send } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';


export const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
      <div className="p-4 rounded-br-lg border-t border-gray-300 bg-gray-50">
    <form
      onSubmit={handleSubmit}
      className="flex gap-2"
    >
      <motion.input
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a Message..."
        disabled={disabled}
        className="
          flex-1 px-4 py-3 border border-gray-300
          rounded-full outline-none bg-white text-base
          transition focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed
        "
      />
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        type="submit"
        disabled={!message.trim() || disabled}
        className={`
          p-2 w-12 h-12 bg-theme text-white border-none rounded-full cursor-pointer
          transition  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center
        `}
      >
        <Send />
      </motion.button>
    </form>
  </div>
  );
};