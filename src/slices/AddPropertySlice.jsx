import { createSlice } from "@reduxjs/toolkit";

// Slice for property data
const addPropertySlice = createSlice({
  name: "addProperty",
  initialState: {},
  reducers: {
    setAddProperty(state, action) {
      return action.payload;
    },
    addProperty(state, action) {
      return action.payload;
    },
  },
});

// Slice for navigation state
const addPropertyNavSlice = createSlice({
  name: "addPropertyNav",   //  simple, consistent name
  initialState: "property-city",
  reducers: {
    setPropertyNav(state, action) {
      return action.payload;
    },
  },
});

export const { setAddProperty, addProperty } = addPropertySlice.actions;
export const addPropertyReducer = addPropertySlice.reducer;

export const { setPropertyNav } = addPropertyNavSlice.actions;
export const addPropertyNavReducer = addPropertyNavSlice.reducer;
