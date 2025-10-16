import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNewUserNav } from "../../../slices/UserSlice";
import { Menu, X } from "lucide-react";

// central mapping for routes
const navMap = {
  dashboard: "/dashboard",
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
  const location = useLocation();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const switchItemName = useSelector((state) => state.switchItem);

  const activeKeyFromRoute =
    Object.keys(navMap).find((key) => navMap[key] === location.pathname) ||
    null;

  const handleNav = (nav) => {
    dispatch(setNewUserNav(nav));
    const path = navMap[nav] || `/${slugify(nav)}`;
    navigate(path);
  };

  const navItems = useMemo(
    () => [
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
    ],
    [switchItemName]
  );

  return (
    <header className="py-2 bg-white shadow-md border border-gray-300">
      <div className="mx-auto max-w-7xl flex justify-between items-center px-4">
        {/* Mobile current menu */}
        <div
          className="font-semibold text-sm md:hidden cursor-pointer"
          onClick={() =>
            handleNav(activeKeyFromRoute || navItems[0].key)
          }
        >
          {navItems.find((item) => item.key === activeKeyFromRoute)?.label ||
            navItems[0].label}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center justify-between gap-3 w-full overflow-x-auto">
          {navItems.map(({ key, label }) => (
            <li key={key} className="flex-shrink-0">
              <button
                onClick={() => handleNav(key)}
                className={`px-4 py-2 font-semibold text-sm rounded-full transition-all duration-300 ease-in-out text-center whitespace-nowrap ${activeKeyFromRoute === key
                    ? "bg-theme text-white"
                    : "bg-white text-gray-800 hover:bg-theme-20"
                  }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>



        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="flex flex-col gap-2 px-4 py-2 md:hidden w-full">
          {navItems.map(({ key, label }) => (
            <li key={key}>
              <button
                onClick={() => {
                  handleNav(key);
                  setIsOpen(false);
                }}
                className={`w-full text-left font-semibold text-sm py-2 rounded-full transition-all cursor-pointer hover:bg-theme-20 duration-300 ease-in-out ${activeKeyFromRoute === key
                  ? "bg-theme text-white"
                  : "bg-white text-gray-800"
                  }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

export default UserMenu;
