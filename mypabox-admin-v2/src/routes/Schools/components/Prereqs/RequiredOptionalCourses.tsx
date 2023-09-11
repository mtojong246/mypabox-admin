import { School } from "../../../../types/schools.types";
import { useSelector } from "react-redux"
import { selectCourses } from "../../../../app/selectors/courses.selectors"
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import ReactQuill from "react-quill";
import { Dispatch, SetStateAction } from "react";

export default function RequiredOptionalCourses({ toggleRequiredOptionalCourses, newSchool, setNewSchool }: { toggleRequiredOptionalCourses: (e:any) => void, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const courses = useSelector(selectCourses)

    const deleteOption = (e:any, index: number) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            school_prereq_required_optional_courses: newSchool.school_prereq_required_optional_courses.filter((category,i) => i !== index)
        })
    }
    
    return (
        <div className={`mt-20 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Required Optional Courses</label>   
            <button onClick={toggleRequiredOptionalCourses} className="border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                Add Option
            </button>
            <div className={`flex flex-col justify-center items-center gap-5 ${newSchool.school_prereq_required_optional_courses.length ? 'mt-5' : 'mt-0'}`}>
            {newSchool.school_prereq_required_optional_courses.map((group, i) => (
                <div className='p-4 border border-[#545454] rounded w-full'>
                    <div className='flex justify-between items-center w-full'>
                        <p className='font-bold text-xl'>{group.school_minimum_number_of_courses_to_be_completed} <span className='font-normal'>of the following courses need to be completed:</span></p>
                        <div className='flex gap-2'>
                            <button><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                            <button onClick={(e) => deleteOption(e,i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                    {group.school_required_optional_courses_list.map(course => {
                        const selectedCourse = courses.find(c => c.unique_id === course.school_optional_course_id);
                        if (selectedCourse) {
                            return (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                    <p className='font-semibold'>{selectedCourse?.course_name}
                                        <span className='font-semibold text-sm inline-block pl-3 text-[#6A6A6A]'>
                                            {`(${course.school_optional_course_lab ? 'with lab' : 'without lab'}
                                            ${!course.school_optional_course_lab && course.school_optional_course_lab_preferred ? ' / lab preferred' : ''}  
                                            / ${course.school_optional_course_credit_hours} credit hours 
                                            / ${course.school_optional_course_quarter_hours} quarter hours)`}                                   
                                        </span>
                                    </p>
                                    {course.school_optional_course_note_section ? (
                                    <>
                                        <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                        <ReactQuill theme='bubble' value={course.school_optional_course_note_section} readOnly={true} className='edited-quill'/>
                                    </>
                                    ) : null}
                                </div>
                            )
                        } else {
                            return null;
                        }
                    })}
                    </div>
                    {group.school_optional_course_note_section.length > 0 && (
                        <>
                            <p className='font-semibold underline underline-offset-2 mt-5 mb-2'>Optional Courses Notes:</p>
                            <div className='flex flex-col justify-center items-center gap-4'>
                            {group.school_optional_course_note_section.map(note => (
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