import React, { useEffect } from 'react';
import RentalNavBar from "../RentalNavbar";
import UserMenu from "./UserMenu";
import ExperienceCity from './add-experience/ExperienceCity';
import { useSelector, useDispatch } from 'react-redux';
import { setExperienceNav, resetExperienceNav } from "../../../slices/AddExperienceSlice";
import Basics from './add-experience/Basics';
import Description from './add-experience/Description';
import Details from './add-experience/Details';
import MapAddressForm from './add-experience/MapAddressForm';
import Amenities from './add-experience/Amenities';
import Photos from './add-experience/Photos';
import VerificationDocuments from './add-experience/VerficationDocuments';
import Pricing from './add-experience/Pricing';
import Booking from './add-experience/Booking';
import Calendar from './add-experience/Calendar';

function AddExperience() {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.addExperienceNav);

  // Tab names
  const navigation = [
    "City",
    "Basics",
    "Description",
    "Details",
    "Location",
    "Amenities",
    "Photos",
    "Verification Documents",
    "Pricing",
    "Booking",
    "Calendar"
  ];

  // Reset tab to "City" when page loads
  useEffect(() => {
    dispatch(resetExperienceNav());
  }, [dispatch]);

  // Handle tab switch
  const handleNav = (nav) => {
    dispatch(setExperienceNav(nav));
  };

  return (
    <>
      <RentalNavBar />
      <UserMenu />

      <div className="max-w-7xl my-3 mx-auto px-4">
        <div className="overflow-x-auto rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
          <ul className="flex gap-3 py-2 px-4 min-w-max">
            {navigation.map((nav, id) => (
              <li
                key={id}
                onClick={() => handleNav(nav)}
                className={`flex-shrink-0 px-4 py-2 rounded-full cursor-pointer text-sm sm:text-base transition-colors duration-200 ${
                  nav === activeTab
                    ? "bg-theme text-white shadow-inner"
                    : "bg-white hover:bg-gray-200"
                }`}
              >
                {nav}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {activeTab === "City" && <ExperienceCity />}
      {activeTab === "Basics" && <Basics />}
      {activeTab === "Description" && <Description />}
      {activeTab === "Details" && <Details />}
      {activeTab === "Location" && <MapAddressForm />}
      {activeTab === "Amenities" && <Amenities />}
      {activeTab === "Photos" && <Photos />}
      {activeTab === "Verification Documents" && <VerificationDocuments />}
      {activeTab === "Pricing" && <Pricing />}
      {activeTab === "Booking" && <Booking />}
      {activeTab === "Calendar" && <Calendar />}
    </>
  );
}

export default AddExperience;
