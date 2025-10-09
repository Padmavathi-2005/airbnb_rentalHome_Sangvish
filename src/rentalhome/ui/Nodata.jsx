import React from 'react'
import nodata from "../../assets/svgs/nodata.svg"

function Nodata() {
  return (
    <div className='md:w-full  items-center space-y-7'>
        <div className='mx-auto items-center'>      
            <img src={nodata} alt="empty item" 
            className='w-100 mx-auto' />
            <p className='text-center'>You dont have any trips yet-but when you do,you’ll find them here </p>
        </div>
    </div>
  )
}

export default Nodata