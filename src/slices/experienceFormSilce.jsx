// slices/experienceFormSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    experience_row_id: null, // initially null
    steps: {} // to store each step data
};

const experienceFormSlice = createSlice({
    name: "experienceForm",
    initialState,
    reducers: {
        setExperienceRowId(state, action) {
            state.experience_row_id = action.payload;
        },
        setStepData(state, action) {
            const { step, data } = action.payload;
            state.steps[step] = data;
        },
        resetExperienceForm(state) {
            state.experience_row_id = null;
            state.steps = {};
        }
    }
});

export const { setExperienceRowId, setStepData, resetExperienceForm } = experienceFormSlice.actions;
export default experienceFormSlice.reducer;
