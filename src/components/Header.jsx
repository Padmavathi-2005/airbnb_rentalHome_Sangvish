import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/svgs/logo.svg';
import menu from '../assets/svgs/menu.svg';
import language from '../assets/svgs/language.svg';
import homesImg from '../assets/images/Homes.png';
import experiencesImg from '../assets/images/Experiences.png';
import servicesImg from '../assets/images/Services.png';
import SearchBar from './SearchBar';
import homesImgActive from '../assets/images/Homes-active.png';
import experiencesImgActive from '../assets/images/Experiences-active.png';
import servicesImgActive from '../assets/images/Services-active.png';


function Header({setTabSection}) {
  const tabNames = [
    { name: 'Home', image: homesImg, activeImg:homesImgActive },
    { name: 'Experience', image: experiencesImg, activeImg:experiencesImgActive },
    // { name: 'Services', image: servicesImg, activeImg:servicesImgActive },
  ];

  const rightMenuSvgs = [
    { name: 'Language', icon: language },
    { name: 'Menu', icon: menu },
  ];

  const handleTab = (index)=>{
    setActiveTab(index)
    setTabSection(tabNames[index].name)
  }

  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef([]);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeElement = tabRefs.current[activeTab];
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  return (
    <header className="bg-gradient-to-b from-white to-[#f8f8f8] border-b border-[#ddd]">
      <nav className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center md:items-start py-[30px]  h-auto md:h-[200px]">
        
        {/* Logo */}
        <div className="logo mb-4 md:mb-0 md:pr-[100px]">
          <a href="#" aria-label="Homepage">
            <img src={logo} alt="Logo" className="w-[100px] md:w-auto" />
          </a>
        </div>

        {/* Center Tabs & Search */}
        <div className="flex flex-col items-center md:items-start">
          
          {/* Tabs with Underline Wrapper */}
          <div className="relative mb-4">
            <div className="flex gap-6 md:gap-8 ">
              {tabNames.map((tab, index) => (
                <div
                  key={index}
                  ref={(el) => (tabRefs.current[index] = el)}
                  onClick={()=>handleTab(index)}
                  className={`flex group items-center cursor-pointer pb-2 ${
                    activeTab === index ? 'text-black ' : 'text-gray-500'
                  } hover:text-gray-700`}
                >
                  <img src={activeTab=== index ? tab.activeImg : tab.image} alt={tab.name} className="w-5 h-5 md:w-11 md:h-11 ease-in duration-250 group-hover:scale-120" />
                  <span className="ml-2 text-[15px] font-semibold">{tab.name}</span>
                </div>
              ))}
            </div>

            {/* Underline */}
            <div
              className="absolute bottom-0 h-[2.5px] bg-black transition-all duration-300"
              style={{ left: underlineStyle.left, width: underlineStyle.width }}
            ></div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-auto">
            <div>
              <SearchBar />
              
            </div>            
          </div>
        </div>

        {/* Right Side Menus */}
        <div className="flex items-center gap-2 md:gap-4 mt-4 md:mt-0">
          <div className="px-3 py-2 hover:bg-[#f2f2f2] rounded-full cursor-pointer text-sm md:text-base">
            <span>Become host</span>
          </div>
          {rightMenuSvgs.map((item, index) => (
            <div
              key={index}
              className="w-10 h-10 p-2 rounded-full bg-[#f2f2f2] flex items-center justify-center cursor-pointer hover:bg-gray-200"
              aria-label={item.name}
            >
              <img src={item.icon} alt={item.name} className="w-4  h-4 " />
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Header;
