import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";


export default function Booking() {


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
      <form className="flex flex-col gap-5 w-3/5 flex-1">
        {/* Description Row */}
        <div>        
          <h2 className="font-semibold text-[20px] mb-2">Booking</h2>
          <p className="text-[16px] font-regular">Choose how your guests book</p>
          <p className="text-[16px] text-gray-500 font-regular">Get ready for guest by choosing  your booking style</p>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-4 ">
            <AnimatePresence>
              <motion.div 
                initial={{opacity:0,y:8}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0,y:-8}}
                transition={{duration:0.15,delay:0.025}}
                class="block font-medium text-[14px] text-gray-600 mb-2">
                Booking Per Day / Hour
                <span className=" relative flex items-center">
                  <select               
                  placeholder="Review each request"
                  className="bg-gray-100 py-2 pl-3 pr-9 rounded-lg text-base w-full focus:outline-none appearance-none"
                  >
                  <option>Per Day</option>
                  <option>Per Hour</option>
                  </select>              
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </span> 
              </motion.div> 

              <motion.label 
                initial={{opacity:0,y:8}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0,y:-8}}
                transition={{duration:0.15,delay:0.025}}
                class="block font-medium text-[14px] text-gray-600 mb-2 ">
                Booking Type
                <span className=" relative flex items-center">
                <select               
                placeholder="Review each request"
                className="bg-gray-100 py-2 pl-3 pr-9 rounded-lg text-base w-full focus:outline-none appearance-none"
                >
                <option>Review each request</option>
                <option>Guests book instantly</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />

              </span>
              </motion.label>
             
            </AnimatePresence>                  
            <div >
              <label class="block font-medium text-[14px] text-gray-600 mb-2">Enable pets Price</label>
              <input type="checkbox"
              placeholder="Morocco"
              className="h-4 w-4 rounded border-gray-300"/>
            </div>
            <div > 
              <label class="block font-medium text-[14px] text-gray-600 mb-2">Pets Price</label>
              <input type="text" 
              placeholder="House name/ Number + street/road"
              className="bg-gray-100 py-2 pl-3 pr-9 rounded-lg text-base w-full focus:outline-none appearance-none"/>
            </div>
          </div>           
        </div>
        <div>        
          <h2 className="font-semibold text-[20px] mb-2">Terms</h2>
          <p className="text-[16px] font-regular">The requirements conditions to book a reservation at your listing Cancellation Policy</p>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-4 ">
            <AnimatePresence>
              
              <motion.div 
                initial={{opacity:0,y:8}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0,y:-8}}
                transition={{duration:0.15,delay:0.025}}
                class="block font-medium text-[14px] text-gray-600 mb-2">
                Check in after
                <span className=" relative flex items-center">
                  <select               
                  placeholder="Review each request"
                  className="bg-gray-100 py-2 pl-3 pr-9 rounded-lg text-base w-full focus:outline-none appearance-none"
                  >
                  <option>None</option>
                  <option>Per Hour</option>
                  </select>              
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </span> 
              </motion.div> 

              <motion.div 
                initial={{opacity:0,y:8}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0,y:-8}}
                transition={{duration:0.15,delay:0.025}}
                class="block font-medium text-[14px] text-gray-600 mb-2">
                Check in after
                <span className=" relative flex items-center">
                  <select               
                  placeholder="Review each request"
                  className="bg-gray-100 py-2 pl-3 pr-9 rounded-lg text-base w-full focus:outline-none appearance-none"
                  >
                  <option>None</option>
                  <option>Per Hour</option>
                  </select>              
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </span> 
              </motion.div> 

              <motion.label 
                initial={{opacity:0,y:8}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0,y:-8}}
                transition={{duration:0.15,delay:0.025}}
                class="block font-medium text-[14px] text-gray-600 mb-2 ">
                Check out before
                <span className=" relative flex items-center">
                <select               
                placeholder="Review each request"
                className="bg-gray-100 py-2 pl-3 pr-9 rounded-lg text-base w-full focus:outline-none appearance-none"
                >
                <option>None</option>
                <option>Guests book instantly</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />

              </span>
              </motion.label>
             
            </AnimatePresence>                

          </div>           
        </div>
       
        {/* Buttons */}
        <div className="flex justify-between gap-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="border border-gray-400 px-6 py-2 rounded-full bg-white font-semibold transition"
            type="button"
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

