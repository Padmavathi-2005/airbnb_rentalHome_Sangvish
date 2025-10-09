import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react"; // Lucide icons
import { useAuth } from "../../AuthContext";
import { useDispatch,useSelector} from 'react-redux';
import {setNewUserNav,setNewSwitch} from '../../slices/UserSlice';

function MenuBtn() {
  const [mobileOpen, setMobileOpen] = useState(false); // not used but kept in case needed later
  const linkRefs = useRef([]);
  const location = useLocation();
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const userNavItem = useSelector((state) => state.userNav);

  // console.log("user is",userNavItem)


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLoginMenu = () => {
    navigate("/login");
    setIsOpen(false);
  };

  const handleLogoutMenu = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const handleProfile=()=>{
     dispatch(setNewUserNav("Profile"));
     navigate("/profile");
  }




  const [switchitem, setSwitchItem] = useState('guest');

  const handleSwitchItem =()=>{
    if (switchitem === 'guest'){
      setSwitchItem("host")
      
    }
    else if(switchitem === '"host'){
      setSwitchItem("guest")
    }
    else{
      setSwitchItem("guest")
    }
    dispatch(setNewSwitch(switchitem));
  }


  const handleDashboard =()=>{   
    navigate("/dashboard")
     dispatch(setNewUserNav("dashboard"));
  }


  return (
    <div className="hidden md:flex items-center gap-3">
      {user ? (
        <>
          <button            
            className="px-3 py-2 rounded-full text-sm"
          >
            Hi, {user.first_name}
          </button>
          <img
           onClick={handleProfile}
            src={user.profile_src}
            className="rounded-full h-10 w-10 object-cover border border-2 cursor-pointer border-red-400"
          />
        </>
      ) : null}

      <button className="text-gray-900" onClick={handleIsOpen}>
        <Menu size={28} />
      </button>

      {isOpen && (
        <div
          ref={wrapperRef}
          className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          <ul className="py-2 text-sm text-gray-700">
             {user ? (
                <>
                {
                switchitem === 'host'&& 
                <li onClick={handleSwitchItem} className="px-4 cursor-pointer py-2 hover:bg-gray-100 cursor-pointer">
                  <span className="px-3 text-sm" >Switch to guest</span>
                </li>
                }

                {
                switchitem === 'guest' &&  
                <li onClick={handleSwitchItem} className="px-4 cursor-pointer py-2 hover:bg-gray-100 cursor-pointer">
                  <span  className="px-3 text-sm" >Switch to host</span>
                </li>
                }

                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"> 
                  <span className="px-3 flex text-sm" onClick={handleDashboard}> Dashboard</span>
                </li>

                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"> 
                    <a  onClick={handleLogoutMenu}className="px-3 flex text-sm">Logout</a>
                </li>  

                </>               
              ) : (
                <>
                
                <li>
                <button
                  onClick={handleLoginMenu}
                  className="px-3 py-2 text-sm"
                >
                  Log in or sign up
                </button>
                 
                </li>
                <li>
                  <button
                  onClick={() => navigate("/signup")}
                   className="px-3 py-2 text-sm"
                  >
                  Signup
                  </button>
                </li>
                </>
              )}            
          </ul>
        </div>
      )}
    </div>
  );
}
 
export default MenuBtn;
