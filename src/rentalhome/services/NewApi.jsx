import axios from 'axios';
export const API_BASE_URL = "https://bnbexp.letsdateme.com/api";

export const SearchLocation = [
  { id: 1, location: "Madurai", description: "a hidden gem" },
  { id: 2, location: "Chennai", description: "a bustling metropolis" },
  { id: 3, location: "Sivaganga", description: "a serene escape" },
  { id: 4, location: "Theni", description: "a picturesque town" },
  { id: 5, location: "Bangalore", description: "a tech hub" },
  { id: 6, location: "Coimbatore", description: "a cultural hotspot" },
  { id: 7, location: "Kochi", description: "a coastal paradise" },
  { id: 8, location: "Kodaikanal", description: "a hill station retreat" },
  { id: 9, location: "Ooty", description: "a charming hill station" }
]

export const getAmenitiesStepData = async (propertyId, hostId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/host/property/steps`, {
      params: {
        step: 'amenities',
        id: propertyId,
        host_id: hostId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching amenities step data:', error);
    throw error;
  }
};

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

export const fetchExpProperties = async (payload) => {
  try {
    const response = await fetch("https://bnbexp.letsdateme.com/api/expsearch/result", {
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
    return result.data
  }
  catch (error) {
    console.error('Error From fetching Experience', error)
    return [];
  }
};

export const HomeCategories = [
  { id: 1, img: "https://bnbexp.letsdateme.com/public/images/property/thumb/301/681b599cb2488.jpg", name: "Tree Houses", price: 300 },
  { id: 2, img: "https://bnbexp.letsdateme.com/public/images/property/thumb/110/671629a0f3d59.jpg", name: "Cabins", price: 520 },
  { id: 3, img: "https://bnbexp.letsdateme.com/public/images/property/thumb/285/67f3aa63be154.jpg", name: "Villas", price: 250 },
  { id: 4, img: "https://bnbexp.letsdateme.com/public/images/property/thumb/109/67162eedd1330.jpg", name: "Appartments", price: 100 },
  { id: 5, img: "https://bnbexp.letsdateme.com/public/images/property/thumb/302/681c56b00b81e.jpg", name: "Houses", price: 100 },
]

export const PopularHome = [
  {
    id: "wales-1",
    days: 3,
    location: "Ullamco",
    title: "Wales Weekend Challenge",
    rating: 4.98,
    reviews: 156,
    price: 260,
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "camp-1",
    days: 4,
    location: "Starnberg",
    title: "Camping in Nationalpark Berchtesgaden",
    rating: 4.95,
    reviews: 63,
    price: 159.99,
    img: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "hike-1",
    days: 7,
    location: "Bromo",
    title: "Hike to Drunangoin Mountain",
    rating: 4.95,
    reviews: 65,
    price: 250,
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: { text: "30% OFF", color: "bg-theme" },
  },
  // duplicate a few to fill grid quickly
  {
    id: "wales-2",
    days: 3,
    location: "Ullamco",
    title: "Wales Weekend Challenge",
    rating: 4.98,
    reviews: 156,
    price: 260,
    img: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "camp-2",
    days: 4,
    location: "Starnberg",
    title: "Camping in Nationalpark Berchtesgaden",
    rating: 4.95,
    reviews: 63,
    price: 159.99,
    img: "https://images.unsplash.com/photo-1550355191-aa8a80b41353?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "hike-2",
    days: 7,
    location: "Bromo",
    title: "Hike to Drunangoin Mountain",
    rating: 4.95,
    reviews: 65,
    price: 250,
    img: "https://images.unsplash.com/photo-1639060631449-4a3ba54a203a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: { text: "30% OFF", color: "bg-theme" },
  },
];

export const NewestHome = [
  {
    id: "wales-1",
    days: 3,
    location: "Ullamco",
    title: "Wales Weekend Challenge",
    rating: 4.98,
    reviews: 156,
    price: 260,
    img: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "camp-1",
    days: 4,
    location: "Starnberg",
    title: "Camping in Nationalpark Berchtesgaden",
    rating: 4.95,
    reviews: 63,
    price: 159.99,
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "hike-1",
    days: 7,
    location: "Bromo",
    title: "Hike to Drunangoin Mountain",
    rating: 4.95,
    reviews: 65,
    price: 250,
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
    badge: { text: "30% OFF", color: "bg-theme" },
  },
  // duplicate a few to fill grid quickly
  {
    id: "wales-2",
    days: 3,
    location: "Ullamco",
    title: "Wales Weekend Challenge",
    rating: 4.98,
    reviews: 156,
    price: 260,
    img: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "camp-2",
    days: 4,
    location: "Starnberg",
    title: "Camping in Nationalpark Berchtesgaden",
    rating: 4.95,
    reviews: 63,
    price: 159.99,
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "hike-2",
    days: 7,
    location: "Bromo",
    title: "Hike to Drunangoin Mountain",
    rating: 4.95,
    reviews: 65,
    price: 250,
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
    badge: { text: "30% OFF", color: "bg-theme" },
  },
]

export const getProfileDetails = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('bnb_token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const updateProfile = async (data, id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/profile/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('bnb_token')}`
      }
    });
    return response.data.profile;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const uploadProfileImage = async (file, id) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/profile/upload-media/${id}`,
      file,
      {
        headers: {
          'Content-Type': file.type,
          'X-File-Name': file.name,
          Authorization: `Bearer ${localStorage.getItem('bnb_token')}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};
