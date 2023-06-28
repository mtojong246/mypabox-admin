import { combineReducers } from "redux";

import { loginReducer } from "./slices/login";
import { schoolReducer } from "./slices/schools";

// combines all reducers into one root reducer
export const rootReducer = combineReducers({
    login: loginReducer,
    schools: schoolReducer,
})