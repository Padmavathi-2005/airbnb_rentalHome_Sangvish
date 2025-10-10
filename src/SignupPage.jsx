import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import bg from './rentalhome/images/login-bg.png';
import google from './images/google.svg';
import facebook from './images/facebook.svg';
import RentalNavbar from './rentalhome/components/RentalNavbar';


export default function SignupPage() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.last_name) newErrors.last_name = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const res = await register(formData);
      if (res?.status) {
        navigate('/login', {
          state: {
            successMessage: res.message || 'Registration successful! Please check your email.'
          }
        });
      } else {
        setErrors({ general: res.message || 'Registration failed' });
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.errors) setErrors(err.errors);
      else if (err.message) setErrors({ general: err.message });
      else setErrors({ general: 'Registration failed' });
    }
  };

  return (
    <>
      <RentalNavbar />
      <div className="section py-[100px] px-5 md:px-0 md:py-[2%]">
        <div className="mx-auto max-w-7xl p-4 bg-no-repeat rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
          <div className="flex gap-4">
            <div className="w-2/5 hidden md:flex p-4 bg-white/20 text-white rounded-xl items-center justify-center">
              <div className="mb-[100px] space-y-7">
                <div className="flex justify-center">
                  <img className="w-45 bg-white px-4 py-4 rounded-3xl shadow-inner" src="./logo.svg" alt="Logo" />
                </div>
                <h2 className="text-2xl font-semibold px-5 text-center">
                  Lorem Ipsum is simply dummy of the printing text
                </h2>
                <p className="mt-5 text-md font-light px-5 text-white/70 text-center">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                </p>
              </div>
            </div>

            <div className="w-full md:w-3/5 bg-white p-4 rounded-xl">
              <h2 className="text-3xl text-center font-semibold">Sign Up</h2>
              <div className="md:min-h-screen flex items-center px-4">
                <div className="w-[100%]">
                  <p className="text-xl font-semibold">Welcome to Airbnb</p>

                  {errors.general && <p className="text-red-500 text-sm my-2">{errors.general}</p>}

                  <form onSubmit={handleSubmit} className="w-full mt-6 space-y-4">
                    {/* First & Last Name */}
                    <div className="grid grid-cols-2 gap-3 items-center w-full">
                      <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                          type="text"
                          id="first_name"
                          name="first_name"
                          className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                          value={formData.first_name}
                          onChange={handleChange}
                          required
                        />
                        {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>}
                      </div>

                      <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                          type="text"
                          id="last_name"
                          name="last_name"
                          className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                          value={formData.last_name}
                          onChange={handleChange}
                          required
                        />
                        {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>}
                      </div>
                    </div>

                    {/* Email & Password */}
                    <div className="grid grid-cols-2 gap-3 items-center w-full">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone (Optional)</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full rounded-md bg-pink-500 px-4 py-2 text-white text-sm font-medium hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {loading ? 'Creating account...' : 'Sign Up'}
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
                    <button aria-label="Login with Google" className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
                      <img src={google} alt="Google" className="w-10 h-10" />
                    </button>
                    <button aria-label="Login with Facebook" className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
                      <img src={facebook} alt="Facebook" className="w-10 h-10" />
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
