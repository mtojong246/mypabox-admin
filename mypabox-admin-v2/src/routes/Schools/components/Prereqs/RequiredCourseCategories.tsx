import { School } from "../../../../types/schools.types";
import { useSelector } from "react-redux"
import { selectCourses } from "../../../../app/selectors/courses.selectors"
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import ReactQuill from "react-quill";

export default function RequiredCourseCategories({ toggleRequiredCourseCategories, newSchool }: { toggleRequiredCourseCategories: (e:any) => void, newSchool: School }) {
    const courses = useSelector(selectCourses)
    
    return (
        <div className={`mt-20 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Required Course Categories</label>   
            <button onClick={toggleRequiredCourseCategories} className="border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                Add Category
            </button>
            <div className={`flex flex-col justify-center items-center gap-5 ${newSchool.school_prereq_required_course_categories.length ? 'mt-5' : 'mt-0'}`}>
            {newSchool.school_prereq_required_course_categories.map(category => (
                <div className='p-4 border border-[#545454] rounded w-full'>
                    <div className='flex justify-between items-center w-full'>
                        <p className='font-bold text-xl'>{category.school_required_course_category}
                            <span className='font-semibold text-base inline-block pl-3 text-[#6A6A6A]'>
                                {`(${category.school_required_course_category_number_of_courses_that_need_lab} courses with lab
                                / ${category.school_required_course_category_number_of_credits_need_to_be_completed} credit hours 
                                / ${category.school_required_course_category_number_of_quarter_hours_need_to_be_completed} quarter hours)`}                                   
                            </span>
                        </p>
                        <div className='flex gap-2'>
                            <button><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                            <button><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                        </div>
                    </div>
                    {category.school_required_course_category_extra_included_courses.length > 0 && (
                    <>
                        <p className='font-semibold underline underline-offset-2 mt-5 mb-2 text-[#4573D2]'>Included Courses:</p>
                        <div className='flex flex-col justify-center items-center gap-4'>
                        {category.school_required_course_category_extra_included_courses.map(course => {
                            const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id);
                            if (selectedCourse) {
                                return (
                                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                        <p className='font-semibold'>{selectedCourse.course_name}</p>
                                        {course.school_required_course_note ? (
                                            <>
                                                <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                                <ReactQuill theme='bubble' value={course.school_required_course_note} readOnly={true} className='edited-quill'/>
                                            </>
                                        ) : null}
                                    </div>
                                )
                            } else {
                                return null;
                            }
                            
                        })}
                        </div>
                    </>
                    )}
                    {category.school_required_course_category_excluded_courses.length > 0 && (
                    <>
                        <p className='font-semibold underline underline-offset-2 mt-6 mb-2 text-[#F06A6A]'>Excluded Courses:</p>
                        <div className='flex flex-col justify-center items-center gap-4'>
                        {category.school_required_course_category_excluded_courses.map(course => {
                            const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id);
                            if (selectedCourse) {
                                return (
                                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                        <p className='font-semibold'>{selectedCourse.course_name}</p>
                                        {course.school_required_course_note ? (
                                            <>
                                                <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                                <ReactQuill theme='bubble' value={course.school_required_course_note} readOnly={true} className='edited-quill'/>
                                            </>
                                        ) : null}
                                    </div>
                                )
                            } else {
                                return null;
                            }
                            
                        })}
                        </div>
                    </>
                    )}
                    {category.school_required_course_category_note_section.length > 0 && (
                        <>
                            <p className='font-semibold underline underline-offset-2 mt-6 mb-2'>Optional Courses Notes:</p>
                            <div className='flex flex-col justify-center items-center gap-4'>
                            {category.school_required_course_category_note_section.map(note => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                    <p className={`font-semibold mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                            </div>
                        </>
                    )}
                </div>
            ))}
            </div>
        </div>
    )
}