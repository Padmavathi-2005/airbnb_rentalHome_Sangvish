import React, { useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import property1 from "../../../images/Property-listing/property1.png"
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {addProperty} from "../../../../slices/AddPropertySlice"
import { motion } from "framer-motion";

const libraries = ["places"];
export default function PropertyCity({setNav}) {
  const propertyStore = useSelector(state => state.addProperty);
  const [query, setQuery] = useState("");
  const [homeType, setHomeType] = useState("Apartment")
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

//   console.log("result is ", query)

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const autocompleteService =
      new window.google.maps.places.AutocompleteService();

    autocompleteService.getPlacePredictions(
      { input: query, types: ["(cities)"] },
      (predictions, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setResults(predictions);
        } else {
          setResults([]);
        }
      }
    );
  }, [query]);

  const handleInputQuery = (place)=>{
        setQuery(place.description);
        setResults([]);

  }

   const property = {
      city:query,
      homeType: homeType,
    }
  
  const handleCityForm =(e)=>{
    e.preventDefault();
    const city = {city:query}
   

    dispatch(addProperty(property));
    // navigate('/basics');
    setNav("Basics")
  }

  
const homeTyes = [
  "Apartment","House","Loft","Townhouse",
  "Condominium","Bungalow","Cabin","Villa","Castle","Dorm","Treehouse","Boat","Plane","Camper/RV","Igloo","Tipi",
  "Cave","Island",
  "Chalet","Earth  House",
  "Hut",
  "Train",
  "Tent",
  "Other",
  "Lighthouse"
]



  
  return (

    <div className="min-h-screen flex flex-col md:flex-row">      
      {/* Left: Image */}
      <div className="relative h-52 md:h-auto md:w-1/2 w-full">
        <img
          src={property1}
          alt="hero"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex text-center flex-col items-center justify-center bg-black/40 text-white md:items-start">
          <h2 className="text-2xl md:text-3xl pb-5 mx-auto font-bold">Add Experience</h2>
          <p className="text-base mx-auto md:text-lg">Buy2Rental Lets you make money renting out your place</p>
        </div>
      </div>
      {/* Right: Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-6 bg-white">
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
        >
        <form className="w-full max-w-md space-y-6" onSubmit={handleCityForm}>
           <div>
                <label className="block font-medium mb-1">Home Type</label>                
                <select
                  className="w-full px-3 py-2 rounded-lg border outline-none"
                  value={homeType} 
                  onChange={(e) => setHomeType(e.target.value)}                               
                >         
                 {homeTyes.map(type => (        
                    <option key={type}>{type}</option>
                  ))}
                </select>      
              </div>
            <div>
                <label className="block font-semibold mb-2">City</label>
                <div className="relative rounded-lg bg-gray-300 px-3 py-2">
                    <input
                    type="text"
                    className="w-full px-4 py-2 text-sm rounded-lg focus:outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type a city..."
                    />
                    {results.length > 0 && (
                <div>
                <ul className="absolute right-0  w-full mt-1 list-none p-2 border border-gray-300 rounded-lg max-h-52 overflow-y-auto bg-white shadow-md z-10">                    
                  {results.map((place) => (
                    <li
                    key={place.place_id}
                    className="px-3 py-2 border-b border-gray-100 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleInputQuery(place)}
                    >
                    {place.description}
                    </li>
                  ))}
                </ul>
                    </div>
                    )}
                </div>
            </div>
          {/* Add more fields/buttons here */}       
           <div className="flex justify-end gap-4 mt-4">

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-2 rounded-full bg-theme text-white font-semibold shadow-md focus:ring-2 focus:ring-pink-200 transition"
              type="submit"
              disabled={!property}
            >
              Next
            </motion.button>
          </div>
        </form>
      </LoadScript>
      </div>
    </div>
  );
}