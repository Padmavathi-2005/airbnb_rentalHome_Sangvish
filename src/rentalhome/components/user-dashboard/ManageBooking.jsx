import React, { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import { Banknote  ,ReceiptText, X} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ListingCard from '../../ui/ListingCard';
import Nodata from '../../ui/Nodata';
import DashBoardTab from '../../ui/DashBoardTab';
import RentalNavbar from '../RentalNavBar';

function ManageBooking() {

const Current = [{
  img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&w=600",
  title: "Entire home/apt in Chennai",
  location: "37MC+P5G, Periamet, Poongavanapuram, Chennai, Tamil Nadu 600003, India",
  from: "Oct 06, 2025",
  to: "Oct 23, 2025",
  status: "Accepted",
  statusClass:"bg-green-600 hover:bg-green-700 text-white",
  host: "Harish",
  avatar:"",
  actions: [
    { label: "View Receipt", class: "bg-green-600 hover:bg-green-700 text-white", icon: ReceiptText, link: "#" },
    { label: "Stripe", class: "bg-blue-600 text-white hover:bg-blue-700 ", icon: Banknote, link: "#" },    
  ]
}];

const Pending = [{
  img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&w=600",
  title: "Entire home/apt in Chennai",
  location: "37MC+P5G, Periamet, Poongavanapuram, Chennai, Tamil Nadu 600003, India",
  from: "Oct 06, 2025",
  to: "Oct 23, 2025",
  status: "Pending",
  statusClass:"bg-gray-500 hover:bg-green-700 text-white",
  host: "Harish",
  avatar:"",
  actions: [
    { label: "View Receipt", class: "bg-green-600 hover:bg-green-700 text-white", icon: ReceiptText, link: "#" },
    { label: "Stripe", class: "bg-blue-600 text-white hover:bg-blue-700 ", icon: Banknote, link: "#" },
    { label: "Cancel", class: "bg-red-500 hover:bg-red-600 text-white", icon: X, link: "#" }
  ]
}];

const Expired = [{
  img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&w=600",
  title: "Entire home/apt in Chennai",
  location: "37MC+P5G, Periamet, Poongavanapuram, Chennai, Tamil Nadu 600003, India",
  from: "Oct 06, 2025",
  to: "Oct 23, 2025",
  status: "Expired",
  statusClass:"bg-red-400 hover:bg-green-700 text-white",
  host: "Harish",
  avatar:"",
  actions: [
    { label: "View Receipt", class: "bg-green-600 hover:bg-green-700 text-white", icon: ReceiptText, link: "#" },
    { label: "Stripe", class: "bg-blue-600 text-white hover:bg-blue-700 ", icon: Banknote, link: "#" },
    { label: "Cancel", class: "bg-red-500 hover:bg-red-600 text-white", icon: X, link: "#" }
  ]
}];

const Upcoming = [{
  img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&w=600",
  title: "Entire home/apt in Chennai",
  location: "37MC+P5G, Periamet, Poongavanapuram, Chennai, Tamil Nadu 600003, India",
  from: "Oct 06, 2025",
  to: "Oct 23, 2025",
  status: "Accepted",
  statusClass:"bg-green-600 hover:bg-green-700 text-white",
  host: "Harish",
  avatar:"",
  actions: [
    { label: "View Receipt", class: "bg-green-600 hover:bg-green-700 text-white", icon: ReceiptText, link: "#" },
    { label: "Stripe", class: "bg-blue-600 text-white hover:bg-blue-700 ", icon: Banknote, link: "#" },
    { label: "Cancel", class: "bg-red-500 hover:bg-red-600 text-white", icon: X, link: "#" }
  ]
}];

const Completed = [
//   {
//   img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&w=600",
//   title: "Entire home/apt in Chennai",
//   location: "37MC+P5G, Periamet, Poongavanapuram, Chennai, Tamil Nadu 600003, India",
//   from: "Oct 06, 2025",
//   to: "Oct 23, 2025",
//   status: "Completed",
//   statusClass:"bg-green-600 hover:bg-green-700 text-white",
//   host: "Harish",
//   avatar:"",
//   actions: [
//     { label: "Write Review", class: "bg-green-600 hover:bg-green-700 text-white", icon: Star, link: "#" },   
//   ]
// }
];

    const menuItems = ["All","Current","Upcoming","Pending", "Completed","Expired"];
    const menuTypes = {
      Current,
      Upcoming,
      Pending,
      Completed,
      Expired,
    };

    const [manageList, setManageList] = useState(()=>{
      const stored = localStorage.getItem("manageBooking");
      return stored !== null ? stored : menuItems[0];
    });

    useEffect(()=>{
      if(manageList){
          localStorage.setItem("manageBooking",manageList)
      }        
    },[manageList])

    const handleMenuItem = (item)=>{
        setManageList(item);
    }

    return (
      <>
      <RentalNavbar/> 
        <UserMenu />
        <section className="bg-gray-50">
          <div className="py-10 mx-auto w-xs sm:w-2xl md:w-3xl xl:w-7xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/4">
               <DashBoardTab 
                    menuItems={menuItems}
                    menu={manageList}
                    handleMenuItem={handleMenuItem}
                />   
              
              </div>

            <div className="space-y-4 w-3/4">
              <AnimatePresence>
                {manageList === "All"
                  ? menuItems
                      .filter(item => item !== "All")
                      .map(item => {
                        const list = menuTypes[item];
                        return (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                          >      
                              <ListingCard items={list} message={true}/>
                           
                          </motion.div>
                        );
                      })
                  : (() => {
                      const list = menuTypes[manageList];
                      return (
                        <motion.div
                          key={manageList}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          {Array.isArray(list) && list.length === 0 ? (
                           <Nodata/>
                          ) : (
                            <ListingCard items={list} message={true}/>
                          )}
                        </motion.div>
                      );
                    })()}
              </AnimatePresence>
            </div>
    
            </div>
          </div>
        </section>
      </>
    );
}


export default ManageBooking