import { createSlice } from "@reduxjs/toolkit";
import { loginAction, loginState } from "../../types/login.types";

// The initial state for the login slice
const initialState: loginState = {
  email: '',
  password: ''
}

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    login: (state, action: loginAction) => {
      // The email in state will be updated to the email in the payload
      state.email = action.payload.email
      // The password in state will be updated to the password in the payload
      state.password = action.payload.password
    },
    // The state will be restored to its initial state
    logout: (state) => {
      state.email = ''
      state.password = ''
    }
  }
})

export const {login, logout} = loginSlice.actions

export const loginReducer = loginSlice.reducer