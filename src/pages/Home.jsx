import React, { useState,useEffect } from 'react'
import Header from '../components/Header'
import { Route, Routes } from 'react-router-dom'
import PropertySection from '../components/PropertySection'
// import '../style.css';

function Home() {
const [tabSection , setTabSection] =useState('Home')
useEffect(() => {
  console.log("Current tab section:", tabSection);
}, [tabSection]);


  return (
   <>
    <Header setTabSection={setTabSection}/>
    <PropertySection TabSection={tabSection} />
    </>
  )
}

export default Home