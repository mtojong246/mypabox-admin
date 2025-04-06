import { useSelector } from "react-redux"
import { RequiredCourseCategoryType } from "../popups/RequiredCourseCategoriesPopup"
import { selectCourses } from "../../../../../app/selectors/courses.selectors"
import ReactQuill from "react-quill";

export default function RequiredCourseCategoriesField({
    value,
} : {
    value: RequiredCourseCategoryType,
}) {
    const courses = useSelector(selectCourses);

    return (
        <div className={`grow flex flex-col gap-4 p-4 justify-start items-start rounded-lg border border-outline`}>
            <p>
                <span className="font-semibold">{value.school_required_course_category} </span>
                <span className='text-placeholder font-medium'>
                    {`(
                        ${value.school_required_course_category_number_of_courses_that_need_lab} courses with lab /
                         ${value.school_required_course_category_number_of_credits_need_to_be_completed} credit hours /
                         ${value.school_required_course_category_number_of_quarter_hours_need_to_be_completed} quarter hours
                    )`}                               
                </span>
            </p>
            
            <div className="flex flex-col gap-2 justify-start items-stretch">
                <p className="underline text-primary font-medium">Included Courses:</p>
                {value.school_required_course_category_extra_included_courses.map(includedCourse => {
                    const matchingCourse = courses.find(course => course.unique_id === includedCourse.school_required_course_id);
                    return (
                        <div className={`grow flex flex-col gap-4 p-4 justify-start items-start rounded-lg border border-outline`}>
                            <p className="font-medium">{matchingCourse ? matchingCourse.course_name : ''}</p>
                            <div className="flex flex-col justify-start items-start gap-1">
                                <p className="font-medium underline">Note:</p>
                                <ReactQuill 
                                    theme='bubble'
                                    value={includedCourse.school_required_course_note} 
                                    readOnly={true} 
                                    className='edited-quill'
                                />
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="flex flex-col gap-2 justify-start items-stretch">
                <p className="underline text-warning font-medium">Excluded Courses:</p>
                {value.school_required_course_category_excluded_courses.map(excludedCourse => {
                    const matchingCourse = courses.find(course => course.unique_id === excludedCourse.school_required_course_id);
                    return (
                        <div className={`grow flex flex-col gap-4 p-4 justify-start items-start rounded-lg border border-outline`}>
                            <p className="font-medium">{matchingCourse ? matchingCourse.course_name : ''}</p>
                            <div className="flex flex-col justify-start items-start gap-1">
                                <p className="font-medium underline">Note:</p>
                                <ReactQuill 
                                    theme='bubble'
                                    value={excludedCourse.school_required_course_note} 
                                    readOnly={true} 
                                    className='edited-quill'
                                />
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="flex flex-col gap-2 justify-start items-stretch">
                <p className="underline text-default font-medium">Course Category Notes:</p>
                {value.notes.map(note => (
                    <div className={`grow flex flex-col gap-4 p-4 justify-start items-start rounded-lg border border-outline`}>
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