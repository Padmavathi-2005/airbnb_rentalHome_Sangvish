import React from 'react'
import HeroBg from '../images/hero/hero-bg-2.png'
import SearchBar from './searchbar/SearchBar'

function MyHeroSection() {
  return (
    <div className='pt-30 py-10 object-cover' style={{backgroundImage:`url(${HeroBg})`}}>
        <div className='text-center space-y-5'>
            <h1 className='font-bold text-4xl text-center'>Explore freely, <span className='text-theme'>Stay happily</span></h1>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, corporis!</p>
        </div>
        <div className='relative'>
            <SearchBar/>
        </div>       
    </div>
  )
}

export default MyHeroSection