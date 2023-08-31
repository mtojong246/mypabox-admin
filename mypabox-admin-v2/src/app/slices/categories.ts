import { createSlice } from "@reduxjs/toolkit";
import { CategoryState } from "../../types/categories.types";

const initialState: CategoryState = {
    categories: []
}

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        addCategory: (state, action) => {
            state.categories.push(action.payload)
        },
        deleteCategory: (state, action) => {
            state.categories.filter(category => category.id !== action.payload)
        },
    }
})

export const { setCategories, addCategory, deleteCategory } = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;