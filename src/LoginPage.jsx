// src/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import bg from './rentalhome/images/login-bg.png'
import google from './images/google.svg'
import mail from './images/mail.svg'
import facebook from './images/facebook.svg'
import apple from './images/apple.svg'
import RentalNavbar from './rentalhome/components/RentalNavbar'

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(email, password);
      if (res.status) {
        // logged in
        navigate("/"); // or wherever
      } else {
        setError(res.message || "Login failed");
      }
    } catch (err) {
      // axios error shape: err.response.data.message
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <>
    <RentalNavbar/>

    <div className="section py-[100px] px-5 md:px-0 md:py-[2%]">
      <div className="mx-auto max-w-7xl p-4 bg-no-repeat rounded-2xl bg-cover bg-center bg-red-400" style={{backgroundImage:`url(${bg})`}}>
        <div className="flex gap-4">
          <div className="w-2/5 hidden md:flex bg-blue-200 p-4 bg-white/20 text-white rounded-xl items-center justify-center ">
            <div className="mb-[100px] space-y-7">
              <div className="flex justify-center">
                <img className="w-45 bg-white px-4 py-4 rounded-3xl shadow-inner" src="./logo.svg" alt="" />
              </div>
                <h2 className="text-2xl font-semibold px-5 text-center"> 
                  Lorem Ipsum is simply dummy of the printing  text
              </h2>
              <p  className="mt-5 text-md font-light px-5 text-white/70 text-center">
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been
              </p>  
            </div>
          </div>
          <div className="w-full md:w-3/5  bg-white p-4 rounded-xl">
            <div className="md:min-h-screen flex items-center justify-center bg-white px-4">
              <div className="">
                {/* Header */}
                <h2 className="text-xl font-semibold">Create Account</h2>
                <p className="text-sm text-gray-600">Welcome to Airbnb</p>

                {/* Form */}
                <form className="mt-6 space-y-4"  onSubmit={handleSubmit}>
                  {/* Country/Region Dropdown */}
                  <div>      
                     <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-md border border-gray-200 bg-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="jay2345@yopmail.com"
                      />
                  </div>

                  {/* Phone Number Input */}
                  <div>   
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full rounded-md border border-gray-200 bg-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="********"
                    />
                  </div>

                  {/* Info Text */}
                  <p className="text-xs text-gray-500">
                    We’ll call or text to confirm your number standard message and rates
                    apply <span className="underline cursor-pointer">Privacy Policy</span>
                  </p>

                  {/* Continue Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-pink-600 hover:bg-pink-700  disabled:opacity-60 text-white font-medium rounded-md py-3 transition"
                  >
                     {loading ? "Logging in..." : "Login"}
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-2 my-6">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="text-sm text-gray-500">or</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Social Login */}
                <p className="text-center text-sm text-gray-600 mb-4">Continue With</p>
                <div className="flex justify-center gap-4">
                  <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
                    <img src={google} alt="Google" className="w-10 h-10" />
                  </button>
                  <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
                    <img src={facebook} alt="Apple" className="w-10 h-10" />
                  </button>
                  <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
                    <img src={apple} alt="Facebook" className="w-10 h-10" />
                  </button>
                  <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
                    <img src={mail} alt="Gmail" className="w-10 h-10" />
                  </button>
                </div>
              </div>
            </div>    
          </div>
        </div>
      </div> 
    </div>




    </>
  );
}
