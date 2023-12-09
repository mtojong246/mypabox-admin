import { createSelector } from "reselect";
import { loginState } from "../../types/login.types";
import { RootState } from "../store";

const selectLoginReducer = (state: RootState): loginState => state.login;

// Grabs schools from school slice
export const selectLogin = createSelector(
    [selectLoginReducer],
    (loginSlice) => loginSlice.email
);

