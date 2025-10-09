import React from 'react';
import { isSameDay, isWithinInterval, isBefore, isAfter, isToday } from 'date-fns';

function DayCell({ date, isCurrentMonth, startDate, endDate, hoverDate, onDateClick, onHoverDate }) {

    const today = new Date();

    // Check if this date is before today (past date)
    const isPast = isBefore(date, today) && !isSameDay(date, today);

    // If this cell is not part of the current month, render an empty space
    if (!isCurrentMonth) {
        return <div className="h-11"></div>;
    }

    // Check if this date is start or end date of selection
    const isStart = startDate && isSameDay(date, startDate);
    const isEnd = endDate && isSameDay(date, endDate);

    // Hover preview logic for range selection (before confirming endDate)
    const inHoverPreview = !endDate && startDate && hoverDate &&
        isWithinInterval(date, {
            start: isBefore(hoverDate, startDate) ? hoverDate : startDate,
            end: isAfter(hoverDate, startDate) ? hoverDate : startDate
        });

    // Check if this date is within the selected range (or hover preview range)
    const isInRange = (startDate && endDate && isWithinInterval(date, { start: startDate, end: endDate })) ||
                      inHoverPreview;

    return (
        <div
            className={`relative h-12  flex items-center justify-center text-sm 
              ${isInRange && isStart ? 'rounded-l-full bg-transparent' : '' && isEnd ? 'rounded-r-full bg-transparent' : ''}`}
            onClick={() => {
                if (!isPast) {
                    onDateClick(date);
                }
            }}
            onMouseEnter={() => {
                if (!isPast) {
                    onHoverDate && onHoverDate(date);
                }
            }}
        >
            {/* Background Range Bar Layer  */}
            {isInRange && (
        <div
            className={`absolute top-1/2 left-0 right-0 -translate-y-1/2 h-11 bg-gray-200
                ${isStart ? 'rounded-l-full left-5' : ''}
                ${isEnd ? 'rounded-r-full right-5' : ''}`}
        >
        </div>
    )}


            {/* Date Number Circle (Foreground Layer) ${isToday(date) ? 'border border-black' : ''} */}
            <div className={`relative z-10 h-11 w-11 flex items-center justify-center
                ${isStart || isEnd ? 'bg-black text-white rounded-full' : ''}
                
                ${isPast ? 'text-gray-300 cursor-not-allowed' : 'text-neutral-900 font-medium cursor-pointer'}`}>
                {date.getDate()}
            </div>
        </div>
    );
}

export default DayCell;
