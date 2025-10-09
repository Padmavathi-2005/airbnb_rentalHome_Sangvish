import React, { useState } from 'react'
import CalendarDropDown from "../../searchbar/CalendarDropDown";


function Calender() {

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [available , setAvailable] = useState(true);

  return (
    <div className='mx-auto py-5 flex justify-center'>
      {/* <h1>{checkIn}, {checkOut}</h1> */}
      <CalendarDropDown 
        setCheckIn={setCheckIn}   
        setCheckOut={setCheckOut}
      />
    </div>
  )
}

export default Calender