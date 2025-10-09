import { useState } from "react";
import { motion } from "framer-motion";
import Map from "../../Map";
import { useSelector,useDispatch } from "react-redux";
import {addProperty} from "../../../../slices/AddPropertySlice"

export default function Location({setNav}) {
  const dispatch = useDispatch();  
  const propertyStore = useSelector(state => state.addProperty);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [cityTown, setCityTown] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const location = {
    address1:address1,
    address2:address2,
    cityTown:cityTown,
    country:country,
    postalCode:postalCode,
    region:region


  }

  const handleLocationForm=(e)=>{
    e.preventDefault();
    dispatch(addProperty({...propertyStore,location}));   
    console.log("datas from Location",location)
     setNav('Photos');
  }

   console.log("location datas ",propertyStore);


  return (
    <div className="max-w-7xl mx-auto min-h-screen py-5 flex flex-col md:flex-row md:items-center gap-4 bg-white">
      {/* Image section */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="md:w-2/5 w-full h-full flex items-center justify-center rounded-2xl overflow-hidden shadow-sm "
      >
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="Listing preview"
          className="object-cover h-[680px] rounded-2xl"
        />
      </motion.div>
      {/* Form section */}
      <form className="flex flex-col gap-5 w-3/5 flex-1" onSubmit={handleLocationForm}>
        {/* Description Row */}
        <h2 className="font-semibold text-[20px] mb-2">Location</h2>
        <div className="flex gap-4">
          <div className="w-1/2">
          <label className="block font-medium text-[14px] text-gray-600 mb-2">Country</label>
            <input type="text" 
            placeholder="Morocco"
            value={country}
            onChange={e=>setCountry(e.target.value)}
            className="bg-gray-100 py-2 pl-3 pr-9 rounded-lg text-base w-full focus:outline-none appearance-none"/>
          </div>
          <div className="w-1/2">  
          <label className="block font-medium text-[14px] text-gray-600 mb-2">Address line 1</label>
            <input type="text" 
            value={address1}
            onChange={e=>setAddress1(e.target.value)}
            placeholder="House name/ Number + street/road"
            className="bg-gray-100 py-2 pl-3 pr-9 rounded-lg text-base w-full focus:outline-none appearance-none"/>
          </div>
        </div>
        <div >
          <Map height={'200px'}/>
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
          <label className="block font-medium text-[14px] text-gray-600 mb-2">Address line 2</label>
            <input type="text" 
            value={address2}
            onChange={e=>setAddress2(e.target.value)}
            placeholder="Morocco"
            className="bg-gray-100 py-2 pl-3 pr-9 rounded-lg text-base w-full focus:outline-none appearance-none"/>
          </div>
          <div className="w-1/2"> 
          <label className="block font-medium text-[14px] text-gray-600 mb-2">City/Town/District</label>
            <input type="text" 
            value={cityTown}
            onChange={e=>setCityTown(e.target.value)}
            placeholder="House name/ Number + street/road"
            className="bg-gray-100 py-2 pl-3 pr-9 rounded-lg text-base w-full focus:outline-none appearance-none"/>
          </div>
           </div>
        <div className="flex gap-4">
          <div className="w-1/2">   
          <label className="block font-medium text-[14px] text-gray-600 mb-2">State/Province/Country/Region</label>
            <input type="text" 
            onChange={e=>setRegion(e.target.value)}
            placeholder="House name/ Number + street/road"
            className="bg-gray-100 py-2 pl-3 pr-9 rounded-lg text-base w-full focus:outline-none appearance-none"/>
          </div>
          <div className="w-1/2">  
          <label className="block font-medium text-[14px] text-gray-600 mb-2">Zip/Postal Code</label>
            <input type="text" 
            value={postalCode}
            onChange={e=>setPostalCode(e.target.value)}
            placeholder="House name/ Number + street/road"
            className="bg-gray-100 py-2 pl-3 pr-9 rounded-lg text-base w-full focus:outline-none appearance-none"/>
          </div>
        </div>
       
        {/* Buttons */}
        <div className="flex justify-between gap-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="border border-gray-400 px-6 py-2 rounded-full bg-white font-semibold transition"
            type="button"
            onClick={()=>setNav('Description')}
          >
            Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            className="px-7 py-2 rounded-full bg-theme text-white font-semibold shadow-md focus:ring-2 focus:ring-pink-200 transition"
            type="submit"
          >
            Next
          </motion.button>
        </div>
      </form>
    </div>
  );
}