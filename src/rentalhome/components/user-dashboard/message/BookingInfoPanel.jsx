import React from 'react';
import { PropertyInfo } from './PropertyInfo';
import { PaymentDetails } from './PaymentDetails';

export const BookingInfoPanel = ({ activeUserId }) => {
  // Only show booking info when a user is selected
  if (!activeUserId) {
    return (
       <div className="w-72  p-4 bg-gray-50 flex  items-center justify-center text-gray-500">
        Select a conversation to view booking details
      </div>
    );
  }

  return (
   <div className="w-72 p-2 overflow-y-auto">
    <div className='bg-gray-50 p-4 rounded-xl shadow-lg'>
      <PropertyInfo />
      <PaymentDetails />
    </div>
    </div>
  );
};