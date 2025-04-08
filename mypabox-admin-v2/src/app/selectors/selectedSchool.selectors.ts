import { createSelector } from "reselect";
import { SelectedSchoolState } from "../slices/selectedSchool";
import { RootState } from "../store";

// Grabs school slice from root state
const selectSelectedSchoolReducer = (state: RootState): SelectedSchoolState => state.selectedSchool;

// Grabs schools from school slice
export const selectSelectedSchool = createSelector(
    [selectSelectedSchoolReducer],
    (selectedSchoolSlice) => selectedSchoolSlice.school,
);

export const selectIsEditSchool = createSelector(
    [selectSelectedSchoolReducer],
    (selectedSchoolSlice) => selectedSchoolSlice.isEditSchool,
)