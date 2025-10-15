import React from 'react'
import style from '../styles/style.module.css'
import HeroSection from '../components/HeroSection'
import Categories from '../components/Categories'
import CardSection from '../components/CardSection'
import GallerySection from '../components/GallerySection'
import ExperienceSection from '../components/ExperienceSection'
import AppDownloadBanner from '../components/AppDownloadBanner '
import RentalNavbar from '../components/RentalNavbar';

function RentalHome() {
  return (
   <>
   <RentalNavbar />
   <HeroSection/>
   <Categories/>
   <CardSection/>
   <GallerySection/>
   <ExperienceSection/>
   <AppDownloadBanner/>
   </>
  )
}

export default RentalHome
