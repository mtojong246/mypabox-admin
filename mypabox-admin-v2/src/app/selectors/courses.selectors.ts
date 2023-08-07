import { createSelector } from "reselect";
import { CourseState } from "../../types/courses.types";
import { RootState } from "../store";

const selectCourseReducer = (state: RootState): CourseState => state.courses;

export const selectCourses = createSelector(
    [selectCourseReducer],
    (courseSlice) => courseSlice.courses,
)

export const selectMode = createSelector(
    [selectCourseReducer],
    (courseSlice) => courseSlice.editMode,
)