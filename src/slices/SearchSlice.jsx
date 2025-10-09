import { createSlice } from "@reduxjs/toolkit";

// Location slice
const locationSlice = createSlice({
  name: 'location',
  initialState: '',
  reducers: {
    setNewLocation(state, action) {
      return action.payload;
    },
  }
});

// CheckIn slice
const checkInSlice = createSlice({
  name: 'checkIn',
  initialState: '',
  reducers: {
    setNewcheckIn(state, action) {
      return action.payload;
    },
  }
});

// CheckOut slice
const checkOutSlice = createSlice({
  name: 'checkOut',
  initialState: '',
  reducers: {
    setNewcheckOut(state, action) {
      return action.payload;
    },
  }
});

const guestSlice =  createSlice({
  name:'guest',
  initialState: {},
  reducers:{
    setNewGuest(state, action){
      return action.payload;
    }
  }

})


const arrayDataSlice = createSlice({
  name:'usersDetails',
  initialState:[],
  reducers:{
    setNewArrayData(state, action){
      return action.payload
    }
  }
})




export const { setNewLocation } = locationSlice.actions;
export const { setNewcheckIn } = checkInSlice.actions;
export const { setNewcheckOut } = checkOutSlice.actions;
export const { setNewArrayData} = arrayDataSlice.actions;
export const {setNewGuest} =  guestSlice.actions;

export const locationReducer = locationSlice.reducer;
export const checkInReducer = checkInSlice.reducer;
export const checkOutReducer = checkOutSlice.reducer;
export const arrayReducer = arrayDataSlice.reducer;
export const guestReducer =  guestSlice.reducer;