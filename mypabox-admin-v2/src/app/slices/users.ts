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
        addUser: (state, action) => {
            state.users = state.users.concat(action.payload)
        },
        editUsers: (state, action) => {
            state.users = state.users.map(user => {
                if (user.id === action.payload.id) {
                    return { ...action.payload }
                } else {
                    return { ...user }
                }
            })
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload)
        }
    }
})

export const { setUsers, editUsers, addUser, removeUser } = userSlice.actions;

export const userReducer = userSlice.reducer;

