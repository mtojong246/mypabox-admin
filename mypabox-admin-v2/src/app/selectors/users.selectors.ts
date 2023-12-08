import { createSelector } from "reselect";
import { UserState } from "../../types/users.types";
import { RootState } from "../store";

// Grabs school slice from root state
const selectUserReducer = (state: RootState): UserState => state.users;

// Grabs schools from school slice
export const selectUsers = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.users,
);