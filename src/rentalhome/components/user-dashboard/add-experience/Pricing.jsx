import React, { useState } from "react";
import experienceImg from "../../../images/add-experience/add-experience-1.png";
import ImageTextSection from "./ImageTextSection";

export default function Pricing() {
    // State for main price and currency
    const [price, setPrice] = useState("");
    const [currency, setCurrency] = useState("MAD");

    // State for checkboxes
    const [pricingOptions, setPricingOptions] = useState({
        "Cleaning fee": false,
        "Additional guests": false,
        "Security deposit": false,
        "Weekend pricing": false,
    });

    const handleCheckboxChange = (option) => {
        setPricingOptions((prev) => ({
            ...prev,
            [option]: !prev[option],
        }));
    };

    const handleBack = () => {
        console.log("Back clicked");
    };

    const handleNext = () => {
        const formData = {
            price,
            currency,
            pricingOptions,
        };
        console.log("Form Data Submitted:", formData);
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden">
            {/* Left Image Section */}
            <ImageTextSection
                imageSrc={experienceImg}
                title="Add Experience Details"
                subtitle=""
                fullHeight={true}
            />

            {/* Right Form Section */}
            <div className="md:w-1/2 w-full p-6 flex flex-col gap-6 overflow-y-auto">
                {/* Pricing Section */}
                <div className="flex flex-col gap-6">
                    {/* Best Price Section */}
                    <div className="p-5 rounded-xl border border-gray-200 shadow-sm bg-white">
                        <h2 className="text-lg font-semibold mb-4">Best Price</h2>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                            {/* Daily/Hourly Price */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium mb-1">
                                    Daily/Hourly Price
                                </label>
                                <div className="flex items-center  rounded-md overflow-hidden">
                                    <span className="h-full bg-theme-30 px-3 py-2 text-sm font-semibold text-gray-800 rounded-l-md border-2 border-[color-mix(in_srgb,var(--theme-color)_30%,white)] flex items-center justify-center">
                                        {currency}
                                    </span>

                                    <input
                                        type="number"
                                        placeholder="Enter price"
                                        value={price}
                                        onChange={(e) => {
                                            // Remove non-numeric characters
                                            let val = e.target.value;

                                            // Convert to number
                                            val = Number(val);

                                            // Only allow positive numbers > 0
                                            if (val > 0) {
                                                setPrice(val);
                                            } else if (e.target.value === "") {
                                                // Allow empty input
                                                setPrice("");
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            // Prevent typing '-' or 'e'
                                            if (["-", "e", "+", "."].includes(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        className="w-full px-3 py-2 outline-none border-2 border-gray-300 text-gray-800"
                                    />


                                </div>


                            </div>

                            {/* Currency Select */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium mb-1">Currency</label>
                                <div className="relative w-full">

                                    <select
                                        className="w-full appearance-none px-3 py-2 border-2 border-gray-300 rounded-md text-gray-800 bg-white focus:border-black-500 focus:outline-none pr-12"
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                    >
                                        <option>MAD</option>
                                        <option>USD</option>
                                        <option>EUR</option>
                                        <option>INR</option>
                                    </select>

                                    {/* Custom icon area */}
                                    <div className="pointer-events-none absolute top-0 right-0 h-full px-3 flex items-center justify-center bg-[color-mix(in_srgb,var(--theme-color)_30%,white)] border-l-2 border-[color-mix(in_srgb,var(--theme-color)_30%,white)] rounded-r-md">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-6 bg-[color-mix(in_srgb,var(--theme-color)_30%,white)]"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <p className="text-sm text-gray-500 mt-2">
                            You can offer discounts for longer stays by setting{" "}
                            <span className="text-[var(--theme-color)] font-medium">
                                weekly and monthly
                            </span>{" "}
                            prices.
                        </p>
                    </div>

                    {/* Additional Pricing Options */}
                    <div className="p-5 rounded-xl border border-gray-200 shadow-sm bg-white">
                        <h2 className="text-lg font-semibold mb-4">
                            Additional Pricing Options
                        </h2>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                            {Object.keys(pricingOptions).map((option) => (
                                <label
                                    key={option}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={pricingOptions[option]}
                                        onChange={() => handleCheckboxChange(option)}
                                        className={`
          w-4 h-4 rounded border-2 border-gray-300 
          accent-[var(--theme-color)]
          hover:bg-theme-30
          checked:bg-theme checked:border-theme checked:hover:bg-theme
          transition-all duration-200
        `}
                                    />
                                    <span className="text-gray-700 text-sm">{option}</span>
                                </label>
                            ))}
                        </div>


                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={handleBack}
                        className="bg-gray-200 text-black px-6 py-2 rounded-md font-medium hover:bg-gray-300 transition"
                    >
                        Back
                    </button>

                    <button
                        onClick={handleNext}
                        className="bg-[var(--theme-color)] text-white px-6 py-2 rounded-md font-medium hover:bg-[color-mix(in_srgb,var(--theme-color)_80%,white)] transition duration-200"
                    >
                        Next
                    </button>




                </div>
            </div>
        </div>
    );
}