//Manage listing
export const getMyListingProperty = async (params = {}) => {
  try {
    console.log("Fetching properties with params:", params);

    const response = await axios.get(`${API_BASE_URL}/host/property`, {
      params: {
        ...params,
        per_page: 10, // you can pass per_page dynamically if needed
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('bnb_token')}`
      }
    });

    console.log("API response:", response.data);
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching properties:', error.response?.data);
      throw error.response?.data || { message: 'Failed to fetch properties' };
    }
    throw { message: 'Failed to fetch properties' };
  }
};

export const createBooking = async (payload, id) => {
  try {
    const response = await axios.post('/payments/create_booking', {
      ...payload,
      user_id: id,
    });
    return response.data; // backend should return publishable_key & client_secret
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

const mockUsers = [
  { id: 1, name: 'Dianne Russell', lastMessage: 'Lorem ipsum is simply dummy text of typesetting industry. Lorem ipsum.', avatar: 'https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, name: 'Floyd Miles', lastMessage: 'Lorem ipsum is simply dummy text of typesetting industry. Lorem ipsum.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, name: 'Savannah Nguyen', lastMessage: 'Lorem ipsum is simply dummy text of typesetting industry. Lorem ipsum.', avatar: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 4, name: 'Ronald Richards', lastMessage: 'Lorem ipsum is simply dummy text of typesetting industry. Lorem ipsum.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 5, name: 'Wade Warren', lastMessage: 'Lorem ipsum is simply dummy text of typesetting industry. Lorem ipsum.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 6, name: 'Albert Flores', lastMessage: 'Lorem ipsum is simply dummy text of typesetting industry. Lorem ipsum.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const mockMessages = {
  1: [
    { id: 1, senderId: 1, text: 'How may I help you today?', timestamp: new Date(Date.now() - 60000) },
    { id: 2, senderId: 'current_user', text: 'Yeah', timestamp: new Date(Date.now() - 30000) },
  ],
  2: [
    { id: 3, senderId: 2, text: 'Hello there!', timestamp: new Date(Date.now() - 120000) },
    { id: 4, senderId: 'current_user', text: 'Hi Floyd!', timestamp: new Date(Date.now() - 90000) },
  ],
  3: [
    { id: 5, senderId: 3, text: 'Good morning!', timestamp: new Date(Date.now() - 180000) },
  ],
  4: [
    { id: 6, senderId: 4, text: 'Thanks for your message!', timestamp: new Date(Date.now() - 240000) },
  ],
  5: [
    { id: 7, senderId: 5, text: 'Let me know if you need anything.', timestamp: new Date(Date.now() - 300000) },
  ],
  6: [
    { id: 8, senderId: 6, text: 'Have a great day!', timestamp: new Date(Date.now() - 360000) },
  ],
};

export const fetchUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers);
    }, 500);
  });
};

export const fetchMessages = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMessages[userId] || []);
    }, 300);
  });
};

export const sendMessage = (userId, messageText) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMessage = {
        id: Date.now(),
        senderId: 'current_user',
        text: messageText,
        timestamp: new Date(),
      };

      // Add to mock storage
      if (!mockMessages[userId]) {
        mockMessages[userId] = [];
      }
      mockMessages[userId].push(newMessage);

      resolve(newMessage);
    }, 200);
  });
};


