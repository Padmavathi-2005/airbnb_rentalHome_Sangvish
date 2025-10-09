import { X } from 'lucide-react';
import React from 'react'

function Model({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative  my-5 shadow-lg px-2 w-150">
        <div className='p-4 h-[80vh] rounded-xl bg-white max-h-[700px] overflow-y-auto'> 
          {children}
        </div>
        

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
        
         <X />
        </button>
      </div>
    </div>
  );
}

export default Model