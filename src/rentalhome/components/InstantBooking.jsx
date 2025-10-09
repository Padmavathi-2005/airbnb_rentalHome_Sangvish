import React from 'react'

function InstantBooking() {
  return (
    <div>InstantBooking</div>
  )
}

export default InstantBooking



// import React, { useState } from 'react';
// import { FaRegUser,FaChevronDown } from "react-icons/fa";
// import { useDispatch, useSelector } from 'react-redux';

// import upi from '../images/upi.png'
// import netbanking from '../images/netbanking.png'
// import creditcard from '../images/creditcard.png'
// import Model from '../ui/Model';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import CheckoutForm from './CheckoutForm';
// import { createBooking } from '../services/NewApi';



// const paymentMethods = [
//   {
//     key: "upi",
//     label: "UPI",
//     icon: upi,
//     labelValue:"Paying with UPI",
//   },
//   {
//     key: "Stripe",
//     label: "Credit or debit card (Stripe)",
//     icon: creditcard, // Sample icon
//     labelValue:"Credit or debit card",
//   },
//   {
//     key: "netbanking",
//     label: "Net Banking",
//     icon:netbanking, // Sample icon
//     labelValue:"Net Banking",
//   },
// ];

// function InstantBooking() {

// const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh'); // use your publishable key

// const handleConfirmPay = async () => {
//   try {
//     const result = await createBooking(payload, userId);

//     if (result.payment_method === 'stripe') {
//       const stripePromise = loadStripe(result.publishable_key); //  get key from backend

//       // Open your modal with Stripe
//       setStripePaymentData({
//         stripePromise,
//         clientSecret: result.client_secret,
//       });
//       setIsOpen(true);
//     }
//   } catch (err) {
//     console.error(err);
//     alert('Booking failed');
//   }
// };
    
// const location =  useSelector((state)=>state.location)
// const checkIn =  useSelector((state)=>state.checkIn)
// const checkOut =  useSelector((state)=>state.checkOut)
// const userData =  useSelector((state)=>state.arrayData)
// const guestsCount =  useSelector((state)=>state.guests)

//   const [isOpen, setIsOpen] = useState(true);



// const [agree, setAgree] = useState(false)

// const [selected, setSelected] = useState(paymentMethods[1]);
//   const [open, setOpen] = useState(false);

//   return (
//     <section>    
//         <div className="max-w-7xl mx-auto bg-white pt-10 pb-10 px-4">
//             {/* <h1>{location},{checkOut},{checkIn}</h1> */}
//             {/* Parent Grid */}
//             <div className='grid grid-cols-12 gap-4'>

//                 {/* Left Column */}
//                 <div className='col-span-12 lg:col-span-6'> {/* Full width on mobile, half on lg */}
//                 <div className='p-6 rounded-xl shadow-[0px_6px_30px_0px_rgba(181,181,181,0.23)]'>
                    
//                     {/* Image + title section */}
//                     <div className='grid grid-cols-12 gap-4 items-center justify-between'>
//                     <div className="col-span-12 sm:col-span-6 flex-shrink-0">
//                         <img
//                         src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4"
//                         alt="Couple Private Studio"
//                         className="rounded-[20px_20px_60px_20px] w-full h-40 object-cover"
//                         />
//                     </div>
//                     <div className='col-span-12 sm:col-span-6 mt-4 sm:mt-0'>
//                         <h3 className="font-semibold text-lg text-gray-800 mb-1">
//                         {userData.title}
//                         </h3>
//                         <p className="text-sm text-gray-500">Entire rental unit</p>
//                         <div className="flex items-center mt-2 flex-wrap text-sm">
//                         <span className="text-theme font-bold text-base">★ 5.00</span>
//                         <span className="ml-1">(reviews)</span>
//                         <span className="sm:ml-3 text-gray-500 flex items-center mt-1 sm:mt-0">
//                             <FaRegUser />
//                             <span className="ml-1">Superhost</span>
//                         </span>
//                         </div>
//                     </div>
//                     </div>

//                     {/* Booking Details */}
//                     <div className="mt-6">
//                     <h4 className="font-semibold text-lg">Booking Day & Date</h4>

//                     <div className="flex justify-between items-center mt-2 flex-wrap">
//                         <div>
//                         <p className="text-md font-semibold text-theme-black">Dates</p>
//                         <p className="text-sm">{checkIn} to {checkOut}</p>
//                         </div>
//                         <button className="text-theme text-sm font-semibold mt-2 sm:mt-0">
//                         Edit
//                         </button>
//                     </div>

//                     <div className="flex justify-between items-center mt-2 flex-wrap">
//                         <div>
//                         <p className="text-md font-semibold text-theme-black">Guests</p>
//                         <p className="text-sm text-gray-700">{guestsCount.adult} guest , {guestsCount.children} children, {guestsCount.infants} infants, {guestsCount.pets} pets</p>
//                         </div>
//                         <button className="text-theme text-sm font-semibold mt-2 sm:mt-0">
//                         Edit
//                         </button>
//                     </div>
//                     </div>
//                 </div>

