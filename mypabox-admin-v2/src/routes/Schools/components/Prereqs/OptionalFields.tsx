import { UserObject } from '../../../../types/users.types';
import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { LuUndo2 } from 'react-icons/lu';
import { FiEdit3 } from 'react-icons/fi';
import { Course } from '../../../../types/courses.types';
import ReactQuill from 'react-quill';
import { Note } from '../../../../types/schools.types';

export default function OptionalFields({loggedInUser, input, originalInput, isEditMode, setEditedOption, deleteOption, undoDelete, toggleOptions, setGroupIndex, courses}: {
    loggedInUser: UserObject, 
    input: {
        school_minimum_number_of_courses_to_be_completed: number;
        school_required_optional_courses_list: {
            school_optional_course_id: string;
            school_optional_course_lab: boolean;
            school_optional_course_lab_preferred: boolean;
            school_optional_course_credit_hours: number;
            school_optional_course_quarter_hours: number;
            school_optional_course_note_section: string;
            isNew: boolean;
            isCorrect: boolean;
        }[];
        school_optional_course_note_section: Note[];
        isCorrect: boolean;
        isNew: boolean;
    }[] | null,
    originalInput: {
        school_minimum_number_of_courses_to_be_completed: number;
        school_required_optional_courses_list: {
            school_optional_course_id: string;
            school_optional_course_lab: boolean;
            school_optional_course_lab_preferred: boolean;
            school_optional_course_credit_hours: number;
            school_optional_course_quarter_hours: number;
            school_optional_course_note_section: string;
        }[];
        school_optional_course_note_section: Note[];
    }[],
    isEditMode: 
    boolean, 
    setEditedOption: Dispatch<SetStateAction<any>>,
    setGroupIndex: Dispatch<SetStateAction<number | null>>,
    deleteOption: (e: MouseEvent<HTMLButtonElement>, index: number, isNew: boolean, isEditedInput: boolean) => void,
    undoDelete: (e: MouseEvent<HTMLButtonElement>, index: number) => void,
    toggleOptions: (e:MouseEvent<HTMLButtonElement>) => void,
    courses: Course[],
}) {
    return (
        <>
        {loggedInUser.permissions.canVerify ? (
            <>
            {input !== null ? (
            <>
            <div className={`flex flex-col justify-center items-center gap-3 ${input.length ? 'mt-3' : 'mt-0'}`}>
                {input.map((group, i) => {
                    const originalGroup = originalInput && originalInput.find((inp,index) => index === i);
                    return (
                    <div className={`p-3 border ${group.isNew ? 'border-orange-600' : 'border-[#545454]'}  rounded w-full`}>
                        <div className='flex justify-between items-center w-full'>
                            <p className={`font-bold text-lg ${!group.isCorrect && !group.isNew ? 'line-through' : 'no-underline'}`}>{group.school_minimum_number_of_courses_to_be_completed} {originalGroup && originalGroup.school_minimum_number_of_courses_to_be_completed !== group.school_minimum_number_of_courses_to_be_completed && <span className='line-through'>{originalGroup.school_minimum_number_of_courses_to_be_completed}</span>}<span className='font-normal'>of the following courses need to be completed:</span></p>
                            <div className='flex gap-2'>
                                <button disabled onClick={(e) => {toggleOptions(e); setEditedOption(group); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button disabled onClick={(e) => deleteOption(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                        {courses && group.school_required_optional_courses_list.map((course, ind) => {
                            const selectedCourse = courses.find(c => c.unique_id === course.school_optional_course_id);
                            const originalCourseGroup = originalGroup && originalGroup.school_required_optional_courses_list.find((group,i) => i === ind);
                            const originalCourse = originalCourseGroup && courses.find(c => c.unique_id === originalCourseGroup.school_optional_course_id);
                            if (selectedCourse) {
                                return (
                                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                        <p className={`font-semibold ${!course.isCorrect && !course.isNew ? 'line-through' : 'no-underline'}`}>{selectedCourse?.course_name}
                                            <span className='font-semibold text-sm inline-block pl-3 text-[#6A6A6A]'>
                                                {`(${course.school_optional_course_lab ? 'with lab' : 'without lab'}
                                                ${!course.school_optional_course_lab && course.school_optional_course_lab_preferred ? ' / lab preferred' : ''}  
                                                / ${course.school_optional_course_credit_hours} credit hours 
                                                / ${course.school_optional_course_quarter_hours} quarter hours)`}                                   
                                            </span>
                                        </p>
                                        {originalCourseGroup && (originalCourseGroup.school_optional_course_id !== course.school_optional_course_id || originalCourseGroup.school_optional_course_lab !== course.school_optional_course_lab || originalCourseGroup.school_optional_course_credit_hours !== course.school_optional_course_credit_hours 
                                            || originalCourseGroup.school_optional_course_lab_preferred !== course.school_optional_course_lab_preferred || originalCourseGroup.school_optional_course_quarter_hours !== course.school_optional_course_quarter_hours) && (
                                                <p className='font-semibold line-through'>{originalCourse?.course_name}
                                                    <span className='font-semibold text-sm inline-block pl-3 text-[#6A6A6A]'>
                                                        {`(${originalCourseGroup.school_optional_course_lab ? 'with lab' : 'without lab'}
                                                        ${!originalCourseGroup.school_optional_course_lab && originalCourseGroup.school_optional_course_lab_preferred ? ' / lab preferred' : ''}  
                                                        / ${originalCourseGroup.school_optional_course_credit_hours} credit hours 
                                                        / ${originalCourseGroup.school_optional_course_quarter_hours} quarter hours)`}                                   
                                                    </span>
                                                </p>
                                            )}
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
                )})}
                </div>
            </>
            ) : (
                <>
                <div className={`flex flex-col justify-center items-center gap-3 ${originalInput.length ? 'mt-3' : 'mt-0'}`}>
                {originalInput.map((group, i) => (
                    <div className='p-3 border border-[#545454] rounded w-full'>
                        <div className='flex justify-between items-center w-full'>
                            <p className='font-bold text-lg'>{group.school_minimum_number_of_courses_to_be_completed} <span className='font-normal'>of the following courses need to be completed:</span></p>
                            <div className='flex gap-2'>
                                <button  onClick={(e) => {toggleOptions(e); setEditedOption(group); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button  onClick={(e) => deleteOption(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                        {courses && group.school_required_optional_courses_list.map(course => {
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
                </>
            )}
            </>
        ) : (
            <>
            {input !== null ? (
                <div className={`flex flex-col justify-center items-center gap-3 ${input.length ? 'mt-3' : 'mt-0'}`}>
                {input.map((group, i) => {
                    const originalGroup = originalInput && originalInput.find((inp,index) => index === i);
                    return (
                    <div className={`p-3 border ${group.isNew ? 'border-orange-600' : 'border-[#545454]'}  rounded w-full`}>
                        <div className='flex justify-between items-center w-full'>
                            <p className={`font-bold text-lg ${!group.isCorrect && !group.isNew ? 'line-through' : 'no-underline'}`}>{group.school_minimum_number_of_courses_to_be_completed} {originalGroup && originalGroup.school_minimum_number_of_courses_to_be_completed !== group.school_minimum_number_of_courses_to_be_completed && <span className='line-through'>{originalGroup.school_minimum_number_of_courses_to_be_completed}</span>}<span className='font-normal'>of the following courses need to be completed:</span></p>
                            <div className='flex gap-2'>
                                {!group.isCorrect && !group.isNew ? (
                                    <button onClick={(e:MouseEvent<HTMLButtonElement>) => undoDelete(e, i)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]" /></button>
                                ) : (
                                    <>
                                    <button disabled={isEditMode ? false : true} onClick={(e) => {toggleOptions(e); setEditedOption(group); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                    <button disabled={isEditMode ? false : true} onClick={(e) => deleteOption(e,i, group.isNew, true)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                        {courses && group.school_required_optional_courses_list.map((course, ind) => {
                            const selectedCourse = courses.find(c => c.unique_id === course.school_optional_course_id);
                            const originalCourseGroup = originalGroup && originalGroup.school_required_optional_courses_list.find((group,i) => i === ind);
                            const originalCourse = originalCourseGroup && courses.find(c => c.unique_id === originalCourseGroup.school_optional_course_id);
                            if (selectedCourse) {
                                return (
                                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                        <p className={`font-semibold ${!course.isCorrect && !course.isNew ? 'line-through' : 'no-underline'}`}>{selectedCourse?.course_name}
                                            <span className='font-semibold text-sm inline-block pl-3 text-[#6A6A6A]'>
                                                {`(${course.school_optional_course_lab ? 'with lab' : 'without lab'}
                                                ${!course.school_optional_course_lab && course.school_optional_course_lab_preferred ? ' / lab preferred' : ''}  
                                                / ${course.school_optional_course_credit_hours} credit hours 
                                                / ${course.school_optional_course_quarter_hours} quarter hours)`}                                   
                                            </span>
                                        </p>
                                        {originalCourseGroup && (originalCourseGroup.school_optional_course_id !== course.school_optional_course_id || originalCourseGroup.school_optional_course_lab !== course.school_optional_course_lab || originalCourseGroup.school_optional_course_credit_hours !== course.school_optional_course_credit_hours 
                                            || originalCourseGroup.school_optional_course_lab_preferred !== course.school_optional_course_lab_preferred || originalCourseGroup.school_optional_course_quarter_hours !== course.school_optional_course_quarter_hours) && (
                                                <p className='font-semibold line-through'>{originalCourse?.course_name}
                                                    <span className='font-semibold text-sm inline-block pl-3 text-[#6A6A6A]'>
                                                        {`(${originalCourseGroup.school_optional_course_lab ? 'with lab' : 'without lab'}
                                                        ${!originalCourseGroup.school_optional_course_lab && originalCourseGroup.school_optional_course_lab_preferred ? ' / lab preferred' : ''}  
                                                        / ${originalCourseGroup.school_optional_course_credit_hours} credit hours 
                                                        / ${originalCourseGroup.school_optional_course_quarter_hours} quarter hours)`}                                   
                                                    </span>
                                                </p>
                                            )}
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
                )})}
                </div>
            ) : (
                <>
                <div className={`flex flex-col justify-center items-center gap-3 ${originalInput.length ? 'mt-3' : 'mt-0'}`}>
                {originalInput.map((group, i) => (
                    <div className='p-3 border border-[#545454] rounded w-full'>
                        <div className='flex justify-between items-center w-full'>
                            <p className='font-bold text-lg'>{group.school_minimum_number_of_courses_to_be_completed} <span className='font-normal'>of the following courses need to be completed:</span></p>
                            <div className='flex gap-2'>
                                <button disabled onClick={(e) => {toggleOptions(e); setEditedOption(group); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button disabled onClick={(e) => deleteOption(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                        {courses && group.school_required_optional_courses_list.map(course => {
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
                </>
            )}
            </>
        )}
        </>
    )
}