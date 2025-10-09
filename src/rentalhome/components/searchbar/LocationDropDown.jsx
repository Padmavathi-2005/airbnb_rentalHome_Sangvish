import React, { useState,useEffect } from 'react'

import { SearchLocation } from '../../services/NewApi';

function LocationDropDown({setLocation}) {

const [locationSearch, setLocationSearch] = useState([]);


 
  useEffect(()=>{
      const locations = async()=>{
        setLocationSearch(SearchLocation)
      };
      locations();
  },[])




  const handleLocation =(location)=>{
setLocation(location.location)

  }



  return (
    <div className='bg-white border border border-[#c5c5c5] rounded-[25px] p-5 h-auto shadow-lg w-2/2 sm:w-2/3'>

      <div className='py-2'>
        <p className='text-[12px]'>Suggested destinations</p>
      </div>

      <div className='h-[200px] overflow-y-scroll'>
        <div className='flex items-center py-2 cursor-pointer' onClick={(location)=>handleLocation({location:'Nearby'})}>
          <img
          className='w-12 h-12'
          src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-2/original/ea5e5ee3-e9d8-48a1-b7e9-1003bf6fe850.png"/>
          <span className='px-3 text-sm font-normal'>
            <h2 >Nearby</h2>
            <h2 className='text-gray-500'>Find whats around you</h2>
          </span>
        </div>  
        {locationSearch.map((location,id)=>(         
          <div key={id} className='flex items-center py-2 cursor-pointer'onClick={()=>handleLocation(location)} >
          <img
          className='w-12 h-12'
          src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-2/original/ea5e5ee3-e9d8-48a1-b7e9-1003bf6fe850.png"/>
          <span className='px-3 text-sm font-normal'>
            <h2 >{location.location}</h2>
            <h2 className='text-gray-500'>{location.description}</h2>
          </span>
        </div>  
        ))}
      
        
      </div>




    </div>
  )
}

export default LocationDropDown