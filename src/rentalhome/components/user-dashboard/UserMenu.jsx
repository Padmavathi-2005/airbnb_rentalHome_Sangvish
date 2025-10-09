import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNewUserNav } from "../../../slices/UserSlice";

// central mapping for routes
const navMap = {
  Dashboard: "/dashboard",
  Profile: "/profile",
  "My Trips": "/trips",
  Wishlist: "/wishlist",
  "Payment & Account": "/accounts",
  Messages: "/messages",
  add_space: "/add-space",
  add_experience: "/add-experience",
  manageListing: "/manage-listing",
  manageBooking: "/manage-booking",
};

const slugify = (text) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");

function UserMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userNavItem = useSelector((state) => state.userNav);
  const switchItemName = useSelector((state) => state.switchItem);

  console.log("user is",userNavItem)


  //  handles nav + redux state
  const handleNav = (nav) => {
    dispatch(setNewUserNav(nav));
    const path = navMap[nav] || `/${slugify(nav)}`;
    navigate(path);
  };

  //  define nav items once
  const navItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "Profile", label: "Profile" },
    ...(switchItemName === "host"
      ? [
          { key: "add_space", label: "Add Space" },
          { key: "add_experience", label: "Add Experience" },
          { key: "manageListing", label: "Manage Listing" },
          { key: "manageBooking", label: "Manage Booking" },
        ]
      : []),
    { key: "My Trips", label: "My Trips" },
    { key: "Wishlist", label: "Wishlist" },
    { key: "Messages", label: "Messages" },
    { key: "Payment & Account", label: "Payment & Account" },
  ];


  return (
    <header className="py-3 bg-white shadow-md border border-gray-300">
      <div className="mx-auto max-w-7xl flex justify-center px-4 py-1 items-center">
        <ul className={`flex   ${navItems.length > 7 ? "gap-2" : "gap-4"}`}>
          {navItems.map(({ key, label }) => (
            <li key={key}>
              <button
                onClick={() => handleNav(key)}
                className={`font-semibold ${navItems.length > 7 ? "text-sm" : "text-lg"} py-2 px-4 rounded-full transition-all 
                cursor-pointer hover:bg-theme-20 duration-300 ease-in-out 
                  ${userNavItem === key ? "bg-theme text-white" : ""}
                `}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default UserMenu;
