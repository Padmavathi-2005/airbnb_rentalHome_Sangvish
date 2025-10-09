import { createSlice } from "@reduxjs/toolkit";

const allPropertyListlice = createSlice({
    name:"spaceProperties",
    initialState:[],
    reducers:{
        setspacePropertyList(state,action){
            return action.payload;
        }
    }
});

export const {setspacePropertyList} = allPropertyListlice.actions;
export const allPropertyListReducer = allPropertyListlice.reducer;