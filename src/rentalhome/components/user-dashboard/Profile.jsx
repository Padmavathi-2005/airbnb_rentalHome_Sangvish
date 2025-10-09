import React, { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import { useAuth } from "../../../AuthContext";
import EditProfile from './profile/EditProfile';
import Verification from './profile/Verification';
import ReviewAbout from './profile/ReviewAbout';
import ReviewBy from './profile/ReviewBy';
import RentalNavbar from '../RentalNavBar';
import DashBoardTab from '../../ui/DashBoardTab';

function Profile() {
const { user } = useAuth();



const menuItems = ["Edit Profile","Trust & Verification","Review About You","Review By You"];

const [menu, setMenu] = useState(() => {
  const stored = localStorage.getItem("profilemenu");
  return stored !== null ? stored : menuItems[0]; // ensure no null
});

useEffect(() => {
  if (menu) {
    localStorage.setItem("profilemenu", menu);
  }
}, [menu]);



    const handleMenuItem = (item)=>{
        setMenu(item);
    }

    return (
    <>
    <RentalNavbar/>
    <UserMenu/>
    <section className="bg-gray-50">
        <div className="py-10 mx-auto w-xs sm:w-2xl md:w-3xl xl:w-7xl">
          <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/4">
              <DashBoardTab 
              menuItems={menuItems}
              menu={menu}
              handleMenuItem={handleMenuItem}
              />              
              </div>
             
               
                {menu === 'Edit Profile' && user && <EditProfile user={user}/> }
                {menu === 'Trust & Verification' && user && <Verification user={user}/> }
                {menu === 'Review About You' && user && <ReviewAbout user={user}/> }
                {menu === 'Review By You' && user && <ReviewBy user={user}/> }
           
            </div>
        </div>
    </section>  
</>
)
}

export default Profile