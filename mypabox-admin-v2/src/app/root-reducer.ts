import { combineReducers } from "redux";
import { addSchoolReducer } from "./slices/addSchool";
import { loginReducer } from "./slices/login";
import { schoolReducer } from "./slices/schools";
import { loginState } from "../types/login.types";
import { SchoolState } from "../types/schools.types";
import { addSchoolState } from "../types/addSchool.types";
import { CourseState } from "../types/courses.types";
import { courseReducer } from "./slices/courses";
import { CategoryState } from "../types/categories.types";
import { categoryReducer } from "./slices/categories";

export interface AppState {
  login: loginState,
  schools: SchoolState,
  addSchool: addSchoolState,
  courses: CourseState,
  categories: CategoryState,
}

// combines all reducers into one root reducer
export const rootReducer = combineReducers({
    login: loginReducer,
    schools: schoolReducer,
    addSchool: addSchoolReducer,
    courses: courseReducer, 
    categories: categoryReducer, 
})