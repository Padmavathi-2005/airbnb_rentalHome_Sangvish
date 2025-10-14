import React from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';

// Reusable Counter Component
function Counter({ label, subLabel, count, onIncrement, onDecrement, min = 0 }) {
  return (
    <div className='py-4 flex justify-between items-center'>
      <div>
        <h2 className='font-semibold text-lg'>{label}</h2>
        <p className='font-medium text-gray-500'>{subLabel}</p>
      </div>
      <div className='flex justify-between items-center'>
        <button
          type="button"
          onClick={onDecrement}
          disabled={count <= min}
          className={`mx-2 p-2 border-gray-300 rounded-full border ${count <= min ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-600'
            }`}
        >
          <MinusIcon className='w-5 h-5 stroke-gray-500' />
        </button>
        <span className='p-3 text-lg'>{count}</span>
        <button
          type="button"
          onClick={onIncrement}
          className='mx-2 p-2 border-gray-300 hover:border-gray-600 rounded-full border'
        >
          <PlusIcon className='w-5 h-5 stroke-gray-500 hover:stroke-gray-800' />
        </button>
      </div>
    </div>
  );
}

function Guests({ guestCounts, onGuestChange, wide = false, className = "" }) {
  const handleIncrement = (type) => onGuestChange(type, guestCounts[type] + 1);

  const handleDecrement = (type, min = 0) => {
    if (guestCounts[type] > min) onGuestChange(type, guestCounts[type] - 1);
  };

  const widthClass = wide
    ? "w-96 sm:w-[550px]"
    : "w-full max-w-5xl w-3/6";

  return (
    <div
      className={`bg-white border border-[#c5c5c5] rounded-[25px] px-8 py-8 shadow-lg animate-slide-right ${widthClass} ${className}`}
    >
      <Counter
        label='Adults'
        subLabel='Age 13 or above'
        count={guestCounts.adults}
        onIncrement={() => handleIncrement('adults')}
        onDecrement={() => handleDecrement('adults', 1)} // min = 1
        min={1} // prevents going below 1
      />

      <Counter
        label='Children'
        subLabel='Ages 2–12'
        count={guestCounts.children}
        onIncrement={() => handleIncrement('children')}
        onDecrement={() => handleDecrement('children')}
      />

      <Counter
        label='Infants'
        subLabel='Under 2'
        count={guestCounts.infants}
        onIncrement={() => handleIncrement('infants')}
        onDecrement={() => handleDecrement('infants')}
      />

      <Counter
        label='Pets'
        subLabel='Bringing a service animal?'
        count={guestCounts.pets}
        onIncrement={() => handleIncrement('pets')}
        onDecrement={() => handleDecrement('pets')}
      />
    </div>
  );
}

export default Guests;
