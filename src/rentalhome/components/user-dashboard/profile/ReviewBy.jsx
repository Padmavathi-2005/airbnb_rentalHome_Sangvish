import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, AlertCircle, User2,Frown } from "lucide-react";
function ReviewBy() {

  const [reviewType, setReviewType] = useState("Write Review");
  const reviewTypes = ["Write Review", "Past Review","Expired Review"];
  const reviews = [
    {
      id: 1,
      img: "https://images.pexels.com/photos/261146/pexels-photo-261146.jpeg?auto=compress&w=400",
      title: "Entire Villa Test",
      dateRange: "Sep 21, 2025 - Sep 22, 2025",
      daysLeft: 6,
      host: { name: "Ram Host", avatar: "" },
      reviewUrl: "#"
    },
    {
      id: 2,
      img: "https://images.pexels.com/photos/261146/pexels-photo-261146.jpeg?auto=compress&w=400",
      title: "Entire Villa Test",
      dateRange: "Sep 21, 2025 - Sep 22, 2025",
      daysLeft: 6,
      host: { name: "Ram Host", avatar: "" },
      reviewUrl: "#"
    }
  ];

  function Card({type}){
    return(
    <div className="flex flex-col gap-6">
          <AnimatePresence>
            {reviews.map((rev, idx) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.28, delay: idx * 0.06 }}
                className="flex flex-col sm:flex-row rounded-xl border border-gray-200 shadow-sm bg-white overflow-hidden max-w-full"
              >
                {/* Image */}
                <img
                  src={rev.img}
                  alt={rev.title}
                  className="w-full sm:w-56 h-44 sm:h-auto object-cover"
                />
                {/* Details */}
                <div className="flex flex-1 flex-col p-4 gap-2 min-w-0">
                  <div className="flex items-center mb-1">
                    <span className="font-semibold text-lg text-gray-800">{rev.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-[15px] mb-1">
                    <CalendarDays className="w-4 h-4 mr-1 text-gray-500" />
                    {rev.dateRange}
                  </div>
                  {type === "Write Review" &&
                  <>
                  
                  <div className="flex items-center text-[15px] gap-2">
                    <AlertCircle className="w-4 h-4 text-green-600" />
                    <span>
                      You have <span className="font-bold">{rev.daysLeft} days</span> to submit a public review for{" "}
                      <span className="font-bold">{rev.host.name}</span>.
                    </span>
                  </div>  
                   <a
                    href={rev.reviewUrl}
                    className="font-semibold text-green-600 text-[16px] mt-1 inline-block transition hover:underline"
                  >
                    Write Review
                  </a>
                  </>
                  }

                  {type === "Past Review" &&
                  <div>
                   <button className='p-3 border rounded-xl border-gray-300 transition-all hover:bg-green-700 hover:text-white hover:border-white'>view Details</button>
                  </div>
                  }

                  {type === "Expired Review" &&
                  <div className="flex items-center text-[15px] gap-2">
                    <Frown className="w-4 h-4 text-red-600" />
                    <span>
                      Unfortunately, the deadline to submit a public review for this user has passed.
                    </span>
                  </div>
                  }
                 
                </div>
                {/* Host avatar */}
                <div className="flex flex-col items-center justify-center min-w-[120px] px-4 py-4">
                  {rev.host.avatar ? (
                    <img
                      src={rev.host.avatar}
                      alt={rev.host.name}
                      className="w-16 h-16 rounded-full bg-gray-200 mb-1 object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-100 mb-1">
                      <User2 className="h-10 w-10 text-orange-500" />
                    </div>
                  )}
                  <span className="mt-1 font-semibold text-gray-800 text-[18px] text-center">{rev.host.name}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
    </div>
    )
  }


  return (
  <div className="md:w-3/4 mx-auto space-y-7">

    <ul className='flex gap-4'>
      {reviewTypes.map((type, id)=>(
        <li key={id} className='font-semibold' onClick={()=>setReviewType(type)}>
        <span className={`px-4 py-2 transition-all rounded-full ${type === reviewType ? "text-white bg-theme" : "bg-gray-200"}`}>{type}</span>
        </li>
      ))}
    </ul>

    <div> 
      {reviewType === "Write Review" &&      
        <Card type={reviewType}/>
      }

      {reviewType === "Past Review" &&      
         <Card type={reviewType}/>
      }

      {reviewType === "Expired Review" &&      
       <Card type={reviewType}/>
      }


    </div>

  </div>
   
  )
}

export default ReviewBy