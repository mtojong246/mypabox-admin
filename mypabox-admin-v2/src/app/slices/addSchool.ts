import { createSlice } from "@reduxjs/toolkit";
import { Note, addSchoolNameAction, addSchoolState } from "../../types/addSchool.types";
import { School } from "../../types/schools.types";
import { defaultSchool } from "../../data/defaultValues";

// The initial state for the login slice
const initialState = defaultSchool;

const addSchoolSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    addSchool: (state, action) => {
      state = action.payload
    },
    clear: state => {
    }
  }
})

export const { addSchool } = addSchoolSlice.actions

export const addSchoolReducer = addSchoolSlice.reducer