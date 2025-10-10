import React from "react";
import CitySearch from "./CitySearch";
import experienceImg from "../../../images/add-experience/add-experience-1.png";
import ImageTextSection from "./ImageTextSection";

export default function ExperienceCity({ setNav }) {
  return (
    <div className="flex flex-col md:flex-row w-full">
      <ImageTextSection
        imageSrc={experienceImg}
        title="Add Experience"
        subtitle="Choose the city where you gained your experience"
      />
      <CitySearch setNav={setNav} />
    </div>
  );
}
