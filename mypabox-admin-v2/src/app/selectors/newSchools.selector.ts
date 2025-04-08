import { createSelector } from "reselect";
import { RootState } from "../store";
import { NewSchoolState } from "../slices/newSchools";

// Grabs school slice from root state
const selectNewSchoolsReducer = (state: RootState): NewSchoolState => state.newSchools;

// Grabs schools from school slice
export const selectNewSchools = createSelector(
    [selectNewSchoolsReducer],
    (newSchoolSlice) => newSchoolSlice.newSchools
);
