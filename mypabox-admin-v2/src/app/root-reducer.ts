import { combineReducers } from "redux";
import { loginReducer } from "./slices/login";
import { schoolReducer } from "./slices/schools";
import { loginState } from "../types/login.types";
import { SchoolState } from "../types/schools.types";
import { CourseState } from "../types/courses.types";
import { courseReducer } from "./slices/courses";
import { CategoryState } from "../types/categories.types";
import { categoryReducer } from "./slices/categories";
import { UserState } from "../types/users.types";
import { userReducer } from "./slices/users";
import { newSchoolReducer, NewSchoolState } from "./slices/newSchools";

export interface AppState {
  login: loginState,
  schools: SchoolState,
  courses: CourseState,
  categories: CategoryState,
  users: UserState,
  newSchools: NewSchoolState,
}

// combines all reducers into one root reducer
export const rootReducer = combineReducers({
    login: loginReducer,
    schools: schoolReducer,
    courses: courseReducer, 
    categories: categoryReducer, 
    users: userReducer,
    newSchools: newSchoolReducer,
})