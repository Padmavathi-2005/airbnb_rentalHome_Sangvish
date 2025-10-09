import React, { useState } from 'react';
import InstantBooking from '../components/InstantBooking';
import RequestBooking from '../components/RequestBooking';
import { useDispatch, useSelector } from 'react-redux';
import RentalNavbar from '../components/RentalNavBar';


const Booking = () => {
  // Example state for payment option
const userData =  useSelector((state)=>state.arrayData);

const bookingType = userData.result.booking_type;

// console.log("user data request ",bookingType)


  return (
    <>
      <RentalNavbar/>
      {bookingType === 'instant' &&  <InstantBooking/>}
      {bookingType === 'request' &&  <RequestBooking/>}
   </>

   
  );
};

export default Booking;