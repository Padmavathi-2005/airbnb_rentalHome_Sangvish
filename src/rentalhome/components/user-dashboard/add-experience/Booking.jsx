import React, { useState } from "react";
import ImageTextSection from "./ImageTextSection";
import experienceImg from "../../../images/add-experience/add-experience-1.png";

export default function Booking() {
    const [bookingType, setBookingType] = useState("Review each request");
    const [cancellationPolicy, setCancellationPolicy] = useState(
        "Flexible: Full refund 1 day prior to arrival, except fees"
    );
    const [checkIn, setCheckIn] = useState("None");
    const [checkOut, setCheckOut] = useState("None");

    const handleBack = () => {
        window.location.reload(); // placeholder
    };

    const handleNext = () => {
        window.location.reload(); // placeholder
    };

    return (
        <>
            <div className="flex flex-col md:flex-row w-full"><ImageTextSection
                imageSrc={experienceImg}
                title="Add Experience Details"
                subtitle=""
                fullHeight={false} />
                <div className="md:w-1/2 w-full p-6 flex flex-col gap-8 h-80 md:h-[28rem] overflow-y-auto">
                    {/* Booking Section */}
                    <div className="border rounded-xl p-4 flex flex-col gap-3">
                        <div>
                            <h2 className="text-lg font-semibold">Booking</h2>
                            <p className="text-gray-500 text-sm">
                                Choose how your guests book
                            </p>
                            <p className="text-gray-400 text-sm">
                                Get ready for guests by choosing your booking style
                            </p>
                        </div>

                        <div>
                            <label className="font-semibold text-sm block mb-1">
                                Booking Type
                            </label>
                            <select
                                value={bookingType}
                                onChange={(e) => setBookingType(e.target.value)}
                                className="w-full border border-gray-300 rounded-md bg-gray-100 p-2 text-sm"
                            >
                                <option>Review each request</option>
                                <option>Instant booking</option>
                            </select>
                        </div>
                    </div>

                    {/* Terms Section */}
                    <div className="border rounded-xl p-4 flex flex-col gap-3">
                        <div>
                            <h2 className="text-lg font-semibold">Terms</h2>
                            <p className="text-gray-500 text-sm">
                                The requirements and conditions to book a reservation at your listing
                            </p>
                            <p className="text-gray-400 text-sm">Cancellation Policy</p>
                        </div>

                        <div>
                            <select
                                value={cancellationPolicy}
                                onChange={(e) => setCancellationPolicy(e.target.value)}
                                className="w-full border border-gray-300 rounded-md bg-gray-100 p-2 text-sm"
                            >
                                <option>Flexible: Full refund 1 day prior to arrival, except fees</option>
                                <option>Moderate: Full refund 5 days prior to arrival, except fees</option>
                                <option>Strict: 50% refund up to 1 week prior to arrival</option>
                            </select>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="font-semibold text-sm block mb-1">
                                    Check in after
                                </label>
                                <select
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md bg-gray-100 p-2 text-sm"
                                >
                                    <option>None</option>
                                    <option>12:00 PM</option>
                                    <option>1:00 PM</option>
                                    <option>2:00 PM</option>
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="font-semibold text-sm block mb-1">
                                    Check out before
                                </label>
                                <select
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md bg-gray-100 p-2 text-sm"
                                >
                                    <option>None</option>
                                    <option>10:00 AM</option>
                                    <option>11:00 AM</option>
                                    <option>12:00 PM</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={handleBack}
                            className="bg-gray-300 text-black px-6 py-2 rounded-md font-medium hover:bg-gray-400 transition"
                        >
                            Back
                        </button>

                        <button
                            onClick={handleNext}
                            className="bg-red-600 text-white px-6 py-2 rounded-md font-medium hover:bg-red-700 transition"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div ></>
    );
}
