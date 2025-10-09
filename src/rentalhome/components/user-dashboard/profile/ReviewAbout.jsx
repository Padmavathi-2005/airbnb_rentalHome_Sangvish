import React from 'react'
import {useSelector} from 'react-redux';
import dummyProfile from '../../../images/dummyProfile.png'

function ReviewAbout() {

  

    const userData =  useSelector((state)=>state.userProfile);
    const reviews = userData.reviews_about_you;
    console.log("reviewr is ",reviews);

  return (
     <div className="w-3/4 mx-auto px-6 rounded-4xl space-y-7">
      <ul>
        {reviews.map((review)=>{
          const date = new Date(review.created_at);
          const formattedDate =
          `${date.getDate().toString().padStart(2,"0")}-${(date.getMonth() + 1).toString().padStart(2,"0")}-${date.getFullYear()}`;       
          
          return(
          <li key={review.id} className="flex mb-5 bg-white rounded-2xl items-center gap-4 shadow-lg p-3 w-full ">
          {/* Header Row */}
          <div>
            <img 
            className="w-150 rounded-xl" 
            src="https://bnbexp.letsdateme.com/public/images/property/thumb/310/6899dbf91789b.jpg" alt="" />
          </div>
          <div >          
            <div className=" flex justify-between items-center mb-2">
              <div className="flex items-center">
                <img
                  src={dummyProfile}
                  alt="Felix Fernando"
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold text-[#142548] leading-tight">{review.reviewer}</p>
                  <p className="text-xs text-gray-500 mt-1">{formattedDate}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold text-xl text-[#142548]">{review.rating}</span>
                <div className="flex mt-1">
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current mr-1"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.564-.955L10 0l2.946 5.955 6.564.955-4.754 4.635 1.122 6.545z"/>
                    </svg>
                  ))}
                  <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.564-.955L10 0l2.946 5.955 6.564.955-4.754 4.635 1.122 6.545z"/>
                  </svg>
                </div>
              </div>
            </div>
            {/* Review Text */}
            <div>
              <p className="text-gray-600 text-sm">
                {review.message}
              </p>
            </div>
          </div>
          </li>
          )
})} 
      </ul>
      
    </div>
  )
}

export default ReviewAbout