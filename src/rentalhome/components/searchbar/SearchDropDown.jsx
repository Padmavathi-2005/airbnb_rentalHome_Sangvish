import React from 'react'
import LocationDropDown from './LocationDropDown'
import { Calendar } from 'lucide-react'
import CalendarDropDown from './CalendarDropDown'

function SearchDropDown({DropDown,setCheckIn,setCheckOut,setLocation}) {



  return (
    <div className='absolute z-10 w-full flex top-[100px]'>
      
    {DropDown === "Location" ? (<LocationDropDown setLocation={setLocation}/>) : (null)}
    {DropDown === "date" ? (<CalendarDropDown  
      setCheckIn={setCheckIn} 
      setCheckOut={setCheckOut}/>)
    : (null)}
    {/* <CalendarDropDown/> */}       
    </div>
  )
}

export default SearchDropDown