//                 {/* Payment Dropdown */}
//                 <div className="rounded-lg py-6">
//                     <div className="bg-white rounded-xl">
//                     <div className="flex justify-between items-center mb-2">
//                         <span className="text-base font-semibold text-gray-700">Pay with</span>
//                     </div>
//                     <div className="relative">
//                         <button
//                         className="w-full flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-700 justify-between"
//                         onClick={() => setOpen((o) => !o)}
//                         >
//                         <div className="flex items-center">
//                             <img src={selected.icon} alt={selected.label} className="w-10 h-6 mr-2" />
//                             <span className="font-medium">{selected.label}</span>
//                         </div>
//                         <FaChevronDown className={`ml-2 w-5 h-5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
//                         </button>

//                         {/* Dropdown */}
//                         {open && (
//                         <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
//                             {paymentMethods.map((mth) => (
//                             <button
//                                 key={mth.key}
//                                 className={`w-full flex items-center px-4 py-3 hover:bg-gray-50 text-left ${
//                                 selected.key === mth.key ? "bg-gray-100 font-semibold" : ""
//                                 }`}
//                                 onClick={() => {
//                                 setSelected(mth);
//                                 setOpen(false);
//                                 }}
//                             >
//                                 <img src={mth.icon} alt={mth.label} className="w-10 h-6 mr-2 object-cover" />
//                                 <span>{mth.label}</span>
//                                 {selected.key === mth.key && (
//                                 <svg
//                                     className="ml-auto w-5 h-5 text-gray-500"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                 </svg>
//                                 )}
//                             </button>
//                             ))}
//                         </div>
//                         )}
//                     </div>
//                     </div>
//                 </div>
//                 </div>

//                 {/* Spacer (hide in mobile) */}
//                 <div className='hidden lg:block col-span-1'></div>

//                 {/* Right Column */}
//                 <div className='col-span-12 lg:col-span-5 mt-6 lg:mt-0'>
//                 <div className="bg-theme-10 rounded-xl p-6">
//                     <h3 className="font-semibold text-lg text-gray-800 mb-3">Your total</h3>
//                     <div className="flex justify-between text-gray-700 text-sm mb-2">
//                     <span>1 night *{userData.property_price.price}</span>
//                     <span className="font-semibold">$ {userData.property_price.price}</span>
//                     </div>
//                     <div className="flex justify-between text-gray-700 text-sm mb-2">
//                     <span>Taxes</span>
//                     <span className="font-semibold">$ 0</span>
//                     </div>
//                     <hr className="mb-4 border-gray-300" />
//                     <div className="flex justify-between text-base font-semibold text-gray-800">
//                     <span>Total (INR)</span>
//                     <span>$ {userData.property_price.price}</span>
//                     </div>
//                 </div>

//                 {/* Cancellation + Rules */}
//                 <div className="max-w-md py-4">
//                     <h3 className="font-semibold text-gray-800 text-base mb-2">
//                     Cancellation Policy
//                     </h3>
//                     <p className="text-sm text-gray-700 mb-2">
//                     <span className="font-semibold">Free cancellation before 18 Sept</span>. Cancel before check-in on 19 Sept for a partial refund.{" "}
//                     <span className="text-gray-500 underline cursor-pointer">Learn more</span>
//                     </p>
//                     <h3 className="font-semibold text-gray-800 text-base mt-4 mb-2">Ground Rules</h3>
//                     <ul className="list-disc pl-5 text-sm text-gray-700">
//                     <li>Follow the house rules</li>
//                     <li>Treat your Host’s home like your own</li>
//                     </ul>
//                 </div>
//                 </div>
//             </div>

//             {/* Agreement + Confirm */}
//             <div className="py-2">
//                 <div className="flex items-start mb-4">
//                 <span onClick={()=>setAgree(!agree)} className={`${agree ? "bg-theme":"bg-theme-20" } w-3 h-3 mt-2 mr-2 rounded-full inline-block`}></span>
//                 <p className="text-sm">
//                     By selecting the button below, I agree to the Host's House Rules,{" "}
//                     <span className="text-theme underline cursor-pointer">Ground rules for guests</span>, Airbnb's Rebooking and Refund Policy and that Airbnb can charge my payment method if I’m responsible for damage.
//                 </p>
//                 </div>
//                 <p className="text-sm mt-2">
//                 I also agree to the{" "}
//                 <span className="text-theme underline cursor-pointer">updated Terms of Service</span>,{" "}
//                 <span className="text-theme underline cursor-pointer">Payments Terms of Service</span> and{" "}    
//                 <span className="text-theme underline cursor-pointer">Privacy Policy</span>.
//                 </p>
//                <div className='py-10 flex justify-center'>
//                     <button 
//                         onClick={() => setIsOpen(true)} 
//                         className="mx-auto bg-theme text-white font-semibold rounded-xl px-8 py-3 shadow-lg cursor-pointer focus:outline-none transition hover:bg-theme-50"
//                     >
//                         Confirm & Pay
//                     </button>
//                 </div>
//             </div>
//             <Model isOpen={isOpen} onClose={() => setIsOpen(false)}>
//                 {selected.key === "Stripe" ? (
//                     <Elements stripe={stripePromise} options={{ mode: 'payment', amount: 1099, currency: 'usd' }}>
//                     <CheckoutForm />
//                     </Elements>
//                 ) : (
//                     <h1>{selected.labelValue}</h1>
//                 )}
//             </Model>
//         </div>
//     </section>
//   )
// }

// export default InstantBooking