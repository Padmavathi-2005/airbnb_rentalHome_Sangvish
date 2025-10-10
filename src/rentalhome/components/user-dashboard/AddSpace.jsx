import React, { useState } from 'react';
import RentalNavBar from "../RentalNavbar";
import UserMenu from "./UserMenu";
import PropertyCity from './add-property/PropertyCity';
import Pricing from './add-property/Pricing';
import Basics from './add-property/Basics';
import Calendar from "./add-property/Calender"
import Description from './add-property/Description';
import Location from './add-property/Location';
import Photos from './add-property/Photos';
import Booking from './add-property/Booking'
import Amenities from './add-property/Amenities'
import { useSelector,useDispatch } from 'react-redux';
import {setPropertyNav} from "../../../slices/AddPropertySlice";

function AddSpace() {
  const dispatch = useDispatch();  
  const propertyNav = useSelector((state) => state.addPropertyNav); 
  console.log("current property nav is: ",propertyNav)

  const [AddPropertyTab, setAddPropertyTab] =  useState(propertyNav);
  const navigation = ["property-city","Basics", "Description", "Location","Photos", "Amenities", "Pricing", "Booking","Calendar"];

  const handleNav = (nav)=>{
    setAddPropertyTab(nav)
    dispatch(setPropertyNav(nav))
  }

    return (

        <>
          <RentalNavBar/>
          <UserMenu/>
         <>  
          <div className='max-w-7xl my-3 mx-auto'>
                    <ul className='flex mx-auto py-2 px-2 rounded-full shadow-[0px_0px_15px_0px_#31313121] justify-between gap-5'>
                      {
                        navigation.map((nav, id)=>(
                          <li key={id} onClick={()=>handleNav(nav)} className={`px-4 py-2 ${nav === AddPropertyTab ? "bg-theme text-white" : ""} rounded-full hover:bg-gray-300`}>
                              {nav}
                          </li>
                        ))
                      }
                    </ul>
                  </div>     

           {AddPropertyTab ===  "property-city" && <PropertyCity setNav={setAddPropertyTab}/>}
           {AddPropertyTab ===  "Basics" && <Basics setNav={setAddPropertyTab}/>}
           {AddPropertyTab ===  "Description" && <Description setNav={setAddPropertyTab}/>}
           {AddPropertyTab ===  "Location" && <Location setNav={setAddPropertyTab}/>}
           {AddPropertyTab ===  "Photos" && <Photos setNav={setAddPropertyTab}/>}
           {AddPropertyTab ===  "Amenities" && <Amenities setNav={setAddPropertyTab}/>}
           {AddPropertyTab ===  "Pricing" && <Pricing setNav={setAddPropertyTab}/>}
           {AddPropertyTab ===  "Booking" && <Booking setNav={setAddPropertyTab}/>}
           {AddPropertyTab ===  "Calendar" && <Calendar setNav={setAddPropertyTab}/>}
           
        </>              
    </>

)

  
}

export default AddSpace