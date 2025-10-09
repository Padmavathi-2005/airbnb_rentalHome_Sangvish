import React, { useState } from 'react';
import { FaRegUser,FaChevronDown,FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';

import upi from '../images/upi.png'
import netbanking from '../images/netbanking.png'
import creditcard from '../images/creditcard.png'

const paymentMethods = [
  {
    key: "upi",
    label: "UPI",
    icon: upi,
    labelValue:"Paying with UPI",
  },
  {
    key: "card",
    label: "Credit or debit card",
    icon: creditcard, // Sample icon
    labelValue:"Credit or debit card",
  },
  {
    key: "netbanking",
    label: "Net Banking",
    icon:netbanking, // Sample icon
    labelValue:"Net Banking",
  },
];


function RequestBooking() {

const checkIn =  useSelector((state)=>state.checkIn)
const checkOut =  useSelector((state)=>state.checkOut)
const userData =  useSelector((state)=>state.arrayData)

const [agree, setAgree] = useState(false)

const [selected, setSelected] = useState(paymentMethods[0]);
  const [open, setOpen] = useState(false);


console.log("array data",userData)
  return (
    <section>    
        <div className="max-w-7xl mx-auto bg-white pt-25 pb-10 px-4 space-y-6">



            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <span className='bg-theme p-2 rounded-full'>
                  <FaChevronLeft className='text-white'/>
                </span>
                <h2 className='text-xl font-semibold'>Request to book</h2>
              </div>
              <button className='bg-theme px-5 py-3 rounded-xl text-white'>
                Request to book
              </button>
            </div>

            
            {/* Parent Grid */}
            <div className='grid grid-cols-12 gap-4 py-3 px-3 items-center border border-gray-200 rounded-xl shadow-[0px_6px_30px_0px_rgba(181,181,181,0.23)]'>

                {/* Left Column */}
                <div className='col-span-12 lg:col-span-6'> {/* Full width on mobile, half on lg */}
                  <div className='px-5 py-5'>
                      
                      {/* Image + title section */}
                      <div className='grid grid-cols-12 gap-4 items-center justify-between'>
                      <div className="col-span-12 sm:col-span-6 flex-shrink-0">
                          <img
                          src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4"
                          alt="Couple Private Studio"
                          className="rounded-[20px_20px_60px_20px] w-full h-40 object-cover"
                          />
                      </div>
                      <div className='col-span-12 sm:col-span-6 mt-4 sm:mt-0'>
                          <h3 className="font-semibold text-lg text-gray-800 mb-1">
                        {userData.title}
                          </h3>
                          <p className="text-sm text-gray-500">Entire rental unit</p>
                          <div className="flex items-center mt-2 flex-wrap text-sm">
                          <span className="text-theme font-bold text-base">★ 5.00</span>
                          <span className="ml-1">(reviews)</span>
                          <span className="sm:ml-3 text-gray-500 flex items-center mt-1 sm:mt-0">
                              <FaRegUser />
                              <span className="ml-1">Superhost</span>
                          </span>
                          </div>
                      </div>
                      </div>

                      {/* Booking Details */}
                      <div className="mt-6">
                      <h4 className="font-semibold text-lg">Booking Day & Date</h4>

                      <div className="flex justify-between items-center mt-2 flex-wrap">
                          <div>
                          <p className="text-md font-semibold text-theme-black">Dates</p>
                          <p className="text-sm">{checkIn} to {checkOut}</p>
                          </div>
                          <button className="text-theme text-sm font-semibold mt-2 sm:mt-0">
                          Edit
                          </button>
                      </div>

                      <div className="flex justify-between items-center mt-2 flex-wrap">
                          <div>
                          <p className="text-md font-semibold text-theme-black">Guests</p>
                          <p className="text-sm text-gray-700">2 Guests , 5 infants</p>
                          </div>
                          <button className="text-theme text-sm font-semibold mt-2 sm:mt-0">
                          Edit
                          </button>
                      </div>
                      </div>
                  </div>                
                </div>

                <div className='col-span-1 mx-auto h-full py-10 bg-gray-300 w-[1px]'>
                  
                </div>

                

                {/* Right Column */}
                <div className='col-span-12 lg:col-span-5 mt-6 lg:mt-0 py-5'>
                  <div className="bg-theme-10 rounded-xl p-6">
                      <h3 className="font-semibold text-lg text-gray-800 mb-3">Your total</h3>
                      <div className="flex justify-between text-gray-700 text-sm mb-2">
                      <span>1 night * {userData.property_price.price}</span>
                      <span className="font-semibold">$ {userData.property_price.price}</span>
                      </div>
                      <div className="flex justify-between text-gray-700 text-sm mb-2">
                      <span>Taxes</span>
                      <span className="font-semibold">$ 0</span>
                      </div>
                      <hr className="mb-4 border-gray-300" />
                      <div className="flex justify-between text-base font-semibold text-gray-800">
                      <span>Total (INR)</span>
                      <span>$ {userData.property_price.price}</span>
                      </div>
                  </div>                 
                </div>
            </div>

            <div className='grid grid-cols-12 gap-4 items-center'>
              <div className='col-span-6 space-y-3'>
                <h2 className='text-xl font-semibold'>Write a message to the host</h2>
                <div className='bg-theme-20 py-4 px-3 space-y-4 rounded-xl'>
                  <div className='flex items-center gap-4'>
                    <img className='w-10 shadow-lg rounded-full' src={userData.users.profile_src} alt="" />
                      <div>
                          <h3>{userData.users.first_name}</h3>
                          <span>Joined in {new Date(userData.users.created_at).getUTCFullYear()}</span>

                      </div>
                  </div>
                  <div className='bg-white p-3 rounded-xl'>
                    <textarea name="" id="" placeholder='Write a messge'></textarea>
                  </div>
                </div>
              </div>
               <div className="col-span-6 rounded-lg p-6 space-y-3">
                  <h2 className='text-xl font-semibold'>Payment</h2>
                  <div className="bg-white border border-gray-400 py-10 px-3 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                      <span className="text-base font-semibold text-gray-700">Pay with</span>
                  </div>
                  <div className="relative">
                      <button
                      className="w-full flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-700 justify-between"
                      onClick={() => setOpen((o) => !o)}
                      >
                      <div className="flex items-center">
                          <img src={selected.icon} alt={selected.label} className="w-10 h-6 mr-2" />
                          <span className="font-medium">{selected.label}</span>
                      </div>
                      <FaChevronDown className={`ml-2 w-5 h-5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
                      </button>

                      {/* Dropdown */}
                      {open && (
                      <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                          {paymentMethods.map((mth) => (
                          <button
                              key={mth.key}
                              className={`w-full flex items-center px-4 py-3 hover:bg-gray-50 text-left ${
                              selected.key === mth.key ? "bg-gray-100 font-semibold" : ""
                              }`}
                              onClick={() => {
                              setSelected(mth);
                              setOpen(false);
                              }}
                          >
                              <img src={mth.icon} alt={mth.label} className="w-10 h-6 mr-2 object-cover" />
                              <span>{mth.label}</span>
                              {selected.key === mth.key && (
                              <svg
                                  className="ml-auto w-5 h-5 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                              >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              )}
                          </button>
                          ))}
                      </div>
                      )}
                  </div>
                  </div>
              </div>
            </div>

             {/* Cancellation + Rules */}
              <div className=" py-4">
                  <h3 className="font-semibold text-gray-800 text-base mb-2">
                  Cancellation Policy
                  </h3>
                  <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Free cancellation before 18 Sept</span>. Cancel before check-in on 19 Sept for a partial refund.{" "}
                  <span className="text-gray-500 underline cursor-pointer">Learn more</span>
                  </p>
                  <h3 className="font-semibold text-gray-800 text-base mt-4 mb-2">Ground Rules</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                  <li>Follow the house rules</li>
                  <li>Treat your Host’s home like your own</li>
                  </ul>
              </div>
          
        </div>
        
    </section>
  )
}

export default RequestBooking