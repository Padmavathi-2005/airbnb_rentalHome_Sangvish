// slices/ExpPropertySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const expPropertySlice = createSlice({
  name: "expPropertyList",
  initialState,
  reducers: {
    setExpPropertyList: (state, action) => action.payload,
  },
});

export const { setExpPropertyList } = expPropertySlice.actions;
export default expPropertySlice.reducer;
