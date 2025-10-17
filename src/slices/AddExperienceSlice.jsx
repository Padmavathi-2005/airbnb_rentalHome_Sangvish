import { createSlice } from "@reduxjs/toolkit";

// Slice for experience data
const addExperienceSlice = createSlice({
  name: "addExperience",
  initialState: {},
  reducers: {
    setAddExperience(state, action) {
      return action.payload;
    },
    addExperience(state, action) {
      return action.payload;
    },
  },
});

// Slice for navigation state
const EXPERIENCE_TABS = [
  "City",
  "Basics",
  "Description",
  "Details",
  "Location",
  "Amenities",
  "Photos",
  "Verification Documents",
  "Pricing",
  "Booking",
  "Calendar"
];

const addExperienceNavSlice = createSlice({
  name: "addExperienceNav",
  initialState: "City", // default tab
  reducers: {
    setExperienceNav(state, action) {
      // Only allow valid tab names to avoid invalid state
      if (EXPERIENCE_TABS.includes(action.payload)) {
        return action.payload;
      }
      return state; // ignore invalid payload
    },
    resetExperienceNav() {
      return "City"; // optional: reset tab to default
    }
  },
});

export const { setAddExperience, addExperience } = addExperienceSlice.actions;
export const addExperienceReducer = addExperienceSlice.reducer;
export const { setExperienceNav, resetExperienceNav } = addExperienceNavSlice.actions;
export const addExperienceNavReducer = addExperienceNavSlice.reducer;
