import React from 'react';

export const PropertyInfo = () => {
  return (
    <div className="mb-5">
      <h4 className="text-lg font-semibold mb-2">Entire Villa Test</h4>
      <div className="text-gray-600 text-sm mb-2">
        W68+67, Panglaj Bus Stand Rd, nr. Thaltejnagar, Panglaj, Madapur, 
        Main, Madupar, Tamil Nadu 629605, India
      </div>
      
      <div className="flex justify-between mb-4">
        <div>
          <div className="text-gray-600 text-xs">Check In</div>
          <div className="font-medium">19/04/2025</div>
        </div>
        <div>
          <div className="text-gray-600 text-xs">Check Out</div>
          <div className="font-medium">25/04/2025</div>
        </div>
      </div>
      
      <div className="bg-red-100 text-red-800 py-2 px-3 rounded-md text-sm flex items-center gap-2">
        👥 1 Guests
      </div>
    </div>
  );
};