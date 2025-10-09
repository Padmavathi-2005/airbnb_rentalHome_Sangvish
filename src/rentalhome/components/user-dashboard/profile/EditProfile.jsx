import React, { useState, useEffect } from 'react';
import { User, Mail, Camera, Phone } from "lucide-react";
import { useAuth } from '../../../../AuthContext';
import { getProfileDetails, updateProfile, uploadProfileImage } from '../../../services/NewApi';
import fly from "../../../images/profile/fly.svg";
import boat from "../../../images/profile/boat.svg";
import camera from "../../../images/profile/camera.svg";
import map from "../../../images/profile/map.svg";
import ProfileSkeletonLoader from '../../skeletonloader/ProfileSkeletonLoader';
import { useDispatch,useSelector} from 'react-redux';
import {setUserProfile} from '../../../../slices/UserSlice';

function EditProfile() {
  const { user: authUser, updateUser } = useAuth();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    profile_image: '',
    profile_src: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

  const userData =  useSelector((state)=>state.userProfile);
  // console.log("user form data details", userData);





  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getProfileDetails(authUser?.id?.toString() || '');

        // console.log("user form data details", data);
        dispatch(setUserProfile(data));
        setProfile(data.profile);
        setFormData({
          first_name: data.profile.first_name || '',
          last_name: data.profile.last_name || '',
          email: data.profile.email || '',
          phone: data.profile.phone || '',
          profile_image: data.profile.profile_image || '',
          profile_src: data.profile.profile_src || '',
        });
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (authUser?.id) {
      fetchProfile();
    }
  }, [authUser?.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        // Optimistic update
        setFormData(prev => ({
          ...prev,
          profile_src: reader.result,
        }));
      };
      
      reader.readAsDataURL(file);

      try {
        const response = await uploadProfileImage(file, authUser?.id?.toString() || '');
        setFormData(prev => ({
          ...prev,
          profile_image: response.profile_image,
          profile_src: response.profile_src + '?t=' + Date.now(),
        }));
        updateUser({
          ...authUser,
          profile_image: response.profile_image,
          profile_src: response.profile_src,
        });
        setSuccessMessage('Profile picture updated successfully!');
      } catch (err) {
        console.error('Error uploading image:', err);
        setError('Failed to upload profile image');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = await updateProfile(formData, authUser?.id?.toString() || '');
      setProfile(updatedProfile);
      updateUser({ ...authUser, ...updatedProfile });
      setSuccessMessage('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    }
  };

        
  if (loading) return <> <ProfileSkeletonLoader/>  </>
  if (error) return <div className="text-center text-red-600">{error}</div>;
  if (!profile) return <div className="text-center text-gray-600">Profile not found</div>;

  const destination = [
    { img: fly, active: true },
    { img: boat, active: true },
    { img: map, active: true },
    { img: camera, active: true },
  ];

  return (
    <div className="w-3/4 mx-auto bg-white shadow-[0px_6px_20px_0px_#31313121] p-6 rounded-4xl space-y-7">
      <div>
        <h2 className="text-2xl font-semibold mb-2">My Profile</h2>
        {successMessage && (
          <div className="text-green-600 mb-4">{successMessage}</div>
        )}
        <p className="text-gray-600 text-sm">
          Hosts and guests can see your profile and it may appear across Airbnb to
          help us build trust in our community.{" "}
          <a href="#" className="text-theme underline">Learn more</a>
        </p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="w-60 bg-white rounded-2xl shadow-[0px_6px_20px_0px_#31313121] border border-gray-300 p-4 flex flex-col items-center">
          {/* Avatar Section */}
          <div className="relative w-full">
            {imagePreview || formData.profile_src ? (
              <img
                src={imagePreview || formData.profile_src}
                alt="Profile Avatar"
                className="w-60 h-60 rounded-xl object-cover bg-pink-100"
                onError={(e) => {
                  e.target.src = 'https://bnbexp.letsdateme.com/public/images/default-profile.png';
                }}
              />
            ) : (
              <div className="w-60 h-60 rounded-xl bg-pink-100 flex items-center justify-center">
                <User className="w-20 h-20 text-gray-500" />
              </div>
            )}
            <label
              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer"
              htmlFor="profile-image-upload"
            >
              <Camera className="text-black" size={20} />
            </label>
            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-gray-700 font-medium">
              <User className="w-5 h-5 text-gray-500" /> First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              placeholder="First Name"
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-gray-700 font-medium">
              <User className="w-5 h-5 text-gray-500" /> Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-gray-700 font-medium">
              <Mail className="w-5 h-5 text-gray-500" /> Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Mobile */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-gray-700 font-medium">
              <Phone className="w-5 h-5 text-gray-500" /> Mobile
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="7584258003"
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="md:col-span-2 flex justify-start">
            <button
              type="submit"
              className="px-[40px] py-3 rounded-full bg-theme text-white font-semibold hover:bg-theme-20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className="space-y-5">
        <h2 className="text-2xl font-semibold mb-4">Unlock Your Next Destination Icon</h2>
        <div className="mt-3">
          <ul className="flex gap-6 space-x-3 items-center">
            {destination.map((destiny, index) => (
              <li key={index} className="bg-white shadow">
                <img className="rounded-lg shadow" src={destiny.img} alt="destination icon" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


export default EditProfile;