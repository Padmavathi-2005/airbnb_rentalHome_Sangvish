
import { useSelector,useDispatch } from "react-redux";
import React, { memo, useState } from "react";
import property from "../../../images/Property-listing/property2.png"
import {addProperty} from "../../../../slices/AddPropertySlice"
import { motion } from "framer-motion";


function Basics({setNav}) {
  const dispatch = useDispatch();
  const propertyStore = useSelector(state => state.addProperty);
  console.log("this is basics", propertyStore);
  const [bedrooms, setBedrooms] = useState(1);
  const [beds, setBeds] = useState(0);
  const [bathrooms, setBathrooms] = useState(1);
  const [propertyType, setPropertyType] = useState("Apartment");
  const [roomType, setRoomType] = useState("Entire Home/apt");
  const [accommodates, setAccommodates] = useState(1);
  const [addBeds, setAddBeds] = useState(false)
  const [bedCount, setBedCount] = useState({});

  const handleBedCount =(bed, value)=>{   
  setBedCount((prev)=>{
    const updated = {...prev}
    if (value > 0){
      updated[bed] = value;
    }else{
      delete updated[bed];
    }
          return updated;

  })
  }

  const handleBasicsForm =(e)=>{
    e.preventDefault();
    const basics ={
      bedrooms:bedrooms,
      bed:beds,
      bathroom:bathrooms,
      roomType:roomType,
      accommodates:accommodates,
      beds:bedCount
    }
     dispatch(addProperty({...propertyStore,basics}));     
     console.log("datas from basics: ",propertyStore);
     console.log("datas from basics: ",basics);
     setNav('Description');
  }
  console.log("number of beds",propertyStore);

  const newBeds = [
    "King",    "Queen",    "Double",    "Single",    "Sofa bed",    "Sofa",
    "Air mattress",    "Floor mattress",    "Toddler bed",    "Crib",
    "Water bed",    "Hammock",    "Single bed",
  ];





  return (
    <section>      
    <div className="max-w-7xl mx-auto min-h-screen flex flex-col md:flex-row md:items-center gap-4 py-5 bg-white">
      {/* Left: Image */}
      
      <div className="md:w-2/5 w-full h-64 md:h-[420px] flex items-center justify-center rounded-2xl overflow-hidden shadow-sm ">
        <img
          src={property}
          alt="room"
          className="object-cover w-full h-full"
        />
      </div>
      {/* Right: Form */}
      <div className="md:w-3/5 w-full flex items-center justify-center p-4 md:p-0">
        <form className="w-full max-w-xl grid gap-8" onSubmit={handleBasicsForm}>
          {/* Rooms & Beds */}
          <div className="bg-pink-50 rounded-2xl p-5 shadow-md">
            <h3 className="font-bold text-lg mb-2">Rooms & Beds</h3>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block font-medium mb-1">Bedrooms</label>
                <select
                  className="w-full px-3 py-2 rounded-full bg-white border-0 outline-none"
                  value={bedrooms}
                  onChange={e => setBedrooms(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
            
            </div>
            {/* Beds */}
            <div className="mt-5 flex flex-col items-start gap-3">
              <div>
                <p className="font-semibold mb-1">Bedroom 1</p>
               
                <span className="text-sm ms-2">Beds</span>
              </div>            
                  {addBeds && 
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-2 gap-3"
                  >     
                      {newBeds.map((bed, index) => (
                        <div key={index} className="flex flex-col">
                          <label className="mb-1 font-medium">{bed}</label>
                          <input
                            type="number"
                            placeholder={`Enter quantity`}
                            value={bedCount[bed] || ""}
                            onChange={(e)=>handleBedCount(bed, parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 rounded-full bg-white border-0 outline-none"
                          />
                        </div>
                      ))}  
                  </motion.div>}
            

              <button
                type="button"
                className="bg-theme text-white px-4 py-2 rounded-full font-medium ml-auto"
                onClick={()=>setAddBeds(!addBeds)}
              >
               {!addBeds ? "Add Beds" : "Done"}
              </button>
            </div>
            <div>
                <div>
                <label className="block font-medium mb-1">Bathrooms</label>
                <select
                  className="w-full px-3 py-2 rounded-full bg-white border-0 outline-none"
                  value={bathrooms}
                  onChange={e => setBathrooms(Number(e.target.value))}
                >
                  {[1, 2, 3, 4].map(n => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>
             <h3 className="font-bold text-lg mt-2">Listings</h3>
            <div className="grid md:grid-cols-3 gap-5 mt-3 ">
          
            <div>
              <label className="block font-medium mb-1">Room Type</label>
              <select
                className="w-full px-3 py-2 rounded-full bg-white border-0 outline-none "
                value={roomType}
                onChange={e => setRoomType(e.target.value)}
              >
                <option>Entire Home/apt</option>
                <option>Private Room</option>
                <option>Shared Room</option>
                <option>Unique Stays</option>
                <option>Single Room</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Accommodates</label>
              <select
                className="w-full px-3 py-2 rounded-full bg-white border-0 outline-none"
                value={accommodates}
                onChange={e => setAccommodates(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
          </div>

          <div className="flex justify-between gap-4 mt-4">
            {/* <motion.button
              whileHover={{ scale: 1.03 }}
              className="border border-gray-400 px-6 py-2 rounded-full bg-white font-semibold transition"
              type="button"
               onClick={()=>setNav('property-city')}
            >
              Back
            </motion.button> */}
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

    </div>
    </section>
  );
}


export default memo(Basics)