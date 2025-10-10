import { MinusIcon, PlusIcon } from 'lucide-react';

function Counter({ label, subLabel, count, onIncrement, onDecrement }) {
  return (
    <div className='py-4 flex justify-between items-center border-b last:border-none border-gray-200'>
      <div>
        <h2 className='font-semibold text-lg text-gray-900'>{label}</h2>
        <p className='text-sm text-gray-500'>{subLabel}</p>
      </div>
      <div className='flex justify-between items-center'>
        <button
          onClick={onDecrement}
          disabled={count === 0}
          className={`mx-2 p-2 border-gray-300 rounded-full border ${
            count === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-600'
          }`}
        >
          <MinusIcon className='w-5 h-5 stroke-gray-500' />
        </button>
        <span className='p-3 text-gray-800 font-medium'>{count}</span>
        <button
          onClick={onIncrement}
          className='mx-2 p-2 border-gray-300 hover:border-gray-600 rounded-full border'
        >
          <PlusIcon className='w-5 h-5 stroke-gray-500 hover:stroke-gray-800' />
        </button>
      </div>
    </div>
  );
}
