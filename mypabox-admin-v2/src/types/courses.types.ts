export interface Course {
    unique_id: string;
    course_name: string;
    gpa_calculation: string;
    subject_category: string;
}

export interface CourseState {
    courses: Course[];
    editMode: boolean;
}