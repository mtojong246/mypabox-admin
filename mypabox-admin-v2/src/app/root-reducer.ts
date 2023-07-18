import { combineReducers } from "redux";
import { addSchoolReducer } from "./slices/addSchool";
import { loginReducer } from "./slices/login";
import { schoolReducer } from "./slices/schools";
import { loginState } from "../types/login.types";
import { SchoolState } from "../types/schools.types";
import { addSchoolState } from "../types/addSchool.types";

export interface AppState {
  login: loginState,
  schools: SchoolState,
  addSchool: addSchoolState
}

// combines all reducers into one root reducer
export const rootReducer = combineReducers({
    login: loginReducer,
    schools: schoolReducer,
    addSchool: addSchoolReducer
})