import { createSelector } from "reselect";
import { SchoolState } from "../../types/schools.types";
import { RootState } from "../store";

// Grabs school slice from root state
const selectSchoolReducer = (state: RootState): SchoolState => state.schools;

// Grabs schools from school slice
export const selectSchools = createSelector(
    [selectSchoolReducer],
    (schoolSlice) => schoolSlice.schools
);