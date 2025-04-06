import { NewNote } from "../../../../../types/newSchools.types";

export interface RequiredCourseCategoryType {
    school_required_course_category: string;
    school_required_course_category_number_of_credits_need_to_be_completed: number;
    school_required_course_category_number_of_quarter_hours_need_to_be_completed: number;
    school_required_course_category_number_of_courses_that_need_lab: number;
    school_required_course_category_extra_included_courses: {
        school_required_course_id: string;
        school_required_course_note: string;
    }[],
    school_required_course_category_excluded_courses: {
        school_required_course_id: string;
        school_required_course_note: string;
    }[],
    notes: NewNote[];
}

export default function RequiredCourseCategoriesPopup() {
    return (
        <></>
    )
}