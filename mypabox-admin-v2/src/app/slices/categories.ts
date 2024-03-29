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
            state.categories = state.categories.filter(category => category.id !== action.payload)
        },
        addCourseToCategory: (state, action) => {
            state.categories = state.categories.map(category => {
                if (category.id === action.payload.id) {
                    return {
                        ...category,
                        courses: category.courses.concat(action.payload.course)
                    }
                } else {
                    return { ...category }
                }
            })
        },
        addSubcategory: (state, action) => {
            state.categories = state.categories.map(category => {
                if (category.id === action.payload.id) {
                    return {
                        ...category,
                        courses: category.courses.concat(action.payload.courses),
                        subcategories: category.subcategories.concat(action.payload.subcategory)
                    }
                } else {
                    return { ...category }
                }
            })
        },
        deleteCategoryObj: (state, action) => {
            state.categories = state.categories.filter(category => category.id !== action.payload)
        },
        deleteCategoryCourse: (state, action) => {
            state.categories = state.categories.map(category => {
                if (category.id === action.payload.id) {
                    return {
                        ...category,
                        courses: category.courses.filter(course => course.course_id !== action.payload.course_id)
                    }
                } else {
                    return { ...category }
                }
            })
        },
        deleteSubFromCategory: (state, action) => {
            state.categories = state.categories.map(category => {
                if (category.id === action.payload.id) {
                    return {
                        ...category,
                        courses: action.payload.courses,
                        subcategories: action.payload.subcategories,
                    }
                } else {
                    return { ...category }
                }
            })
        }
    }
})

export const { setCategories, addCategory, deleteCategory, addCourseToCategory, addSubcategory, deleteCategoryObj, deleteCategoryCourse, deleteSubFromCategory } = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;