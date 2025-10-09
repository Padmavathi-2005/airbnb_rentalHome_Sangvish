import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

const testSlice = createSlice({
    name:'test',
    initialState,
    reducers:{
        setTest(state, action){
            return action.payload;
        },
    }
})

export const {setTest} = testSlice.actions;
export default testSlice.reducer