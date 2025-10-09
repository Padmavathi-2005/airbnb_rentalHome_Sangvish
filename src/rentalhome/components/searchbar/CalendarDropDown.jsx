import React, { useState, useEffect } from 'react';
import {
  format, addMonths, subMonths, startOfMonth, endOfMonth,
  startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay,
  isBefore, isAfter, startOfToday
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function CalendarDropDown({ setCheckIn, setCheckOut }) {
  const CalenderDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));

  const handleDateClick = (date) => {
    if (isBefore(date, startOfToday())) return;

    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(date);
      setCheckOutDate(null);
    } else if (isBefore(date, checkInDate)) {
      setCheckInDate(date);
      setCheckOutDate(null);
    } else {
      setCheckOutDate(date);
    }
  };

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      setCheckIn(format(checkInDate, "dd/MM/yyyy"));
      setCheckOut(format(checkOutDate, "dd/MM/yyyy"));
    }
  }, [checkInDate, checkOutDate, setCheckIn, setCheckOut]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const prevMonth = () => {
    const prev = subMonths(currentMonth, 1);
    // block going to any month earlier than current
    if (!isBefore(prev, startOfMonth(new Date()))) {
      setCurrentMonth(prev);
    }
  };

  const isPrevDisabled = isSameMonth(currentMonth, new Date());

  // --- UPDATED generateCalendarCells FUNCTION ---
const generateCalendarCells = (month) => {
  const today = startOfToday();
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const days = [];

  // Get the first day of the week for proper positioning
  const startDate = startOfWeek(monthStart);
  const daysFromStart = Math.abs(monthStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  // Add empty cells for days before the month starts
  for (let i = 0; i < daysFromStart; i++) {
    days.push(
      <div key={`empty-${i}`} className="p-2 text-center rounded-lg">
        {/* Empty cell */}
      </div>
    );
  }

  // Add only current month days
  let date = monthStart;
  while (date <= monthEnd) {
    const cloneDate = date;
    const isDisabled = isBefore(cloneDate, today);

    const isSelected =
      (checkInDate && isSameDay(cloneDate, checkInDate)) ||
      (checkOutDate && isSameDay(cloneDate, checkOutDate));

    const isInRange =
      checkInDate &&
      checkOutDate &&
      isAfter(cloneDate, checkInDate) &&
      isBefore(cloneDate, checkOutDate);

    days.push(
      <div
        key={cloneDate.toISOString()}
        onClick={() => !isDisabled && handleDateClick(cloneDate)}
        className={`p-2 text-center rounded-lg ${
          isDisabled
            ? 'text-gray-400 cursor-not-allowed'
            : isSelected
            ? 'bg-theme text-white'
            : isInRange
            ? 'bg-theme-50'
            : 'hover:bg-gray-200 cursor-pointer'
        }`}
      >
        {format(cloneDate, 'd')}
      </div>
    );

    date = addDays(date, 1);
  }

  return days;
};


  const nextConsecutiveMonth = addMonths(currentMonth, 1);

  return (
    <div className="bg-white border border-[#c5c5c5] rounded-2xl p-6 shadow-lg w-full max-w-5xl">
      
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={prevMonth} disabled={isPrevDisabled}>
          <ChevronLeft />
        </button>
        <div className="flex gap-2 font-semibold">
          {format(currentMonth, 'MMMM yyyy')} & {format(nextConsecutiveMonth, 'MMMM yyyy')}
        </div>
        <button onClick={nextMonth}>
          <ChevronRight />
        </button>
      </div>

      {/* Two months side-by-side */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* First Month */}
        <div className="flex-1">
          <h2 className="text-center font-medium mb-2">{format(currentMonth, 'MMMM yyyy')}</h2>
          <div className="grid grid-cols-7 gap-2 text-center">
            {CalenderDays.map((day, id) => (
              <div key={id} className="font-medium text-gray-500">{day}</div>
            ))}
            {generateCalendarCells(currentMonth)}
          </div>
        </div>

        {/* Second Month */}
        <div className="flex-1">
          <h2 className="text-center font-medium mb-2">{format(nextConsecutiveMonth, 'MMMM yyyy')}</h2>
          <div className="grid grid-cols-7 gap-2 text-center">
            {CalenderDays.map((day, id) => (
              <div key={id} className="font-medium text-gray-500">{day}</div>
            ))}
            {generateCalendarCells(nextConsecutiveMonth)}
          </div>
        </div>

      </div>
    </div>
  );
}

export default CalendarDropDown;
