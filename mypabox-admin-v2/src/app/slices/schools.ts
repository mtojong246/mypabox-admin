import { createSlice } from "@reduxjs/toolkit";
import { SchoolState } from "../../types/schools.types";

const initialState: SchoolState = {
    schools: [],
}

const schoolSlice = createSlice({
    name: 'schoolSlice',
    initialState, 
    reducers: {
        setSchools: (state, action) => {
            state.schools = action.payload
        },
        addSchool: (state, action) => {
            state.schools.push(action.payload)
        }
    }
})

export const { setSchools, addSchool } = schoolSlice.actions;

export const schoolReducer = schoolSlice.reducer;
