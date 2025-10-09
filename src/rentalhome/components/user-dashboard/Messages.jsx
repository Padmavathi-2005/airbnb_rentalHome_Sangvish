import React from 'react'
import UserMenu from './UserMenu'
import RentalNavbar from '../RentalNavbar'
import { Messager } from './message/Messager'
function Messages() {

  return (
        <>
        <RentalNavbar/>
        <UserMenu/> 
        <div className='p-4'>
          <Messager />
        </div>
        
        </>
  )
}

export default Messages