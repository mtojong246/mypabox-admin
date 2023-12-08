import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../types/users.types";

const initialState: UserState = {
    users: [],
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState, 
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    }
})

export const { setUsers } = userSlice.actions;

export const userReducer = userSlice.reducer;

