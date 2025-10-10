import React, { useState } from 'react';
import RentalNavBar from "../RentalNavbar";
import UserMenu from "./UserMenu";
import ExperienceCity from './add-experience/ExperienceCity';
import { useSelector, useDispatch } from 'react-redux';
import { setExperienceNav } from "../../../slices/AddExperienceSlice";
import Basics from './add-experience/Basics';
import Description from './add-experience/Description';
import Details from './add-experience/Details';

function AddExperience() {
  const dispatch = useDispatch();
  const experienceNav = useSelector((state) => state.addExperienceNav);
  const [activeTab, setActiveTab] = useState(experienceNav);

  // Tab names
  const navigation = ["City", "Basics", "Description", "Details"];

  // Handle tab switch
  const handleNav = (nav) => {
    setActiveTab(nav);
    dispatch(setExperienceNav(nav));
  };

  return (
    <>
      <RentalNavBar />
      <UserMenu />

      <div className="max-w-7xl my-3 mx-auto">
        <ul className="flex mx-auto py-2 px-2 rounded-full shadow-[0px_0px_15px_0px_#31313121] justify-between gap-5">
          {navigation.map((nav, id) => (
            <li
              key={id}
              onClick={() => handleNav(nav)}
              className={`px-4 py-2 ${
                nav === activeTab ? "bg-theme text-white" : ""
              } rounded-full hover:bg-gray-300 cursor-pointer`}
            >
              {nav}
            </li>
          ))}
        </ul>
      </div>

      {activeTab === "City" && <ExperienceCity setNav={setActiveTab} />}
      {activeTab === "Basics" && <Basics setNav={setActiveTab} />}
      {activeTab === "Description" && <Description setNav={setActiveTab} />}
      {activeTab === "Details" && <Details setNav={setActiveTab} />}
    </>
  );
}

export default AddExperience;
