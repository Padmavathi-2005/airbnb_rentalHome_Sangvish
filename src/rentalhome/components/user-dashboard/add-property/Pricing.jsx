import { AnimatePresence, motion } from "framer-motion";

export default function Pricing() {


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
          <h2 className="font-semibold text-[20px] mb-2">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <AnimatePresence>

              <motion.label 
                initial={{opacity:0,y:8}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0,y:-8}}
                transition={{duration:0.15,delay:0.025}}
                class="block font-medium text-[14px] text-gray-600 mb-2">
                Daily/Hourly Price
                <input type="text" 
                placeholder="Morocco"
                className="bg-gray-100 py-2 pl-3 pr-9 rounded-lg text-base w-full focus:outline-none appearance-none"/>
              </motion.label> 

              <motion.label 
                initial={{opacity:0,y:8}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0,y:-8}}
                transition={{duration:0.15,delay:0.025}}
                class="block font-medium text-[14px] text-gray-600 mb-2">
                Currency
                <input type="text" 
                value="USD"
                className="bg-gray-100 py-2 pl-3 pr-9 rounded-lg text-base w-full focus:outline-none appearance-none"/>
              </motion.label>
              <motion.label 
                initial={{opacity:0,y:8}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0,y:-8}}
                transition={{duration:0.15,delay:0.025}}
                class="block font-medium text-[14px] text-gray-600 mb-2">
                Minimum Stay
                <input type="text"                
                className="bg-gray-100 py-2 pl-3 pr-9 rounded-lg text-base w-full focus:outline-none appearance-none"/>
              </motion.label>
              <motion.label 
                initial={{opacity:0,y:8}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0,y:-8}}
                transition={{duration:0.15,delay:0.025}}
                class="block font-medium text-[14px] text-gray-600 mb-2">
                Maximum Stay
                <input type="text"                
                className="bg-gray-100 py-2 pl-3 pr-9 rounded-lg text-base w-full focus:outline-none appearance-none"/>
              </motion.label>
              <motion.label 
                initial={{opacity:0,y:8}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0,y:-8}}
                transition={{duration:0.15,delay:0.025}}
                class="block font-medium text-[14px] text-gray-600 mb-2">
                Enable pets Price
                <input type="text"                
                className="bg-gray-100 py-2 pl-3 pr-9 rounded-lg text-base w-full focus:outline-none appearance-none"/>
              </motion.label>
              <motion.label 
                initial={{opacity:0,y:8}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0,y:-8}}
                transition={{duration:0.15,delay:0.025}}
                class="block font-medium text-[14px] text-gray-600 mb-2">
                Enable pets Price
                <input type="text"                
                className="bg-gray-100 py-2 pl-3 pr-9 rounded-lg text-base w-full focus:outline-none appearance-none"/>
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
         

          <p className="mt-2">You can offer discounts for longer stays by setting weekly and monthly prices.</p>
          
        </div>
        <div>        
          <h2 className="font-semibold text-[20px] mb-2">Additional Pricing Options</h2>
          <div className="grid grid-cols-1 gap-4 ">
             <div className="flex items-center gap-3">            
              <input type="checkbox"
              placeholder="Morocco"
             className="h-4 w-4 rounded border-gray-300"/>
             <label class="block font-medium text-[14px] text-gray-600 mb-2">Cleaning fee</label>
            </div>

            <div className="flex items-center gap-3">             
              <input type="checkbox"
              placeholder="Morocco"
              className="h-4 w-4 rounded border-gray-300"/>
               <label class="block font-medium text-[14px] text-gray-600 mb-2">Additional Guests</label>
            </div>
            <div className="flex items-center gap-3">             
              <input type="checkbox"
              placeholder="Morocco"
              className="h-4 w-4 rounded border-gray-300"/>
               <label class="block font-medium text-[14px] text-gray-600 mb-2">Security deposit</label>
            </div>
            <div className="flex items-center gap-3">              
              <input type="checkbox"
              placeholder="Morocco"
              className="h-4 w-4 rounded border-gray-300"/>
              <label class="block font-medium text-[14px] text-gray-600 mb-2">Weekend pricing</label>
            </div>
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
