import { createSlice } from "@reduxjs/toolkit";

export interface School {
    name: string;
    state: string;
    'state code': string;
    city: string;
}

export interface SchoolState {
    schools: School[];
}

const initialState: SchoolState = {
    schools: [],
}

const schoolSlice = createSlice({
    name: 'schoolSlice',
    initialState, 
    reducers: {
        setSchools: (state, action) => {
            state.schools = action.payload
        }

    }
})

export const { setSchools } = schoolSlice.actions;

export const schoolReducer = schoolSlice.reducer;
