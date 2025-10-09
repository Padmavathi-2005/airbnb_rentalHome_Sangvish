import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import SearchProperties from "../components/SearchProperties";
import Map from "../components/Map";
import { fetchProperties, fetchExpProperties } from "../services/NewApi";
import FilterModel from "../ui/FilterModel";
import Model from "../ui/Model";
import RentalNavbar from '../components/RentalNavbar';

const SearchPage = () => {
  const { state } = useLocation();
  const location = state?.location;
  const checkIn = state?.checkIn;
  const checkOut = state?.checkOut;

  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [expProperties, setExpProperties] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);


  useEffect(() => {
    const payload = {
      location: "",
      min_price: 0,
      max_price: 21000,
      amenities: [],
      property_type: "",
      book_type: "",
      space_type: "",
      bedrooms: "",
      checkin: "08/05/2025",
      checkout: "08/05/2025",
      guest: "",
      map_details: "",
      type: "",
      pets: 0,
      checkenable: 0,
      recommended: 0,
      item: 16,
    };

    const fetchData = async () => {
      try {
        const [propertyData, expPropertyData] = await Promise.all([
          fetchProperties(payload),
          fetchExpProperties(payload),
        ]);

        setProperties(propertyData);
        setExpProperties(expPropertyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // console.log("searchCity longitude",longitude)
  // console.log("searchCity latitude",latitude)
  

  const [propertyOrMap,setPropertyOrMap] = useState('properties')
  const [isOpen, setIsOpen] = useState(false);




  return (
    <>
     <RentalNavbar />
   
    <section>
      <div className="mx-auto max-w-7xl pt-[100px] md:pt-[50px] pb-[100px] px-4">
        <div className="mb-6 flex justify-end gap-3">
          <div className="flex rounded-full bg-neutral-100 p-1">
            <button
              onClick={() => setPropertyOrMap("properties")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              propertyOrMap === "properties"
              ? "bg-theme shadow text-white"
              : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
             Properties
            </button>
            <button
              onClick={() => setPropertyOrMap("map")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              propertyOrMap === "map"
              ? "bg-theme shadow text-white"
              : "text-neutral-600 hover:text-neutral-900"
              }`}
              >
              Map
            </button>
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 bg-theme text-white rounded-full  hover:bg-gray-100 hover:text-black"
            >
              Filter 
            </button>
            <Model isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <FilterModel/>
            </Model>
          </div>



        </div>
        {propertyOrMap === 'properties' && (       

        <div className="col-span-12 md:col-span-7">
          {loading ? (
            <p className="text-center text-gray-500">Loading properties...</p>
          ) : (
            <SearchProperties
              location={location}
              checkIn={checkIn}
              checkOut={checkOut}
              properties={properties}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
            />
          )}
        </div>

        )}

        {propertyOrMap === 'map' && (     

      
        <div className="hidden md:block md:col-span-5">
          <Map
          longitude={longitude}
          latitude={latitude}
          />
        </div>

        )}


      </div>
    </section>
     </>
  );
};

export default SearchPage;
