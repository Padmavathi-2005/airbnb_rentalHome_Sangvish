import UserMenu from './UserMenu';
import { User, List, Plane, Wallet, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAuth } from "../../../AuthContext";
import { useSelector, useDispatch } from 'react-redux';
import { setNewUserNav } from '../../../slices/UserSlice';
import RentalNavbar from '../RentalNavbar';
import { API } from "../../../Api";
import toast, { Toaster } from "react-hot-toast";
import ConfirmModal from "../common/ConfirmModel";
import React, { useState } from "react";

function Card({ className, children, ...props }) {

  return (
    <div
      className={clsx(
        "rounded-2xl bg-white shadow border border-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardContent({ className, children, ...props }) {
  return (
    <div
      className={clsx("p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function DashBoard() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("USER DATA FROM CONTEXT:", user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const firstName = user.first_name;
  const profileImage = user.profile_image;
  console.log(firstName, profileImage);

  const properties = useSelector((state) => state.propertyList || []);
  const expProperties = useSelector((state) => state.expPropertyList || []);


  const wishlistCount =
    properties.filter((p) => p?.wishlist?.status === '1').length +
    expProperties.filter((p) => p?.wishlist?.status === '1').length;

  const handleProfile = () => {
    dispatch(setNewUserNav("Profile"));
    navigate("/profile");
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;


    const localPreview = URL.createObjectURL(file);
    updateUser({ profile_src: localPreview });


    const formData = new FormData();
    formData.append("profile_image", file);

    try {
      const res = await API.post("/users/update-profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.status) {
        // Update with actual backend image URL
        updateUser({ profile_src: res.data.image_url });
      } else {
        alert("Upload failed: " + res.data.message);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong uploading your image.");
    }
  };
  const handleDeleteAccount = async () => {
    setIsModalOpen(false); // close modal first

    try {
      const res = await API.delete(`/users/${user.id}`);
      if (res.data.status) {
        toast.success("Account deleted successfully!");
        logout();
        navigate("/");
      } else {
        toast.error("Failed to delete account: " + res.data.message);
      }
    } catch (err) {
      console.error("Delete account error:", err);
      toast.error("Something went wrong while deleting your account.");
    }
  };


  return (

    <>
      <RentalNavbar />
      <UserMenu />
      <section className="bg-gray-50">
        <div className="py-10 mx-auto  max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-1 flex flex-col items-center">

            <div className="bg-white rounded-2xl shadow-[0px_6px_25px_0px_#31313121] border border-gray-300 p-4 flex flex-col items-center">
              {/* Avatar Section */}
              <div className="relative w-full">
                <img
                  src={profileImage}
                  alt="Profile Avatar"
                  className="w-60 h-60 rounded-xl object-cover bg-pink-100"
                />



                {/* Camera icon as clickable label */}
                <label
                  htmlFor="profile-upload"
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer"
                >
                  <Camera className="text-black" size={20} />
                </label>

                {/* Hidden input for file selection */}
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>

              <div className='flex justify-center pt-4'>
                <div>
                  <button
                    className="bg-theme rounded-full px-5 py-2 text-white"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Delete Account
                  </button>

                  <ConfirmModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleDeleteAccount}
                    message="Are you sure you want to delete your account?"
                    title="Delete Account"
                  />

                  <Toaster position="top-center" reverseOrder={false} />
                </div>
              </div>

            </div>

            {/* Identity Verification */}
            <div className="bg-white rounded-2xl shadow-[0px_6px_25px_0px_#31313121] p-6 mt-6 ">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <User className="w-4 h-4 text-pink-500" /> Identity Verification
              </h3>
              <p className="text-gray-500 text-xs mt-2">
                Show others you’re really you with the identity verification badge.
              </p>
              <div className='flex justify-center pt-4 '>
                <button
                  onClick={() => navigate("/profile?tab=trust")}
                  className="rounded-full bg-gray-900 py-3 px-5 text-white"
                >Get Verified</button>
              </div>
            </div>
          </div>
          {/* Right Content */}
          <div className="col-span-3">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* My Lists */}
              <Card
                className="bg-white rounded-2xl shadow cursor-pointer hover:shadow-lg transition"
                onClick={() => navigate('/wishlist')}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <span className="bg-[#C0ECFF] mb-2 rounded-full p-3">
                    <List className="w-6 h-6 text-[#120A36]" />
                  </span>
                  <p className="text-lg font-bold">{wishlistCount}</p>
                  <p className="text-gray-500 text-sm">My Lists</p>
                </CardContent>
              </Card>

              {/* Trips */}
              <Card className="bg-white rounded-2xl shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <span className='bg-[#FFDCC9] mb-2 rounded-full p-3 mb-2'>
                    <Plane className="w-6 h-6 text-[#120A36]" />
                  </span>
                  <p className="text-lg font-bold">0</p>
                  <p className="text-gray-500 text-sm">Trips</p>
                </CardContent>
              </Card>

              {/* Wallet */}
              <Card className="bg-white rounded-2xl shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <span className='bg-[#FFE2A8] mb-2 rounded-full p-3 mb-2'>
                    <Wallet className="w-6 h-6 text-[#120A36]" />
                  </span>
                  <p className="text-lg font-bold">0 MAD</p>
                  <p className="text-gray-500 text-sm">My Lists</p>
                </CardContent>
              </Card>
            </div>

            {/* User Info */}
            <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Hi I’m {firstName}</h2>
                <p className="text-gray-500 text-sm">Member since August 2015</p>
              </div>
              <button onClick={handleProfile} variant="outline" className="rounded-xl text-theme cursor-pointer">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default DashBoard