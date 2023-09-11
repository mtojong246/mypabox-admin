import { Dispatch, SetStateAction, useState } from "react";
import { School, SchoolPrereqRecommendedCourse, SchoolPrereqRequiredCourse } from "../../../../types/schools.types";
import AddRequiredCourses from "./AddRequiredCourses";
import AddRequiredCourseCategories from "./AddRequiredCourseCategories";
import AddRequiredOptionalCourses from "./AddRequiredOptionalCourses";
import AddRecommendedCourses from "./AddRecommendedCourses";
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { selectCourses } from "../../../../app/selectors/courses.selectors";

export default function Prereqs({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const courses = useSelector(selectCourses)
    const [ openRequiredCourses, setOpenRequiredCourses ] = useState(false);
    const [ openRequiredCourseCategories, setOpenRequiredCourseCategories ] = useState(false);
    const [ openRequiredOptionalCourses, setOpenRequiredOptionalCourses ] = useState(false);
    const [ openRecommendedCourses, setOpenRecommendedCourses ] = useState(false);

    const toggleRequiredCourses = (e:any) => {
        e.preventDefault();
        setOpenRequiredCourses(!openRequiredCourses);
    }
    const toggleRequiredCourseCategories = (e:any) => {
        e.preventDefault();
        setOpenRequiredCourseCategories(!openRequiredCourseCategories);
    }
    const toggleRequiredOptionalCourses = (e:any) => {
        e.preventDefault();
        setOpenRequiredOptionalCourses(!openRequiredOptionalCourses);
    }
    const toggleRecommendedCourses = (e:any) => {
        e.preventDefault();
        setOpenRecommendedCourses(!openRecommendedCourses);
    }
    const addRequiredCourse = (course: SchoolPrereqRequiredCourse) => {
        setNewSchool({
            ...newSchool,
            school_prereq_required_courses: newSchool.school_prereq_required_courses.concat(course)
        })
    }

    const addRecommendedCourse = (course: SchoolPrereqRecommendedCourse) => {
        setNewSchool({
            ...newSchool,
            school_prereq_recommended_courses: newSchool.school_prereq_recommended_courses.concat(course)
        })
    }

    console.log(newSchool.school_prereq_required_courses, newSchool.school_prereq_recommended_courses)

    return (
        <>
        {newSchool && (
            <>
                <div className={`mt-10 relative max-w-[900px] border p-5 block rounded border-[#B4B4B4]`}>
                    <label className="absolute top-[-16px] text-xl bg-white">Required Courses</label>   
                    <button onClick={toggleRequiredCourses} className="border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Course
                    </button>
                    <div className={`flex flex-col justify-center items-center gap-4 ${newSchool.school_prereq_required_courses.length ? 'mt-5' : 'mt-0'}`}>
                    {courses && newSchool.school_prereq_required_courses.map(course => {
                        const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id)
                        if (selectedCourse) {
                            return (
                                <div className='py-2 pr-2 pl-5 border border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='font-bold'>{selectedCourse?.course_name}
                                            <span className='font-semibold text-sm inline-block pl-3 text-[#6A6A6A]'>
                                                {`(${course.school_required_course_lab ? 'with lab' : 'without lab'}
                                                 ${!course.school_required_course_lab && course.school_required_course_lab_preferred ? ' / lab preferred' : ''}  
                                                / ${course.school_required_course_credit_hours} credit hours 
                                                / ${course.school_required_course_quarter_hours} quarter hours)`}                                   
                                            </span>
                                        </p>
                                        <div className='flex gap-2'>
                                            <button><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                            <button><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                    {course.school_required_course_note_section ? (
                                        <>
                                            <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                            <ReactQuill theme='bubble' value={course.school_required_course_note_section} readOnly={true} className='edited-quill'/>
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
                <div className={`mt-28 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
                    <label className="absolute top-[-16px] text-xl bg-white">Required Optional Courses</label>   
                    <button onClick={toggleRequiredOptionalCourses} className="border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Option
                    </button>
                </div>
                <div className={`mt-28 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
                    <label className="absolute top-[-16px] text-xl bg-white">Required Course Categories</label>   
                    <button onClick={toggleRequiredCourseCategories} className="border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Category
                    </button>
                </div>
                <div className={`mt-28 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
                    <label className="absolute top-[-16px] text-xl bg-white">Recommended Courses</label>   
                    <button onClick={toggleRecommendedCourses} className="border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Course
                    </button>
                    <div className={`flex flex-col justify-center items-center gap-4 ${newSchool.school_prereq_recommended_courses.length ? 'mt-5' : 'mt-0'}`}>
                    {courses && newSchool.school_prereq_recommended_courses.map(course => {
                        const selectedCourse = courses.find(c => c.unique_id === course.school_recommended_course_id)
                        if (selectedCourse) {
                            return (
                                <div className='py-2 pr-2 pl-5 border border-[#B4B4B4] rounded w-full'>
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
                                            <button><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                            <button><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
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
            </>
        )}
        {openRequiredCourses && <AddRequiredCourses toggleRequiredCourses={toggleRequiredCourses} addRequiredCourse={addRequiredCourse}/>}
        {openRequiredCourseCategories && <AddRequiredCourseCategories toggleRequiredCourseCategories={toggleRequiredCourseCategories}/>}
        {openRequiredOptionalCourses && <AddRequiredOptionalCourses toggleRequiredOptionalCourses={toggleRequiredOptionalCourses}/>}
        {openRecommendedCourses && <AddRecommendedCourses toggleRecommendedCourses={toggleRecommendedCourses} addRecommendedCourse={addRecommendedCourse}/>}
        </>
    )
}