import React from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function ContactForm() {
  return (
    

        <div 
            className="grid grid-cols-1 md:grid-cols-2 w-xs sm:w-2xl md:w-3xl xl:w-7xl mx-auto  shadow-[0px_6px_25px_0px_#31313121] items-center justify-center bg-gray-100 p-6 rounded-2xl border border-gray-300">
        
            {/* Left Section */}
            <div className="p-6">
                <p className="text-xs text-gray-500 mb-2">WE ARE HERE TO HELP YOU</p>
                <h2 className="text-2xl font-bold mb-4">
                Lorem Ipsum is simply dummy text of the print and typesetting
                </h2>

                <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <div className="bg-white p-2 rounded-md shadow">
                    <Mail className="text-pink-500" size={20} />
                    </div>
                    <span className="text-gray-700">loremipsum@gmail.com</span>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="bg-white p-2 rounded-md shadow">
                    <Phone className="text-pink-500" size={20} />
                    </div>
                    <span className="text-gray-700">+1 7567380932</span>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="bg-white p-2 rounded-md shadow">
                    <MapPin className="text-pink-500" size={20} />
                    </div>
                    <span className="text-gray-700">New York</span>
                </div>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="p-6 bg-white rounded-2xl shadow-md">
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Name</label>
                        <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full p-3 rounded-md bg-theme-10 placeholder-gray-600 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Email</label>
                        <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full p-3 rounded-md bg-theme-10 placeholder-gray-600 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Message</label>
                        <textarea
                        placeholder="Enter your message"
                        className="w-full p-3 h-28 rounded-md bg-theme-10 placeholder-gray-600 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-full hover:bg-gray-800"
                    >
                        <span className="flex items-center justify-center bg-white rounded-full p-2">
                            <ArrowRight size={18} className="text-black" />
                        </span>
                        Get a Solution
                    </button>
                </form>
            </div>
        </div>

   
  );
}
