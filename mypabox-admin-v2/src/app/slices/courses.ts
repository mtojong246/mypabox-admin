import { createSlice } from "@reduxjs/toolkit";
import { CourseState } from "../../types/courses.types";

const initialState: CourseState = {
    courses: [],
    editMode: false,
}

const courseSlice = createSlice({
    name: 'courseSlice',
    initialState,
    reducers: {
        setCourses: (state, action) => {
            state.courses = action.payload
        },
        addCourse: (state, action) => {
            state.courses.push(action.payload)
        },
        editCourse: (state, action) => {
            state.courses.forEach(course => {
                if (course.unique_id === action.payload.unique_id) {
                    return { ...action.payload }
                } else {
                    return { ...course }
                }
            })
        },
        deleteCourse: (state, action) => {
            state.courses.filter(course => course.unique_id !== action.payload)
        },
        setMode: (state, action) => {
            state.editMode = action.payload
        }
    }
})

export const { setCourses, addCourse, editCourse, deleteCourse, setMode } = courseSlice.actions;

export const courseReducer = courseSlice.reducer;