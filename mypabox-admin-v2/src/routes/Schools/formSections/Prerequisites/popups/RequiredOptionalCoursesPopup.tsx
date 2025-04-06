import { NewNote } from "../../../../../types/newSchools.types";

export interface RequiredOptionalCourseType {
    school_minimum_number_of_courses_to_be_completed: number;
    school_required_optional_courses_list: {
        school_optional_course_id: string;
        school_optional_course_lab: boolean;
        school_optional_course_lab_preferred: boolean;
        school_optional_course_credit_hours: number;
        school_optional_course_quarter_hours: number;
        school_optional_course_note_section: string;
    }[];
    notes: NewNote[];
}

export default function RequiredOptionalCoursesPopup() {
    return (
        <></>
    )
}