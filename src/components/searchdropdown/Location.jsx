import React, { useEffect,useState } from 'react'
import { SearchLocation } from '../../Api.jsx';

function Location() {

const [locationSearch, setLocationSearch] = useState([]);

 
  useEffect(()=>{
      const locations = async()=>{
        setLocationSearch(SearchLocation)
      };
      locations();
  },[])




  return (
    <div className='bg-white rounded-[25px] p-5 h-auto shadow-lg w-2/5'>

      <div className='py-2'>
        <p className='text-[12px]'>Suggested destinations</p>
      </div>

      <div className='h-[300px] overflow-y-scroll'>
        <div className='flex items-center py-2'>
          <img
          className='w-12 h-12'
          src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-2/original/ea5e5ee3-e9d8-48a1-b7e9-1003bf6fe850.png"/>
          <span className='px-3 text-sm font-normal'>
            <h2 >Nearby</h2>
            <h2 className='text-gray-500'>Find whats around you</h2>
          </span>
        </div>  
        {locationSearch.map((location)=>(         
          <div className='flex items-center py-2'>
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

export default Location