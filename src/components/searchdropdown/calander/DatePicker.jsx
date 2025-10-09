import React, { useState } from 'react'
import CalendarMonth from './CalendarMonth'
import { set } from 'date-fns/fp';
import { RightArrow,LeftArrow } from '../../../ui/Svg';  // Correct relative path
function DatePicker({ currentStartDate, currentEndDate, currentHoverDate, onDateClick, onHoverDate }) {

    const [currentMonth, setCurrentMonth] = useState(new Date());

    const today = new Date();
    const isAtMinMonth = currentMonth.getFullYear()===today.getFullYear()&&
                            currentMonth.getMonth()=== today.getMonth();



    
    const nextMonth=()=>{
        const next = new Date(currentMonth);
        next.setMonth(next.getMonth()+1)
        setCurrentMonth(next)
    }

    
    const prevMonth = () => {
        const prev = new Date(currentMonth);
        prev.setMonth(prev.getMonth() - 1);
        setCurrentMonth(prev);
    };

    const getTwoMonths = () => {
        const month1 = new Date(currentMonth);
        const month2 = new Date(currentMonth);
        month2.setMonth(month2.getMonth() + 1);
        return [month1, month2];
    };



  return (
    <div className='bg-white rounded-2xl p-6 shadow-lg w-full max-w-4xl'>
        <div className="flex justify-between items-center mb-4">
                <button className={`bg-[#e5e7eb] rounded-[100px] w-[35px] h-[35px] text-xl ${isAtMinMonth ? 'text-gray-300 bg-[#ffffff] cusron-not-allowed' : ''}`} 
                    onClick={()=>{
                        if(!isAtMinMonth) prevMonth();
                    }}>
                      <RightArrow/>       
                </button>
                <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-full bg-gray-200 font-medium">Date</button>
                    <button className="px-4 py-2 rounded-full hover:bg-gray-100">Months</button>
                    <button className="px-4 py-2 rounded-full hover:bg-gray-100">Flexible</button>
                </div>
                <button className="bg-[#e5e7eb] rounded-[100px] w-[35px] h-[35px] text-xl" onClick={nextMonth}> <LeftArrow/> </button>
            </div>
        <div className="flex gap-8">
            {getTwoMonths().map((month,idx)=>(
                <CalendarMonth
                    key={idx}
                    monthDate={month}
                    startDate={currentStartDate}
                    endDate={currentEndDate}
                    hoverDate={currentHoverDate}
                    onDateClick={onDateClick}
                    onHoverDate={onHoverDate}
                />

            ))}
        
        </div>

    </div>
  )
}

export default DatePicker