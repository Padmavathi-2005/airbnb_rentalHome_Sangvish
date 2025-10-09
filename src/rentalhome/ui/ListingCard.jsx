import { User2,  Calendar, MessageCircleMore} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


function ListingCard({items=[],message}){
      return(
        <div  className="flex flex-col gap-6">
           <AnimatePresence>
            {items.map((item, id)=>(
              <motion.div key={id}
              className='relative bg-white rounded-2xl flex items-center gap-5 p-2 border border-gray-300'>
                <button className={`absolute right-1 top-1 ${item.statusClass} font-semibold flex items-center gap-2 py-1 px-3 text-sm rounded-full`}>{item.status}</button>
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full sm:w-56 h-44 sm:h-auto md:w-70 md:h-50 rounded-xl shadow-[0px_6px_25px_0px_#7D7D7D40] object-cover"
                />
                <div className='space-y-3'>
                  <h2 className='text-lg font-semibold'>{item.title}</h2>
                  <p className='text-gray-600'>{item.location}</p>
                  <span className='flex text-semibold items-center gap-3'><Calendar/><span className='font-semibold'>{item.from} - {item.to}</span></span>  
                  <div className='flex items-center gap-3 py-2'>
                    {item.actions.map((action)=>{
                    const Icon = action.icon;
                    return(
                      <button key={action.label} className={`gap-2 px-4 text-sm font-semibold flex items-center py-2 rounded-full ${action.class}`}>
                       <Icon className="w-5 h-5"/> 
                        <span>{action.label}</span>
                      </button>
                    )})}

                   
                  </div>
                </div>
                
                  <div className="flex flex-col space-y-2 items-center justify-center min-w-[150px] px-3 py-4">
                    {item.avatar ? (
                      <img
                        src={item.avatar}
                        alt={item.host}
                        className="w-16 h-16 rounded-full bg-gray-200 mb-1 object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-100 mb-1">
                        <User2 className="h-10 w-10 text-theme" />
                      </div>
                    )}
                    <span className="mt-1 font-semibold text-gray-800 text-[18px] text-center">{item.host}</span>
                    {message && 
                    <button className="flex bg-blue-500 rounded-full font-semibold px-2 py-2 text-white items-center gap-1">
                      <MessageCircleMore className="w-5 h-5"/>
                      <span className="text-[13px] ">Send Message</span>
                    </button>}
                  </div>
              </motion.div>
            ))}
          </AnimatePresence> 
        </div>
      )
}

export default ListingCard