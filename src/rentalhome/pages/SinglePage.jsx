import { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import Map from "../components/Map";
import SingleProperty from "../components/SingleProperty";
import { Calendar, Dot, Fan, FireExtinguisher } from "lucide-react"; 
import RentalNavbar from '../components/RentalNavbar';
import SinglepageSkeleton from "../components/skeletonloader/SinglepageSkeleton";

// ⭐ Star Icon Component



function SinglePage() {
  const { id } = useParams();
  const { slug } = useParams();

  const location = useLocation();
  const wrapperRef = useRef(null);

  /** ---------- State ---------- */
  const [item, setItem] = useState(null);

  const [loading, setLoading] = useState(!location.state?.item);
  const [dropDown, setDropDown] = useState("");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isGuests, setIsGuests] = useState(false)

  const [showMore, setShowMore] = useState(false);

  /** ---------- Fetch Property if not in state ---------- */
  useEffect(() => {
    if (item == null) {
      // console.log("items 1t", item)
      async function fetchProperty() {
        try {
          const res = await fetch(`https://bnbexp.letsdateme.com/api/property/${id}/${slug}`);
          if (!res.ok) throw new Error("Property not found");
          const data = await res.json();
          console.log("datas from single ", data);
          setItem(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
      fetchProperty();
    }
  }, [id, item]);
//  console.log('items are: ',item);
  /** ---------- Handle click outside (close calendar) ---------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        // setIsGuests(false);

      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /** ---------- Input Handlers ---------- */
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "Checkin") setCheckIn(value);
    if (name === "CheckOut") setCheckOut(value);
    if (name === "Guests") setIsGuests(value);

    setIsOpen(true);
    setIsGuests(true);

  };

  const handleOpenModel = () => setIsOpen(true);


  const handleGuests = () => {
    setIsGuests((prev) => !prev);
  };

  /** ---------- Loading states ---------- */
  if (loading) return <div><SinglepageSkeleton/></div>;
  if (!item) return <div><SinglepageSkeleton/></div>;

  /** ---------- Photo Rendering Logic ---------- */
  const photos = item.property_photos || [];
  const mainPhoto = item.result.cover_photo;
  const secondaryPhotos = item.property_photos.slice(1, 5);

  /** ---------- Description ---------- */
  const summary = item.property_description?.summary || "";
  const maxLength = 150;
  const toggleShowMore = () => setShowMore((prev) => !prev);

  /** ----------  map location ---------- */
  const latitude = item.result.property_address.latitude;
  const longitude = item.result.property_address.longitude;  

  const createdAt = item.users.created_at;
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  let months =
    (currentDate.getFullYear() - createdDate.getFullYear()) * 12 +
    (currentDate.getMonth() - createdDate.getMonth());

  if (currentDate.getDate() < createdDate.getDate()) {
    months -= 1;
  } 
const aminitiescard = [
  {id:1, icon:Fan, title:"Designed for staying cool",description:"Beat the heat with the A/C, portable fan and ceiling fan."},
  {id:2, icon:FireExtinguisher, title:"Designed for staying cool",description:"Beat the heat with the A/C, portable fan and ceiling fan."},
  {id:3, icon:Calendar, title:"Designed for staying cool",description:"Beat the heat with the A/C, portable fan and ceiling fan."}
]

  console.log('items are :',item)


  return (
    <>
     <RentalNavbar />
    <SingleProperty 
      item={item} 
      wrapperRef={wrapperRef}
      checkIn={checkIn}
      checkOut={checkOut} 
      handleOnChange={handleOnChange}  
      handleOpenModel={handleOpenModel}
      handleGuests={handleGuests} 
      isOpen={isOpen}  
      mainPhoto={mainPhoto}
      isGuests={isGuests}
      secondaryPhotos ={secondaryPhotos}
      months={months}
      showMore ={showMore}
      summary ={summary}
      maxLength ={maxLength}
      latitude={latitude}
      longitude={longitude}
      setCheckIn ={setCheckIn}
      setCheckOut = {setCheckOut}
      toggleShowMore={toggleShowMore}
      aminitiescard={aminitiescard}
    />

    </>

  );
}

export default SinglePage;
