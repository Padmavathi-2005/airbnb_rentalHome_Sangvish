import { useState } from "react";
import { ChevronDown, WandSparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector,useDispatch } from "react-redux";
import {addProperty} from "../../../../slices/AddPropertySlice"


export default function Description({setNav}) {
  const dispatch = useDispatch();  
  const [descLang, setDescLang] = useState("English");
  const [listingName, setListingName] = useState("");
  const [summary, setSummary] = useState("");

  const propertyStore = useSelector(state => state.addProperty);


  const handleDescriptionForm=(e)=>{
    e.preventDefault();
    const descruptionFrom = {
      descLang:descLang,
      listingName:listingName,
      summary:summary
    }
     dispatch(addProperty({...propertyStore,descruptionFrom}));     
    console.log("description datas ",propertyStore);
    setNav('Location');
  }
  

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
      <form className="flex flex-col gap-5 w-3/5 flex-1" onSubmit={handleDescriptionForm}>
        {/* Description Row */}
        
        <label className="font-semibold text-lg mb-2">Description</label>
        <div className="relative w-full flex items-center">
          <select
            value={descLang}
            onChange={e => setDescLang(e.target.value)}
            className="bg-gray-100 py-2 pl-3 pr-9 rounded-lg text-base w-full focus:outline-none appearance-none"
          >
            <option>English</option>
            <option>Tamil</option>
            <option>Hindi</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
        </div>
        {/* Listing Name Input */}
        <div className="items-center gap-2 space-y-4 ">
            <span className="inline-flex items-center px-5 py-2 rounded-full bg-[linear-gradient(98.28deg,rgba(255,201,243,0.9)_5.48%,rgba(185,245,255,0.9)_50.38%,rgba(255,229,161,0.9)_92.89%)] border border-gray-300 font-semibold text-xs gap-1 text-black">
                AI Text
                <WandSparkles className="w-4 h-4 text-black " />
            </span>
          <input
            type="text"
            placeholder="Entire home/apt in"
            value={listingName}
            onChange={e => setListingName(e.target.value)}
            className="bg-gray-100 py-2 px-4 rounded-lg w-full focus:outline-none text-base"
          />
         
        </div>
        {/* Summary Area */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-5 py-2 rounded-full bg-[linear-gradient(98.28deg,rgba(255,201,243,0.9)_5.48%,rgba(185,245,255,0.9)_50.38%,rgba(255,229,161,0.9)_92.89%)] border border-gray-300 font-semibold text-xs gap-1 text-black">
               AI Text
               <WandSparkles className="w-4 h-4 text-black " />  
            </span>
          </div>
          <textarea
            placeholder="Summary"
            value={summary}
            onChange={e => setSummary(e.target.value)}
            rows={5}
            className="bg-gray-100 w-full rounded-lg p-3 text-base resize-none focus:outline-none"
          />
        </div>
        {/* Buttons */}
        <div className="flex justify-between gap-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="border border-gray-400 px-6 py-2 rounded-full bg-white font-semibold transition"
            type="submit"
            onClick={()=>setNav('Basics')}
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

