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
        editUsers: (state, action) => {
            state.users = state.users.map(user => {
                if (user.id === action.payload.id) {
                    return { ...action.payload }
                } else {
                    return { ...user }
                }
            })
        }
    }
})

export const { setUsers, editUsers } = userSlice.actions;

export const userReducer = userSlice.reducer;

