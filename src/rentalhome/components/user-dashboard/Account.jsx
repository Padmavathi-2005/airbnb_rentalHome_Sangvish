import React, { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import { useAuth } from "../../../AuthContext";
import { MapPin, CalendarDays, BadgeCheck, User2, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WalletPayout from './payment/WalletPayout';
import PayoutMethods from './payment/PayoutMethods';
import Transactions from './payment/Transactions';
import Password from './payment/Password';
import Penalty from './payment/Penalty';
import RentalNavbar from '../RentalNavBar';
import DashBoardTab from '../../ui/DashBoardTab';


function Account() {

  const booking = [{
  img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&w=600",
  title: "Entire home/apt in Chennai",
  location: "37MC+P5G, Periamet, Poongavanapuram, Chennai, Tamil Nadu 600003, India",
  from: "Oct 06, 2025",
  to: "Oct 23, 2025",
  status: "Accepted",
  host: "Harish",
  actions: [
    { label: "View Receipt", color: "bg-green-600 hover:bg-green-700", icon: BadgeCheck, link: "#" },
    { label: "Stripe", color: "bg-blue-600 hover:bg-blue-700", icon: CreditCard, link: "#" },
    { label: "Cancel", color: "bg-red-500 hover:bg-red-600", icon: null, link: "#" }
  ]
  }];


const { user } = useAuth();



    const PaymentMenuItems = ["Wallet & Payouts","Payout Methods","Transactions History","Change Password"];
    const [paymentMenu, setpaymentMenu] = useState(()=>{
      const stored = localStorage.getItem("paymentMenu");
      return stored !== null ? stored : PaymentMenuItems[0];
    });

    useEffect(()=>{
      if(paymentMenu){
          localStorage.setItem("paymentMenu",paymentMenu)
      }        
    },[paymentMenu])

    const handleMenuItem = (item)=>{
        setpaymentMenu(item);
    }


    function Card(){
      return(
        <div  className="flex flex-col gap-6">
          <AnimatePresence>
            {booking.map((item, id)=>(
              <motion.div key={id}
              className='bg-white rounded-lg flex'>
                  <img
                  src={item.img}
                  alt={item.title}
                  className="w-full sm:w-56 h-44 sm:h-auto object-cover"
                />
                <div>
                  
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )
    }

    return (
      <>
        <RentalNavbar />
        <UserMenu />
        <section className="bg-gray-50">
          <div className="py-10 mx-auto w-xs sm:w-2xl md:w-3xl xl:w-7xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/4">
               <DashBoardTab 
              menuItems={PaymentMenuItems}
              menu={paymentMenu}
              handleMenuItem={handleMenuItem}
              />                  
              </div>

              {paymentMenu === "Wallet & Payouts" && <WalletPayout/>}
              {paymentMenu === "Payout Methods" && <PayoutMethods/>}
              {paymentMenu === "Transactions History" && <div className="w-3/4 mx-auto space-y-7">
              <Transactions/>
              <Penalty/>
              </div>}
              {paymentMenu === "Change Password" && <Password/>}

              
            </div>
          </div>
        </section>
      </>
    );
}

export default Account