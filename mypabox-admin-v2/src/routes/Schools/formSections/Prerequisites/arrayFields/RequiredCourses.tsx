import { useEffect, useState } from "react";
import { RequiredCourseType } from "../popups/RequiredCoursesPopup";
import Course from "./Course";
import { CourseForm } from "../popups/CoursePopup";

export default function RequiredCoursesField({
    value,
}: {
    value: RequiredCourseType,
}) {
    const [ course, setCourse ] = useState<CourseForm | null>(null);

    useEffect(() => {
        if (value) {
            setCourse({
                course_id: value.school_required_course_id,
                course_lab: value.school_required_course_lab,
                course_lab_preferred: value.school_required_course_lab_preferred,
                course_credit_hours: value.school_required_course_credit_hours,
                course_quarter_hours: value.school_required_course_quarter_hours,
                course_note_section: value.school_required_course_note_section
            })
        }
    }, [value])
    return (
        <>
        {course && (
            <Course 
                course={course}
            />
        )}
        </>
    )
}