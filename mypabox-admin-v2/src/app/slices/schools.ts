import { createSlice } from "@reduxjs/toolkit";
import { SchoolState } from "../../types/schools.types";

const initialState: SchoolState = {
    schools: [],
    isEdit: false,
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
        },
        setIsEdit: (state, action) => {
            state.isEdit = action.payload
        },
        editSchoolData: (state, action) => {
            state.schools = state.schools.map(school => {
                if (school.id === action.payload.id) {
                    return { ...action.payload }
                } else {
                    return { ...school }
                }
            })
        }
    }
})

export const { setSchools, addSchool, setIsEdit, editSchoolData } = schoolSlice.actions;

export const schoolReducer = schoolSlice.reducer;
