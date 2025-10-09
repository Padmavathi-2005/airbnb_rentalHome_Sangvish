import React, { useEffect, useState } from 'react'
import { properties as mockProperties} from '../Api';
import PropertyCard from './PropertyCard';
import { fetchProperties,fetchExpProperties } from '../Api';
import ExperienceCard from './ExperienceCard';

function PropertySection({TabSection}) {

    const [properties,setProperties] = useState([]);
    const [expProperties, setExpProperties] =useState([]);

    const [loading, setLoading] = useState(true);

    // useEffect(()=>{
    //     const fetchData = async ()=>{
    //         setProperties(mockProperties)
    //     };
    //     fetchData();
    // },[])

    useEffect(()=>{
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
            item: 16
        };
        const fetchData = async ()=>{
            try{
                const [propertyData, expPropertyData] = await Promise.all([
                    fetchProperties(payload),
                    fetchExpProperties(payload)

                ]);
                setProperties(propertyData);
                setExpProperties(expPropertyData);
               
            }
             catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // Ensures loading is set to false after both are done
        }

        };
        fetchData();
           
    },[])



  return (
<section className="property_section text-dft">
    <div className="mx-auto max-w-7xl  py-[40px]  h-auto">
        <div className="mb-4">
            {loading?(
                <h2 className="bg-gray-200 h-8 w-[200px]  rounded-xl"></h2>
            ):(
                <h2 className="text-2xl font-semibold">Popular Cities</h2>
            )}
            
        </div>
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4 md:gap-6 lg:gap-4">
                {loading ? (
                    <>
                    {Array.from({ length: 10 }).map((_, index) => (
                    <div
                    key={index}
                    className="bg-gray-200 h-[200px] w-full rounded-xl animate-pulse"
                    ></div>
                    ))}
                    </>
                    

                    ) : (
                    <>
                        {properties.map((property) => (                     
                           
                           TabSection === 'Home' &&
                           <PropertyCard key={property.id} property={property} />  
                           
                          
                            
                        ))}
                   
                        {expProperties.map((expProperty) => (                     
                                                  
                            TabSection === 'Experience' && 
                            <ExperienceCard  key={expProperty.id} expProperty={expProperty}  /> 
                            
                        ))}
                    </>
                )}

                
            </div>
        </div>
    </div>
</section>

  )
}

export default PropertySection