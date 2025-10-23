import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { contactUs } from "../services/NewApi"; // import your API function

export default function ContactForm() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Sending data:", formData); // log the data being sent

    try {
      const response = await contactUs(formData);

      console.log("API Response:", response.data); // log the response from API

      if (response.status === 200) {
        toast.success("Message sent successfully!");
        setFormData({ username: "", useremail: "", message: "" });
      } else {
        toast.error("Something went wrong. Try again!");
      }
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message); // log errors
      toast.error("Failed to send message!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="grid grid-cols-1 md:grid-cols-2 w-xs sm:w-2xl md:w-3xl xl:w-7xl mx-auto shadow-[0px_6px_25px_0px_#31313121] items-center justify-center bg-gray-100 p-6 rounded-2xl border border-gray-300">
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
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input
                type="text"
                name="username" // updated
                placeholder="Enter your name"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-100 placeholder-gray-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                name="useremail" // updated
                placeholder="Enter your email"
                value={formData.useremail}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-100 placeholder-gray-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Message</label>
              <textarea
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 h-28 rounded-md bg-gray-100 placeholder-gray-600 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-full transition-colors duration-200 hover:bg-gray-800 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="flex items-center justify-center bg-white rounded-full p-2">
                <ArrowRight size={18} className="text-black" />
              </span>
              {loading ? "Sending..." : "Get a Solution"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
} 