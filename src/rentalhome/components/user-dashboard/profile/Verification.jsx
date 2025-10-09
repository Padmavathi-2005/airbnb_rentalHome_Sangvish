import React from 'react'
import { Mail, Facebook, FileText } from "lucide-react";
import { FcGoogle } from "react-icons/fc"; // Google icon since lucide doesn't have it
import google from '../../../../images/google.svg'
import mail from '../../../../images/mail.svg'
import facebook from '../../../../images/facebook.svg'
import apple from '../../../../images/apple.svg'
function Verification() {
    const verifications = [
    {
      id: 1,
      name: "Email",
      description:
        "Please Verify your email address by clicking the link in the message. We just sent to : jay2345@yopmail.com",
      icon: <img src={mail} alt="" className='w-12'/>,
      color: "border-green-500 text-green-500",
    },
    {
      id: 2,
      name: "Facebook",
      description:
        "Signin with Facebook and discover your trusted connections to hosts and Guests all over the world",
      icon: <img src={facebook} alt="" className='w-12'/>,
      color: "border-blue-500 text-blue-500",
    },
    {
      id: 3,
      name: "Google",
      description:
        "Connect your ArabicBnB account to your google account for simplicity and ease",
      icon: <img src={google} alt="" className='w-12'/>,
      color: "border-yellow-500 text-yellow-500",
    },
    {
      id: 4,
      name: "Document Verification",
      description:
        "Please upload your documents for ID verification. Eg : Passport, Driving Licence",
      icon: <FileText className="w-10 h-10  text-indigo-500" />,
      color: "border-pink-500 text-pink-500",
    },
  ];
  return (
       <div className='w-3/4 mx-auto space-y-5'>
          {/* Current Verifications */}
           <div className=" bg-white shadow-[0px_6px_25px_0px_#31313121] rounded-xl"> 
            <div className="bg-pink-100 px-4 py-2 text-sm font-semibold rounded-t-xl">
              Your Current Verifications
            </div>
           <div className='p-6'>
             <div className="px-4 py-6 text-gray-500 text-sm">
              No Verification Available
            </div>
           </div>
          </div>

          {/* Add More Verifications */}
          <div className=" bg-white shadow-[0px_6px_25px_0px_#31313121] rounded-xl"> 
            <div className="bg-pink-100 px-4 py-2 text-sm font-semibold rounded-t-xl">
              Add more verifications
            </div>
            <div className='p-6 space-y-3'>
              {verifications.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-4 py-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  <button
                    className={`px-4 py-1 rounded-full border text-sm font-medium hover:bg-gray-50 transition ${item.color}`}
                  >
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>
       </div>
  )
}

export default Verification