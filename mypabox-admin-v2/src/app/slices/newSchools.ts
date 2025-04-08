import { createSlice } from "@reduxjs/toolkit";
import { NewSchool } from "../../types/newSchools.types";

export interface NewSchoolState {
    newSchools: NewSchool[],
}

const initialState: NewSchoolState = {
    newSchools: [],
}

const newSchoolSlice = createSlice({
    name: 'newSchoolSlice',
    initialState, 
    reducers: {
        setNewSchools: (state, action) => {
            state.newSchools = action.payload
        },
        addNewSchool: (state, action) => {
            state.newSchools.push(action.payload)
        },
        updateNewSchool: (state, action) => {
            state.newSchools = state.newSchools.map(school => {
                if (school.id === action.payload.id) {
                    return { ...action.payload }
                } else {
                    return { ...school }
                }
            })
        },
        deleteNewSchool: (state, action) => {
            state.newSchools = state.newSchools.filter(school => school.id !== action.payload.id)
        }
    }
})

export const { setNewSchools, addNewSchool, updateNewSchool, deleteNewSchool } = newSchoolSlice.actions;

export const newSchoolReducer = newSchoolSlice.reducer;
