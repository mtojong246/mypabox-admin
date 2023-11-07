import { School, SchoolPrereqRecommendedCourse } from "../../../../types/schools.types"
import { useSelector } from "react-redux"
import { selectCourses } from "../../../../app/selectors/courses.selectors"
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import ReactQuill from "react-quill";
import { Dispatch, SetStateAction } from "react"

export default function RecommendedCourses({ toggleRecommendedCourses, newSchool, setNewSchool, setEditedRecommendedCourse, setGroupIndex }: { 
    toggleRecommendedCourses: (e:any) => void, 
    newSchool: School, 
    setNewSchool: Dispatch<SetStateAction<School>>,
    setEditedRecommendedCourse: Dispatch<SetStateAction<SchoolPrereqRecommendedCourse | null>>,
    setGroupIndex: Dispatch<SetStateAction<number | null>>
}) {
    const courses = useSelector(selectCourses);

    const deleteCourse = (e:any, index: number) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            school_prereq_recommended_courses: newSchool.school_prereq_recommended_courses.filter((course,i) => i !== index)
        })
    }

    return (
        <div className={`mt-20 relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Recommended Courses</label>   
            <button onClick={toggleRecommendedCourses} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                Add Course
            </button>
            <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_prereq_recommended_courses.length ? 'mt-3' : 'mt-0'}`}>
            {courses && newSchool.school_prereq_recommended_courses.map((course, i) => {
                const selectedCourse = courses.find(c => c.unique_id === course.school_recommended_course_id)
                if (selectedCourse) {
                    return (
                        <div className='py-2 pr-2 pl-3 border border-[#545454] rounded w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <p className='font-bold'>{selectedCourse?.course_name}
                                    <span className='font-semibold text-sm inline-block pl-3 text-[#6A6A6A]'>
                                        {`(${course.school_recommended_course_lab ? 'with lab' : 'without lab'}
                                        ${!course.school_recommended_course_lab && course.school_recommended_course_lab_preferred ? ' / lab preferred' : ''}  
                                        / ${course.school_recommended_course_credit_hours} credit hours 
                                        / ${course.school_recommended_course_quarter_hours} quarter hours)`}                                   
                                    </span>
                                </p>
                                <div className='flex gap-2'>
                                    <button onClick={(e) => {toggleRecommendedCourses(e); setEditedRecommendedCourse(course); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                    <button onClick={(e) => deleteCourse(e,i)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                </div>
                            </div>
                            {course.school_recommended_course_note_section ? (
                                <>
                                    <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                    <ReactQuill theme='bubble' value={course.school_recommended_course_note_section} readOnly={true} className='edited-quill'/>
                                </>
                            ) : null}
                        </div>
                    )
                } else {
                    return null
                }
            })}
            </div>
        </div>
    )
}