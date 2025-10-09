import React, { useState } from 'react';
import DatePicker from './calander/DatePicker';


function Calander({ onDateSelect }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      onDateSelect?.(date, null);   //  send start date
    } else if (startDate && !endDate) {
      if (date > startDate) {
        setEndDate(date);
        onDateSelect?.(startDate, date);  //  send both
      } else {
        setStartDate(date);
        onDateSelect?.(date, null);       //  send only new start
      }
    }
  };

  return (
    <DatePicker 
      currentStartDate={startDate}
      currentEndDate={endDate}
      currentHoverDate={hoverDate}
      onDateClick={handleDateClick}
      onHoverDate={setHoverDate}
    />
  );
}

export default Calander;