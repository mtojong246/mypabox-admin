export interface CategoryCourse {
    course_name: string;
    course_id: string;
    subcategory: string;

}

export interface CategoryType {
    id: string;
    category_name: string;
    courses: CategoryCourse[];
    subcategories: string[];
}

export interface CategoryState {
    categories: CategoryType[];
}