import React from 'react'
import UserMenu from './UserMenu'
import { User, List, Plane, Wallet ,Camera} from "lucide-react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAuth } from "../../../AuthContext";
import { useDispatch} from 'react-redux';
import {setNewUserNav} from '../../../slices/UserSlice';
import RentalNavbar from '../RentalNavbar';

function Card({ className, children, ...props }) {

  return (
  <div
  className={clsx(
  "rounded-2xl bg-white shadow border border-gray-100",
  className
  )}
  {...props}
  >
  {children}
</div>
);
}

function CardContent({ className, children, ...props }) {
  return (
  <div
  className={clsx("p-6", className)}
  {...props}
  >
  {children}
</div>
);
}

function DashBoard() {
  const user  = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log("user is", user.user);

    const handleProfile=()=>{
       dispatch(setNewUserNav("Profile"));
       navigate("/profile");
    }

  return (

  <>   
  <RentalNavbar/>
  <UserMenu/>      
  <section className="bg-gray-50">
    <div className="py-10 mx-auto  max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Left Sidebar */}
      <div className="col-span-1 flex flex-col items-center">

        <div className="bg-white rounded-2xl shadow-[0px_6px_25px_0px_#31313121] border border-gray-300 p-4 flex flex-col items-center">
          {/* Avatar Section */}
          <div className="relative w-full">
            {/* Avatar Image */}
            <img
            src={user.user.profile_src}
            alt="Profile Avatar"
            className="w-60 h-60 rounded-xl object-cover bg-pink-100"
            />

            {/* Camera Icon */}
            <span className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
              <Camera className="text-black" size={20} />
            </span>

          </div>  
          <div className='flex justify-center pt-4'>
            <button className='bg-theme rounded-full px-5 py-2 text-white'>
              Delete Account
            </button>
          </div>

        </div>

        {/* Identity Verification */}
        <div className="bg-white rounded-2xl shadow-[0px_6px_25px_0px_#31313121] p-6 mt-6 ">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <User className="w-4 h-4 text-pink-500" /> Identity Verification
          </h3>
          <p className="text-gray-500 text-xs mt-2">
            Show others you’re really you with the identity verification badge.
          </p>
          <div className='flex justify-center pt-4 '>
            <button className="rounded-full bg-gray-900 py-3 px-5 text-white">Get Verified</button>
          </div>
        </div>
      </div>
      {/* Right Content */}
      <div className="col-span-3">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* My Lists */}
          <Card className="bg-white rounded-2xl shadow">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <span className='bg-[#C0ECFF] mb-2 rounded-full p-3'>
                <List className="w-6 h-6 text-[#120A36]" />
              </span>              
              <p className="text-lg font-bold">0</p>
              <p className="text-gray-500 text-sm">My Lists</p>
            </CardContent>
          </Card>

          {/* Trips */}
          <Card className="bg-white rounded-2xl shadow">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <span className='bg-[#FFDCC9] mb-2 rounded-full p-3 mb-2'>
                <Plane className="w-6 h-6 text-[#120A36]" />
              </span>              
              <p className="text-lg font-bold">0</p>
              <p className="text-gray-500 text-sm">Trips</p>
            </CardContent>
          </Card>

          {/* Wallet */}
          <Card className="bg-white rounded-2xl shadow">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <span className='bg-[#FFE2A8] mb-2 rounded-full p-3 mb-2'>
                <Wallet className="w-6 h-6 text-[#120A36]" />
              </span>              
              <p className="text-lg font-bold">0 MAD</p>
              <p className="text-gray-500 text-sm">My Lists</p>
            </CardContent>
          </Card>
        </div>

        {/* User Info */}
        <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Hi I’m {user.user.first_name}</h2>
            <p className="text-gray-500 text-sm">Member since August 2015</p>
          </div>
          <button onClick={handleProfile} variant="outline" className="rounded-xl text-theme cursor-pointer">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  </section>
  </>
  )
}

export default DashBoard