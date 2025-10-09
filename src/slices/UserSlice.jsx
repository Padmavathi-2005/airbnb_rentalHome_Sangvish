import { createSlice } from "@reduxjs/toolkit";

// user slice
const UserNavSlice = createSlice({
    name:'userNav',
    initialState:'',
    reducers:{
        setNewUserNav(state, action){
            return action.payload;
        }
    }
})


const switchSlice =  createSlice({
    name:'switchName',
    initialState: '',
    reducers:{
        setNewSwitch(state, action){
            return action.payload;
        }
    }
})

const userProfileSlice =  createSlice({
    name:'userProfile',
    initialState:[],
    reducers:{
        setUserProfile(state, action){
            return action.payload;
        }
    }
})


export const {setNewUserNav} = UserNavSlice.actions;
export const {setNewSwitch} = switchSlice.actions;
export const {setUserProfile} =  userProfileSlice.actions;

export const userNavReducer = UserNavSlice.reducer;
export const switchReducer = switchSlice.reducer;
export const userProfileReducer =  userProfileSlice.reducer;