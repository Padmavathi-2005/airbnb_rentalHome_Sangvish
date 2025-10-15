import { useMemo, useState, useEffect } from "react";
import { fetchProperties, fetchExpProperties } from "../services/NewApi";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import PropertyCard from "./PropertyCard";
import PropertyCardSkeleton from "./skeletonloader/PropertyCardSkeleton";
import { setspacePropertyList } from "../../slices/PropertiesSlice"
import { setExpPropertyList } from "../../slices/ExpPropertySlice";


function CardSection() {
  const dispatch = useDispatch();
  const [properties, setProperties] = useState([]);
  const [expProperties, setExpProperties] = useState([]);
  const [tab, setTab] = useState("properties"); // default to "properties"
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [location, setLocation] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')


  const handleHeartClick = async (e) => {
    e.preventDefault();
    if (!authUser) return navigate('/login');

    setLiked(!liked); // optimistic update
    if (onToggle) onToggle(!liked);

    try {
      if (liked) await removeFromWishlist(propertyId, String(authUser.id));
      else await addToWishlist(propertyId, String(authUser.id));
    } catch {
      setLiked(liked); // revert on error
      if (onToggle) onToggle(liked);
    }
  };

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
      item: 16
    };

    const fetchData = async () => {
      try {
        const [propertyData, expPropertyData] = await Promise.all([
          fetchProperties(payload),
          fetchExpProperties(payload)
        ]);
        setProperties(propertyData);
        setExpProperties(expPropertyData);
        dispatch(setspacePropertyList(propertyData));
        dispatch(setExpPropertyList(expPropertyData));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayedItems = tab === "properties" ? properties : expProperties;

  const allProperties = useSelector(state => state.propertyList);
  useEffect(() => {
  console.log("properties", properties);
  console.log("expProperties", expProperties);
}, [properties, expProperties]);




  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:py-12 lg:py-16">
      <div className="mb-6 flex">
        <div className="flex rounded-full bg-neutral-100 p-1">
          <button
            onClick={() => setTab("properties")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${tab === "properties"
              ? "bg-theme shadow text-white"
              : "text-neutral-600 hover:text-neutral-900"
              }`}
          >
            Homes
          </button>
          <button
            onClick={() => setTab("expProperties")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${tab === "expProperties"
              ? "bg-theme shadow text-white"
              : "text-neutral-600 hover:text-neutral-900"
              }`}
          >
            Experiences
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <PropertyCardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>


      ) : (
        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {tab === "properties" ? (
            <>
              {displayedItems.slice(0, 10).map((item) => (
                <PropertyCard key={item.id} item={item} />
              ))}
            </>
          ) : (
            <>
              {displayedItems.slice(0, 10).map((item) => (
                <PropertyCard key={item.id} item={item} />
              ))}</>
          )}


        </div>
      )}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => {
            navigate("/search", {
              state: { type: tab === "properties" ? "property" : "experience", location, checkIn, checkOut },
            });
          }}
          className="rounded-full border bg-white cursor-pointer border_dft px-8 py-2.5 text-lg font-semibold text-theme shadow-sm transition hover:border_dft"
        >
          Show more
        </button>
      </div>

    </section>
  );
}


export default CardSection
