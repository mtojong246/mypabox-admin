import { ChangeEvent } from "react"
import { UserObject } from "../../../types/users.types";
import ReactQuill from "react-quill";
import { Course } from "../../../types/courses.types";
import { SchoolPrereqRequiredCourse } from "../../../types/schools.types";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { Dispatch, SetStateAction } from "react";


interface EditedRequired {
    edited_school_required_course_id: string;
    edited_school_required_course_lab: boolean;
    edited_school_required_course_lab_preferred: boolean;
    edited_school_required_course_credit_hours: number;
    edited_school_required_course_quarter_hours: number;
    edited_school_required_course_note_section: string;
    isCorrect: boolean;
    isNew: boolean;
}

export default function RequiredCourseField({ loggedInUser, input, isEditMode, originalInput, name, courses, toggleRequiredCourses, setEditedRequiredCourse, setGroupIndex, deleteCourse}: { 
    loggedInUser: UserObject,
    input: EditedRequired[] | null,
    isEditMode: boolean,
    originalInput: SchoolPrereqRequiredCourse[],
    name: string,
    courses: Course[];
    toggleRequiredCourses: (e:any) => void,
    setEditedRequiredCourse: Dispatch<SetStateAction<SchoolPrereqRequiredCourse | null>>,
    setGroupIndex: Dispatch<SetStateAction<number | null>>,
    deleteCourse: (e:any, index: number) => void,

 }) {

    return (
        <>
            {loggedInUser.permissions.canVerify ? (
                <>
                {input !== null ? (
                <></>
                // <div className='flex flex-col justify-start items-start gap-3 grow'>
                //     <input type={name === 'school_date_pending_courses_must_be_completed' ? 'date' : 'text'} disabled className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" placeholder={name === 'school_duration_full_time' || name === 'school_duration_part_time' ? '# of months' : ''}
                //     value={input ? input : ''} name={name}/>
                //     <input type={name === 'school_date_pending_courses_must_be_completed' ? 'date' : 'text'} disabled className={`w-full focus:outline-none border border-[#B4B4B4] p-3 rounded ${input ? 'line-through' : 'no-underline'}`} value={(originalInput as string | number) ? (originalInput as string | number) : ''}/>
                // </div>
                ) : (
                <>
                <button onClick={toggleRequiredCourses} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Course
                </button>
                <div className={`flex flex-col justify-center items-center gap-3 ${originalInput.length ? 'mt-3' : 'mt-0'}`}>
                {courses && originalInput.map((course, i) => {
                    const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id)
                    if (selectedCourse) {
                        return (
                            <div className='py-2 pr-2 pl-3 border border-[#545454] rounded w-full'>
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
                                        <button onClick={(e) => {toggleRequiredCourses(e); setEditedRequiredCourse(course); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteCourse(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
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
                </>
                
                // <input type={name === 'school_date_pending_courses_must_be_completed' ? 'date' : 'text'} className="grow focus:outline-none border border-[#B4B4B4] p-3 rounded" placeholder={name === 'school_duration_full_time' || name === 'school_duration_part_time' ? '# of months' : ''}
                // value={(originalInput as string | number) ? (originalInput as string | number) : ''} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => handleInput(e, false)}/>
                )}
                </>
            ) : (
                <></>
                // <div className='flex flex-col justify-start items-start gap-3 grow'>
                //     {(input !== null || isEditMode) && <input type={name === 'school_date_pending_courses_must_be_completed' ? 'date' : 'text'} disabled={isEditMode ? false : true} className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" placeholder={name === 'school_duration_full_time' || name === 'school_duration_part_time' ? '# of months' : ''}
                //     value={input ? input : ''} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => handleInput(e, true)}/>}
                //     {(!isEditMode || (isEditMode && (input !== originalInput))) && <input type={name === 'school_date_pending_courses_must_be_completed' ? 'date' : 'text'} disabled className={`w-full focus:outline-none border border-[#B4B4B4] p-3 rounded ${input || isEditMode ? 'line-through' : 'no-underline'}`} value={(originalInput as string | number) ? (originalInput as string | number) : ''}/>}
                // </div>
            )}
        </>
    )
}