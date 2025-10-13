import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";
import RentalLogo from "../images/Rental.png";
import { useAuth } from "../../AuthContext";
import MenuBtn from "../ui/MenuBtn";
import Model from "../ui/Model"
import { useUI } from "../../context/UIContext";


function RentalNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [mobileOpen, setMobileOpen] = useState(false);
  const linkRefs = useRef([]);
  const location = useLocation();
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { openLangModal } = useUI();
  


  const navLinks = [
    { name: "Home", path: "/" },
    // { name: "About", path: "/about" },
    { name: "Contact", path: "/contact", isButton: false },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateUnderlineToActive = () => {
    const idx = navLinks.findIndex(
      (link) =>
        location.pathname === link.path ||
        (link.path !== "/" && location.pathname.startsWith(link.path))
    );
    if (linkRefs.current[idx]) {
      const { offsetLeft, offsetWidth } = linkRefs.current[idx];
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    } else {
      setUnderlineStyle({ left: 0, width: 0 });
    }
  };

  useEffect(() => {
    updateUnderlineToActive();
    setMobileOpen(false);
  }, [location.pathname]);

  const handleHover = (idx) => {
    const link = linkRefs.current[idx];
    if (link) {
      setUnderlineStyle({ left: link.offsetLeft, width: link.offsetWidth });
    }
  };

  const handleLeave = () => {
    updateUnderlineToActive();
  };

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




  return (
    <header
      className={`${
        scrolled
          ? "bg-[#ffffffe3] backdrop-blur-xs shadow delay-100"
          : "bg-mint-500"
      } ${location.pathname === "/" ? "fixed" : "relative"} w-full z-50 transition-all border-b border-gray-300 bg-[#ffffffe3] backdrop-blur-xs`}
    >
      <div className="flex items-center shadow sm:shadow-none justify-between px-4 py-1 mx-auto max-w-7xl">
        {/* Logo */}
        <div>
          <Link to={"/"}>
            <img className="w-30 cursor-pointer" src='/logo.svg' alt="Logo" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex relative items-center text-gray-900 font-medium gap-4"
          onMouseLeave={handleLeave}
        >
          {navLinks.map((link, idx) =>
            link.isButton ? (
              <NavLink
                key={idx}
                to={link.path}
                ref={(el) => (linkRefs.current[idx] = el)}
                className={({ isActive }) =>
                  `px-5 py-2 border-2 border-red-500 text-theme rounded-[50px] transition ${
                    isActive ? "bg-dft text-white" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            ) : (
              <NavLink
                key={idx}
                to={link.path}
                ref={(el) => (linkRefs.current[idx] = el)}
                className={({ isActive }) =>
                  `px-5 py-2 transition-all cursor-pointer ${
                    isActive ? "text-theme font-semibold" : "hover:text-black"
                  }`
                }
                onMouseEnter={() => handleHover(idx)}
              >
                {link.name}
              </NavLink>
            )
          )}
          <div
            className="absolute top-13.5 h-[2.5px] bg-theme transition-all duration-300"
            style={{
              left: underlineStyle.left,
              width: underlineStyle.width,
              pointerEvents: "none",
            }}
          />
         <div>
            <div className="p-1 hover:bg-gray-200 transition-all duration-300 rounded-full">
        <Globe 
      onClick={openLangModal}
      className="p-[3px] cursor-pointer w-6 h-6 text-gray-700 hover:text-black transition"
    />
      
      </div>
         </div>
          
          <MenuBtn />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg border-t h-full border-t-gray-300 animate-fadeIn">
          <div className="flex flex-col p-4 space-y-2">
            {navLinks.map((link, idx) =>
              link.isButton ? (
                <NavLink
                  key={idx}
                  to={link.path}
                  className="px-5 py-2 border-2 border-red-500 text-theme rounded-[50px]"
                >
                  {link.name}
                </NavLink>
              ) : (
                <NavLink
                  key={idx}
                  to={link.path}
                  className="px-5 py-2 text-gray-900 hover:text-dft"
                >
                  {link.name}
                </NavLink>
              )
            )}
            <div className="flex flex-col lg:hidden gap-3">
              {user ? (
                <>
                
    <img
      src={user.profile_image}
      alt="Profile Avatar"
      className="w-8 h-8 rounded-full object-cover"
    />

    {/* Name */}
    <span className="text-gray-900 font-medium">{user.first_name}</span>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="px-3 py-2 border rounded-full text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                
                <button
                  onClick={() => navigate("/login")}
                  className="px-3 py-2 border rounded-full text-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-3 py-2 border rounded-full text-sm"
                >
                  Signup
                </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default RentalNavbar;
