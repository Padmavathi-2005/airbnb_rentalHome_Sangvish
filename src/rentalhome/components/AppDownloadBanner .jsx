import { Apple } from "lucide-react";
import React, { useEffect, useState } from "react";
import appbg from '../images/app-download-bg.png';


const AppDownloadBanner = () => {
   const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLarge(window.innerWidth >= 1024); // Tailwind lg breakpoint = 1024px
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);


  return (
    <section className="bg-cyan-200" 
      style={
        isLarge
          ? {
              backgroundImage: `url(${appbg})`,
              backgroundPosition: 'right center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }
          : {}
      }
    >
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-center px-4 py-40 md:flex-row md:justify-between"  >
         
      {/* Text Section */}
      <div className="flex flex-col items-start md:items-start md:w-1/2">
        <h1 className="text-5xl font-semibold mb-4 text-black">Get the App</h1>
        <p className="text-2xl mb-6 text-black">
          Download the app and go to travel the world.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {/* App Store Button */}
          <a
            href="#"
            className="bg-black text-white flex items-center px-4 py-2 rounded-lg shadow-lg"
          >
            <svg className='mr-3' xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 100 100" fill="none">
            <path d="M89.0546 69.5C86.8984 74.2891 85.8593 76.4297 83.0859 80.6562C79.2031 86.5625 73.7265 93.9375 66.9609 93.9844C60.9375 94.0391 59.3828 90.0547 51.2031 90.125C43.0312 90.1641 41.3281 94.0625 35.2968 94C28.5234 93.9375 23.3437 87.2969 19.4609 81.3984C8.60152 64.8594 7.45309 45.4688 14.164 35.1562C18.914 27.8438 26.4218 23.5469 33.4765 23.5469C40.664 23.5469 45.1796 27.4922 51.1171 27.4922C56.8828 27.4922 60.3906 23.5391 68.7031 23.5391C74.9843 23.5391 81.625 26.9609 86.375 32.8672C70.8437 41.3828 73.3671 63.5625 89.0546 69.5ZM62.3906 16.9375C65.414 13.0547 67.7109 7.57813 66.875 2C61.9453 2.33594 56.1796 5.48438 52.8125 9.5625C49.7578 13.2812 47.2265 18.7969 48.2109 24.1328C53.5937 24.3047 59.164 21.0938 62.3906 16.9375Z" fill="white"/>
            </svg>
            App Store
          </a>
          {/* Google Play Button */}
          <a
            href="#"
            className="bg-black text-white flex items-center px-4 py-2 rounded-lg shadow-lg"
          >
    
                <svg className='mr-3' xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 94 94" fill="none">
                <path d="M26.4146 7.85747C21.1388 4.91213 14.8937 7.39922 12.6318 12.3832L47.2473 47.0006L64.8998 29.3482L26.4146 7.85747Z" fill="url(#paint0_linear_105_3)"/>
                <path d="M64.8998 64.6524L47.2473 47L12.6318 81.6175C14.8957 86.6034 21.1408 89.0885 26.4146 86.1451L64.8998 64.6524Z" fill="url(#paint1_linear_105_3)"/>
                <path d="M81.112 55.5991C84.4804 53.7191 86.1645 50.3586 86.1665 46.9962C86.1645 43.6337 84.4804 40.2713 81.112 38.3932L64.899 29.3438L47.2466 46.9962L64.899 64.6486L81.112 55.5991Z" fill="url(#paint2_linear_105_3)"/>
                <path d="M12.6312 12.3867C12.079 13.6107 11.75 14.9893 11.75 16.4698V77.5287C11.75 79.019 12.0712 80.3938 12.6312 81.6216L47.2428 46.9983L12.6312 12.3867Z" fill="url(#paint3_linear_105_3)"/>
                <defs>
                <linearGradient id="paint0_linear_105_3" x1="35.4503" y1="6.35347" x2="49.5405" y2="68.0331" gradientUnits="userSpaceOnUse">
                <stop stopColor="#35AB4A"/>
                <stop offset="0.297" stopColor="#31A145"/>
                <stop offset="0.798" stopColor="#288739"/>
                <stop offset="1" stopColor="#237A33"/>
                </linearGradient>
                <linearGradient id="paint1_linear_105_3" x1="37.5183" y1="46.7297" x2="41.5055" y2="131.073" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F14E5D"/>
                <stop offset="0.499" stopColor="#EA3D4F"/>
                <stop offset="1" stopColor="#E12138"/>
                </linearGradient>
                <linearGradient id="paint2_linear_105_3" x1="64.5132" y1="29.1734" x2="71.5593" y2="85.403" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFD844"/>
                <stop offset="0.519" stopColor="#FFC63F"/>
                <stop offset="1" stopColor="#FFB03A"/>
                </linearGradient>
                <linearGradient id="paint3_linear_105_3" x1="27.1288" y1="11.5603" x2="30.4952" y2="83.8424" gradientUnits="userSpaceOnUse">
                <stop offset="0.003" stopColor="#0090E6"/>
                <stop offset="1" stopColor="#0065A0"/>
                </linearGradient>
                </defs>
                </svg>
            Google Play
          </a>
        </div>
      </div>
      {/* Screenshots Section */}
     
    </div>

    </section>
   
  );
};

export default AppDownloadBanner;
