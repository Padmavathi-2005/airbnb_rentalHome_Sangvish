// src/Api.jsx
import axios from "axios";

export const API = axios.create({
  baseURL: "https://bnbexp.letsdateme.com/api",
  // timeout: 10000, // optional
});

// helper to set/remove Authorization header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// auto-logout on 401 (optional, keeps client in sync)
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      // client-side cleanup (server logout could be added)
      localStorage.removeItem("bnb_token");
      localStorage.removeItem("bnb_user");
      // you could also window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// API helpers
export const login = async ({ email, password }) => {
  console.log("Sending login payload:", { email, password });
  const res = await API.post("/login", { email, password });
  console.log("Server response:", res.data);
  return res.data;
};


export const register = async (userData) => {
  const res = await API.post("/register", userData);
  return res.data;
};


export const addToWishlist = async (propertyId, id) => {
  try {
    const response = await API.post(
      "/wishlist",
      {
        wishid: propertyId,
        user_id: id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    return {
      status: !!response.data?.status,
      message: response.data?.message || ""
    };
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return { status: false, message: error.message };
  }
};

export const removeFromWishlist = async (propertyId, id) => {
  try {
    const response = await API.post(
      "/wishlistremove",
      {
        wishid: propertyId,
        user_id: id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    return {
      status: !!response.data?.status,
      message: response.data?.message || ""
    };
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return { status: false, message: error.message };
  }
};


export const properties = [
    {id:1, name:"Madurai", image:"https://bnbexp.letsdateme.com/public/images/property/thumb/303/681c5ae97e068.jpg",isFavorite:true, rating:4.3, price:12},
    {id:2, name:"Chennai", image:"https://bnbexp.letsdateme.com/public/images/property/thumb/295/6818b0ba6b320.jpg",isFavorite:true, rating:4.3, price:12},
    {id:3, name:"Sivaganga", image:"https://bnbexp.letsdateme.com/public/images/property/thumb/109/67162eedd1330.jpg",isFavorite:true, rating:4.3, price:12},
    {id:4, name:"Theni", image:"https://bnbexp.letsdateme.com/public/images/property/thumb/261/676aa5d26ba38.jpg",isFavorite:true, rating:4.3, price:12},
    {id:5, name:"Bangalore", image:"https://bnbexp.letsdateme.com/public/images/property/thumb/111/67163e960eff5.jpg",isFavorite:true, rating:4.3, price:12},
    {id:7, name:"Bangalore", image:"https://bnbexp.letsdateme.com/public/images/property/thumb/110/671629a0f3d59.jpg",isFavorite:true, rating:4.3, price:12},
    {id:8, name:"Bangalore", image:"https://bnbexp.letsdateme.com/public/images/property/thumb/295/6818b0ba6b320.jpg",isFavorite:true, rating:4.3, price:12},

]

export const fetchProperties = async (payload) => {
    try {
        const response = await fetch('https://bnbexp.letsdateme.com/api/search/result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.data;  // Assuming API responds with { data: [...] }
    } catch (error) {
        console.error("search reult API Error:", error);
        return [];
    }
};

export const fetchExpProperties = async (payload)=>{
    try{
        const response = await fetch("https://bnbexp.letsdateme.com/api/expsearch/result",{
            method:'POST',
            header:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.data
    }
    catch(error){
        console.error('Error From fetching Experience', error)
        return[];
    }
};




export const FooterUniqueStays = [
    {id:1, typeOfStay:"Cabins " , locationOfStay:"India"},
    {id:2, typeOfStay:"Villas", locationOfStay:"Bali"},
    {id:3, typeOfStay:"Apartments", locationOfStay:"New York"},
    {id:4, typeOfStay:"Cottages", locationOfStay:"Scotland"},
    {id:5, typeOfStay:"Treehouses", locationOfStay:"Costa Rica"},
    {id:6, typeOfStay:"Beach Houses", locationOfStay:"Maldives"},
    {id:7, typeOfStay:"Luxury Stays", locationOfStay:"Dubai"},
    {id:8, typeOfStay:"Farm Stays", locationOfStay:"Australia"},
    {id:9, typeOfStay:"Historical Homes", locationOfStay:"Rome"},
    {id:10, typeOfStay:"Unique Homes", locationOfStay:"Tokyo"},
    {id:11, typeOfStay:"Countryside Retreats", locationOfStay:"France"},
    {id:12, typeOfStay:"Ski Chalets", locationOfStay:"Switzerland"},
    {id:13, typeOfStay:"Desert Retreats", locationOfStay:"Arizona"},
    {id:14, typeOfStay:"Lakeside Cabins", locationOfStay:"Canada"}
];


export const SearchLocation =[
    {id:1, location:"Madurai", description:"a hidden gem"},
    {id:2, location:"Chennai", description:"a bustling metropolis"},
    {id:3, location:"Sivaganga", description:"a serene escape"},
    {id:4, location:"Theni", description:"a picturesque town"},
    {id:5, location:"Bangalore", description:"a tech hub"},
    {id:6, location:"Coimbatore", description:"a cultural hotspot"},
    {id:7, location:"Kochi", description:"a coastal paradise"},
    {id:8, location:"Kodaikanal", description:"a hill station retreat"},
    {id:9, location:"Ooty", description:"a charming hill station"}
]

