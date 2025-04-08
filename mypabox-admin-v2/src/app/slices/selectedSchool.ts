import { createSlice } from "@reduxjs/toolkit";
import { NewSchool } from "../../types/newSchools.types";

export interface SelectedSchoolState {
    school: NewSchool | null,
    isEditSchool: boolean,
}

const initialState: SelectedSchoolState = {
    school: null,
    isEditSchool: false,
}

const selectedSchoolSlice = createSlice({
    name: 'selectedSchoolSlice',
    initialState, 
    reducers: {
        setSelectedSchool: (state, action) => {
            state.school = action.payload;
        },
        setIsEditSchool: (state, action) => {
            state.isEditSchool = action.payload
        },
    }
})

export const { setSelectedSchool, setIsEditSchool } = selectedSchoolSlice.actions;

export const selectedSchoolReducer = selectedSchoolSlice.reducer;
