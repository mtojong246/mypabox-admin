import { createSelector } from "reselect";
import { RootState } from "../store";
import { CategoryState } from "../../types/categories.types";

const selectCategoryReducer = (state: RootState): CategoryState => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categorySlice) => categorySlice.categories,
)