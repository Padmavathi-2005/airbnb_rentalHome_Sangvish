import React from 'react'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, format } from 'date-fns';
import DayCell from './DayCell';


function CalendarMonth({ monthDate, startDate, endDate, hoverDate, onDateClick, onHoverDate }) {


const monthStart = startOfMonth(monthDate);
const monthEnd = endOfMonth(monthDate);
const gridStartDate = startOfWeek(monthStart);
const gridEndDate = endOfWeek(monthEnd);


const rows = [];
let days = [];
let day = gridStartDate;

while(day <= gridEndDate){
    for (let i=0; i<7; i++){
        days.push(day);
        day = addDays(day,1);
    }
    rows.push(days);
    days =[];
}


  return (
   <div className="flex-1">
    <div className="text-center font-bold mb-2">{format(monthDate, 'MMMM yyyy')}</div>
    <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-2">
        <div>S</div>
        <div>M</div>
        <div>t</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
    </div>
    <div className="grid grid-cols-7 ">
       {rows.flat().map((d, idx)=>(
      <DayCell
            key={idx}
            date={d}
            isCurrentMonth={isSameMonth(d, monthDate)}
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
            onDateClick={onDateClick}
            onHoverDate={onHoverDate}
        />

       ))}
    </div>
   </div>



  )
}

export default CalendarMonth