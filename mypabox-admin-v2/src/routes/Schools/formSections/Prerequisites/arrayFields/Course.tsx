import ReactQuill from "react-quill"
import { CourseForm } from "../popups/CoursePopup"
import { useSelector } from "react-redux"
import { selectCourses } from "../../../../../app/selectors/courses.selectors"
import { useEffect, useState } from "react";

export default function Course({
    course,
}: {
    course: CourseForm,

}) {
    const courses = useSelector(selectCourses);
    const [ courseName, setCourseName ] = useState('');

    useEffect(() => {
        if (courses.length > 0) {
            const matchingCourse = courses.find(c => c.unique_id === course.course_id);
            if (matchingCourse) {
                setCourseName(matchingCourse.course_name);
            } else {
                setCourseName('')
            }
        }
    }, [courses, course]);

    return (
        <div className={`grow flex flex-col gap-4 p-4 justify-start items-start rounded-lg border border-outline`}>
            <p>
                <span className="font-semibold">{courseName}</span>
                <span className='text-placeholder font-medium'>
                    {`(${course.course_lab ? 'with lab' : 'without lab'}
                    ${course.course_lab_preferred ? ' / lab preferred' : ''}  
                    / ${course.course_credit_hours} credit hours 
                    / ${course.course_quarter_hours} quarter hours)`}                                   
                </span>
            </p>
            <div className="flex flex-col justify-start items-start gap-1">
                <p>Note:</p>
                <ReactQuill 
                    theme='bubble'
                    value={course.course_note_section} 
                    readOnly={true} 
                    className='edited-quill'
                />
            </div>
        </div>
    )
}