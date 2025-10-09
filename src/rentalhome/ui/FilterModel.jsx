import React, { useState } from 'react'
import { FaCalendarAlt, FaParking, FaTv } from 'react-icons/fa';

function FilterModel() {



    const amenities = [
    {icon:<FaParking className='fill-theme'/>, name:'Free Cancellation'},
    {icon:<FaCalendarAlt/>, name:'Free Parking'},
    {icon:<FaTv/>, name:'TV'},
    {icon:<FaTv/>, name:'WIFI'}]

    const [filterType, setFiletertype] = useState('any')


    const handleFilterType =(type)=>{
        console.log("active")
        setFiletertype(type)
    }

    const min = 50;
    const max = 10000;
    const step = 50;

    const [minValue, setMinValue] = useState(500);
    const [maxValue, setMaxValue] = useState(5000);

    // Ensure thumbs don’t cross
    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxValue - step);
        setMinValue(value);
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minValue + step);
        setMaxValue(value);
    };



const CounterCard = ({ label }) => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-300 shadow-xl w-40">
      <span className="text-lg font-medium mb-3">{label}</span>
      <div className="flex items-center gap-4">
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full bg-theme-20 text-red-600 text-xl font-bold"
          onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
        >
          −
        </button>
        <span className="text-lg font-medium">{count}</span>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full bg-theme text-white text-xl font-bold"
          onClick={() => setCount((prev) => prev + 1)}
        >
          +
        </button>
      </div>
    </div>
      );
    };


    return (
    <div className='space-y-5'>
        <div className='text-center model-header'>
            <h2 className='text-2xl font-bold'>Filter</h2>
        </div>
        <div className='h-[2px] bg-gray-200'></div>
        <div className='model-body space-y-4 py-3'>
            <div className='space-y-5 px-5'>
                <div className='flex justify-between'>
                    <p className='font-semibold text-lg'>Recommended for you</p>
                    <button>All</button>
                </div>
                <div className='flex flex-wrap'>
                    {amenities.map((item,id)=>(
                    <div key={id} className='bg-theme-20 mx-3 my-3 gap-2 text-center justify-center items-center rounded-full px-4 py-2 flex'><span className='bg-white p-1 rounded'>{item.icon}</span>{item.name}</div>
                    ))}
                </div>
            </div>
            <div className='h-[2px] bg-gray-200'></div>
            <div className='space-y-5 px-5'>
                <div className='flex justify-between'>
                    <p className='font-semibold text-lg'>Type of place</p>                    
                </div>
                <div className='flex rounded-full px-3 py-2 bg-theme-20 justify-between'>
                    <span onClick={()=>handleFilterType('any')} className={`px-5 ${filterType == 'any' && 'bg-theme text-white'} py-2  text-black rounded-full`}>Any Type</span>
                    <span onClick={()=>handleFilterType('room')} className={`px-5 ${filterType == 'room' && 'bg-theme text-white'} py-2  text-black rounded-full`}>Room</span>
                    <span onClick={()=>handleFilterType('entire')} className={`px-5 ${filterType == 'entire' && 'bg-theme text-white'} py-2  text-black rounded-full`}>Entire Home</span>
                </div>                
            </div>
            <div className='h-[2px] bg-gray-200'></div>   
            <div className="w-full max-w-xl mx-auto px-4 py-8">
                <h2 className="text-lg font-semibold mb-4">Select Price Range</h2>
                <div className="relative w-full h-2">
                    {/* Slider track (background) */}
                    <div className="absolute top-0 bottom-0 w-full rounded-full bg-gray-300" />
                    {/* Highlighted range */}
                    <div
                    className="absolute top-0 bottom-0 rounded-full bg-theme"
                    style={{
                        left: `${((minValue - min) / (max - min)) * 100}%`,
                        right: `${100 - ((maxValue - min) / (max - min)) * 100}%`,
                    }}
                    />
                    {/* Min Thumb */}
                    <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={minValue}
                    onChange={handleMinChange}          
                    className={`absolute w-full appearance-none bg-transparent pointer-events-none           
                    [&::-webkit-slider-thumb]:pointer-events-auto
                    [&::-moz-range-thumb]:h-5 
                    [&::-moz-range-thumb]:w-5 
                    [&::-moz-range-thumb]:rounded-full 
                    [&::-moz-range-thumb]:bg-blue-500
                    [&::-moz-range-thumb]:cursor-pointer 
                    [&::-moz-range-thumb]:pointer-events-auto`}          
                    />

                    {/* Max Thumb */}
                    <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={maxValue}
                    onChange={handleMaxChange}
                    className="absolute w-full appearance-none bg-transparent pointer-events-none
                    [&::-webkit-slider-thumb]:pointer-events-auto
                    [&::-moz-range-thumb]:h-5 
                    [&::-moz-range-thumb]:w-5 
                    [&::-moz-range-thumb]:rounded-full 
                    [&::-moz-range-thumb]:bg-blue-500
                    [&::-moz-range-thumb]:cursor-pointer 
                    [&::-moz-range-thumb]:pointer-events-auto
                    "
                    />
                </div>
                {/* Selected values */}
                <div className="flex justify-between mt-6 text-sm font-medium text-gray-700">
                    <span>Minimum: ${minValue}</span>
                    <span>Maximum: ${maxValue}</span>
                </div>
            </div> 
             <div className='h-[2px] bg-gray-200'></div>   
             <div>
               <h2 className="text-lg font-semibold mb-4">Rooms & Beds</h2>       
                  <div className="flex gap-6">
                    <CounterCard label="Bedrooms" />
                    <CounterCard label="Beds" />
                    <CounterCard label="Bathrooms" />
                  </div>
             </div>
        </div>
    </div>


    );
}


export default FilterModel