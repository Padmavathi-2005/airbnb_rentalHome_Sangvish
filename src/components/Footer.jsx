import React, { useEffect, useState } from 'react'
import { FooterUniqueStays as mockUniqueStays} from '../Api';
import { Globe, Instagram } from 'lucide-react';
import { TwitterX } from '../ui/Svg';
function Footer({Setversion,version}) {


    const [pageVersion, setPageVersion] = useState(version)

    const [uniqueStays, setUniqueStays] = useState([]);

const handleVersion = () => {
  const newVersion = pageVersion === 'RentalHome' ? 'AirBnb' : 'RentalHome';
  setPageVersion(newVersion);
  Setversion(newVersion);
  console.log(newVersion)
}


    useEffect(() => {
        setUniqueStays(mockUniqueStays);
    }, []);

  const footerSections = [
    {
      title: "Support",
      links: ["Help Centre", "AirCover", "Anti-discrimination", "Disability support", "Cancellation options", "Report neighbourhood concern"]
    },
    {
      title: "Hosting",
      links: ["Airbnb your home", "AirCover for Hosts", "Hosting resources", "Community forum", "Hosting responsibly", "Join a free Hosting class"]
    },
    {
      title: "Airbnb",
      links: ["Newsroom", "New features", "Careers", "Investors", "Gift cards", "Airbnb.org emergency stays"]
    }
  ];






  return (
    
   <footer className="footer_section  bg-[#f7f7f7] text-dft">

        <div className='relative mx-auto max-w-7xl unique_stays  py-[48px] px-4 h-auto'>
            <h3 className='font-medium text-2xl pb-5'>Inspiration for future getaways</h3>
            <div>
                <h4 className='sm:text-sm lg:text-[14px] font-medium py-3 inline-block border-black border-b-[2px]'>Unique stays</h4>
                <div className='w-full h-[1px] bg-gray-300'></div>
                <div className='pt-5'>
                  <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                  {uniqueStays.map((stay)=>(
                    <li key={stay.id} className='flex py-2 flex-col text-left sm:text-sm lg:text-[14px] font-medium text-gray-500'>
                        <h5 className='text-dft'>{stay.typeOfStay}</h5>
                        {stay.locationOfStay}
                    </li>
                  ))}                   
                </ul>
                </div>
            </div>

        </div>
      <div className="mx-auto max-w-7xl px-4 py-[20px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-left">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-medium mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-sm text-text-gray hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <button  className="cursor-pointer" onClick={handleVersion}>
              {pageVersion === 'RentalHome' ? 'AirBnb' : 'RentalHome'}
            </button>
            <div className="flex items-center gap-6 text-sm text-text-gray">
              <span>© 2024 Airbnb, Inc.</span>
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Terms</a>
              <a href="#" className="hover:underline">Sitemap</a>
              <a href="#" className="hover:underline">Company details</a>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 cursor-pointer">
                <Globe size={16} />
                <span className="text-sm font-medium">English (US)</span>
                <span className="text-sm">₹ INR</span>
                
              </div>              
              <div className="flex items-center gap-3">                
                <TwitterX size={18} className="cursor-pointer hover:text-foreground" />
                <Instagram size={18} className="cursor-pointer hover:text-foreground" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    
  )
}

export default Footer