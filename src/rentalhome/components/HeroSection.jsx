import React from 'react'
import HeroImg from '../images/Hero-img.png'
import HeroBg from '../images/hero-bg.png'
import Hero1 from '../images/hero-1.png'
import Hero2 from '../images/hero-2.png'
import icon1 from '../images/icon-1.png'
import icon2 from '../images/icon-2.png'
import icon3 from '../images/icon-3.png'
import SearchBar from './searchbar/SearchBar'
import TestSearchBar from './searchbar/SearchBarRedux'

function HeroSection() {
  return (
    <section className='bg-cover bg-center bg-no-repeat h-auto' style={{backgroundImage:`url(${HeroBg})`}}>
        <div className='mx-auto max-w-7xl pt-[100px] md:pt-[150px] pb-[100px] px-4'>
            <div className='flex flex-wrap justify-between'>
                <div className='w-full lg:w-1/2 relative z-10'>
                    <div className='pb-10'>
                        <span className='text-24 font-medium text-gray-500'>Find your perfect stay, anywhere, anytime.</span>
                        <h1 className='font-serif text-dft  text-[30px] lg:text-[46px] xl:text-[50px] font-semibold'>Your next rental is just a click away!</h1>
                    </div>
                    <SearchBar/>
                    {/* <TestSearchBar/> */}
                </div>
                <div className='w-full fade-in-up lg:w-1/2 hidden md:block lg:block mt-15 md:mt-0 flex justify-start'>
                    <div className='relative'>
                        {/* <img src={HeroImg} className="w-120 " alt="Hero section"/> */}
                        <div className='relative'>
                           
                            <img src={Hero2} className="w-50 top-35 right-50 absolute" alt="Hero section"/>
                             <img src={Hero1} className="w-70 z-1 relative" alt="Hero section"/>
                        </div>


                        <img src={icon1} className='w-15 h-15 absolute top-[50px] animate-spin z-2'/>
                        <img src={icon2} className='w-15 absolute bottom-[230px] right-55 z-2 animate-bounce'/>
                        <img src={icon3} className='w-15 absolute bottom-[10px] right-90 z-2 animate-pulse'/>

                    </div>
                </div>
            </div>

        </div>
    </section>
  )
}

export default HeroSection