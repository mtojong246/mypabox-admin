import ReactQuill from "react-quill";
import { CourseForm } from "../popups/CoursePopup"
import { RequiredOptionalCourseType } from "../popups/RequiredOptionalCoursesPopup"
import Course from "./Course";

export default function RequiredOptionalCoursesField({
    value,
}: {
    value: RequiredOptionalCourseType,
}) {
    return (
        <div className={`grow flex flex-col gap-4 p-4 justify-start items-start rounded-lg border border-outline`}>
            <p><span className="font-semibold">{value.school_minimum_number_of_courses_to_be_completed}</span> of the following courses need to be completed:</p>
            <div className="w-full flex flex-col gap-2 justify-start items-stretch">
                {value.school_required_optional_courses_list.map(optionalCourse => {
                    const course: CourseForm = {
                        course_id: optionalCourse.school_optional_course_id,
                        course_lab: optionalCourse.school_optional_course_lab,
                        course_lab_preferred: optionalCourse.school_optional_course_lab_preferred,
                        course_credit_hours: optionalCourse.school_optional_course_credit_hours,
                        course_quarter_hours: optionalCourse.school_optional_course_quarter_hours,
                        course_note_section: optionalCourse.school_optional_course_note_section,
                    };

                    return (
                        <Course course={course}/>
                    )
                })}
            </div>
            
            <div className="w-full flex flex-col gap-2 justify-start items-stretch">
                <p>Optional Course Notes:</p>
                {value.notes.map(note => (
                    <div className={`w-full grow flex flex-col gap-4 p-4 justify-start items-start rounded-lg border border-outline`}>
                        <p className={`${note.type === 'requirement' ? 'text-warning' : 'text-primary'} text-[14px] font-medium`}>{note.type}</p>
                        <ReactQuill 
                            theme='bubble'
                            value={note.note} 
                            readOnly={true} 
                            className='edited-quill'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}