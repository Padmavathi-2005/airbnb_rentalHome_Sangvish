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
const addExperienceNavSlice = createSlice({
  name: "addExperienceNav", // keep consistent with property version
  initialState: "experience-details", // default tab
  reducers: {
    setExperienceNav(state, action) {
      return action.payload;
    },
  },
});

export const { setAddExperience, addExperience } = addExperienceSlice.actions;
export const addExperienceReducer = addExperienceSlice.reducer;

export const { setExperienceNav } = addExperienceNavSlice.actions;
export const addExperienceNavReducer = addExperienceNavSlice.reducer;
